import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const phoneNumbers = pgTable("phone_numbers", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  countryCode: text("country_code"),
  phoneNumber: text("phone_number"),
  email: text("email"),
  notes: text("notes"),
  optIn: boolean("opt_in").default(false),
  privacyPolicy: boolean("privacy_policy").default(false),
  ipAddress: text("ip_address"),
  submissionCount: integer("submission_count").default(1),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPhoneNumberSchema = createInsertSchema(phoneNumbers).pick({
  fullName: true,
  countryCode: true,
  phoneNumber: true,
  email: true,
  notes: true,
  optIn: true,
  privacyPolicy: true,
});

// Extend the schema with validation rules
export const phoneNumberValidationSchema = insertPhoneNumberSchema.extend({
  fullName: z.string().min(2, { message: "Please enter your full name" }),
  
  // Make phone number validation more flexible - if provided, it must meet these criteria
  phoneNumber: z.string()
    .transform(val => val?.trim() || '')
    .refine(val => val === '' || (val.length >= 6 && val.length <= 15 && /^\d+$/.test(val)), {
      message: "If provided, phone number must be 6-15 digits and contain only numbers"
    })
    .optional()
    .or(z.literal('')),
    
  // Country code is required if phone is provided, otherwise it's optional
  countryCode: z.string()
    .transform(val => val?.trim() || '')
    .optional()
    .or(z.literal('')),
    
  // Make email validation more flexible - if provided, it must be a valid email
  email: z.string()
    .transform(val => val?.trim() || '')
    .refine(val => val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "If provided, email must be a valid email address"
    })
    .optional()
    .or(z.literal('')),
    
  notes: z.string().optional().or(z.literal('')),
  
  optIn: z.literal(true, {
    errorMap: () => ({ message: "You must opt-in to receive notifications to use our service" })
  }),
  
  privacyPolicy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy" })
  }),
})
// Add custom validation to ensure either phone or email is provided
.refine(
  data => {
    const hasPhone = data.phoneNumber && data.phoneNumber.trim() !== '';
    const hasEmail = data.email && data.email.trim() !== '';
    return hasPhone || hasEmail;
  },
  {
    message: "You must provide either a phone number or an email address",
    path: ["contactMethod"] // This path doesn't exist in the schema, but helps identify the error
  }
);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPhoneNumber = z.infer<typeof insertPhoneNumberSchema>;
export type PhoneNumber = typeof phoneNumbers.$inferSelect;
