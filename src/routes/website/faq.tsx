import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/website/faq")({ component: FAQ });

const QA = [
  { q: "When are admissions open?", a: "Admissions are open year-round, but the main intake is in January. Apply online via the Admissions page." },
  { q: "Do you offer boarding?", a: "Yes, boarding is available from P5 through S6." },
  { q: "Which curriculum do you follow?", a: "We follow the Rwandan Competence-Based Curriculum (CBC) with bilingual instruction." },
  { q: "How can parents check results?", a: "Parents can use the Parent Portal with the student's name and ID to view results and attendance." },
  { q: "Are there scholarships?", a: "Yes, merit-based and need-based scholarships are awarded each year." },
  { q: "What are the school hours?", a: "Classes run Monday to Friday, 7:30 AM to 4:00 PM, with co-curricular activities afterwards." },
];

function FAQ() {
  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Help</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Frequently Asked Questions</h1>
        <div className="max-w-3xl mt-10">
          <Accordion type="single" collapsible className="w-full">
            {QA.map((x, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{x.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{x.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </PublicLayout>
  );
}