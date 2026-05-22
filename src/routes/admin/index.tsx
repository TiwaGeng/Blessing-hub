import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  Wallet,
  ClipboardCheck,
  Library,
  Package,
  Bell,
  TrendingUp,
} from "lucide-react";
import { useAcademicSession, AcademicSessionProvider } from "@/lib/academic-session";
import { getAdminSnapshot, getTermActivity } from "@/lib/admin-data";
import { InlineMetric, ModuleCard } from "@/components/admin/AdminWidgets";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  return (
    <AcademicSessionProvider>
      <AdminDashboard />
    </AcademicSessionProvider>
  );
}

function AdminDashboard() {
  const { selectedTerm, selectedYear } = useAcademicSession();
  const snapshot = getAdminSnapshot(selectedYear.id, selectedTerm.id);
  const activity = getTermActivity(selectedYear.id, selectedTerm.id);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Students"
          value={snapshot.students}
          icon={Users}
          tone="default"
          trend={`${selectedTerm.name} total`}
        />
        <StatCard
          label="Teachers"
          value={snapshot.teachers}
          icon={GraduationCap}
          tone="gold"
          trend="Synced to current selection"
        />
        <StatCard
          label="Attendance"
          value={snapshot.attendance}
          icon={ClipboardCheck}
          tone="success"
          trend="Across the selected term"
        />
        <StatCard
          label="Fees collected"
          value={snapshot.feesCollected}
          icon={Wallet}
          tone="warning"
          trend={`${selectedYear.label} ${selectedTerm.name}`}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-display text-lg font-bold">
                  Institution pulse
                </div>
                <div className="text-xs text-muted-foreground">
                  Live summary for {selectedYear.label} {selectedTerm.name}
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-[var(--gold)]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <InlineMetric
                label="Payroll due"
                value={snapshot.payrollDue}
                helper="HR and finance can review the same term view."
              />
              <InlineMetric
                label="Pending notices"
                value={snapshot.pendingNotices}
                helper="Communication stays filtered to the selected term."
              />
              <InlineMetric
                label="Archive access"
                value="Enabled"
                helper="You can move back to previous terms and export again."
              />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {selectedYear.terms.map((term) => (
                <div
                  key={term.id}
                  className="rounded-xl border border-border p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium">{term.name}</div>
                    <Badge variant="outline" className="capitalize">
                      {term.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {term.start} - {term.end}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="font-display text-lg font-bold">Quick stats</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                  <Library className="h-4 w-4" />
                </div>
                Library items
                <span className="ml-auto font-semibold">4,213</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-[var(--gold)]/15 text-[var(--gold)]">
                  <Package className="h-4 w-4" />
                </div>
                Low stock items
                <span className="ml-auto font-semibold">12</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-[var(--success)]/15 text-[var(--success)]">
                  <Wallet className="h-4 w-4" />
                </div>
                Payroll due
                <span className="ml-auto font-semibold">
                  {snapshot.payrollDue}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-[var(--warning)]/15 text-[var(--warning)]">
                  <Bell className="h-4 w-4" />
                </div>
                Pending notices
                <span className="ml-auto font-semibold">
                  {snapshot.pendingNotices}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ModuleCard
          title="Recent activity"
          description="The activity feed follows the academic term selected above."
          badge={`${selectedTerm.name} feed`}
        >
          <ul className="space-y-3 text-sm">
            {activity.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-[var(--gold)]" />
                <div className="flex-1">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.when}</div>
              </li>
            ))}
          </ul>
        </ModuleCard>

        <ModuleCard
          title="Cross-module sync"
          description="What changes when you switch year or term."
          badge="Shared context"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <div className="font-medium">Teacher pages</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Assigned courses, marks, reports, timetable, and class documents
                follow the same term.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="font-medium">Finance and admin</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Fees, income, expenses, and unpaid or partial-paid student lists
                refresh with the selected session.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="font-medium">Library and stock</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Borrowing, returns, stock movement, and reports remain available
                for both current and previous terms.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="font-medium">End-of-term review</div>
              <p className="mt-2 text-sm text-muted-foreground">
                After closing reports, the admin can shift forward or backward
                to review and export the same documents again.
              </p>
            </div>
          </div>
        </ModuleCard>
      </div>
    </AdminLayout>
  );
}
