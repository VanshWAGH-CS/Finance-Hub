import { Sidebar } from "@/components/layout/Sidebar";
import { useHouseHistory, useLoanHistory } from "@/hooks/use-prediction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function History() {
  const { data: houseData, isLoading: houseLoading } = useHouseHistory();
  const { data: loanData, isLoading: loanLoading } = useLoanHistory();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8 fade-in">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Analytics History</h1>
            <p className="text-muted-foreground mt-1">View your past predictions and eligibility checks.</p>
          </div>

          <Tabs defaultValue="house" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-border/50">
              <TabsTrigger value="house" className="rounded-lg px-6">House Predictions</TabsTrigger>
              <TabsTrigger value="loan" className="rounded-lg px-6">Loan Eligibility</TabsTrigger>
            </TabsList>

            <TabsContent value="house">
              <Card className="shadow-sm border-border/50">
                <CardHeader>
                  <CardTitle>House Valuation Log</CardTitle>
                </CardHeader>
                <CardContent>
                  {houseLoading ? (
                    <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Zipcode</TableHead>
                          <TableHead>Specs</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead className="text-right">Valuation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {houseData?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{new Date(item.createdAt!).toLocaleDateString()}</TableCell>
                            <TableCell>{item.zipcode}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {item.bedrooms}bd, {item.bathrooms}ba, {item.flatArea}sqft
                            </TableCell>
                            <TableCell>{item.grade}/13</TableCell>
                            <TableCell className="text-right font-medium">
                              ${item.predictedPrice.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                        {(!houseData || houseData.length === 0) && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No history found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="loan">
              <Card className="shadow-sm border-border/50">
                <CardHeader>
                  <CardTitle>Loan Eligibility Log</CardTitle>
                </CardHeader>
                <CardContent>
                  {loanLoading ? (
                    <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Income</TableHead>
                          <TableHead>Loan Amount</TableHead>
                          <TableHead>Term</TableHead>
                          <TableHead className="text-right">Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loanData?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{new Date(item.createdAt!).toLocaleDateString()}</TableCell>
                            <TableCell>${item.applicantIncome.toLocaleString()}</TableCell>
                            <TableCell>${item.loanAmount.toLocaleString()}</TableCell>
                            <TableCell>{item.loanTerm} mo</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={item.isEligible ? "default" : "destructive"} className={item.isEligible ? "bg-green-600 hover:bg-green-700" : ""}>
                                {item.isEligible ? "Eligible" : "Ineligible"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        {(!loanData || loanData.length === 0) && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No history found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
