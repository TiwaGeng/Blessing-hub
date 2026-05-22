import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/website/contact")({ component: Contact });

function Contact() {
  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Get in touch</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Contact us</h1>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            { i: MapPin, t: "Visit us", d: "KG 123 St, Kigali, Rwanda" },
            { i: Phone, t: "Call us", d: "+250 788 000 000" },
            { i: Mail, t: "Email us", d: "info@blessingschool.com" },
          ].map((c) => (
            <Card key={c.t}><CardContent className="p-6">
              <c.i className="h-7 w-7 text-[var(--gold)] mb-3" />
              <div className="font-semibold">{c.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
            </CardContent></Card>
          ))}
        </div>
        <Card className="mt-10 max-w-3xl">
          <CardContent className="p-6">
            <div className="font-display text-xl font-bold mb-4">Send us a message</div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent. We'll reply shortly."); (e.target as HTMLFormElement).reset(); }} className="grid sm:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input required /></div>
              <div><Label>Email</Label><Input type="email" required /></div>
              <div className="sm:col-span-2"><Label>Subject</Label><Input required /></div>
              <div className="sm:col-span-2"><Label>Message</Label><Textarea rows={5} required /></div>
              <div className="sm:col-span-2 flex justify-end"><Button type="submit" className="bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">Send message</Button></div>
            </form>
          </CardContent>
        </Card>
      </Section>
    </PublicLayout>
  );
}