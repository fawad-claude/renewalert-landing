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
  countryCode: text("country_code").notNull(),
  phoneNumber: text("phone_number").notNull(),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPhoneNumberSchema = createInsertSchema(phoneNumbers).pick({
  countryCode: true,
  phoneNumber: true,
  notes: true,
});

// Extend the schema with validation rules
export const phoneNumberValidationSchema = insertPhoneNumberSchema.extend({
  phoneNumber: z.string().min(6, { message: "Phone number must be at least 6 digits" }).max(15, { message: "Phone number must be at most 15 digits" }).regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  countryCode: z.string().min(2, { message: "Country code is required" }),
  notes: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPhoneNumber = z.infer<typeof insertPhoneNumberSchema>;
export type PhoneNumber = typeof phoneNumbers.$inferSelect;
