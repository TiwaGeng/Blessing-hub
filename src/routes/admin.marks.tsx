import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/marks")({ component: () => <AdminLayout><StubPage title="Marks & Reports" description="Marks entry, approval workflow and printable report cards." /></AdminLayout> });