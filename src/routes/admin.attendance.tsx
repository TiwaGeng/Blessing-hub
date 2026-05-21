import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/attendance")({ component: () => <AdminLayout><StubPage title="Attendance" description="Daily attendance for students and staff, with absence reports." /></AdminLayout> });