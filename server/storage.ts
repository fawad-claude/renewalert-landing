import { type InsertPhoneNumber, type PhoneNumber, type InsertUser, type User, users, phoneNumbers } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

// Interface remains the same
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  savePhoneNumber(phoneNumber: InsertPhoneNumber & { createdAt: string, ipAddress: string }): Promise<PhoneNumber>;
  getAllPhoneNumbers(): Promise<PhoneNumber[]>;
  getSubmissionsByIp(ipAddress: string): Promise<number>;
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

  async savePhoneNumber(phoneNumberData: InsertPhoneNumber & { createdAt: string, ipAddress: string }): Promise<PhoneNumber> {
    // First, check if this IP has submissions already
    let submissionCount = 1;
    try {
      const count = await this.getSubmissionsByIp(phoneNumberData.ipAddress);
      submissionCount = count + 1;
    } catch (error) {
      // If there was an error, default to 1
      console.error("Error getting submission count:", error);
    }
    
    const [phoneNumber] = await db.insert(phoneNumbers).values({
      fullName: phoneNumberData.fullName || null,
      countryCode: phoneNumberData.countryCode || null,
      phoneNumber: phoneNumberData.phoneNumber || null,
      email: phoneNumberData.email || null,
      notes: phoneNumberData.notes || null,
      optIn: phoneNumberData.optIn || false,
      privacyPolicy: phoneNumberData.privacyPolicy || false,
      ipAddress: phoneNumberData.ipAddress,
      submissionCount: submissionCount,
      createdAt: phoneNumberData.createdAt
    }).returning();
    
    return phoneNumber;
  }

  async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    return await db.select().from(phoneNumbers);
  }
  
  async getSubmissionsByIp(ipAddress: string): Promise<number> {
    // Get the count of submissions from this IP
    try {
      // Count submissions with this IP
      const results = await db
        .select({ count: phoneNumbers.submissionCount })
        .from(phoneNumbers)
        .where(eq(phoneNumbers.ipAddress, ipAddress));
      
      // If we found any results, return the highest count
      if (results && results.length > 0) {
        let highestCount = 0;
        for (const result of results) {
          if (result.count !== null && result.count > highestCount) {
            highestCount = result.count;
          }
        }
        return highestCount;
      }
      return 0;
    } catch (error) {
      console.error("Error counting submissions by IP:", error);
      return 0;
    }
  }
}

// Use the database storage implementation
export const storage = new DatabaseStorage();
