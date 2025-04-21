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
});

// Custom validation to require either phone or email
const phoneOrEmailRefine = (data: { phoneNumber?: string; countryCode?: string; email?: string }) => {
  // Check if either both phone fields are filled or email is filled
  const hasPhone = data.phoneNumber && data.phoneNumber.length > 0 && data.countryCode && data.countryCode.length > 0;
  const hasEmail = data.email && data.email.length > 0;
  
  return hasPhone || hasEmail;
};

// Extend the schema with validation rules
export const phoneNumberValidationSchema = insertPhoneNumberSchema.extend({
  fullName: z.string().min(2, { message: "Please enter your full name" }),
  phoneNumber: z.string()
    .min(6, { message: "Phone number must be at least 6 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" })
    .optional(),
  countryCode: z.string().min(2, { message: "Country code is required if phone number is provided" }).optional(),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  notes: z.string().optional(),
  optIn: z.literal(true, {
    errorMap: () => ({ message: "You must opt-in to receive notifications to use our service" })
  }),
}).refine(phoneOrEmailRefine, {
  message: "Either a phone number or an email address is required",
  path: ["phoneNumber"], // Show error on phone field
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPhoneNumber = z.infer<typeof insertPhoneNumberSchema>;
export type PhoneNumber = typeof phoneNumbers.$inferSelect;
