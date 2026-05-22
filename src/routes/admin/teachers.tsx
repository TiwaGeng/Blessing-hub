import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import {
  CLASS_MARK_REPORTS,
  TEACHER_ATTENDANCE,
  TEACHER_COURSES,
  TEACHER_TASKS,
  TEACHER_TIMETABLE,
} from "@/lib/admin-data";
import {
  exportRowsToCsv,
  exportRowsToWord,
  printRowsReport,
} from "@/lib/report-export";
import {
  DataTable,
  InlineMetric,
  ModuleCard,
} from "@/components/admin/AdminWidgets";
import { useAcademicSession } from "@/lib/academic-session";

export const Route = createFileRoute("/admin/teachers")({
  component: Teachers,
});

function Teachers() {
  return (
    <AdminLayout title="Teachers">
      <TeachersContent />
    </AdminLayout>
  );
}

function TeachersContent() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const reportTitle = `Teacher class marks - ${selectedYear.label} ${selectedTerm.name}`;

  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList className="h-auto flex-wrap justify-start">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="marks">Marks workflow</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="timetable">Timetable</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InlineMetric
            label="Assigned courses"
            value="4"
            helper="Courses linked to this teacher"
          />
          <InlineMetric
            label="Attendance"
            value="96%"
            helper={`For ${selectedTerm.name}`}
          />
          <InlineMetric
            label="Marks pending"
            value="2 classes"
            helper="Need approval before release"
          />
          <InlineMetric
            label="Assignments / exams"
            value="3 open"
            helper="Preparation tasks in progress"
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <ModuleCard
            title="Assigned courses"
            description="Every course and class this teacher handles for the selected term."
            badge={selectedTerm.name}
          >
            <DataTable
              columns={[
                { key: "course", label: "Course" },
                { key: "className", label: "Class" },
                { key: "students", label: "Students" },
                { key: "workload", label: "Workload" },
              ]}
              rows={TEACHER_COURSES}
            />
          </ModuleCard>
          <ModuleCard
            title="Work queue"
            description="Teaching tasks for attendance, marks, assignments, and exams."
            badge="Teacher actions"
          >
            <DataTable
              columns={[
                { key: "task", label: "Task" },
                { key: "due", label: "Due" },
                { key: "status", label: "Status" },
              ]}
              rows={TEACHER_TASKS}
            />
          </ModuleCard>
        </div>
      </TabsContent>

      <TabsContent value="marks" className="space-y-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <ModuleCard
            title="Attendance summary"
            description="Lesson attendance tied to the same academic term."
            badge="Weekly"
          >
            <DataTable
              columns={[
                { key: "week", label: "Week" },
                { key: "rate", label: "Attendance rate" },
                { key: "missing", label: "Missed lessons" },
              ]}
              rows={TEACHER_ATTENDANCE}
            />
          </ModuleCard>
          <ModuleCard
            title="Marks and approval flow"
            description="Upload marks, send them for approval, and track approval status."
            badge="Approval"
          >
            <DataTable
              columns={[
                { key: "class", label: "Class" },
                { key: "course", label: "Course" },
                { key: "average", label: "Average" },
                { key: "approved", label: "Approval status" },
                { key: "updated", label: "Updated" },
              ]}
              rows={CLASS_MARK_REPORTS}
            />
          </ModuleCard>
        </div>
      </TabsContent>

      <TabsContent value="reports" className="space-y-5">
        <ModuleCard
          title="Class mark reports"
          description="Download or print every class mark report for each course the teacher handles."
          badge={selectedYear.label}
        >
          <div className="mb-4 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToCsv(`${reportTitle}.csv`, CLASS_MARK_REPORTS)
              }
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel / CSV
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToWord(
                  reportTitle,
                  `${reportTitle}.doc`,
                  CLASS_MARK_REPORTS,
                )
              }
            >
              <Download className="h-4 w-4" />
              Word
            </Button>
            <Button
              variant="outline"
              onClick={() => printRowsReport(reportTitle, CLASS_MARK_REPORTS)}
            >
              <Printer className="h-4 w-4" />
              PDF / Print
            </Button>
          </div>
          <DataTable
            columns={[
              { key: "class", label: "Class" },
              { key: "course", label: "Course" },
              { key: "average", label: "Average" },
              { key: "approved", label: "Approval" },
              { key: "updated", label: "Updated" },
            ]}
            rows={CLASS_MARK_REPORTS}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="timetable" className="space-y-5">
        <ModuleCard
          title="Teaching timetable"
          description="The teacher can see the timetable and classes to teach."
          badge="Schedule"
        >
          <DataTable
            columns={[
              { key: "day", label: "Day" },
              { key: "time", label: "Time" },
              { key: "subject", label: "Class / Subject" },
              { key: "room", label: "Room" },
            ]}
            rows={TEACHER_TIMETABLE}
          />
        </ModuleCard>
      </TabsContent>
    </Tabs>
  );
}
