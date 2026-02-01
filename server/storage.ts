import { 
  housePredictions, loanPredictions,
  type InsertHousePrediction, type HousePrediction,
  type InsertLoanPrediction, type LoanPrediction
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // House Predictions
  createHousePrediction(data: InsertHousePrediction & { userId?: string, predictedPrice: number }): Promise<HousePrediction>;
  getHousePredictions(userId: string): Promise<HousePrediction[]>;

  // Loan Predictions
  createLoanPrediction(data: InsertLoanPrediction & { userId?: string, isEligible: boolean }): Promise<LoanPrediction>;
  getLoanPredictions(userId: string): Promise<LoanPrediction[]>;
}

export class DatabaseStorage implements IStorage {
  async createHousePrediction(data: InsertHousePrediction & { userId?: string, predictedPrice: number }): Promise<HousePrediction> {
    const [prediction] = await db.insert(housePredictions).values(data).returning();
    return prediction;
  }

  async getHousePredictions(userId: string): Promise<HousePrediction[]> {
    return await db.select()
      .from(housePredictions)
      .where(eq(housePredictions.userId, userId))
      .orderBy(desc(housePredictions.createdAt));
  }

  async createLoanPrediction(data: InsertLoanPrediction & { userId?: string, isEligible: boolean }): Promise<LoanPrediction> {
    const [prediction] = await db.insert(loanPredictions).values(data).returning();
    return prediction;
  }

  async getLoanPredictions(userId: string): Promise<LoanPrediction[]> {
    return await db.select()
      .from(loanPredictions)
      .where(eq(loanPredictions.userId, userId))
      .orderBy(desc(loanPredictions.createdAt));
  }
}

export const storage = new DatabaseStorage();
