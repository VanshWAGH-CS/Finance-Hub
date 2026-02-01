import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertHousePrediction, type InsertLoanPrediction } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// ============================================
// HOUSE PREDICTION HOOKS
// ============================================

export function usePredictHouse() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertHousePrediction) => {
      // Validate locally first (optional but good practice)
      const validated = api.predict.house.input.parse(data);
      
      const res = await fetch(api.predict.house.path, {
        method: api.predict.house.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.predict.house.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to predict house price");
      }

      return api.predict.house.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.history.house.path] });
    },
    onError: (error) => {
      toast({
        title: "Prediction Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useHouseHistory() {
  return useQuery({
    queryKey: [api.history.house.path],
    queryFn: async () => {
      const res = await fetch(api.history.house.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.history.house.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// LOAN ELIGIBILITY HOOKS
// ============================================

export function usePredictLoan() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertLoanPrediction) => {
      const validated = api.predict.loan.input.parse(data);
      
      const res = await fetch(api.predict.loan.path, {
        method: api.predict.loan.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.predict.loan.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to assess eligibility");
      }

      return api.predict.loan.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.history.loan.path] });
    },
    onError: (error) => {
      toast({
        title: "Eligibility Check Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useLoanHistory() {
  return useQuery({
    queryKey: [api.history.loan.path],
    queryFn: async () => {
      const res = await fetch(api.history.loan.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.history.loan.responses[200].parse(await res.json());
    },
  });
}
