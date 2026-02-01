import { z } from 'zod';
import { insertHousePredictionSchema, insertLoanPredictionSchema, housePredictions, loanPredictions } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  })
};

export const api = {
  predict: {
    house: {
      method: 'POST' as const,
      path: '/api/predict/house',
      input: insertHousePredictionSchema,
      responses: {
        200: z.object({
          price: z.number(),
          currency: z.string(),
          formattedPrice: z.string(),
          factors: z.array(z.string()) // Explain why
        }),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized
      },
    },
    loan: {
      method: 'POST' as const,
      path: '/api/predict/loan',
      input: insertLoanPredictionSchema,
      responses: {
        200: z.object({
          eligible: z.boolean(),
          confidence: z.number(),
          message: z.string()
        }),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized
      },
    },
  },
  history: {
    house: {
      method: 'GET' as const,
      path: '/api/history/house',
      responses: {
        200: z.array(z.custom<typeof housePredictions.$inferSelect>()),
        401: errorSchemas.unauthorized
      }
    },
    loan: {
      method: 'GET' as const,
      path: '/api/history/loan',
      responses: {
        200: z.array(z.custom<typeof loanPredictions.$inferSelect>()),
        401: errorSchemas.unauthorized
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
