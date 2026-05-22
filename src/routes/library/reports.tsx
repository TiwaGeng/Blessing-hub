import { createFileRoute } from "@tanstack/react-router";
import { LibraryLayout } from "@/components/layout/LibraryLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAcademicSession } from "@/lib/academic-session";
import { Download, FileText, Printer } from "lucide-react";
import { exportRowsToCsv, exportRowsToWord, printRowsReport } from "@/lib/report-export";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/library/reports")({ component: LibraryReports });

function LibraryReports() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const stockData = [
    { "Book Title": "Advanced Mathematics", "Author": "John Smith", "Category": "Mathematics", "Total": 25, "Available": 18, "Borrowed": 7 },
    { "Book Title": "Physics Fundamentals", "Author": "Jane Doe", "Category": "Science", "Total": 20, "Available": 12, "Borrowed": 8 },
    { "Book Title": "Chemistry Lab Manual", "Author": "Mike Johnson", "Category": "Science", "Total": 15, "Available": 8, "Borrowed": 7 },
    { "Book Title": "World History", "Author": "Sarah Williams", "Category": "History", "Total": 30, "Available": 22, "Borrowed": 8 },
    { "Book Title": "Biology Textbook", "Author": "David Brown", "Category": "Science", "Total": 18, "Available": 0, "Borrowed": 18 },
  ];

  const borrowData = [
    { "Student": "John Doe", "Roll No": "10A-001", "Book": "Advanced Mathematics", "Borrow Date": "2026-05-10", "Due Date": "2026-05-24", "Status": "Active" },
    { "Student": "Jane Smith", "Roll No": "10A-002", "Book": "Physics Fundamentals", "Borrow Date": "2026-05-10", "Due Date": "2026-05-24", "Status": "Active" },
    { "Student": "Mike Johnson", "Roll No": "10A-003", "Book": "Chemistry Lab Manual", "Borrow Date": "2026-04-20", "Due Date": "2026-05-04", "Status": "Overdue" },
  ];

  const handleExport = (data: any[], title: string, format: "csv" | "word" | "print") => {
    const fullTitle = `${title} - ${selectedYear.label} ${selectedTerm.name}`;
    if (format === "csv") exportRowsToCsv(`${fullTitle}.csv`, data);
    else if (format === "word") exportRowsToWord(fullTitle, `${fullTitle}.doc`, data);
    else printRowsReport(fullTitle, data);
  };

  return (
    <LibraryLayout title="Library Reports">
      <Card>
        <CardHeader>
          <CardTitle>Library Reports - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stock">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stock">Stock Report</TabsTrigger>
              <TabsTrigger value="borrow">Borrow Report</TabsTrigger>
            </TabsList>

            <TabsContent value="stock" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(stockData, "Library Stock Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(stockData, "Library Stock Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(stockData, "Library Stock Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Book Title</th>
                      <th className="p-3 text-left font-semibold">Author</th>
                      <th className="p-3 text-left font-semibold">Category</th>
                      <th className="p-3 text-center font-semibold">Total</th>
                      <th className="p-3 text-center font-semibold">Available</th>
                      <th className="p-3 text-center font-semibold">Borrowed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockData.map((row, i) => (
                      <tr key={i} className="border-b transition hover:bg-muted/50">
                        <td className="p-3 font-medium">{row["Book Title"]}</td>
                        <td className="p-3">{row["Author"]}</td>
                        <td className="p-3">{row["Category"]}</td>
                        <td className="p-3 text-center font-semibold">{row["Total"]}</td>
                        <td className="p-3 text-center">{row["Available"]}</td>
                        <td className="p-3 text-center">{row["Borrowed"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="borrow" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(borrowData, "Library Borrow Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(borrowData, "Library Borrow Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(borrowData, "Library Borrow Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Student</th>
                      <th className="p-3 text-left font-semibold">Roll No</th>
                      <th className="p-3 text-left font-semibold">Book</th>
                      <th className="p-3 text-left font-semibold">Borrow Date</th>
                      <th className="p-3 text-left font-semibold">Due Date</th>
                      <th className="p-3 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowData.map((row, i) => (
                      <tr key={i} className="border-b transition hover:bg-muted/50">
                        <td className="p-3 font-medium">{row["Student"]}</td>
                        <td className="p-3">{row["Roll No"]}</td>
                        <td className="p-3">{row["Book"]}</td>
                        <td className="p-3">{row["Borrow Date"]}</td>
                        <td className="p-3">{row["Due Date"]}</td>
                        <td className="p-3 text-center">
                          <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                            row["Status"] === "Overdue" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
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
          </Tabs>
        </CardContent>
      </Card>
    </LibraryLayout>
  );
}
