import { ArrowRight, Building2, Factory, Store } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

import { GarmentVisual } from "@/components/garment-visual";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro eyebrow="Our story" title="Built around the details that matter to you.">
        Shaaq Trading makes custom garments for boutiques, brands and businesses — specified by you, sampled with you, and made to order.
      </PageIntro>
      <section className="section-pad bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12">
          <div className="image-frame"><GarmentVisual garment="shirt" tone="#3b5b7a" className="h-full w-full" /></div>
          <div>
            <p className="eyebrow">Our model</p>
            <h2 className="section-title mt-5">Your specification.<br />Our making.</h2>
            <p className="mt-7 text-lg leading-8 text-foreground">You choose every detail — fabric, collar, cuff, stitching, fit and branding — and we make it in the quantity you need.</p>
            <p className="mt-5 leading-8 text-muted-foreground">Before production, you can book an appointment to review samples, check stitching quality and confirm sizing. Every order is made with attention to cloth, construction and consistent finish.</p>
          </div>
        </div>
      </section>
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl"><p className="eyebrow">Who we serve</p><h2 className="section-title mt-5">Made for the specialist trade.</h2></div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Value icon={<Building2 />} number="01" title="Shirt & suit boutiques" text="Full specification control for formal shirts, trousers and tuxedos, with the detailing your customers expect." />
            <Value icon={<Store />} number="02" title="Brands & businesses" text="Branded t-shirts, shirts and uniforms with your logo placed exactly where you want it." />
            <Value icon={<Factory />} number="03" title="Long-term partners" text="Clear communication, repeatable quality and a practical approach to ongoing order requirements." />
          </div>
        </div>
      </section>
      <section className="section-pad bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.75fr] lg:items-center lg:gap-20 lg:px-12">
          <div>
            <p className="eyebrow">Our standard</p>
            <h2 className="section-title mt-5">Quality that earns its place on the rail.</h2>
            <p className="mt-7 max-w-xl leading-8 text-muted-foreground">We believe strong trade relationships begin with a product that performs. Our focus is on balanced fits, dependable construction and fabrics selected for the demands of formal dressing.</p>
            <Button asChild variant="trade" size="xl" className="mt-8"><Link to="/customise">Start customising <ArrowRight /></Link></Button>
          </div>
          <div className="image-frame image-frame-short"><GarmentVisual garment="shirt" className="h-full w-full" /></div>
        </div>
      </section>
    </SiteShell>
  );
}

function Value({ icon, number, title, text }: { icon: ReactNode; number: string; title: string; text: string }) {
  return (
    <article className="border-t border-border pt-6">
      <div className="flex items-center justify-between text-primary"><span className="[&_svg]:size-5">{icon}</span><span className="font-display text-sm">{number}</span></div>
      <h3 className="mt-8 font-display text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
    </article>
  );
}
