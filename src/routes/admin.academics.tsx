import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/academics")({ component: () => <AdminLayout><StubPage title="Academics" description="Manage classes, subjects, terms and curriculum." /></AdminLayout> });