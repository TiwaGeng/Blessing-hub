import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { Wallet, ClipboardCheck, FileText, Bell, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/portal/parent")({ component: ParentPortal });

function ParentPortal() {
  const [shown, setShown] = useState(false);
  const [form, setForm] = useState({ name: "", id: "", cls: "" });

  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Parent Portal</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Stay connected with your child's journey</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">Enter your child's details to view results, attendance, fees and announcements.</p>

        {!shown ? (
          <Card className="mt-10 max-w-xl">
            <CardContent className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); setShown(true); }} className="space-y-4">
                <div><Label>Student name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Mary Uwase" /></div>
                <div><Label>Student ID</Label><Input required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="e.g. BS-2024-0345" /></div>
                <div><Label>Class</Label><Input required value={form.cls} onChange={(e) => setForm({ ...form, cls: e.target.value })} placeholder="e.g. S3 A" /></div>
                <Button type="submit" className="w-full bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">View child information</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-10 space-y-6">
            <Card><CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center"><GraduationCap className="h-7 w-7" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Student</div>
                <div className="font-display font-bold text-xl">{form.name || "Mary Uwase"}</div>
                <div className="text-sm text-muted-foreground">ID {form.id} • Class {form.cls}</div>
              </div>
              <Button variant="outline" className="ml-auto" onClick={() => setShown(false)}>Switch student</Button>
            </CardContent></Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Average" value="78%" icon={FileText} tone="gold" />
              <StatCard label="Attendance" value="96%" icon={ClipboardCheck} tone="success" />
              <StatCard label="Outstanding" value="0 RWF" icon={Wallet} tone="default" />
              <StatCard label="Notices" value="3" icon={Bell} tone="warning" />
            </div>

            <Card><CardContent className="p-6">
              <div className="font-display font-bold text-lg mb-3">Latest results (Term 1)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted"><tr><th className="text-left p-2">Subject</th><th className="text-left p-2">Marks</th><th className="text-left p-2">Grade</th><th className="text-left p-2">Comment</th></tr></thead>
                  <tbody>
                    {[["Mathematics","82","A","Excellent reasoning"],["English","76","B","Strong writing"],["Biology","85","A","Outstanding lab work"],["Physics","71","B","Good progress"],["Kinyarwanda","80","A","Very expressive"]].map((r)=>(
                      <tr key={r[0]} className="border-t border-border"><td className="p-2 font-medium">{r[0]}</td><td className="p-2">{r[1]}</td><td className="p-2">{r[2]}</td><td className="p-2 text-muted-foreground">{r[3]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <div className="font-display font-bold text-lg mb-3">School announcements</div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><Bell className="h-4 w-4 text-[var(--gold)] mt-0.5" /> Parent-Teacher meeting on June 7th at 9:00 AM.</li>
                <li className="flex gap-3"><Bell className="h-4 w-4 text-[var(--gold)] mt-0.5" /> Term 2 starts on June 12th. Boarders report on June 11th.</li>
                <li className="flex gap-3"><Bell className="h-4 w-4 text-[var(--gold)] mt-0.5" /> Science Fair exhibition open to families on June 22nd.</li>
              </ul>
            </CardContent></Card>
          </div>
        )}
      </Section>
    </PublicLayout>
  );
}