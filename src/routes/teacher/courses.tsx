import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAcademicSession } from "@/lib/academic-session";
import { BookOpen, Users, FileText, Clock } from "lucide-react";

export const Route = createFileRoute("/teacher/courses")({ component: TeacherCourses });

function TeacherCourses() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const courses = [
    { id: 1, name: "Mathematics", grade: "10", section: "A", students: 45, hours: 5, completed: 32, total: 40 },
    { id: 2, name: "Mathematics", grade: "11", section: "B", students: 38, hours: 5, completed: 28, total: 40 },
    { id: 3, name: "Physics", grade: "10", section: "A", students: 45, hours: 4, completed: 25, total: 35 },
  ];

  return (
    <TeacherLayout title="My Courses">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Assigned Courses - {selectedYear.label} {selectedTerm.name}</CardTitle>
            <Badge className="bg-primary">{courses.length} Courses</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="border-2 transition hover:border-primary">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline">{selectedTerm.name}</Badge>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">Grade {course.grade} - Section {course.section}</p>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Students
                      </div>
                      <span className="font-semibold">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Hours/Week
                      </div>
                      <span className="font-semibold">{course.hours}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        Lessons
                      </div>
                      <span className="font-semibold">{course.completed}/{course.total}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{Math.round((course.completed / course.total) * 100)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div 
                        className="h-full bg-primary transition-all" 
                        style={{ width: `${(course.completed / course.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </TeacherLayout>
  );
}
