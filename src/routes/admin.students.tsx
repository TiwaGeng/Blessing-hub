import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download } from "lucide-react";

export const Route = createFileRoute("/admin/students")({ component: Students });

const STUDENTS = [
  { id: "BS-2024-0345", name: "Mary Uwase", cls: "S3 A", parent: "J. Uwase", status: "Active" },
  { id: "BS-2024-0291", name: "Eric Habimana", cls: "S2 B", parent: "P. Habimana", status: "Active" },
  { id: "BS-2023-0178", name: "Aline Mukamana", cls: "S5 MCB", parent: "C. Mukamana", status: "Active" },
  { id: "BS-2024-0402", name: "Jean-Paul Niyonsenga", cls: "P5", parent: "T. Niyonsenga", status: "Active" },
  { id: "BS-2022-0089", name: "Grace Ishimwe", cls: "S6 PCM", parent: "D. Ishimwe", status: "Graduating" },
  { id: "BS-2024-0451", name: "Kevin Tuyishime", cls: "P3", parent: "M. Tuyishime", status: "Active" },
  { id: "BS-2024-0376", name: "Sarah Ingabire", cls: "S1 A", parent: "B. Ingabire", status: "Active" },
];

function Students() {
  return (
    <AdminLayout title="Students">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by name or ID…" className="pl-9" /></div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
        <Button className="bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90"><Plus className="h-4 w-4 mr-2" />Add student</Button>
      </div>
      <Card><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">Student ID</th><th className="p-3">Name</th><th className="p-3">Class</th><th className="p-3">Parent</th><th className="p-3">Status</th></tr></thead>
          <tbody>
            {STUDENTS.map((s) => (
              <tr key={s.id} className="border-t border-border hover:bg-muted/40">
                <td className="p-3 font-mono text-xs">{s.id}</td>
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3">{s.cls}</td>
                <td className="p-3 text-muted-foreground">{s.parent}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.status === "Active" ? "bg-[var(--success)]/15 text-[var(--success)]" : "bg-[var(--gold)]/15 text-[var(--gold)]"}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </AdminLayout>
  );
}