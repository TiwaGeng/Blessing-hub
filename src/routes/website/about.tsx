import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, HeartHandshake, BookOpen } from "lucide-react";

export const Route = createFileRoute("/website/about")({ component: About });

function About() {
  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">About Us</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">A school built on faith, vision and excellence</h1>
        <p className="mt-6 max-w-3xl text-muted-foreground leading-relaxed">
          Blessing School was founded with a simple belief: every child deserves an education that nurtures the
          mind, the heart and the spirit. For over two decades, we have prepared learners not only for examinations,
          but for life — equipping them with knowledge, discipline and the values that make great citizens.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3"><Target className="h-6 w-6 text-[var(--gold)]" /><div className="font-display font-bold text-xl">Our Mission</div></div>
            <p className="text-muted-foreground">To deliver high-quality, holistic education that empowers learners to thrive academically, socially and spiritually.</p>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3"><Eye className="h-6 w-6 text-[var(--gold)]" /><div className="font-display font-bold text-xl">Our Vision</div></div>
            <p className="text-muted-foreground">To be a leading center of excellence in education, recognized for innovation, character and community impact.</p>
          </CardContent></Card>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Our History</h2>
          <div className="space-y-6">
            {[
              { year: "2001", title: "Founded with 32 students", desc: "Blessing School opens its doors with one classroom block and a vision." },
              { year: "2008", title: "Recognized nationally", desc: "Top 10 ranking in Primary Leaving Examination results." },
              { year: "2015", title: "Advanced Level launched", desc: "New science labs, ICT center and dormitories completed." },
              { year: "2024", title: "Digital transformation", desc: "Full school management system, e-library and parent portal." },
            ].map((m) => (
              <div key={m.year} className="flex gap-6">
                <div className="font-display font-bold text-2xl text-[var(--gold)] w-20 shrink-0">{m.year}</div>
                <div className="border-l-2 border-[var(--gold)] pl-6 pb-2">
                  <div className="font-semibold">{m.title}</div>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, t: "Strong academics", d: "Skilled teachers, modern curriculum, consistent results." },
            { icon: HeartHandshake, t: "Caring community", d: "Small classes, dedicated counselors, family partnerships." },
            { icon: Target, t: "Future-ready", d: "ICT, languages, leadership clubs and career guidance." },
          ].map((v) => (
            <Card key={v.t}><CardContent className="p-6">
              <v.icon className="h-7 w-7 text-[var(--gold)] mb-3" />
              <div className="font-display font-bold">{v.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
            </CardContent></Card>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}