import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAcademicSession } from "@/lib/academic-session";
import type { RowData } from "@/lib/admin-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, RotateCcw } from "lucide-react";

export function AcademicSessionPanel() {
  const {
    years,
    selectedYear,
    selectedTerm,
    selectedYearId,
    selectedTermId,
    setSelectedYearId,
    setSelectedTermId,
    resetToCurrent,
    isViewingCurrent,
  } = useAcademicSession();

  return (
    <Card className="border-primary/10 bg-gradient-to-r from-primary/5 via-card to-[var(--gold)]/10">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">
                Academic session
              </Badge>
              <Badge
                variant="outline"
                className="border-[var(--gold)]/50 text-[var(--gold)]"
              >
                {selectedTerm.status}
              </Badge>
              {!isViewingCurrent && (
                <Badge
                  variant="outline"
                  className="border-primary/40 text-primary"
                >
                  Viewing archived term
                </Badge>
              )}
            </div>
            <h2 className="mt-3 font-display text-xl font-bold">
              {selectedYear.label} • {selectedTerm.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              All admin, teacher, library, stock, marks, and finance pages
              follow this selected academic year and term.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
            <div>
              <div className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Academic year
              </div>
              <Select value={selectedYearId} onValueChange={setSelectedYearId}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Choose year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.id} value={year.id}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Term
              </div>
              <Select value={selectedTermId} onValueChange={setSelectedTermId}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Choose term" />
                </SelectTrigger>
                <SelectContent>
                  {selectedYear.terms.map((term) => (
                    <SelectItem key={term.id} value={term.id}>
                      {term.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={resetToCurrent}
              >
                <RotateCcw className="h-4 w-4" />
                Current term
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {selectedYear.terms.map((term) => {
            const active = term.id === selectedTermId;

            return (
              <div
                key={term.id}
                className={cn(
                  "rounded-xl border p-3 transition-colors",
                  active
                    ? "border-primary bg-background shadow-sm"
                    : "border-border bg-background/60",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{term.name}</div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      term.status === "active" &&
                        "border-[var(--success)]/40 text-[var(--success)]",
                      term.status === "completed" &&
                        "border-primary/30 text-primary",
                      term.status === "upcoming" &&
                        "border-[var(--gold)]/40 text-[var(--gold)]",
                    )}
                  >
                    {term.status}
                  </Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {term.start} - {term.end}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function ModuleCard({
  title,
  description,
  badge,
  children,
}: {
  title: string;
  description?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="font-display text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {badge && <Badge variant="outline">{badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function InlineMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{helper}</div>
    </div>
  );
}

export function StatusList({
  items,
}: {
  items: {
    title: string;
    detail: string;
    tone?: "default" | "success" | "warning" | "destructive";
  }[];
}) {
  const tones = {
    default: "bg-primary/10 text-primary",
    success: "bg-[var(--success)]/15 text-[var(--success)]",
    warning: "bg-[var(--gold)]/15 text-[var(--gold)]",
    destructive: "bg-destructive/15 text-destructive",
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-3 rounded-xl border border-border p-3"
        >
          <div
            className={cn(
              "mt-0.5 grid h-9 w-9 place-items-center rounded-full",
              tones[item.tone ?? "default"],
            )}
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{item.title}</div>
            <div className="text-sm text-muted-foreground">{item.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: { key: string; label: string; className?: string }[];
  rows: RowData[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={`${index}-${Object.values(row).join("-")}`}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {String(row[column.key] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
