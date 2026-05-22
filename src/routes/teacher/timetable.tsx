import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAcademicSession } from "@/lib/academic-session";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/teacher/timetable")({ component: TeacherTimetable });

function TeacherTimetable() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const schedule = {
    Monday: [
      { time: "08:00-09:00", subject: "Mathematics", class: "10A", room: "201" },
      { time: "10:00-11:00", subject: "Physics", class: "10A", room: "Lab 3" },
      { time: "13:00-14:00", subject: "Mathematics", class: "11B", room: "201" },
    ],
    Tuesday: [
      { time: "09:00-10:00", subject: "Mathematics", class: "10A", room: "201" },
      { time: "11:00-12:00", subject: "Physics", class: "10A", room: "Lab 3" },
    ],
    Wednesday: [
      { time: "08:00-09:00", subject: "Mathematics", class: "11B", room: "201" },
      { time: "10:00-11:00", subject: "Mathematics", class: "10A", room: "201" },
      { time: "14:00-15:00", subject: "Physics", class: "10A", room: "Lab 3" },
    ],
    Thursday: [
      { time: "09:00-10:00", subject: "Mathematics", class: "10A", room: "201" },
      { time: "13:00-14:00", subject: "Mathematics", class: "11B", room: "201" },
    ],
    Friday: [
      { time: "08:00-09:00", subject: "Physics", class: "10A", room: "Lab 3" },
      { time: "10:00-11:00", subject: "Mathematics", class: "10A", room: "201" },
    ],
  };

  return (
    <TeacherLayout title="My Timetable">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(schedule).map(([day, classes]) => (
              <div key={day}>
                <h3 className="mb-3 font-display text-lg font-bold">{day}</h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {classes.map((cls, i) => (
                    <div key={i} className="rounded-lg border p-4 transition hover:border-primary hover:shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <Badge className="bg-primary">{cls.time}</Badge>
                      </div>
                      <div className="font-medium">{cls.subject}</div>
                      <div className="text-sm text-muted-foreground">Class {cls.class} • Room {cls.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TeacherLayout>
  );
}
