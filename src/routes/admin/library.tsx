import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import {
  LIBRARY_BOOKS,
  LIBRARY_BORROWED,
  LIBRARY_RETURNS,
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

export const Route = createFileRoute("/admin/library")({
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <AdminLayout title="Library">
      <LibraryContent />
    </AdminLayout>
  );
}

function LibraryContent() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const reportTitle = `Library stock report - ${selectedYear.label} ${selectedTerm.name}`;

  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList className="h-auto flex-wrap justify-start">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="books">Books</TabsTrigger>
        <TabsTrigger value="borrow">Borrow books</TabsTrigger>
        <TabsTrigger value="return">Return books</TabsTrigger>
        <TabsTrigger value="report">Report</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InlineMetric
            label="Books in catalog"
            value="4,213"
            helper="Master book register"
          />
          <InlineMetric
            label="Borrowed now"
            value="126"
            helper={`${selectedTerm.name} activity`}
          />
          <InlineMetric label="Due this week" value="34" helper="Borrow list" />
          <InlineMetric label="Overdue" value="9" helper="Needs follow-up" />
        </div>
      </TabsContent>

      <TabsContent value="books">
        <ModuleCard
          title="Books catalog"
          description="Library dashboard and book management."
          badge="Catalog"
        >
          <DataTable
            columns={[
              { key: "title", label: "Title" },
              { key: "author", label: "Author" },
              { key: "copies", label: "Copies" },
              { key: "shelf", label: "Shelf" },
              { key: "status", label: "Status" },
            ]}
            rows={LIBRARY_BOOKS}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="borrow">
        <ModuleCard
          title="Borrowed books"
          description="Track every borrowed book by student or staff."
          badge={selectedTerm.name}
        >
          <DataTable
            columns={[
              { key: "borrower", label: "Borrower" },
              { key: "class", label: "Class / Role" },
              { key: "book", label: "Book" },
              { key: "borrowed", label: "Borrowed" },
              { key: "due", label: "Due" },
            ]}
            rows={LIBRARY_BORROWED}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="return">
        <ModuleCard
          title="Returned books"
          description="Monitor returned items and late fines."
          badge="Returns"
        >
          <DataTable
            columns={[
              { key: "borrower", label: "Borrower" },
              { key: "book", label: "Book" },
              { key: "returned", label: "Returned" },
              { key: "fine", label: "Fine" },
            ]}
            rows={LIBRARY_RETURNS}
          />
        </ModuleCard>
      </TabsContent>

      <TabsContent value="report">
        <ModuleCard
          title="Library stock report"
          description="Download the stock table in a clean document-friendly format."
          badge={selectedYear.label}
        >
          <div className="mb-4 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToCsv(`${reportTitle}.csv`, LIBRARY_BOOKS)
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
                  LIBRARY_BOOKS,
                )
              }
            >
              <Download className="h-4 w-4" />
              Word
            </Button>
            <Button
              variant="outline"
              onClick={() => printRowsReport(reportTitle, LIBRARY_BOOKS)}
            >
              <Printer className="h-4 w-4" />
              PDF / Print
            </Button>
          </div>
          <DataTable
            columns={[
              { key: "title", label: "Title" },
              { key: "author", label: "Author" },
              { key: "copies", label: "Copies" },
              { key: "shelf", label: "Shelf" },
              { key: "status", label: "Status" },
            ]}
            rows={LIBRARY_BOOKS}
          />
        </ModuleCard>
      </TabsContent>
    </Tabs>
  );
}
