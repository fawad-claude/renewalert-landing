import { type InsertPhoneNumber, type PhoneNumber, type InsertUser, type User, users, phoneNumbers } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface remains the same
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  savePhoneNumber(phoneNumber: InsertPhoneNumber & { createdAt: string }): Promise<PhoneNumber>;
  getAllPhoneNumbers(): Promise<PhoneNumber[]>;
}

// Now implementing with DatabaseStorage
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async savePhoneNumber(phoneNumberData: InsertPhoneNumber & { createdAt: string }): Promise<PhoneNumber> {
    const [phoneNumber] = await db.insert(phoneNumbers).values({
      fullName: phoneNumberData.fullName || null,
      countryCode: phoneNumberData.countryCode || null,
      phoneNumber: phoneNumberData.phoneNumber || null,
      email: phoneNumberData.email || null,
      notes: phoneNumberData.notes || null,
      optIn: phoneNumberData.optIn || false,
      privacyPolicy: phoneNumberData.privacyPolicy || false,
      createdAt: phoneNumberData.createdAt
    }).returning();
    
    return phoneNumber;
  }

  async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    return await db.select().from(phoneNumbers);
  }
}

// Use the database storage implementation
export const storage = new DatabaseStorage();
