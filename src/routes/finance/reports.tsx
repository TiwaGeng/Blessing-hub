import { createFileRoute } from "@tanstack/react-router";
import { FinanceLayout } from "@/components/layout/FinanceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAcademicSession } from "@/lib/academic-session";
import { Download, FileText, Printer } from "lucide-react";
import { exportRowsToCsv, exportRowsToWord, printRowsReport } from "@/lib/report-export";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/finance/reports")({ component: FinanceReports });

function FinanceReports() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const paidStudents = [
    { "Roll No": "10A-001", "Student Name": "John Doe", "Grade": "10A", "Total Fee": "$5,000", "Paid": "$5,000", "Balance": "$0", "Status": "Paid" },
    { "Roll No": "10A-004", "Student Name": "Sarah Williams", "Grade": "10A", "Total Fee": "$5,000", "Paid": "$5,000", "Balance": "$0", "Status": "Paid" },
    { "Roll No": "11A-002", "Student Name": "Emily Davis", "Grade": "11A", "Total Fee": "$5,500", "Paid": "$5,500", "Balance": "$0", "Status": "Paid" },
  ];

  const partialPaidStudents = [
    { "Roll No": "10A-002", "Student Name": "Jane Smith", "Grade": "10A", "Total Fee": "$5,000", "Paid": "$3,000", "Balance": "$2,000", "Status": "Partial" },
    { "Roll No": "11B-001", "Student Name": "David Brown", "Grade": "11B", "Total Fee": "$5,500", "Paid": "$2,500", "Balance": "$3,000", "Status": "Partial" },
    { "Roll No": "12A-003", "Student Name": "Lisa Anderson", "Grade": "12A", "Total Fee": "$6,000", "Paid": "$4,000", "Balance": "$2,000", "Status": "Partial" },
  ];

  const unpaidStudents = [
    { "Roll No": "10A-003", "Student Name": "Mike Johnson", "Grade": "10A", "Total Fee": "$5,000", "Paid": "$0", "Balance": "$5,000", "Status": "Unpaid" },
    { "Roll No": "11A-005", "Student Name": "James Wilson", "Grade": "11A", "Total Fee": "$5,500", "Paid": "$0", "Balance": "$5,500", "Status": "Unpaid" },
  ];

  const allStudents = [...paidStudents, ...partialPaidStudents, ...unpaidStudents];

  const handleExport = (data: any[], title: string, format: "csv" | "word" | "print") => {
    const fullTitle = `${title} - ${selectedYear.label} ${selectedTerm.name}`;
    if (format === "csv") exportRowsToCsv(`${fullTitle}.csv`, data);
    else if (format === "word") exportRowsToWord(fullTitle, `${fullTitle}.doc`, data);
    else printRowsReport(fullTitle, data);
  };

  return (
    <FinanceLayout title="Finance Reports">
      <Card>
        <CardHeader>
          <CardTitle>Student Fee Reports - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="partial">Partial Paid</TabsTrigger>
              <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(allStudents, "All Students Fee Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(allStudents, "All Students Fee Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(allStudents, "All Students Fee Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Roll No</th>
                      <th className="p-3 text-left font-semibold">Student Name</th>
                      <th className="p-3 text-left font-semibold">Grade</th>
                      <th className="p-3 text-right font-semibold">Total Fee</th>
                      <th className="p-3 text-right font-semibold">Paid</th>
                      <th className="p-3 text-right font-semibold">Balance</th>
                      <th className="p-3 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudents.map((row, i) => (
                      <tr key={i} className="border-b transition hover:bg-muted/50">
                        <td className="p-3">{row["Roll No"]}</td>
                        <td className="p-3 font-medium">{row["Student Name"]}</td>
                        <td className="p-3">{row["Grade"]}</td>
                        <td className="p-3 text-right">{row["Total Fee"]}</td>
                        <td className="p-3 text-right text-green-600">{row["Paid"]}</td>
                        <td className="p-3 text-right font-semibold">{row["Balance"]}</td>
                        <td className="p-3 text-center">
                          <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                            row["Status"] === "Paid" ? "bg-green-100 text-green-700" :
                            row["Status"] === "Partial" ? "bg-orange-100 text-orange-700" :
                            "bg-red-100 text-red-700"
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

            <TabsContent value="paid" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(paidStudents, "Paid Students Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(paidStudents, "Paid Students Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(paidStudents, "Paid Students Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Roll No</th>
                      <th className="p-3 text-left font-semibold">Student Name</th>
                      <th className="p-3 text-left font-semibold">Grade</th>
                      <th className="p-3 text-right font-semibold">Total Fee</th>
                      <th className="p-3 text-right font-semibold">Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidStudents.map((row, i) => (
                      <tr key={i} className="border-b bg-green-50/50 transition hover:bg-green-100/50">
                        <td className="p-3">{row["Roll No"]}</td>
                        <td className="p-3 font-medium">{row["Student Name"]}</td>
                        <td className="p-3">{row["Grade"]}</td>
                        <td className="p-3 text-right">{row["Total Fee"]}</td>
                        <td className="p-3 text-right font-semibold text-green-600">{row["Paid"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="partial" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(partialPaidStudents, "Partial Paid Students Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(partialPaidStudents, "Partial Paid Students Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(partialPaidStudents, "Partial Paid Students Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Roll No</th>
                      <th className="p-3 text-left font-semibold">Student Name</th>
                      <th className="p-3 text-left font-semibold">Grade</th>
                      <th className="p-3 text-right font-semibold">Total Fee</th>
                      <th className="p-3 text-right font-semibold">Paid</th>
                      <th className="p-3 text-right font-semibold">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partialPaidStudents.map((row, i) => (
                      <tr key={i} className="border-b bg-orange-50/50 transition hover:bg-orange-100/50">
                        <td className="p-3">{row["Roll No"]}</td>
                        <td className="p-3 font-medium">{row["Student Name"]}</td>
                        <td className="p-3">{row["Grade"]}</td>
                        <td className="p-3 text-right">{row["Total Fee"]}</td>
                        <td className="p-3 text-right text-green-600">{row["Paid"]}</td>
                        <td className="p-3 text-right font-semibold text-orange-600">{row["Balance"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="unpaid" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => handleExport(unpaidStudents, "Unpaid Students Report", "csv")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />Excel/CSV
                </Button>
                <Button onClick={() => handleExport(unpaidStudents, "Unpaid Students Report", "word")} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />Word
                </Button>
                <Button onClick={() => handleExport(unpaidStudents, "Unpaid Students Report", "print")} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />Print
                </Button>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="p-3 text-left font-semibold">Roll No</th>
                      <th className="p-3 text-left font-semibold">Student Name</th>
                      <th className="p-3 text-left font-semibold">Grade</th>
                      <th className="p-3 text-right font-semibold">Total Fee</th>
                      <th className="p-3 text-right font-semibold">Balance Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unpaidStudents.map((row, i) => (
                      <tr key={i} className="border-b bg-red-50/50 transition hover:bg-red-100/50">
                        <td className="p-3">{row["Roll No"]}</td>
                        <td className="p-3 font-medium">{row["Student Name"]}</td>
                        <td className="p-3">{row["Grade"]}</td>
                        <td className="p-3 text-right">{row["Total Fee"]}</td>
                        <td className="p-3 text-right font-semibold text-red-600">{row["Balance"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </FinanceLayout>
  );
}
