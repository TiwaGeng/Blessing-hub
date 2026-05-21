import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/communication")({ component: () => <AdminLayout><StubPage title="Communication" description="Announcements, SMS and email broadcasts to parents and staff." /></AdminLayout> });