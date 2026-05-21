import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/users")({ component: () => <AdminLayout><StubPage title="Users & Roles" description="Create accounts and assign roles across the school system." /></AdminLayout> });