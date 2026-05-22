import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAcademicSession } from "@/lib/academic-session";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Calendar, Save, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/teacher/attendance")({ component: TeacherAttendance });

function TeacherAttendance() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [selectedCourse, setSelectedCourse] = useState("math-10a");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: true
  });

  const students = [
    { id: 1, name: "John Doe", rollNo: "10A-001" },
    { id: 2, name: "Jane Smith", rollNo: "10A-002" },
    { id: 3, name: "Mike Johnson", rollNo: "10A-003" },
    { id: 4, name: "Sarah Williams", rollNo: "10A-004" },
    { id: 5, name: "David Brown", rollNo: "10A-005" },
    { id: 6, name: "Emily Davis", rollNo: "10A-006" },
    { id: 7, name: "James Wilson", rollNo: "10A-007" },
    { id: 8, name: "Lisa Anderson", rollNo: "10A-008" },
  ];

  const handleToggle = (id: number) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkAll = (present: boolean) => {
    const newAttendance: Record<number, boolean> = {};
    students.forEach(s => { newAttendance[s.id] = present; });
    setAttendance(newAttendance);
  };

  const handleSubmit = () => {
    toast.success("Attendance submitted successfully");
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = students.length - presentCount;

  return (
    <TeacherLayout title="Mark Attendance">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendance - {selectedYear.label} {selectedTerm.name}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Present: {presentCount}
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700">
                Absent: {absentCount}
              </Badge>
            </div>
          </div>
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
            <div className="flex items-center gap-2 rounded-md border px-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <input 
                type="date" 
                className="border-0 bg-transparent outline-none" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => handleMarkAll(true)}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark All Present
            </Button>
            <Button variant="outline" onClick={() => handleMarkAll(false)}>
              Mark All Absent
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {students.map((student) => (
              <div 
                key={student.id} 
                className={`flex items-center justify-between rounded-lg border p-4 transition ${
                  attendance[student.id] ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {student.rollNo.split('-')[1]}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">Roll No: {student.rollNo}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${attendance[student.id] ? 'text-green-700' : 'text-red-700'}`}>
                    {attendance[student.id] ? 'Present' : 'Absent'}
                  </span>
                  <Checkbox 
                    checked={attendance[student.id]} 
                    onCheckedChange={() => handleToggle(student.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={handleSubmit} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Submit Attendance
            </Button>
            <Button variant="outline">Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </TeacherLayout>
  );
}
