import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/settings")({ component: () => <AdminLayout><StubPage title="Settings" description="School profile, academic year, branding and integrations." /></AdminLayout> });