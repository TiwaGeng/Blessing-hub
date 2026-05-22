import { createFileRoute } from "@tanstack/react-router";
import { FinanceLayout } from "@/components/layout/FinanceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAcademicSession } from "@/lib/academic-session";
import { Search, DollarSign } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/finance/fees")({ component: FinanceFees });

function FinanceFees() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    { id: 1, name: "John Doe", rollNo: "10A-001", grade: "10A", totalFee: 5000, paid: 5000, balance: 0, status: "paid" },
    { id: 2, name: "Jane Smith", rollNo: "10A-002", grade: "10A", totalFee: 5000, paid: 3000, balance: 2000, status: "partial" },
    { id: 3, name: "Mike Johnson", rollNo: "10A-003", grade: "10A", totalFee: 5000, paid: 0, balance: 5000, status: "unpaid" },
    { id: 4, name: "Sarah Williams", rollNo: "10A-004", grade: "10A", totalFee: 5000, paid: 5000, balance: 0, status: "paid" },
    { id: 5, name: "David Brown", rollNo: "11B-001", grade: "11B", totalFee: 5500, paid: 2500, balance: 3000, status: "partial" },
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FinanceLayout title="Student Fees">
      <Card>
        <CardHeader>
          <CardTitle>Student Fees - {selectedYear.label} {selectedTerm.name}</CardTitle>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or roll no..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">Grade</th>
                  <th className="p-3 text-right">Total Fee</th>
                  <th className="p-3 text-right">Paid</th>
                  <th className="p-3 text-right">Balance</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b transition hover:bg-muted/50">
                    <td className="p-3">
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.rollNo}</div>
                    </td>
                    <td className="p-3">{student.grade}</td>
                    <td className="p-3 text-right font-semibold">${student.totalFee}</td>
                    <td className="p-3 text-right text-green-600">${student.paid}</td>
                    <td className="p-3 text-right font-semibold">${student.balance}</td>
                    <td className="p-3 text-center">
                      <Badge variant={student.status === "paid" ? "default" : student.status === "partial" ? "outline" : "destructive"}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Button size="sm" variant="outline">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Pay
                      </Button>
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
