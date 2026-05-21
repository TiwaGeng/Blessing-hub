import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({ component: Login });

function Login() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@blessingschool.com");
  const [password, setPassword] = useState("Admin@12345");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) { toast.error(error); return; }
    toast.success("Welcome back!");
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground font-sans">
      <div className="hidden lg:flex relative bg-primary text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 35%), radial-gradient(circle at 80% 80%, #2563eb 0, transparent 35%)" }} />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-[var(--gold)] text-[var(--gold-foreground)] grid place-items-center"><GraduationCap className="h-5 w-5" /></div>
          <div><div className="font-display font-bold">Blessing School</div><div className="text-xs opacity-70">Excellence • Faith • Future</div></div>
        </Link>
        <div className="relative">
          <h2 className="font-display text-3xl font-bold leading-tight">Welcome back.<br/>Sign in to continue your work.</h2>
          <p className="mt-4 text-white/70 max-w-md">Admins, teachers, finance, library and stock teams — manage your daily workflow from one connected dashboard.</p>
        </div>
        <div className="relative text-xs text-white/60">© {new Date().getFullYear()} Blessing School</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center"><GraduationCap className="h-5 w-5" /></div>
            <div className="font-display font-bold">Blessing School</div>
          </Link>
          <h1 className="font-display text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-1">Use your school account to access your dashboard.</p>

          <Card className="mt-6">
            <CardContent className="p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><Label htmlFor="pw">Password</Label><Input id="pw" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <Button type="submit" disabled={submitting} className="w-full bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Sign in
                </Button>
              </form>
              <div className="mt-6 rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
                <div className="font-semibold text-foreground mb-1">Demo accounts</div>
                <div>Admin — admin@blessingschool.com / Admin@12345</div>
                <div>Teacher — teacher@blessingschool.com / Teacher@12345</div>
              </div>
              <div className="mt-4 text-xs text-center">
                <Link to="/portal/parent" className="text-[var(--gold)] hover:underline">Parent? Use the Parent Portal instead →</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}