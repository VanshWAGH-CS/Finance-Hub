import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, Home, Banknote } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Banknote className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display">FinSight Analytics</span>
          </div>
          <Link href="/api/login">
            <Button variant="default" className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              Client Login
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 fade-in">
                <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight text-foreground">
                  AI-Powered Financial <span className="text-gradient">Intelligence</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Make confident lending decisions and accurate property valuations with our enterprise-grade machine learning models.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/api/login">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all duration-300">
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl">
                    View Methodology
                  </Button>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-primary h-5 w-5" />
                    <span className="text-sm font-medium">Bank-Grade Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="text-primary h-5 w-5" />
                    <span className="text-sm font-medium">99.8% Uptime</span>
                  </div>
                </div>
              </div>

              {/* Decorative Hero Image/Graphic */}
              <div className="relative lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-slate-100 dark:bg-slate-900 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
                
                {/* Abstract UI Representation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-background rounded-xl shadow-2xl border border-border p-6 transform group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <div className="h-4 w-32 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-8 w-8 bg-primary/20 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-24 w-full bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-2 w-16 bg-slate-200 rounded-full mx-auto mb-2" />
                        <div className="h-8 w-24 bg-primary/10 rounded-lg mx-auto" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-slate-50 rounded-lg border border-slate-100" />
                      <div className="h-32 bg-slate-50 rounded-lg border border-slate-100" />
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Core Capabilities</h2>
              <p className="text-muted-foreground text-lg">
                Leverage advanced algorithms to process complex financial data in milliseconds.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 group">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Valuation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Input property characteristics like square footage, location, and condition to receive instant, data-backed price valuations accurate to within 3%.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 group">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Banknote className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Eligibility Assessment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Analyze applicant income, credit history, and loan terms to determine approval probability instantly, reducing manual underwriting time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <Banknote className="h-5 w-5 opacity-50" />
             <span className="font-semibold">FinSight Analytics</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
          <p>© 2024 FinSight Inc.</p>
        </div>
      </footer>
    </div>
  );
}
