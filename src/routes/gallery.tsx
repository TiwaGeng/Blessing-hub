import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, Section } from "@/components/layout/PublicLayout";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/gallery")({ component: Gallery });

const GRADIENTS = [
  "from-blue-500 to-indigo-700","from-amber-400 to-orange-600","from-emerald-500 to-teal-700",
  "from-rose-500 to-red-700","from-violet-500 to-purple-800","from-cyan-500 to-sky-700",
  "from-yellow-400 to-amber-600","from-lime-500 to-green-700","from-pink-500 to-fuchsia-700",
];

function Gallery() {
  return (
    <PublicLayout>
      <Section>
        <div className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Moments</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">School Gallery</h1>
        <p className="text-muted-foreground mt-3">Life at Blessing School in pictures.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-10">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} grid place-items-center text-white`}>
              <Camera className="h-8 w-8 opacity-80" />
            </div>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}