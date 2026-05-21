import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/teachers")({ component: () => <AdminLayout><StubPage title="Teachers" description="Manage teacher records, subject assignments and timetables." /></AdminLayout> });