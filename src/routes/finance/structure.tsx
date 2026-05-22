import { createFileRoute } from "@tanstack/react-router";
import { FinanceLayout } from "@/components/layout/FinanceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAcademicSession } from "@/lib/academic-session";
import { Plus, Edit, Trash2 } from "lucide-react";

export const Route = createFileRoute("/finance/structure")({ component: FeeStructure });

function FeeStructure() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const feeStructure = [
    { id: 1, grade: "Grade 10", tuition: 3500, library: 200, lab: 300, sports: 150, transport: 500, total: 4650 },
    { id: 2, grade: "Grade 11", tuition: 4000, library: 200, lab: 350, sports: 150, transport: 500, total: 5200 },
    { id: 3, grade: "Grade 12", tuition: 4500, library: 250, lab: 400, sports: 150, transport: 500, total: 5800 },
  ];

  return (
    <FinanceLayout title="Fee Structure">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fee Structure - {selectedYear.label} {selectedTerm.name}</CardTitle>
            <Button><Plus className="mr-2 h-4 w-4" />Add New</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="p-3 text-left font-semibold">Grade</th>
                  <th className="p-3 text-right font-semibold">Tuition</th>
                  <th className="p-3 text-right font-semibold">Library</th>
                  <th className="p-3 text-right font-semibold">Lab</th>
                  <th className="p-3 text-right font-semibold">Sports</th>
                  <th className="p-3 text-right font-semibold">Transport</th>
                  <th className="p-3 text-right font-semibold">Total</th>
                  <th className="p-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.map((fee) => (
                  <tr key={fee.id} className="border-b transition hover:bg-muted/50">
                    <td className="p-3 font-medium">{fee.grade}</td>
                    <td className="p-3 text-right">${fee.tuition}</td>
                    <td className="p-3 text-right">${fee.library}</td>
                    <td className="p-3 text-right">${fee.lab}</td>
                    <td className="p-3 text-right">${fee.sports}</td>
                    <td className="p-3 text-right">${fee.transport}</td>
                    <td className="p-3 text-right font-bold">${fee.total}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </FinanceLayout>
  );
}
