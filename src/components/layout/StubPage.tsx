import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export function StubPage({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Card>
        <CardContent className="py-16 flex flex-col items-center text-center gap-3">
          <div className="h-14 w-14 rounded-full bg-muted grid place-items-center">
            <Construction className="h-7 w-7 text-[var(--gold)]" />
          </div>
          <div className="font-semibold">Module ready for implementation</div>
          <p className="text-sm text-muted-foreground max-w-md">
            The folder structure, routes, and design are in place. Tables, CRUD, and reports for this module
            will be added in the next iteration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}