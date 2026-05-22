import { createFileRoute } from "@tanstack/react-router";
import { FinanceLayout } from "@/components/layout/FinanceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAcademicSession } from "@/lib/academic-session";
import { Plus, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/finance/expenses")({ component: FinanceExpenses });

function FinanceExpenses() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const expenses = [
    { id: 1, date: "2026-05-10", category: "Salaries", description: "Teacher Salaries - May", amount: 25000, paidBy: "Admin" },
    { id: 2, date: "2026-05-08", category: "Utilities", description: "Electricity Bill", amount: 2500, paidBy: "Finance" },
    { id: 3, date: "2026-05-05", category: "Maintenance", description: "Building Repairs", amount: 5000, paidBy: "Admin" },
    { id: 4, date: "2026-05-03", category: "Supplies", description: "Office Supplies", amount: 1200, paidBy: "Finance" },
    { id: 5, date: "2026-05-01", category: "Transport", description: "Bus Fuel", amount: 3500, paidBy: "Transport" },
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <FinanceLayout title="Expenses">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Expenses - {selectedYear.label} {selectedTerm.name}</CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Total Expenses</span>
              </div>
            </div>
            <Button><Plus className="mr-2 h-4 w-4" />Add Expense</Button>
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
                  <th className="p-3 text-left">Paid By</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b transition hover:bg-muted/50">
                    <td className="p-3">{expense.date}</td>
                    <td className="p-3"><Badge variant="outline">{expense.category}</Badge></td>
                    <td className="p-3">{expense.description}</td>
                    <td className="p-3 text-right font-semibold text-red-600">${expense.amount.toLocaleString()}</td>
                    <td className="p-3">{expense.paidBy}</td>
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
