import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Award, Users, Microscope, Music, Trophy, Globe2, GraduationCap, CheckCircle2, Calendar, Newspaper, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const PROGRAMS = [
  { icon: BookOpen, title: "Primary School", desc: "P1–P6 strong literacy, numeracy and character foundation." },
  { icon: Microscope, title: "Ordinary Level", desc: "S1–S3 sciences, languages, humanities and ICT." },
  { icon: GraduationCap, title: "Advanced Level", desc: "S4–S6 MCB, PCM, MEG, MPC and more combinations." },
  { icon: Globe2, title: "Languages & ICT", desc: "English, French, Kinyarwanda and modern computing." },
  { icon: Music, title: "Arts & Music", desc: "Choir, traditional dance, theatre and visual arts." },
  { icon: Trophy, title: "Sports & Clubs", desc: "Football, basketball, debate, robotics, scouts." },
];

const NEWS = [
  { tag: "Academics", title: "Term 1 results released for all classes", date: "May 14, 2026" },
  { tag: "Events", title: "Annual Science Fair returns this June", date: "May 9, 2026" },
  { tag: "Sports", title: "Our U-17 team wins the regional championship", date: "May 2, 2026" },
];

function Index() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: "radial-gradient(circle at 30% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 80%, #2563eb 0, transparent 40%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider mb-6">
              <Star className="h-3 w-3 text-[var(--gold)]" /> Admissions open for 2026
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Quality education that <span className="text-[var(--gold)]">shapes futures</span>.
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Welcome to Blessing School — a modern institution blending strong academics, holistic values
              and a caring community. From Primary to Advanced Level, we prepare learners for life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions">
                <Button size="lg" className="bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
                  Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                  Discover the school
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                { k: "1,200+", v: "Students" },
                { k: "85+", v: "Staff" },
                { k: "25 yrs", v: "Of Excellence" },
                { k: "97%", v: "Pass rate" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl font-bold text-[var(--gold)]">{s.k}</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <Section className="py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Award, title: "Academic Excellence", desc: "Rigorous curriculum and qualified teachers." },
            { icon: Users, title: "Caring Community", desc: "Every child known, every family supported." },
            { icon: CheckCircle2, title: "Strong Values", desc: "Discipline, integrity, faith and service." },
          ].map((i) => (
            <Card key={i.title}>
              <CardContent className="p-6 flex gap-4 items-start">
                <div className="h-12 w-12 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] grid place-items-center shrink-0">
                  <i.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg">{i.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{i.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Programs */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Our Programs</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">A complete learning journey</h2>
          </div>
          <Link to="/programs"><Button variant="outline">All programs <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((p) => (
            <Card key={p.title} className="group hover:border-[var(--gold)] transition">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4 group-hover:bg-[var(--gold)] group-hover:text-[var(--gold-foreground)] transition">
                  <p.icon className="h-6 w-6" />
                </div>
                <div className="font-display font-bold text-lg">{p.title}</div>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section className="border-t border-border">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Latest</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">News & Announcements</h2>
          </div>
          <Link to="/news"><Button variant="outline">Read all news <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {NEWS.map((n) => (
            <Card key={n.title}>
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/90 to-primary rounded-t-xl grid place-items-center">
                <Newspaper className="h-10 w-10 text-[var(--gold)]" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-semibold">{n.tag}</span>
                  <Calendar className="h-3 w-3" /> {n.date}
                </div>
                <div className="font-display font-bold mt-2">{n.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">Ready to join the Blessing family?</h3>
            <p className="text-white/80 mt-2">Applications for the 2026 academic year are now open.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admissions"><Button size="lg" className="bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">Start Application</Button></Link>
            <Link to="/contact"><Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">Contact us</Button></Link>
          </div>
        </div>
      </Section>
    </PublicLayout>
  );
}
