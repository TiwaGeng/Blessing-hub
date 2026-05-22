import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Database } from "@/integrations/supabase/types";

const ALLOWED_ROLES = [
  "admin",
  "teacher",
  "finance",
  "library",
  "stock",
  "parent",
  "student",
  "staff",
  "employee",
] as const;

type AppRole = (typeof ALLOWED_ROLES)[number];

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function createUserAccount(request: Request) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Expected application/json request body" }, 400);
  }

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const role = String(body.role ?? "") as AppRole;

  if (!name || !email || !password || !ALLOWED_ROLES.includes(role)) {
    return jsonResponse(
      { error: "Name, email, password and a valid role are required." },
      400,
    );
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: name },
  });

  if (error || !data?.user) {
    return jsonResponse(
      { error: error?.message ?? "Failed to create user account." },
      400,
    );
  }

  const payload: Database["public"]["Tables"]["user_roles"]["Insert"] = {
    user_id: data.user.id,
    role,
  };

  const roleInsert = await supabaseAdmin.from("user_roles").insert(payload);

  if (roleInsert.error) {
    return jsonResponse(
      { error: roleInsert.error.message ?? "Failed to assign role." },
      500,
    );
  }

  return jsonResponse(
    { message: `Created user ${email} as ${role}.` },
    201,
  );
}
