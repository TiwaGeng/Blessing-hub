import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardCheck,
  Wallet, Package, Library, Megaphone, FileText, UserCog, CalendarDays,
  ShieldCheck, Settings, LogOut, Menu, X, Bell, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/teachers", label: "Teachers", icon: GraduationCap },
  { to: "/admin/academics", label: "Academics", icon: BookOpen },
  { to: "/admin/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/admin/marks", label: "Marks & Reports", icon: FileText },
  { to: "/admin/finance", label: "Finance", icon: Wallet },
  { to: "/admin/stock", label: "Stock", icon: Package },
  { to: "/admin/library", label: "Library", icon: Library },
  { to: "/admin/hr", label: "HR & Payroll", icon: UserCog },
  { to: "/admin/communication", label: "Communication", icon: Megaphone },
  { to: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/admin/users", label: "Users & Roles", icon: ShieldCheck },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const [open, setOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }
  if (!user) {
    if (typeof window !== "undefined") navigate({ to: "/auth/login" });
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans">
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform lg:translate-x-0 lg:static lg:inset-auto",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border">
          <div className="h-9 w-9 rounded-lg bg-[var(--gold)] text-[var(--gold-foreground)] grid place-items-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm">Blessing School</div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">Admin</div>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden text-sidebar-foreground" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition",
                  active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground/85"
                )}>
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center gap-3 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students, teachers, books…" className="pl-9" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <ThemeToggle />
            <div className="hidden sm:flex flex-col items-end mr-2 leading-tight">
              <div className="text-sm font-medium">{user.email}</div>
              <div className="text-xs text-muted-foreground">Signed in</div>
            </div>
            <Button variant="outline" size="sm" onClick={async () => { await signOut(); navigate({ to: "/auth/login" }); }}>
              <LogOut className="h-4 w-4 mr-1" /> Sign out
            </Button>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          {title && <h1 className="font-display text-2xl font-bold mb-6">{title}</h1>}
          {children}
        </main>
      </div>
    </div>
  );
}