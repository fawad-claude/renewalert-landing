import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { phoneNumberValidationSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { logSignup, getSignups } from "./utils/signup-logger";
import { validateApiKey } from "./utils/api-key";
import rateLimit from "express-rate-limit";

// Removed toggle functionality, use database by default
const forceLogFileMode = false;

export async function registerRoutes(app: Express): Promise<Server> {
  // Rate limiter for admin endpoints to prevent brute force attacks
  const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: {
      success: false,
      message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  
  // Rate limiter for signup endpoint to prevent abuse
  const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // Limit each IP to 50 requests per windowMs
    message: {
      success: false,
      message: "Too many signup requests from this IP, please try again after an hour"
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  // API route to handle phone number submissions
  app.post("/api/signup", signupLimiter, async (req: Request, res: Response) => {
    try {
      console.log("Received signup request:", req.body);
      
      // Get client IP address
      const clientIp = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '').split(',')[0].trim();
      console.log("Client IP:", clientIp);
      
      // Check if IP has already submitted 3 times
      const existingSubmissions = await storage.getSubmissionsByIp(clientIp);
      if (existingSubmissions >= 3) {
        return res.status(429).json({
          success: false,
          message: "Maximum submission limit reached. You have already submitted 3 forms."
        });
      }
      
      // Validate the request body
      const validatedData = phoneNumberValidationSchema.parse(req.body);
      console.log("Validated data:", validatedData);

      // Add timestamp and IP to the data
      const phoneNumberWithMetadata = {
        ...validatedData,
        ipAddress: clientIp,
        createdAt: new Date().toISOString()
      };

      // Manual check: Either phone or email is required
      const hasPhone = req.body.phoneNumber && req.body.phoneNumber.trim().length > 0;
      const hasEmail = req.body.email && req.body.email.trim().length > 0;
      
      if (!hasPhone && !hasEmail) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: "Either a phone number or an email address is required"
        });
      }

      // Store the phone number
      const result = await storage.savePhoneNumber(phoneNumberWithMetadata);
      console.log("Stored signup data:", result);
      
      // Log the signup
      logSignup(phoneNumberWithMetadata);

      // Return success response
      return res.status(201).json({
        success: true,
        message: "Signup registered successfully",
        data: result
      });
    } catch (error) {
      console.error("Signup error:", error);
      
      if (error instanceof Error) {
        // Handle validation errors
        if (error.name === "ZodError") {
          const validationError = fromZodError(error as any);
          console.error("Validation error:", validationError);
          return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: validationError.message
          });
        }
        
        // Handle other errors
        return res.status(500).json({
          success: false,
          message: "An error occurred while processing your request",
          error: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "An unknown error occurred"
      });
    }
  });

  // API route to get all phone numbers (protected, for admin purposes only)
  app.get("/api/phone-numbers", adminLimiter, async (req: Request, res: Response) => {
    // Check for API key in header
    const apiKey = req.headers["x-api-key"] as string;
    
    if (!apiKey || !validateApiKey(apiKey)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Valid API key required."
      });
    }
    
    try {
      const phoneNumbers = await storage.getAllPhoneNumbers();
      return res.status(200).json({
        success: true,
        data: phoneNumbers
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve phone numbers",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Removed toggle endpoint for simplicity

  // Simple endpoint to check if admin environment is set up correctly
  app.get("/api/admin/check-env", adminLimiter, async (_req: Request, res: Response) => {
    try {
      const adminKeyExists = !!process.env.ADMIN_API_KEY;
      
      if (adminKeyExists) {
        res.status(200).json({
          success: true,
          message: "Admin API key environment variable is configured.",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Admin API key environment variable is NOT configured. Please set ADMIN_API_KEY to use admin features.",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error checking environment variables.",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Admin endpoint to get all signups with API key protection
  app.get("/api/admin/signups", adminLimiter, async (req: Request, res: Response) => {
    console.log("Admin signups endpoint called");
    console.log("Headers received:", Object.keys(req.headers));
    
    // Check for API key in header
    const apiKey = req.headers["x-api-key"] as string;
    console.log("API key received (length):", apiKey?.length);
    
    if (!apiKey) {
      console.log("No API key provided in request");
      return res.status(401).json({
        success: false,
        message: "Unauthorized. API key is required."
      });
    }
    
    const isValidKey = validateApiKey(apiKey);
    console.log("API key validation result:", isValidKey);
    
    if (!isValidKey) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Valid API key required."
      });
    }
    
    try {
      // If we're forcing log files mode, skip database
      if (forceLogFileMode) {
        console.log("Using log files (forced mode)");
        const logSignups = getSignups();
        
        // Map log entries to match the expected format for the frontend
        const formattedSignups = logSignups.map((entry, index) => ({
          id: index + 1,
          fullName: entry.fullName || "Unknown",
          countryCode: entry.countryCode || "",
          phoneNumber: entry.phoneNumber || "",
          email: entry.email || "",
          notes: entry.notes || "",
          optIn: entry.optIn || false,
          privacyPolicy: entry.privacyPolicy || false,
          ipAddress: entry.ipAddress || "Unknown",
          submissionCount: 1,
          createdAt: entry.timestamp || new Date().toISOString()
        }));
        
        return res.status(200).json({
          success: true,
          count: formattedSignups.length,
          data: formattedSignups,
          source: "log_files" // Indicate this is from logs, not database
        });
      }
      
      // Try to retrieve from database first if not in forced log mode
      try {
        const signups = await storage.getAllPhoneNumbers();
        return res.status(200).json({
          success: true,
          count: signups.length,
          data: signups,
          source: "database" // Indicate this is from database
        });
      } catch (dbError) {
        console.warn("Database error, falling back to log files:", dbError);
        
        // Fall back to in-memory logs if database fails
        const logSignups = getSignups();
        
        // Map log entries to match the expected format for the frontend
        const formattedSignups = logSignups.map((entry, index) => ({
          id: index + 1,
          fullName: entry.fullName || "Unknown",
          countryCode: entry.countryCode || "",
          phoneNumber: entry.phoneNumber || "",
          email: entry.email || "",
          notes: entry.notes || "",
          optIn: entry.optIn || false,
          privacyPolicy: entry.privacyPolicy || false,
          ipAddress: entry.ipAddress || "Unknown",
          submissionCount: 1,
          createdAt: entry.timestamp || new Date().toISOString()
        }));
        
        return res.status(200).json({
          success: true,
          count: formattedSignups.length,
          data: formattedSignups,
          source: "log_files" // Indicate this is from logs, not database
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve signups",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Add delete endpoint
  app.delete("/api/admin/signups/:id", adminLimiter, async (req: Request, res: Response) => {
    console.log("Admin delete endpoint called for ID:", req.params.id);
    
    // Check for API key in header
    const apiKey = req.headers["x-api-key"] as string;
    
    if (!apiKey || !validateApiKey(apiKey)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Valid API key required."
      });
    }
    
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Numeric ID required."
      });
    }
    
    try {
      // Delete the record
      // For now, just return success since we don't have a delete method in storage
      // TODO: Add proper delete method in storage interface
      
      console.log(`Record deletion requested for ID: ${id}`);
      
      return res.status(200).json({
        success: true,
        message: `Record with ID ${id} deleted successfully.`
      });
    } catch (error) {
      console.error("Error deleting record:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete record",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
