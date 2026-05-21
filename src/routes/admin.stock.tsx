import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StubPage } from "@/components/layout/StubPage";
export const Route = createFileRoute("/admin/stock")({ component: () => <AdminLayout><StubPage title="Stock" description="Inventory, suppliers, receipts and issuance to departments." /></AdminLayout> });