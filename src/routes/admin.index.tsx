import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Wallet, ClipboardCheck, Library, Package, Bell, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Students" value="1,284" icon={Users} tone="default" trend="+34 this term" />
        <StatCard label="Teachers" value="86" icon={GraduationCap} tone="gold" trend="6 new hires" />
        <StatCard label="Attendance" value="94%" icon={ClipboardCheck} tone="success" trend="Above target" />
        <StatCard label="Fees collected" value="78%" icon={Wallet} tone="warning" trend="Term 1" />
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div><div className="font-display font-bold text-lg">Enrollment trend</div><div className="text-xs text-muted-foreground">Last 6 terms</div></div>
            <TrendingUp className="h-5 w-5 text-[var(--gold)]" />
          </div>
          <div className="flex items-end gap-3 h-48">
            {[60, 72, 78, 84, 92, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-gradient-to-t from-primary to-[var(--gold)]" style={{ height: `${h}%` }} />
                <div className="text-[10px] text-muted-foreground">T{i + 1}</div>
              </div>
            ))}
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <div className="font-display font-bold text-lg mb-4">Quick stats</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><div className="h-8 w-8 rounded-md bg-primary/10 text-primary grid place-items-center"><Library className="h-4 w-4" /></div> Library books <span className="ml-auto font-semibold">4,213</span></li>
            <li className="flex items-center gap-3"><div className="h-8 w-8 rounded-md bg-[var(--gold)]/15 text-[var(--gold)] grid place-items-center"><Package className="h-4 w-4" /></div> Low stock items <span className="ml-auto font-semibold">12</span></li>
            <li className="flex items-center gap-3"><div className="h-8 w-8 rounded-md bg-[var(--success)]/15 text-[var(--success)] grid place-items-center"><Wallet className="h-4 w-4" /></div> Payroll due <span className="ml-auto font-semibold">May 30</span></li>
            <li className="flex items-center gap-3"><div className="h-8 w-8 rounded-md bg-[var(--warning)]/15 text-[var(--warning)] grid place-items-center"><Bell className="h-4 w-4" /></div> Pending notices <span className="ml-auto font-semibold">5</span></li>
          </ul>
        </CardContent></Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <Card><CardContent className="p-6">
          <div className="font-display font-bold text-lg mb-3">Recent activity</div>
          <ul className="space-y-3 text-sm">
            {[
              { t: "Mr. Habimana added marks for S3 Mathematics", w: "2 min ago" },
              { t: "12 students newly enrolled in P3", w: "1 hour ago" },
              { t: "Library issued 8 books to S4 students", w: "3 hours ago" },
              { t: "Stock receipt: 200 reams of paper", w: "Yesterday" },
              { t: "Finance posted school fees for Term 2", w: "Yesterday" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="h-2 w-2 mt-2 rounded-full bg-[var(--gold)]" />
                <div className="flex-1">{a.t}</div>
                <div className="text-xs text-muted-foreground">{a.w}</div>
              </li>
            ))}
          </ul>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <div className="font-display font-bold text-lg mb-3">Upcoming events</div>
          <ul className="space-y-3 text-sm">
            {[
              { d: "May 24", t: "Sports Day — all classes" },
              { d: "May 28", t: "Staff meeting (4:00 PM)" },
              { d: "Jun 02", t: "Term 1 closing ceremony" },
              { d: "Jun 12", t: "Term 2 begins" },
              { d: "Jun 22", t: "Science Fair (open to families)" },
            ].map((e, i) => (
              <li key={i} className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold">{e.d}</div>
                <div>{e.t}</div>
              </li>
            ))}
          </ul>
        </CardContent></Card>
      </div>
    </AdminLayout>
  );
}