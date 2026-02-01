import { pgTable, text, serial, integer, boolean, timestamp, real, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth"; // Import users from auth module

// Export auth models so they are available
export * from "./models/auth";

// House Price Prediction History
export const housePredictions = pgTable("house_predictions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id), // Optional: link to user if logged in
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: real("bathrooms").notNull(),
  flatArea: real("flat_area").notNull(),
  lotArea: real("lot_area").notNull(),
  condition: integer("condition").notNull(), // 1-5
  grade: integer("grade").notNull(), // 1-13
  zipcode: varchar("zipcode").notNull(),
  predictedPrice: real("predicted_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHousePredictionSchema = createInsertSchema(housePredictions).omit({
  id: true,
  createdAt: true,
  predictedPrice: true, // This is calculated backend side
  userId: true // This is set backend side
});

// Loan Eligibility Prediction History
export const loanPredictions = pgTable("loan_predictions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  applicantIncome: real("applicant_income").notNull(),
  coapplicantIncome: real("coapplicant_income").notNull(),
  loanAmount: real("loan_amount").notNull(),
  loanTerm: integer("loan_term").notNull(), // months
  creditHistory: integer("credit_history").notNull(), // 0 or 1
  propertyArea: varchar("property_area", { enum: ["Urban", "Semiurban", "Rural"] }).notNull(),
  married: boolean("married").notNull(),
  education: boolean("education").notNull(), // true = Graduate, false = Not Graduate
  isEligible: boolean("is_eligible").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLoanPredictionSchema = createInsertSchema(loanPredictions).omit({
  id: true,
  createdAt: true,
  isEligible: true,
  userId: true
});

// Types
export type HousePrediction = typeof housePredictions.$inferSelect;
export type InsertHousePrediction = z.infer<typeof insertHousePredictionSchema>;

export type LoanPrediction = typeof loanPredictions.$inferSelect;
export type InsertLoanPrediction = z.infer<typeof insertLoanPredictionSchema>;
