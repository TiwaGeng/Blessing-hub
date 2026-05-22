import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAcademicSession } from "@/lib/academic-session";
import { Download, FileText, Printer } from "lucide-react";
import { exportRowsToCsv, exportRowsToWord, printRowsReport } from "@/lib/report-export";
import { useState } from "react";

export const Route = createFileRoute("/teacher/reports")({ component: TeacherReports });

function TeacherReports() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [selectedCourse, setSelectedCourse] = useState("math-10a");

  const marksData = [
    { "Roll No": "10A-001", "Student Name": "John Doe", "Mid-term": 85, "Final": 88, "Total": 173, "Grade": "A" },
    { "Roll No": "10A-002", "Student Name": "Jane Smith", "Mid-term": 92, "Final": 95, "Total": 187, "Grade": "A+" },
    { "Roll No": "10A-003", "Student Name": "Mike Johnson", "Mid-term": 78, "Final": 82, "Total": 160, "Grade": "B+" },
    { "Roll No": "10A-004", "Student Name": "Sarah Williams", "Mid-term": 88, "Final": 90, "Total": 178, "Grade": "A" },
    { "Roll No": "10A-005", "Student Name": "David Brown", "Mid-term": 76, "Final": 80, "Total": 156, "Grade": "B+" },
    { "Roll No": "10A-006", "Student Name": "Emily Davis", "Mid-term": 94, "Final": 96, "Total": 190, "Grade": "A+" },
  ];

  const handleExport = (format: "csv" | "word" | "print") => {
    const title = `${selectedCourse} Marks Report - ${selectedYear.label} ${selectedTerm.name}`;
    if (format === "csv") exportRowsToCsv(`${title}.csv`, marksData);
    else if (format === "word") exportRowsToWord(title, `${title}.doc`, marksData);
    else printRowsReport(title, marksData);
  };

  return (
    <TeacherLayout title="Reports & Downloads">
      <Card>
        <CardHeader>
          <CardTitle>Class Marks Report - {selectedYear.label} {selectedTerm.name}</CardTitle>
          <div className="flex flex-wrap gap-3 pt-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math-10a">Mathematics - Grade 10A</SelectItem>
                <SelectItem value="math-11b">Mathematics - Grade 11B</SelectItem>
                <SelectItem value="physics-10a">Physics - Grade 10A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button onClick={() => handleExport("csv")} variant="outline">
              <Download className="h-4 w-4 mr-2" />Excel/CSV
            </Button>
            <Button onClick={() => handleExport("word")} variant="outline">
              <FileText className="h-4 w-4 mr-2" />Word
            </Button>
            <Button onClick={() => handleExport("print")} variant="outline">
              <Printer className="h-4 w-4 mr-2" />Print
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="p-3 text-left font-semibold">Roll No</th>
                  <th className="p-3 text-left font-semibold">Student Name</th>
                  <th className="p-3 text-right font-semibold">Mid-term</th>
                  <th className="p-3 text-right font-semibold">Final</th>
                  <th className="p-3 text-right font-semibold">Total</th>
                  <th className="p-3 text-center font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody>
                {marksData.map((row, i) => (
                  <tr key={i} className="border-b transition hover:bg-muted/50">
                    <td className="p-3">{row["Roll No"]}</td>
                    <td className="p-3 font-medium">{row["Student Name"]}</td>
                    <td className="p-3 text-right">{row["Mid-term"]}</td>
                    <td className="p-3 text-right">{row["Final"]}</td>
                    <td className="p-3 text-right font-semibold">{row["Total"]}</td>
                    <td className="p-3 text-center">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium">
                        {row["Grade"]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TeacherLayout>
  );
}
