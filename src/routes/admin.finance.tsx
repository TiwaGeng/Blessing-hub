import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/finance")({ component: () => <AdminLayout><StubPage title="Finance" description="School fees, invoices, payments and financial statements." /></AdminLayout> });