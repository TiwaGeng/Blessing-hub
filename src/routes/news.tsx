import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Newspaper } from "lucide-react";

export const Route = createFileRoute("/news")({ component: News });

const ITEMS = [
  { tag: "Academics", title: "Term 1 results released for all classes", date: "May 14, 2026", body: "Parents can now view their child's results in the Parent Portal." },
  { tag: "Events", title: "Annual Science Fair returns this June", date: "May 9, 2026", body: "S1–S6 students will showcase projects across physics, chemistry and biology." },
  { tag: "Sports", title: "Our U-17 team wins the regional championship", date: "May 2, 2026", body: "A historic 3–1 victory crowns months of hard training." },
  { tag: "Community", title: "Open Day scheduled for July", date: "Apr 28, 2026", body: "Visit our campus, meet teachers and tour our new STEM lab." },
  { tag: "Notice", title: "School calendar 2026/2027 published", date: "Apr 20, 2026", body: "The updated calendar is available on the school website." },
  { tag: "Achievements", title: "Top 5 in National Debate Championship", date: "Apr 12, 2026", body: "Congratulations to our senior debate club." },
];

function News() {
  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Stay updated</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">News & Announcements</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {ITEMS.map((n) => (
            <Card key={n.title}>
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/90 to-primary rounded-t-xl grid place-items-center"><Newspaper className="h-10 w-10 text-[var(--gold)]" /></div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-semibold">{n.tag}</span>
                  <Calendar className="h-3 w-3" /> {n.date}
                </div>
                <div className="font-display font-bold mt-2">{n.title}</div>
                <p className="text-sm text-muted-foreground mt-2">{n.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}