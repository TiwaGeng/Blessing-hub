import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, FileText, Calendar, Wallet } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/website/admissions")({ component: Admissions });

function Admissions() {
  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Admissions 2026</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Join the Blessing family</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Applications are now open for all classes. Follow the simple steps below to apply.</p>

        <div className="grid md:grid-cols-4 gap-5 mt-10">
          {[
            { i: FileText, t: "1. Submit form", d: "Complete the online application below." },
            { i: Calendar, t: "2. Entry assessment", d: "Schedule a placement assessment." },
            { i: CheckCircle2, t: "3. Receive offer", d: "Successful candidates receive a letter." },
            { i: Wallet, t: "4. Pay fees", d: "Confirm enrollment by paying first-term fees." },
          ].map((s) => (
            <Card key={s.t}><CardContent className="p-5">
              <s.i className="h-7 w-7 text-[var(--gold)] mb-3" />
              <div className="font-semibold">{s.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
            </CardContent></Card>
          ))}
        </div>

        <Card className="mt-12 max-w-3xl">
          <CardContent className="p-6">
            <div className="font-display text-xl font-bold mb-4">Online application</div>
            <form
              onSubmit={(e) => { e.preventDefault(); toast.success("Application submitted! We will contact you within 3 working days."); (e.target as HTMLFormElement).reset(); }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <div><Label>Student full name</Label><Input required /></div>
              <div><Label>Date of birth</Label><Input type="date" required /></div>
              <div><Label>Applying for class</Label><Input placeholder="e.g. S2 or P5" required /></div>
              <div><Label>Parent / Guardian name</Label><Input required /></div>
              <div><Label>Phone</Label><Input type="tel" required /></div>
              <div><Label>Email</Label><Input type="email" required /></div>
              <div className="sm:col-span-2"><Label>Notes</Label><Textarea rows={3} /></div>
              <div className="sm:col-span-2 flex justify-end">
                <Button type="submit" className="bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">Submit application</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-4">Tuition (per semester)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="text-left p-3">Level</th><th className="text-left p-3">Day</th><th className="text-left p-3">Boarding</th></tr>
              </thead>
              <tbody>
                {[
                  ["Pre-Primary", "35,000 RWF", "—"],
                  ["Primary", "56,000 RWF", "120,000 RWF"],
                  ["Ordinary Level", "78,000 RWF", "180,000 RWF"],
                  ["Advanced Level", "98,000 RWF", "220,000 RWF"],
                ].map((r) => (<tr key={r[0]} className="border-t border-border"><td className="p-3 font-medium">{r[0]}</td><td className="p-3">{r[1]}</td><td className="p-3">{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </PublicLayout>
  );
}