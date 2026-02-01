import { Sidebar } from "@/components/layout/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLoanPredictionSchema, type InsertLoanPrediction } from "@shared/schema";
import { usePredictLoan } from "@/hooks/use-prediction";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoanEligibility() {
  const mutation = usePredictLoan();

  const form = useForm<InsertLoanPrediction>({
    resolver: zodResolver(insertLoanPredictionSchema),
    defaultValues: {
      applicantIncome: 5000,
      coapplicantIncome: 0,
      loanAmount: 150000,
      loanTerm: 360,
      creditHistory: 1,
      propertyArea: "Urban",
      married: false,
      education: true,
    },
  });

  function onSubmit(data: InsertLoanPrediction) {
    mutation.mutate(data);
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground">Loan Eligibility Checker</h1>
            <p className="text-muted-foreground mt-1">AI-driven risk assessment for loan applications.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle>Applicant Information</CardTitle>
                  <CardDescription>Financial details for risk assessment.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="applicantIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Income ($)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="coapplicantIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Co-Applicant Income ($)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="loanAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Loan Amount ($)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="loanTerm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Loan Term (Months)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="propertyArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Area</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select area type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Urban">Urban</SelectItem>
                                  <SelectItem value="Semiurban">Semiurban</SelectItem>
                                  <SelectItem value="Rural">Rural</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4 pt-2">
                           <FormField
                            control={form.control}
                            name="creditHistory"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Credit History Available</FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value === 1}
                                    onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Graduate</FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="married"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Married</FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 text-lg shadow-lg shadow-primary/20" 
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Assessing Risk...
                          </>
                        ) : (
                          "Check Eligibility"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card className={cn(
                "h-full shadow-xl transition-colors duration-500",
                mutation.data 
                  ? mutation.data.eligible 
                    ? "bg-green-900 border-green-800" 
                    : "bg-red-900 border-red-800"
                  : "bg-slate-900 border-slate-800"
              )}>
                <CardHeader>
                  <CardTitle className="text-white">Assessment Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mutation.data ? (
                    <div className="text-center py-8 fade-in">
                      {mutation.data.eligible ? (
                        <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      ) : (
                        <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                      )}
                      
                      <h3 className="text-2xl font-bold font-display text-white mb-2">
                        {mutation.data.eligible ? "Eligible for Loan" : "Not Eligible"}
                      </h3>
                      
                      <p className="text-white/80 mb-6 px-4">
                        {mutation.data.message}
                      </p>

                      <div className="bg-black/20 rounded-lg p-4">
                        <p className="text-sm text-white/60 mb-1">Confidence Score</p>
                        <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", mutation.data.eligible ? "bg-green-400" : "bg-red-400")} 
                            style={{width: `${mutation.data.confidence * 100}%`}}
                          />
                        </div>
                        <p className="text-right text-xs text-white/80 mt-1">{(mutation.data.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-slate-500 text-center">
                      <div className="bg-slate-800 p-4 rounded-full mb-4">
                        <Loader2 className="h-8 w-8" />
                      </div>
                      <p>Fill out the application form to check loan eligibility.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
