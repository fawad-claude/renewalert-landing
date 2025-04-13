import { type InsertPhoneNumber, type PhoneNumber } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  savePhoneNumber(phoneNumber: InsertPhoneNumber & { createdAt: string }): Promise<PhoneNumber>;
  getAllPhoneNumbers(): Promise<PhoneNumber[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private phoneNumbers: Map<number, PhoneNumber>;
  currentUserId: number;
  currentPhoneNumberId: number;

  constructor() {
    this.users = new Map();
    this.phoneNumbers = new Map();
    this.currentUserId = 1;
    this.currentPhoneNumberId = 1;
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async savePhoneNumber(phoneNumberData: InsertPhoneNumber & { createdAt: string }): Promise<PhoneNumber> {
    const id = this.currentPhoneNumberId++;
    const phoneNumber: PhoneNumber = { 
      id, 
      countryCode: phoneNumberData.countryCode, 
      phoneNumber: phoneNumberData.phoneNumber,
      createdAt: phoneNumberData.createdAt
    };
    
    this.phoneNumbers.set(id, phoneNumber);
    return phoneNumber;
  }

  async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    return Array.from(this.phoneNumbers.values());
  }
}

export const storage = new MemStorage();
