import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAcademicSession } from "@/lib/academic-session";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Save, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/teacher/marks")({ component: TeacherMarks });

function TeacherMarks() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [selectedCourse, setSelectedCourse] = useState("math-10a");
  const [examType, setExamType] = useState("midterm");

  const [marks, setMarks] = useState<Record<number, number>>({
    1: 85, 2: 92, 3: 78, 4: 88, 5: 76, 6: 94, 7: 82, 8: 90
  });

  const students = [
    { id: 1, name: "John Doe", rollNo: "10A-001", status: "approved" },
    { id: 2, name: "Jane Smith", rollNo: "10A-002", status: "approved" },
    { id: 3, name: "Mike Johnson", rollNo: "10A-003", status: "pending" },
    { id: 4, name: "Sarah Williams", rollNo: "10A-004", status: "pending" },
    { id: 5, name: "David Brown", rollNo: "10A-005", status: "pending" },
    { id: 6, name: "Emily Davis", rollNo: "10A-006", status: "approved" },
    { id: 7, name: "James Wilson", rollNo: "10A-007", status: "pending" },
    { id: 8, name: "Lisa Anderson", rollNo: "10A-008", status: "pending" },
  ];

  const handleMarkChange = (id: number, value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 100) {
      setMarks(prev => ({ ...prev, [id]: numValue }));
    }
  };

  const handleSubmit = () => {
    toast.success("Marks submitted for approval");
  };

  const getGrade = (mark: number) => {
    if (mark >= 90) return { grade: 'A+', color: 'text-green-700' };
    if (mark >= 80) return { grade: 'A', color: 'text-green-600' };
    if (mark >= 70) return { grade: 'B+', color: 'text-blue-600' };
    if (mark >= 60) return { grade: 'B', color: 'text-blue-500' };
    if (mark >= 50) return { grade: 'C', color: 'text-yellow-600' };
    return { grade: 'F', color: 'text-red-600' };
  };

  return (
    <TeacherLayout title="Upload & Approve Marks">
      <Card>
        <CardHeader>
          <CardTitle>Marks Entry - {selectedYear.label} {selectedTerm.name}</CardTitle>
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
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="midterm">Mid-term Exam</SelectItem>
                <SelectItem value="final">Final Exam</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Roll No</th>
                  <th className="p-3 text-left">Student Name</th>
                  <th className="p-3 text-center">Marks (out of 100)</th>
                  <th className="p-3 text-center">Grade</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const mark = marks[student.id] || 0;
                  const { grade, color } = getGrade(mark);
                  
                  return (
                    <tr key={student.id} className="border-b transition hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {student.rollNo.split('-')[1]}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.rollNo}</div>
                      </td>
                      <td className="p-3">
                        <Input 
                          type="number" 
                          value={mark}
                          onChange={(e) => handleMarkChange(student.id, e.target.value)}
                          className="mx-auto w-24 text-center" 
                          min="0" 
                          max="100" 
                        />
                      </td>
                      <td className="p-3 text-center">
                        <span className={`text-lg font-bold ${color}`}>{grade}</span>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant={student.status === "approved" ? "default" : "outline"}>
                          {student.status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {student.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={handleSubmit} className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Submit for Approval
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </TeacherLayout>
  );
}
