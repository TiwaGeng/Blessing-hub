import { createFileRoute } from "@tanstack/react-router";
import { FinanceLayout } from "@/components/layout/FinanceLayout";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { useAcademicSession } from "@/lib/academic-session";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/finance/")({ component: FinanceDashboard });

function FinanceDashboard() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const recentTransactions = [
    { id: 1, type: "income", description: "Student Fees - Grade 10A", amount: 15000, date: "Today, 10:30 AM" },
    { id: 2, type: "expense", description: "Teacher Salaries", amount: 25000, date: "Today, 09:00 AM" },
    { id: 3, type: "income", description: "Student Fees - Grade 11B", amount: 12000, date: "Yesterday, 14:20 PM" },
    { id: 4, type: "expense", description: "Utility Bills", amount: 3500, date: "Yesterday, 11:00 AM" },
  ];

  const feeCollection = {
    total: 450000,
    collected: 385000,
    pending: 65000,
    percentage: 85.6
  };

  return (
    <FinanceLayout title="Finance Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Income" value="$385,000" icon={TrendingUp} tone="success" trend={`${selectedTerm.name}`} />
        <StatCard label="Total Expenses" value="$142,500" icon={TrendingDown} tone="warning" trend="This term" />
        <StatCard label="Net Balance" value="$242,500" icon={Wallet} tone="default" trend="Profit" />
        <StatCard label="Pending Fees" value="$65,000" icon={DollarSign} tone="gold" trend="To collect" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions - {selectedTerm.name}</CardTitle>
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-start justify-between rounded-lg border p-4 transition hover:bg-muted/50">
                  <div className="flex gap-3 flex-1">
                    <div className={`mt-1 h-2 w-2 rounded-full ${transaction.type === "income" ? "bg-green-500" : "bg-red-500"}`} />
                    <div className="flex-1">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild className="flex-1">
                <Link to="/finance/income">View Income</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/finance/expenses">View Expenses</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Collection Progress</span>
                  <span className="font-semibold">{feeCollection.percentage}%</span>
                </div>
                <Progress value={feeCollection.percentage} className="h-3" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Expected</span>
                  <span className="font-semibold">${feeCollection.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collected</span>
                  <span className="font-semibold text-green-600">${feeCollection.collected.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-semibold text-orange-600">${feeCollection.pending.toLocaleString()}</span>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full" size="sm">
                <Link to="/finance/fees">Manage Fees</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Paid Students
              </div>
              <div className="mt-1 text-2xl font-bold text-green-600">342</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Partial Paid
              </div>
              <div className="mt-1 text-2xl font-bold text-orange-600">58</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Unpaid Students
              </div>
              <div className="mt-1 text-2xl font-bold text-red-600">25</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Total Students
              </div>
              <div className="mt-1 text-2xl font-bold">425</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FinanceLayout>
  );
}
