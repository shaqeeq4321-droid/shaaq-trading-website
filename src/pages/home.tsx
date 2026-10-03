import { ArrowRight, CalendarCheck, PenTool, Ruler, Sparkles, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

import { ExplodedShirt } from "@/components/exploded-shirt";
import { GarmentVisual } from "@/components/garment-visual";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

const garmentCards = [
  { name: "Formal shirts", id: "shirt" as const, detail: "Collars, cuffs, plackets, stitch density" },
  { name: "T-shirts", id: "tshirt" as const, detail: "Weights, knits, necklines, decoration" },
  { name: "Trousers", id: "trousers" as const, detail: "Waistbands, pleats, pockets, hems" },
  { name: "Tuxedo & dinner suits", id: "tuxedo" as const, detail: "Lapels, trims, bibs, hand finishing" },
];

export default function HomePage() {
  return (
    <SiteShell>
      <section className="hero-section">
        <ExplodedShirt className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="hero-overlay" />
        <div className="relative mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl items-end px-5 pb-16 pt-24 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <div className="max-w-4xl">
            <p className="eyebrow text-cream/80">Custom garment specialists</p>
            <h1 className="mt-6 font-display text-5xl leading-[0.98] text-cream sm:text-7xl lg:text-[5.4rem]">
              Every detail,<br />built your way.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-cream/80 sm:text-lg">
              Custom shirts, t-shirts, trousers and tuxedos. Choose each detail, add your own logo, describe the fabric and
              stitching you want, then order the quantity you need.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="trade" size="xl"><Link to="/customise">Start customising <ArrowRight /></Link></Button>
              <Button asChild variant="cream" size="xl"><Link to="/appointments">Book a sample visit</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <div><p className="eyebrow">What we do</p><h2 className="section-title mt-5">Garments made to your specification.</h2></div>
          <div className="lg:pt-8">
            <p className="text-xl leading-9 text-foreground">We make formal shirts, t-shirts, trousers and evening wear to order — from single boutique ranges to full uniform programmes.</p>
            <p className="mt-6 leading-8 text-muted-foreground">Build your garment online, upload your logo to preview how it sits, and tell us exactly what fabric quality and stitching you expect. Review real samples with us, then confirm your order with confidence.</p>
            <Button asChild variant="link" className="mt-6 h-auto p-0 text-sm"><Link to="/about">How we work <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
            <div><p className="eyebrow">Choose a garment</p><h2 className="section-title mt-4">Start with what you're making</h2></div>
            <Button asChild variant="outline" className="hidden sm:inline-flex"><Link to="/customise">Open the studio <ArrowRight /></Link></Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {garmentCards.map((card) => (
              <Link key={card.id} to={`/customise?garment=${card.id}`} className="group product-card">
                <div className="aspect-[4/5] overflow-hidden bg-background">
                  <GarmentVisual garment={card.id} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.025]" />
                </div>
                <div className="border-x border-b border-border bg-background p-5">
                  <h3 className="font-display text-xl text-foreground">{card.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.detail}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Customise <ArrowRight className="size-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
          <Button asChild variant="outline" size="lg" className="mt-8 w-full sm:hidden"><Link to="/customise">Open the studio <ArrowRight /></Link></Button>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl"><p className="eyebrow">How it works</p><h2 className="section-title mt-5">From specification to delivery.</h2></div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            <Step number="01" icon={<PenTool />} title="Build the garment" text="Select every detail with a button per option, from collar shape to stitch density." />
            <Step number="02" icon={<Upload />} title="Add your logo" text="Upload your artwork and position it on the garment to preview placement and scale." />
            <Step number="03" icon={<CalendarCheck />} title="Book a preview" text="Reserve a slot in the calendar to review samples, quality and stitching in person." />
            <Step number="04" icon={<Ruler />} title="Confirm and order" text="Approve the specification and sizing, then order the number of pieces you need." />
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl"><p className="eyebrow">Specification detail</p><h2 className="section-title mt-5">Every spec your boutique asks for.</h2></div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <SpecCard
              title="Shirt boutiques"
              intro="Full shirtmaking detail, specified option by option."
              items={["Collar: cutaway, spread, semi-cutaway, point, button-down, wing, mandarin", "Collar construction: fused, soft unfused, removable bones, hand-finished", "Cuffs: single barrel, double (French), rounded, mitred", "Plackets: standard, French, covered fly, pleated bib", "Fabrics: poplin, twill, pinpoint, royal oxford, herringbone, sateen", "Back shaping, pockets, buttons, monogram position", "Stitch density from 7 to 12 stitches per inch"]}
            />
            <SpecCard
              title="Suit & tuxedo boutiques"
              intro="Evening wear detailing and hand finishing."
              items={["Lapels: peak or shawl satin, notch or peak grosgrain, self fabric", "Fastening: one button, two button, double-breasted 4x2 or 6x2", "Construction: fused, half canvas, full canvas, hand-padded lapel", "Trims: satin, grosgrain, velvet; jetted or flap pockets", "Dress shirt: pleated or marcella bib, wing collar, double cuffs, studs", "Trouser braid, cummerbund, low-cut waistcoat, braces", "Pick stitching, Milanese buttonholes, monogrammed lining"]}
            />
          </div>
          <Button asChild variant="trade" size="xl" className="mt-10"><Link to="/customise">Specify your garment <ArrowRight /></Link></Button>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="image-frame image-frame-short border border-border">
            <GarmentVisual garment="tshirt" className="h-full w-full" />
          </div>
          <div>
            <p className="eyebrow">Your branding</p>
            <h2 className="section-title mt-5">Preview your logo on the garment.</h2>
            <p className="mt-7 leading-8 text-muted-foreground">Upload your logo, choose a placement such as left chest, cuff, collar band or upper back, then drag it into position and scale it. What you see is sent to us with your request, so there's no guesswork about where your branding sits.</p>
            <Button asChild variant="outline" size="xl" className="mt-8"><Link to="/customise">Try the logo preview <Sparkles /></Link></Button>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-20">
          <div>
            <p className="eyebrow text-cream/60">Ready when you are</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl">Preview the samples, then order with confidence.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cream" size="xl"><Link to="/appointments">Book an appointment</Link></Button>
            <Button asChild variant="outline" size="xl" className="border-cream/40 bg-transparent text-cream hover:bg-cream hover:text-ink"><Link to="/enquiry">Request a quote</Link></Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Step({ number, icon, title, text }: { number: string; icon: ReactNode; title: string; text: string }) {
  return (
    <div className="border-t border-border pt-6">
      <div className="flex items-center justify-between text-primary"><span className="[&_svg]:size-5">{icon}</span><span className="font-display text-sm">{number}</span></div>
      <h3 className="mt-7 font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

function SpecCard({ title, intro, items }: { title: string; intro: string; items: string[] }) {
  return (
    <article className="border border-border bg-background p-6 sm:p-8">
      <h3 className="font-display text-3xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{intro}</p>
      <ul className="spec-list mt-6">
        {items.map((item) => (
          <li key={item}><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{item}</li>
        ))}
      </ul>
    </article>
  );
}
