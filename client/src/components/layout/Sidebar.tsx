import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Home, 
  Banknote, 
  History, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const { logout, user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "House Prediction", href: "/house-prediction", icon: Home },
    { name: "Loan Eligibility", href: "/loan-eligibility", icon: Banknote },
    { name: "History", href: "/history", icon: History },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-slate-900 text-white w-64 border-r border-slate-800", className)}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary p-2 rounded-lg">
            <Banknote className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display">FinSight</span>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                    )}
                  />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold">
            {user?.firstName?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
