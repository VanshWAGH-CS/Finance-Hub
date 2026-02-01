import { Sidebar } from "@/components/layout/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertHousePredictionSchema, type InsertHousePrediction } from "@shared/schema";
import { usePredictHouse } from "@/hooks/use-prediction";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, DollarSign, Building } from "lucide-react";

export default function HousePrediction() {
  const mutation = usePredictHouse();

  const form = useForm<InsertHousePrediction>({
    resolver: zodResolver(insertHousePredictionSchema),
    defaultValues: {
      bedrooms: 3,
      bathrooms: 2,
      flatArea: 1500,
      lotArea: 5000,
      condition: 3,
      grade: 7,
      zipcode: "",
    },
  });

  function onSubmit(data: InsertHousePrediction) {
    mutation.mutate(data);
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display text-foreground">House Price Prediction</h1>
            <p className="text-muted-foreground mt-1">Estimate property value using advanced market data analysis.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>Enter the specifications of the property.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bedrooms</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bathrooms</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.5" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="flatArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Living Area (sqft)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lotArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lot Area (sqft)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condition (1-5)</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" max="5" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="grade"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Grade (1-13)</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" max="13" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="sm:col-span-2">
                          <FormField
                            control={form.control}
                            name="zipcode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Zipcode</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 98001" {...field} />
                                </FormControl>
                                <FormMessage />
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
                            Analyzing Market Data...
                          </>
                        ) : (
                          "Predict Price"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card className="h-full bg-slate-900 text-white shadow-xl border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    Valuation Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mutation.data ? (
                    <div className="text-center py-8 fade-in">
                      <p className="text-slate-400 mb-2">Estimated Value</p>
                      <div className="text-4xl font-bold font-display text-white mb-6">
                        {mutation.data.formattedPrice}
                      </div>
                      <div className="bg-slate-800 rounded-lg p-4 text-left space-y-2">
                        <p className="text-sm text-slate-400 font-medium">Key Factors:</p>
                        {mutation.data.factors.map((factor: string, i: number) => (
                          <div key={i} className="flex items-center text-sm">
                            <Building className="h-3 w-3 mr-2 text-primary" />
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-slate-500 text-center">
                      <div className="bg-slate-800 p-4 rounded-full mb-4">
                        <Building className="h-8 w-8" />
                      </div>
                      <p>Submit the property details to generate a valuation estimate.</p>
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
