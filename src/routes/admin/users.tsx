import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

function AdminUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/admin/users/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error ?? "Unable to create employee account.");
        return;
      }

      toast.success(result.message ?? `Created ${email} as ${role}`);
      setName("");
      setEmail("");
      setPassword("");
      setRole("admin");
    } catch (error) {
      toast.error("Unable to create employee account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminLayout title="Users & Roles">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,_1fr)_minmax(360px,_1fr)]">
        <Card>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Create a user account</h2>
              <p className="text-sm text-muted-foreground">
                Add a school account and assign one of the built-in roles. This page is the admin entry point for managing staff and student accounts.
              </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={submitting} className="w-full bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
                {submitting ? "Request creation…" : "Create account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">How account creation works</h2>
              <p className="text-sm text-muted-foreground">
                When this form is connected to the Supabase admin backend, it can securely create users and assign the correct role for each account.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="rounded-xl border border-border p-4">
                Admin accounts can access the full admin dashboard and create other accounts.
              </li>
              <li className="rounded-xl border border-border p-4">
                Teacher accounts are used for class and marks workflows.
              </li>
              <li className="rounded-xl border border-border p-4">
                Finance, library, and stock accounts get the matching dashboard and tools.
              </li>
              <li className="rounded-xl border border-border p-4">
                Parent accounts use the parent portal, not the admin dashboard.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
