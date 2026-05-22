import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAcademicSession } from "@/lib/academic-session";
import { Plus, FileText, Calendar, Users, Edit, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/teacher/assignments")({ component: TeacherAssignments });

function TeacherAssignments() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const assignments = [
    { 
      id: 1, 
      title: "Algebra Problem Set", 
      course: "Mathematics 10A", 
      dueDate: "2026-05-15", 
      submissions: 35, 
      total: 45, 
      type: "assignment",
      status: "active"
    },
    { 
      id: 2, 
      title: "Mid-term Exam", 
      course: "Mathematics 10A", 
      dueDate: "2026-05-20", 
      submissions: 0, 
      total: 45, 
      type: "exam",
      status: "upcoming"
    },
    { 
      id: 3, 
      title: "Physics Lab Report", 
      course: "Physics 10A", 
      dueDate: "2026-05-18", 
      submissions: 28, 
      total: 45, 
      type: "assignment",
      status: "active"
    },
    { 
      id: 4, 
      title: "Calculus Quiz", 
      course: "Mathematics 11B", 
      dueDate: "2026-05-12", 
      submissions: 38, 
      total: 38, 
      type: "quiz",
      status: "completed"
    },
  ];

  return (
    <TeacherLayout title="Assignments & Exams">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{selectedYear.label} {selectedTerm.name}</h2>
          <p className="text-sm text-muted-foreground">Manage assignments, quizzes, and exams</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      <div className="grid gap-4">
        {assignments.map((assignment) => {
          const progress = (assignment.submissions / assignment.total) * 100;
          
          return (
            <Card key={assignment.id} className="transition hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-lg font-bold">{assignment.title}</h3>
                        <Badge variant={
                          assignment.status === 'completed' ? 'default' : 
                          assignment.status === 'active' ? 'outline' : 
                          'secondary'
                        }>
                          {assignment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Due: {assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Submissions: {assignment.submissions}/{assignment.total}</span>
                        </div>
                        <Badge variant={assignment.type === 'exam' ? 'default' : 'outline'}>
                          {assignment.type}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-xs">
                          <span>Submission Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </TeacherLayout>
  );
}
