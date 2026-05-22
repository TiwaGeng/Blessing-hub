import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileCheck, FolderClock, RefreshCcw } from "lucide-react";
import { useAcademicSession } from "@/lib/academic-session";
import { InlineMetric, ModuleCard } from "@/components/admin/AdminWidgets";

export const Route = createFileRoute("/admin/academics")({
  component: Academics,
});

function Academics() {
  return (
    <AdminLayout title="Academics">
      <AcademicsContent />
    </AdminLayout>
  );
}

function AcademicsContent() {
  const { selectedYear, selectedTerm, isViewingCurrent, resetToCurrent } =
    useAcademicSession();

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-3">
        <ModuleCard
          title="Selected academic window"
          description="This is the default term context for the whole admin workspace."
          badge="Global control"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <InlineMetric
              label="Academic year"
              value={selectedYear.label}
              helper="Current admin session"
            />
            <InlineMetric
              label="Selected term"
              value={selectedTerm.name}
              helper={`${selectedTerm.start} - ${selectedTerm.end}`}
            />
            <InlineMetric
              label="View mode"
              value={isViewingCurrent ? "Live term" : "Historical"}
              helper="You can return to the active term anytime."
            />
          </div>
        </ModuleCard>

        <ModuleCard
          title="Shift policy"
          description="How the school can move across terms without losing archived records."
          badge="Term workflow"
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3 rounded-xl border border-border p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--success)]" />
              The default choice opens on the active academic year and term.
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border p-3">
              <FileCheck className="mt-0.5 h-4 w-4 text-primary" />
              End-of-term reports can still be reviewed after closeout by
              switching to that saved term.
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border p-3">
              <FolderClock className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
              Historical documents remain visible for admin, finance, teacher,
              library, and stock modules.
            </div>
          </div>
        </ModuleCard>

        <ModuleCard
          title="Quick action"
          description="Return to the present working term when you finish reviewing older documents."
          badge="Reset"
        >
          <Button variant="outline" className="w-full" onClick={resetToCurrent}>
            <RefreshCcw className="h-4 w-4" />
            Reset to current term
          </Button>
          <div className="mt-4 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
            This keeps the term control simple for now while still allowing the
            school to move between recent and archived terms.
          </div>
        </ModuleCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ModuleCard
          title="Academic workflow board"
          description="Suggested closeout flow for each term."
          badge="Admin guide"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Set academic year and open the active term",
              "Run attendance and marks entry during the term",
              "Approve marks and generate end-of-term reports",
              "Move to the next term while preserving the archive",
            ].map((step, index) => (
              <div key={step} className="rounded-xl border border-border p-4">
                <Badge className="mb-3 bg-primary text-primary-foreground">{`Step ${index + 1}`}</Badge>
                <div className="font-medium">{step}</div>
              </div>
            ))}
          </div>
        </ModuleCard>

        <ModuleCard
          title="Term register"
          description="All terms available under the selected academic year."
          badge={selectedYear.label}
        >
          <div className="space-y-3">
            {selectedYear.terms.map((term) => (
              <div
                key={term.id}
                className="flex items-center justify-between rounded-xl border border-border p-4"
              >
                <div>
                  <div className="font-medium">{term.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {term.start} - {term.end}
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {term.status}
                </Badge>
              </div>
            ))}
          </div>
        </ModuleCard>
      </div>
    </>
  );
}
