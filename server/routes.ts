import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { phoneNumberValidationSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { logSignup, getSignups } from "./utils/signup-logger";
import { validateApiKey } from "./utils/api-key";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to handle phone number submissions
  app.post("/api/signup", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = phoneNumberValidationSchema.parse(req.body);

      // Add timestamp to the data
      const phoneNumberWithTimestamp = {
        ...validatedData,
        createdAt: new Date().toISOString()
      };

      // Store the phone number
      const result = await storage.savePhoneNumber(phoneNumberWithTimestamp);
      
      // Log the signup
      logSignup(phoneNumberWithTimestamp);

      // Return success response
      return res.status(201).json({
        success: true,
        message: "Phone number registered successfully",
        data: result
      });
    } catch (error) {
      if (error instanceof Error) {
        // Handle validation errors
        if (error.name === "ZodError") {
          const validationError = fromZodError(error);
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

  // API route to get all phone numbers (for admin/testing purposes)
  app.get("/api/phone-numbers", async (_req: Request, res: Response) => {
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

  // Admin endpoint to get all signups with API key protection
  app.get("/api/admin/signups", (req: Request, res: Response) => {
    // Check for API key in header
    const apiKey = req.headers["x-api-key"] as string;
    
    if (!apiKey || !validateApiKey(apiKey)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Valid API key required."
      });
    }
    
    try {
      const signups = getSignups();
      return res.status(200).json({
        success: true,
        count: signups.length,
        data: signups
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve signups",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
