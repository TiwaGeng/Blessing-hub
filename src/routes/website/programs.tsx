import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Microscope, GraduationCap, Globe2, Music, Trophy, Cpu, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/website/programs")({ component: Programs });

const PROGRAMS = [
  { icon: BookOpen, t: "Pre-Primary", d: "Nursery, K1 and K2 with play-based, child-centered learning." },
  { icon: BookOpen, t: "Primary (P1–P6)", d: "Solid foundation in literacy, numeracy, sciences and arts." },
  { icon: Microscope, t: "Ordinary Level (S1–S3)", d: "Broad curriculum: sciences, languages, humanities and ICT." },
  { icon: GraduationCap, t: "Advanced Level (S4–S6)", d: "MCB, PCM, MEG, MPC, HEG and PCB combinations." },
  { icon: Cpu, t: "ICT & Computing", d: "Practical skills in programming, design and digital literacy." },
  { icon: FlaskConical, t: "STEM Lab", d: "Hands-on physics, chemistry and biology experiments." },
  { icon: Globe2, t: "Languages", d: "English, French, Kinyarwanda and Swahili." },
  { icon: Music, t: "Arts, Music & Drama", d: "Choir, traditional dance, theatre and visual arts." },
  { icon: Trophy, t: "Sports & Clubs", d: "Football, basketball, debate, scouts, robotics and more." },
];

function Programs() {
  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Academics</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Programs & Courses</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">A complete learning pathway from early years through advanced level, complemented by rich co-curricular activities.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {PROGRAMS.map((p) => (
            <Card key={p.t} className="hover:border-[var(--gold)] transition">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4"><p.icon className="h-6 w-6" /></div>
                <div className="font-display font-bold text-lg">{p.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{p.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}