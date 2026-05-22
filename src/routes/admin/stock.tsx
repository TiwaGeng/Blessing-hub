import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import {
  STOCK_IN,
  STOCK_NOTIFICATIONS,
  STOCK_OUT,
  STOCK_PRODUCTS,
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
  StatusList,
} from "@/components/admin/AdminWidgets";
import { useAcademicSession } from "@/lib/academic-session";

export const Route = createFileRoute("/admin/stock")({ component: StockPage });

function StockPage() {
  return (
    <AdminLayout title="Stock">
      <StockContent />
    </AdminLayout>
  );
}

function StockContent() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const reportTitle = `Stock report - ${selectedYear.label} ${selectedTerm.name}`;

  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList className="h-auto flex-wrap justify-start">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="products">Product</TabsTrigger>
        <TabsTrigger value="stock-in">Stock in</TabsTrigger>
        <TabsTrigger value="stock-out">Stock out</TabsTrigger>
        <TabsTrigger value="report">Report</TabsTrigger>
        <TabsTrigger value="notifications">Notification</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InlineMetric
            label="Products tracked"
            value="148"
            helper="Campus inventory list"
          />
          <InlineMetric
            label="Stock in"
            value="130 units"
            helper={`${selectedTerm.name} receipts`}
          />
          <InlineMetric
            label="Stock out"
            value="24 units"
            helper="Issued to departments"
          />
          <InlineMetric
            label="Alerts"
            value="2 critical"
            helper="Low stock attention"
          />
        </div>
      </TabsContent>

      <TabsContent value="products">
        <ModuleCard
          title="Products"
          description="Current stock balances and reorder levels."
          badge="Inventory"
        >
          <DataTable
            columns={[
              { key: "product", label: "Product" },
              { key: "category", label: "Category" },
              { key: "balance", label: "Balance" },
              { key: "reorderLevel", label: "Reorder level" },
              { key: "status", label: "Status" },
            ]}
            rows={STOCK_PRODUCTS}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="stock-in">
        <ModuleCard
          title="Stock in"
          description="Incoming stock receipts."
          badge={selectedTerm.name}
        >
          <DataTable
            columns={[
              { key: "date", label: "Date" },
              { key: "product", label: "Product" },
              { key: "quantity", label: "Quantity" },
              { key: "supplier", label: "Supplier" },
              { key: "receivedBy", label: "Received by" },
            ]}
            rows={STOCK_IN}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="stock-out">
        <ModuleCard
          title="Stock out"
          description="Issued stock by department."
          badge="Distribution"
        >
          <DataTable
            columns={[
              { key: "date", label: "Date" },
              { key: "product", label: "Product" },
              { key: "quantity", label: "Quantity" },
              { key: "department", label: "Department" },
              { key: "issuedBy", label: "Issued by" },
            ]}
            rows={STOCK_OUT}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="report">
        <ModuleCard
          title="Stock report"
          description="Clean report output for stock balances and export."
          badge={selectedYear.label}
        >
          <div className="mb-4 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToCsv(`${reportTitle}.csv`, STOCK_PRODUCTS)
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
                  STOCK_PRODUCTS,
                )
              }
            >
              <Download className="h-4 w-4" />
              Word
            </Button>
            <Button
              variant="outline"
              onClick={() => printRowsReport(reportTitle, STOCK_PRODUCTS)}
            >
              <Printer className="h-4 w-4" />
              PDF / Print
            </Button>
          </div>
          <DataTable
            columns={[
              { key: "product", label: "Product" },
              { key: "category", label: "Category" },
              { key: "balance", label: "Balance" },
              { key: "reorderLevel", label: "Reorder level" },
              { key: "status", label: "Status" },
            ]}
            rows={STOCK_PRODUCTS}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="notifications">
        <ModuleCard
          title="Stock notifications"
          description="Important inventory alerts for store and admin users."
          badge="Alerts"
        >
          <StatusList items={STOCK_NOTIFICATIONS} />
        </ModuleCard>
      </TabsContent>
    </Tabs>
  );
}
