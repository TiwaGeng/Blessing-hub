type Role = "admin" | "teacher" | "finance" | "library" | "stock" | "parent" | "student";

export function getDashboardRoute(roles: string[]): string {
  if (roles.includes("admin")) return "/admin/";
  if (roles.includes("teacher")) return "/teacher/";
  if (roles.includes("finance")) return "/finance/";
  if (roles.includes("library")) return "/library/";
  if (roles.includes("stock")) return "/stock/";
  if (roles.includes("parent")) return "/website/portal/parent";
  return "/admin/";
}

export function canAccessRoute(roles: string[], route: string): boolean {
  if (route.startsWith("/admin")) return roles.includes("admin");
  if (route.startsWith("/teacher")) return roles.includes("teacher");
  if (route.startsWith("/finance")) return roles.includes("finance");
  if (route.startsWith("/library")) return roles.includes("library");
  if (route.startsWith("/stock")) return roles.includes("stock");
  if (route.startsWith("/website/portal/parent")) return roles.includes("parent");
  if (route.startsWith("/website")) return true; // Public routes
  return false;
}
