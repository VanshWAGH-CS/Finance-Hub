import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

// Mock ML Logic
function predictHousePrice(data: any): { price: number, factors: string[] } {
  // Base price
  let price = 100000;
  const factors = [];

  // Bedrooms
  price += data.bedrooms * 20000;
  factors.push(`+${data.bedrooms} Bedrooms impact`);

  // Bathrooms
  price += data.bathrooms * 15000;
  
  // Area
  price += data.flatArea * 150; // $150 per sqft
  factors.push(`${data.flatArea} sqft area value`);

  // Condition (1-5)
  price *= (1 + (data.condition - 3) * 0.1); // +/- 10% per condition point from avg
  
  // Grade (1-13)
  price *= (1 + (data.grade - 7) * 0.15);

  // Random market fluctuation +/- 5%
  const fluctuation = 0.95 + Math.random() * 0.1;
  price *= fluctuation;

  return { 
    price: Math.round(price),
    factors 
  };
}

function predictLoanEligibility(data: any): { eligible: boolean, confidence: number, message: string } {
  let score = 0;
  
  // Credit History is huge factor
  if (data.creditHistory === 1) score += 50;
  else score -= 50;

  // Income to Loan Ratio
  const totalIncome = data.applicantIncome + data.coapplicantIncome;
  const ratio = totalIncome / (data.loanAmount / (data.loanTerm || 360)); // Monthly payment approx
  
  // Very rough monthly payment logic (just principal/months)
  // If income is 3x monthly payment -> good
  if (ratio > 300) score += 30; // Just heuristic numbers
  else if (ratio > 100) score += 10;
  else score -= 20;

  // Education
  if (data.education) score += 10;

  // Married
  if (data.married) score += 5;

  // Property Area
  if (data.propertyArea === 'Semiurban') score += 5;

  const eligible = score > 20;
  const confidence = Math.min(Math.max(0.5 + (score / 200), 0), 0.99);

  return {
    eligible,
    confidence,
    message: eligible ? "Congratulations! Your profile meets our criteria." : "Based on the provided details, we cannot approve this loan at this time."
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth FIRST
  await setupAuth(app);
  registerAuthRoutes(app);

  // === House Prediction ===
  app.post(api.predict.house.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const input = api.predict.house.input.parse(req.body);
      const { price, factors } = predictHousePrice(input);
      
      const userId = (req.user as any).claims.sub;
      await storage.createHousePrediction({
        ...input,
        userId,
        predictedPrice: price
      });

      res.json({
        price,
        currency: 'USD',
        formattedPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price),
        factors
      });
    } catch (error) {
       if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // === Loan Prediction ===
  app.post(api.predict.loan.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const input = api.predict.loan.input.parse(req.body);
      const { eligible, confidence, message } = predictLoanEligibility(input);

      const userId = (req.user as any).claims.sub;
      await storage.createLoanPrediction({
        ...input,
        userId,
        isEligible: eligible
      });

      res.json({
        eligible,
        confidence,
        message
      });
    } catch (error) {
       if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // === History ===
  app.get(api.history.house.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as any).claims.sub;
    const history = await storage.getHousePredictions(userId);
    res.json(history);
  });

  app.get(api.history.loan.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as any).claims.sub;
    const history = await storage.getLoanPredictions(userId);
    res.json(history);
  });

  return httpServer;
}
