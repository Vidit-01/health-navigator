import { NavLink, useLocation } from "react-router-dom";
import { Home, Stethoscope, FolderHeart, LayoutGrid, User, Activity, Pill, Building2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/consult", icon: Stethoscope, label: "Consult" },
  { to: "/records", icon: FolderHeart, label: "Records" },
  { to: "/services", icon: LayoutGrid, label: "Services" },
  { to: "/profile", icon: User, label: "Profile" },
];

const sidebarLinks = [
  { to: "/", icon: Home, label: "Home Dashboard" },
  { to: "/symptoms", icon: Activity, label: "Symptom Check" },
  { to: "/doctors", icon: Stethoscope, label: "Find Doctors" },
  { to: "/consult", icon: Stethoscope, label: "Consultation" },
  { to: "/records", icon: FolderHeart, label: "Health Records" },
  { to: "/medications", icon: Pill, label: "Medications" },
  { to: "/hospitals", icon: Building2, label: "Hospitals" },
  { to: "/preventive", icon: ShieldCheck, label: "Preventive Care" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col border-r border-border bg-card fixed inset-y-0 left-0 z-30">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">MediCare</h1>
              <p className="text-xs text-muted-foreground">Unified Health</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Main navigation">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors touch-target",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5 flex-shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav
        className="fixed bottom-0 inset-x-0 z-30 bg-card border-t border-border lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const active = location.pathname === tab.to;
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 px-3 touch-target transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
