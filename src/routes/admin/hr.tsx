import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/hr")({ component: () => <AdminLayout><StubPage title="HR & Payroll" description="Employees, contracts, leaves and monthly payroll." /></AdminLayout> });