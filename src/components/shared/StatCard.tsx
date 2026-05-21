import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, icon: Icon, trend, tone = "default",
}: {
  label: string; value: string | number; icon: LucideIcon;
  trend?: string;
  tone?: "default" | "gold" | "success" | "warning" | "destructive";
}) {
  const toneCls = {
    default: "bg-primary/10 text-primary",
    gold: "bg-[var(--gold)]/15 text-[var(--gold)]",
    success: "bg-[var(--success)]/15 text-[var(--success)]",
    warning: "bg-[var(--warning)]/15 text-[var(--warning)]",
    destructive: "bg-destructive/15 text-destructive",
  }[tone];
  return (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div className={cn("h-12 w-12 rounded-xl grid place-items-center", toneCls)}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-2xl font-bold font-display">{value}</div>
          {trend && <div className="text-xs text-muted-foreground">{trend}</div>}
        </div>
      </CardContent>
    </Card>
  );
}