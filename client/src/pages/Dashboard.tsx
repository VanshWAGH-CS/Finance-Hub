import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/use-auth";
import { StatCard } from "@/components/ui/StatCard";
import { Home, Banknote, Activity, Clock } from "lucide-react";
import { useHouseHistory, useLoanHistory } from "@/hooks/use-prediction";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: houseHistory } = useHouseHistory();
  const { data: loanHistory } = useLoanHistory();

  const recentActivity = [
    ...(houseHistory || []).map(h => ({ type: 'house', date: new Date(h.createdAt!), val: h.predictedPrice })),
    ...(loanHistory || []).map(l => ({ type: 'loan', date: new Date(l.createdAt!), val: l.loanAmount }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  // Mock data for chart - in real app, aggregate from history
  const chartData = [
    { name: 'Mon', predictions: 4 },
    { name: 'Tue', predictions: 7 },
    { name: 'Wed', predictions: 3 },
    { name: 'Thu', predictions: 8 },
    { name: 'Fri', predictions: 12 },
    { name: 'Sat', predictions: 5 },
    { name: 'Sun', predictions: 6 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background">
      <Sidebar className="hidden md:flex" />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8 fade-in">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
                Welcome back, {user?.firstName}
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your analytics today.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/house-prediction">
                <Button className="shadow-lg shadow-primary/20">
                  <Home className="mr-2 h-4 w-4" />
                  Predict Price
                </Button>
              </Link>
              <Link href="/loan-eligibility">
                <Button variant="secondary">
                  <Banknote className="mr-2 h-4 w-4" />
                  Check Eligibility
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Valuations" 
              value={houseHistory?.length || 0} 
              icon={Home}
              description="Properties analyzed"
            />
            <StatCard 
              title="Applications Scored" 
              value={loanHistory?.length || 0} 
              icon={Banknote}
              description="Loan eligibility checks"
            />
            <StatCard 
              title="Recent Activity" 
              value={recentActivity.length} 
              icon={Clock}
              description="Actions in last 24h"
            />
            <StatCard 
              title="System Status" 
              value="Operational" 
              icon={Activity}
              className="border-l-4 border-l-green-500"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border/50 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Weekly Analytics Volume</h3>
                <select className="text-sm border-none bg-secondary rounded-md px-2 py-1">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} stroke="hsl(var(--muted-foreground))" />
                    <YAxis axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="predictions" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPredictions)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity List */}
            <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No recent activity found.</p>
                ) : (
                  recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${item.type === 'house' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        {item.type === 'house' ? <Home className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.type === 'house' ? 'Property Valuation' : 'Loan Assessment'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.date.toLocaleDateString()} • {item.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
