import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import { CLASS_MARK_REPORTS, MARK_APPROVALS } from "@/lib/admin-data";
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

export const Route = createFileRoute("/admin/marks")({ component: MarksPage });

function MarksPage() {
  return (
    <AdminLayout title="Marks & Reports">
      <MarksContent />
    </AdminLayout>
  );
}

function MarksContent() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const reportTitle = `Marks approval report - ${selectedYear.label} ${selectedTerm.name}`;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InlineMetric
          label="Marks submitted"
          value="3 classes"
          helper="Current approval pipeline"
        />
        <InlineMetric
          label="Approved"
          value="1 class"
          helper="Ready for report generation"
        />
        <InlineMetric
          label="Draft"
          value="1 class"
          helper="Still editable by the teacher"
        />
        <InlineMetric
          label="Pending review"
          value="1 class"
          helper="Needs HoD approval"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ModuleCard
          title="Approval board"
          description="Admin can review marks workflow by term."
          badge={selectedTerm.name}
        >
          <DataTable
            columns={[
              { key: "class", label: "Class" },
              { key: "assessment", label: "Assessment" },
              { key: "subject", label: "Subject" },
              { key: "submittedBy", label: "Submitted by" },
              { key: "status", label: "Status" },
            ]}
            rows={MARK_APPROVALS}
          />
        </ModuleCard>

        <ModuleCard
          title="Report generation"
          description="Prepare printable class mark summaries after approval."
          badge="Term report"
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
      </div>
    </>
  );
}
