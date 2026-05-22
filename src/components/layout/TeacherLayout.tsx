import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  FileText,
  Calendar,
  LogOut,
  Menu,
  X,
  Bell,
  GraduationCap,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { AcademicSessionProvider } from "@/lib/academic-session";
import { AcademicSessionPanel } from "@/components/admin/AdminWidgets";

const NAV = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/teacher/courses", label: "My Courses", icon: BookOpen },
  { to: "/teacher/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/teacher/marks", label: "Marks", icon: FileText },
  { to: "/teacher/assignments", label: "Assignments", icon: FileText },
  { to: "/teacher/reports", label: "Reports", icon: FileText },
  { to: "/teacher/timetable", label: "Timetable", icon: Clock },
];

export function TeacherLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return (
      <AcademicSessionProvider>
        <div className="min-h-screen grid place-items-center text-muted-foreground">
          Loading...
        </div>
      </AcademicSessionProvider>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") navigate({ to: "/auth/login" });
    return (
      <AcademicSessionProvider>
        {null}
      </AcademicSessionProvider>
    );
  }

  return (
    <AcademicSessionProvider>
      <div className="min-h-screen flex bg-background text-foreground font-sans">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:static lg:inset-auto lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--gold)] text-[var(--gold-foreground)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-bold">
                Blessing School
              </div>
              <div className="text-[10px] uppercase tracking-widest opacity-70">
                Teacher
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-sidebar-foreground lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="h-[calc(100vh-4rem)] space-y-1 overflow-y-auto p-3">
            {NAV.map((item) => {
              const active = item.exact
                ? path === item.to
                : path.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/85 hover:bg-sidebar-accent",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center gap-3 border-b border-border bg-card px-4 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <div className="mr-2 hidden flex-col items-end leading-tight sm:flex">
                <div className="text-sm font-medium">{user.email}</div>
                <div className="text-xs text-muted-foreground">Teacher</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await signOut();
                  navigate({ to: "/auth/login" });
                }}
              >
                <LogOut className="mr-1 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </header>

          <main className="space-y-6 p-4 sm:p-6 lg:p-8">
            <AcademicSessionPanel />
            {title && (
              <h1 className="font-display text-2xl font-bold">{title}</h1>
            )}
            {children}
          </main>
        </div>
      </div>
    </AcademicSessionProvider>
  );
}
