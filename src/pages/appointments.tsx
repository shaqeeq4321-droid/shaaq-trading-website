import { Layers, Ruler, Scissors } from "lucide-react";
import type { ReactNode } from "react";

import { AppointmentForm } from "@/components/appointment-form";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";

export default function AppointmentsPage() {
  return (
    <SiteShell>
      <PageIntro eyebrow="Appointments" title="See the samples before you commit.">
        Pick a date and time in the calendar below and tell us what you'd like to review. We'll have the fabrics, stitching
        examples and finished garments ready for your visit.
      </PageIntro>
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-3">
            <Point icon={<Layers />} title="Fabrics in hand" text="Compare weights, weaves and finishes side by side before choosing." />
            <Point icon={<Scissors />} title="Stitching up close" text="Inspect seam quality, stitch density and hand-finished detailing." />
            <Point icon={<Ruler />} title="Fit and sizing" text="Try sample sizes and agree the grading that suits your customers." />
          </div>
        </div>
      </section>
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <AppointmentForm />
        </div>
      </section>
    </SiteShell>
  );
}

function Point({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="border-t border-border pt-6">
      <span className="text-primary [&_svg]:size-5">{icon}</span>
      <h2 className="mt-6 font-display text-2xl text-foreground">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}
