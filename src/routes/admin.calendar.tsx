import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/calendar")({ component: () => <AdminLayout><StubPage title="Calendar" description="School calendar, terms, exams and events." /></AdminLayout> });