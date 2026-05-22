import { createFileRoute } from "@tanstack/react-router";
import { FinanceLayout } from "@/components/layout/FinanceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAcademicSession } from "@/lib/academic-session";
import { Plus, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/finance/income")({ component: FinanceIncome });

function FinanceIncome() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const income = [
    { id: 1, date: "2026-05-10", category: "Student Fees", description: "Grade 10A - Term Fees", amount: 15000, receivedBy: "Finance" },
    { id: 2, date: "2026-05-09", category: "Student Fees", description: "Grade 11B - Term Fees", amount: 12000, receivedBy: "Finance" },
    { id: 3, date: "2026-05-08", category: "Donations", description: "Alumni Donation", amount: 5000, receivedBy: "Admin" },
    { id: 4, date: "2026-05-05", category: "Student Fees", description: "Grade 12A - Term Fees", amount: 18000, receivedBy: "Finance" },
    { id: 5, date: "2026-05-03", category: "Other", description: "Library Fines", amount: 250, receivedBy: "Library" },
  ];

  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);

  return (
    <FinanceLayout title="Income">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Income - {selectedYear.label} {selectedTerm.name}</CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Total Income</span>
              </div>
            </div>
            <Button><Plus className="mr-2 h-4 w-4" />Add Income</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-left">Received By</th>
                </tr>
              </thead>
              <tbody>
                {income.map((item) => (
                  <tr key={item.id} className="border-b transition hover:bg-muted/50">
                    <td className="p-3">{item.date}</td>
                    <td className="p-3"><Badge variant="outline">{item.category}</Badge></td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3 text-right font-semibold text-green-600">${item.amount.toLocaleString()}</td>
                    <td className="p-3">{item.receivedBy}</td>
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
