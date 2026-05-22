import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import {
  EXPENSES,
  FEE_STRUCTURE,
  FINANCE_REPORTS,
  INCOME,
} from "@/lib/admin-data";
import {
  exportRowsToCsv,
  exportRowsToWord,
  printRowsReport,
} from "@/lib/report-export";
import {
  DataTable,
  InlineMetric,
  ModuleCard,
} from "@/components/admin/AdminWidgets";
import { useAcademicSession } from "@/lib/academic-session";

export const Route = createFileRoute("/admin/finance")({
  component: FinancePage,
});

function FinancePage() {
  return (
    <AdminLayout title="Finance">
      <FinanceContent />
    </AdminLayout>
  );
}

function FinanceContent() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const reportTitle = `Student fee report - ${selectedYear.label} ${selectedTerm.name}`;

  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList className="h-auto flex-wrap justify-start">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="fees">Student fees</TabsTrigger>
        <TabsTrigger value="structure">Fees structure</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="report">Report</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InlineMetric
            label="Collected"
            value="$31,100"
            helper={`${selectedTerm.name} collections`}
          />
          <InlineMetric
            label="Outstanding"
            value="$8,740"
            helper="Unpaid and partial balances"
          />
          <InlineMetric
            label="Expenses"
            value="$21,770"
            helper="Posted for this term"
          />
          <InlineMetric
            label="Income lines"
            value="3"
            helper="Fees and extra income sources"
          />
        </div>
      </TabsContent>

      <TabsContent value="fees">
        <ModuleCard
          title="Student fees report"
          description="Paid, unpaid, and partial-paid students for the selected term."
          badge={selectedTerm.name}
        >
          <DataTable
            columns={[
              { key: "student", label: "Student" },
              { key: "class", label: "Class" },
              { key: "status", label: "Status" },
              { key: "paid", label: "Paid" },
              { key: "balance", label: "Balance" },
            ]}
            rows={FINANCE_REPORTS}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="structure">
        <ModuleCard
          title="Fees structure"
          description="Term fee structure by class group."
          badge={selectedYear.label}
        >
          <DataTable
            columns={[
              { key: "class", label: "Class group" },
              { key: "tuition", label: "Tuition" },
              { key: "transport", label: "Transport" },
              { key: "meals", label: "Meals" },
              { key: "boarding", label: "Boarding" },
            ]}
            rows={FEE_STRUCTURE}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="expenses">
        <ModuleCard
          title="Expenses"
          description="Operational expense list for finance."
          badge="Expense log"
        >
          <DataTable
            columns={[
              { key: "category", label: "Category" },
              { key: "amount", label: "Amount" },
              { key: "posted", label: "Posted" },
              { key: "status", label: "Status" },
            ]}
            rows={EXPENSES}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="income">
        <ModuleCard
          title="Income"
          description="All income lines posted within the term."
          badge="Income log"
        >
          <DataTable
            columns={[
              { key: "source", label: "Source" },
              { key: "amount", label: "Amount" },
              { key: "posted", label: "Posted" },
              { key: "status", label: "Status" },
            ]}
            rows={INCOME}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="report">
        <ModuleCard
          title="Exportable fee reports"
          description="Download the finance report as a clean table for Excel, Word, or PDF/print."
          badge="Good table design"
        >
          <div className="mb-4 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToCsv(`${reportTitle}.csv`, FINANCE_REPORTS)
              }
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel / CSV
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToWord(
                  reportTitle,
                  `${reportTitle}.doc`,
                  FINANCE_REPORTS,
                )
              }
            >
              <Download className="h-4 w-4" />
              Word
            </Button>
            <Button
              variant="outline"
              onClick={() => printRowsReport(reportTitle, FINANCE_REPORTS)}
            >
              <Printer className="h-4 w-4" />
              PDF / Print
            </Button>
          </div>
          <DataTable
            columns={[
              { key: "student", label: "Student" },
              { key: "class", label: "Class" },
              { key: "status", label: "Payment status" },
              { key: "paid", label: "Paid amount" },
              { key: "balance", label: "Balance" },
            ]}
            rows={FINANCE_REPORTS}
          />
        </ModuleCard>
      </TabsContent>
    </Tabs>
  );
}
