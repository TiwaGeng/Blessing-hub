import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ClipboardCheck, FileText, Calendar, Users, TrendingUp } from "lucide-react";
import { useAcademicSession } from "@/lib/academic-session";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/")({ component: TeacherDashboard });

function TeacherDashboard() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const assignedCourses = [
    { id: 1, name: "Mathematics Grade 10", students: 45, class: "10A" },
    { id: 2, name: "Mathematics Grade 11", students: 38, class: "11B" },
    { id: 3, name: "Physics Grade 10", students: 45, class: "10A" },
  ];

  const upcomingClasses = [
    { time: "08:00 - 09:00", subject: "Mathematics", class: "10A", room: "Room 201" },
    { time: "10:00 - 11:00", subject: "Physics", class: "10A", room: "Lab 3" },
    { time: "13:00 - 14:00", subject: "Mathematics", class: "11B", room: "Room 201" },
  ];

  const pendingTasks = [
    { task: "Submit marks for Mathematics 10A", priority: "high", due: "Tomorrow" },
    { task: "Prepare assignment for Physics 10A", priority: "medium", due: "3 days" },
    { task: "Review attendance records", priority: "low", due: "1 week" },
  ];

  return (
    <TeacherLayout title="Teacher Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Courses" value={assignedCourses.length} icon={BookOpen} tone="default" trend={`${selectedTerm.name}`} />
        <StatCard label="Total Students" value="128" icon={Users} tone="gold" trend="Across all classes" />
        <StatCard label="Pending Marks" value="12" icon={FileText} tone="warning" trend="Need approval" />
        <StatCard label="Classes Today" value="5" icon={Calendar} tone="success" trend="Check timetable" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assigned Courses - {selectedYear.label} {selectedTerm.name}</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignedCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between rounded-lg border p-4 transition hover:bg-muted/50">
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">Class {course.class} • {course.students} students</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedTerm.name}</Badge>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/teacher/courses">View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild className="flex-1">
                <Link to="/teacher/courses">View All Courses</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/teacher/marks">Upload Marks</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((cls, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="text-xs font-medium text-primary">{cls.time}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{cls.subject}</div>
                    <div className="text-xs text-muted-foreground">{cls.class} • {cls.room}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-4 w-full" size="sm">
              <Link to="/teacher/timetable">Full Timetable</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-4">
                  <div className={`mt-1 h-2 w-2 rounded-full ${item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.task}</div>
                    <div className="text-sm text-muted-foreground">Due: {item.due}</div>
                  </div>
                  <Badge variant={item.priority === 'high' ? 'destructive' : 'outline'}>
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button asChild variant="outline" className="justify-start">
                <Link to="/teacher/attendance">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Mark Attendance
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/teacher/marks">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Marks
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/teacher/assignments">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Assignment
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/teacher/reports">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
