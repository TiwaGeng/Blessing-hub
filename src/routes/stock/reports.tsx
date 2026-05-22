import { createFileRoute } from "@tanstack/react-router";
import { StockLayout } from "@/components/layout/StockLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAcademicSession } from "@/lib/academic-session";
import { Download, FileText, Printer } from "lucide-react";
import { exportRowsToCsv, exportRowsToWord, printRowsReport } from "@/lib/report-export";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/stock/reports")({ component: StockReports });

function StockReports() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const inventoryData = [
    { "Product": "Exercise Books", "Category": "Stationery", "Quantity": 450, "Unit": "pcs", "Price": "$2.50", "Total Value": "$1,125.00", "Status": "In Stock" },
    { "Product": "Pens (Blue)", "Category": "Stationery", "Quantity": 320, "Unit": "pcs", "Price": "$0.50", "Total Value": "$160.00", "Status": "In Stock" },
    { "Product": "Whiteboard Markers", "Category": "Classroom Supplies", "Quantity": 5, "Unit": "pcs", "Price": "$3.00", "Total Value": "$15.00", "Status": "Low Stock" },
    { "Product": "A4 Paper Reams", "Category": "Paper Products", "Quantity": 8, "Unit": "reams", "Price": "$25.00", "Total Value": "$200.00", "Status": "Low Stock" },
    { "Product": "Notebooks", "Category": "Stationery", "Quantity": 280, "Unit": "pcs", "Price": "$4.00", "Total Value": "$1,120.00", "Status": "In Stock" },
  ];

  const movementData = [
    { "Date": "2026-05-10", "Product": "Exercise Books", "Type": "Stock In", "Quantity": 100, "Reference": "ABC Supplies", "By": "Admin" },
    { "Date": "2026-05-10", "Product": "Pens (Blue)", "Type": "Stock Out", "Quantity": 50, "Reference": "Mathematics Dept", "By": "Stock Manager" },
    { "Date": "2026-05-09", "Product": "Notebooks", "Type": "Stock In", "Quantity": 200, "Reference": "XYZ Stationery", "By": "Admin" },
    { "Date": "2026-05-09", "Product": "Markers", "Type": "Stock Out", "Quantity": 30, "Reference": "Science Lab", "By": "Admin" },
  ];

  const handleExport = (data: any[], title: string, format: "csv" | "word" | "print") => {
    const fullTitle = `${title} - ${selectedYear.label} ${selectedTerm.name}`;
    if (format === "csv") exportRowsToCsv(`${fullTitle}.csv`, data);
    else if (format === "word") exportRowsToWord(fullTitle, `${fullTitle}.doc`, data);
    else printRowsReport(fullTitle, data);
  };

  return (
    <StockLayout title="Stock Reports">
      <Card>
        <CardHeader>
          <CardTitle>Stock Reports - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inventory">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
              <TabsTrigger value="movement">Movement Report</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(inventoryData, "Stock Inventory Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(inventoryData, "Stock Inventory Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(inventoryData, "Stock Inventory Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Product</th>
                      <th className="p-3 text-left font-semibold">Category</th>
                      <th className="p-3 text-center font-semibold">Quantity</th>
                      <th className="p-3 text-center font-semibold">Unit</th>
                      <th className="p-3 text-right font-semibold">Price</th>
                      <th className="p-3 text-right font-semibold">Total Value</th>
                      <th className="p-3 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((row, i) => (
                      <tr key={i} className="border-b transition hover:bg-muted/50">
                        <td className="p-3 font-medium">{row["Product"]}</td>
                        <td className="p-3">{row["Category"]}</td>
                        <td className="p-3 text-center font-semibold">{row["Quantity"]}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row["Unit"]}</td>
                        <td className="p-3 text-right">{row["Price"]}</td>
                        <td className="p-3 text-right font-semibold">{row["Total Value"]}</td>
                        <td className="p-3 text-center">
                          <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                            row["Status"] === "Low Stock" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                          }`}>
                            {row["Status"]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="movement" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(movementData, "Stock Movement Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(movementData, "Stock Movement Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(movementData, "Stock Movement Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Date</th>
                      <th className="p-3 text-left font-semibold">Product</th>
                      <th className="p-3 text-center font-semibold">Type</th>
                      <th className="p-3 text-center font-semibold">Quantity</th>
                      <th className="p-3 text-left font-semibold">Reference</th>
                      <th className="p-3 text-left font-semibold">By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movementData.map((row, i) => (
                      <tr key={i} className="border-b transition hover:bg-muted/50">
                        <td className="p-3">{row["Date"]}</td>
                        <td className="p-3 font-medium">{row["Product"]}</td>
                        <td className="p-3 text-center">
                          <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                            row["Type"] === "Stock In" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {row["Type"]}
                          </span>
                        </td>
                        <td className="p-3 text-center font-semibold">{row["Quantity"]}</td>
                        <td className="p-3">{row["Reference"]}</td>
                        <td className="p-3">{row["By"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </StockLayout>
  );
}
