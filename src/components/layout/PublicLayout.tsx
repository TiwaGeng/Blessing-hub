import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base">Blessing School</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Excellence • Faith • Future</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md hover:bg-muted transition"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/auth/login" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm">Portal Login</Button>
            </Link>
            <Link to="/admissions" className="hidden sm:inline-flex">
              <Button size="sm" className="bg-[var(--gold)] text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
                Apply Now
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted">{n.label}</Link>
              ))}
              <Link to="/auth/login" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted">Portal Login</Link>
              <Link to="/admissions" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-semibold rounded-md text-[var(--gold-foreground)] bg-[var(--gold)]">Apply Now</Link>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-card mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="font-display font-bold">Blessing School</div>
            </div>
            <p className="text-sm text-muted-foreground">Shaping tomorrow's leaders with discipline, faith, and academic excellence.</p>
            <div className="flex gap-2 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
                <a key={i} href="#" className="h-8 w-8 grid place-items-center rounded-md border border-border hover:bg-muted"><I className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-3">Quick Links</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.slice(1).map((n) => (<li key={n.to}><Link to={n.to} className="hover:text-foreground">{n.label}</Link></li>))}
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Portals</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/portal/parent" className="hover:text-foreground">Parent Portal</Link></li>
              <li><Link to="/auth/login" className="hover:text-foreground">Student Login</Link></li>
              <li><Link to="/auth/login" className="hover:text-foreground">Staff Login</Link></li>
              <li><Link to="/auth/login" className="hover:text-foreground">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Contact</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> KG 123 St, Kigali, Rwanda</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +250 788 000 000</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@blessingschool.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
            <div>© {new Date().getFullYear()} Blessing School. All rights reserved.</div>
            <div>Crafted with care for our students and families.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16", className)}>{children}</section>;
}