import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

type Role =
  | "admin" | "teacher" | "staff" | "employee"
  | "finance" | "stock" | "library" | "parent" | "student";

type Ctx = {
  user: User | null;
  session: Session | null;
  roles: Role[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  hasRole: (r: Role) => boolean;
};

const AuthCtx = createContext<Ctx>({} as Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [sb, setSb] = useState<typeof import("@/integrations/supabase/client").supabase | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      setSb(supabase);
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user) setTimeout(() => loadRoles(supabase, s.user.id), 0);
        else setRoles([]);
      });
      unsub = () => subscription.unsubscribe();
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) await loadRoles(supabase, data.session.user.id);
      setLoading(false);
    })();
    return () => { unsub?.(); };
  }, []);

  async function loadRoles(supabase: NonNullable<typeof sb>, uid: string) {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
    setRoles((data ?? []).map((r) => r.role as Role));
  }

  const value: Ctx = {
    user, session, roles, loading,
    hasRole: (r) => roles.includes(r),
    signIn: async (email, password) => {
      if (!sb) return { error: "Auth not ready" };
      const { error } = await sb.auth.signInWithPassword({ email, password });
      return { error: error?.message ?? null };
    },
    signOut: async () => { if (sb) await sb.auth.signOut(); },
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);