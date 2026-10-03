import { CalendarClock, Gauge, Tag } from "lucide-react";
import { useEffect, useState } from "react";

import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { OptionButton } from "@/components/option-button";
import { loadCars, type CarListing } from "@/lib/cars";

type Filter = "all" | "in-stock" | "sold";

export default function AutomotivePage() {
  const [cars, setCars] = useState<CarListing[] | null>(null);
  const [filter, setFilter] = useState<Filter>("in-stock");

  useEffect(() => {
    let active = true;
    loadCars().then((data) => { if (active) setCars(data); });
    return () => { active = false; };
  }, []);

  const visible = (cars ?? []).filter((car) => filter === "all" || car.status === filter);

  return (
    <SiteShell>
      <PageIntro eyebrow="Automotive" title="Cars currently available.">
        Vehicles sourced and prepared for sale. Get in touch about any listing below, or check back — the gallery is
        updated as stock changes.
      </PageIntro>
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2">
            <OptionButton label="In stock" selected={filter === "in-stock"} onClick={() => setFilter("in-stock")} />
            <OptionButton label="Sold" selected={filter === "sold"} onClick={() => setFilter("sold")} />
            <OptionButton label="All" selected={filter === "all"} onClick={() => setFilter("all")} />
          </div>

          {cars === null && (
            <p className="mt-10 text-sm text-muted-foreground">Loading listings…</p>
          )}

          {cars !== null && visible.length === 0 && (
            <p className="mt-10 border border-border bg-secondary p-6 text-sm leading-6 text-muted-foreground">
              No listings here yet. Check back soon.
            </p>
          )}

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function CarCard({ car }: { car: CarListing }) {
  const sold = car.status === "sold";
  return (
    <article className="product-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {car.images[0] ? (
          <img src={car.images[0]} alt={car.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="grid h-full place-items-center text-xs text-muted-foreground">No photo</div>
        )}
        <span
          className={`absolute left-3 top-3 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${
            sold ? "bg-ink text-cream" : "bg-primary text-primary-foreground"
          }`}
        >
          {sold ? "Sold" : "In stock"}
        </span>
      </div>
      <div className="border-x border-b border-border bg-background p-5">
        <h3 className="font-display text-xl text-foreground">{car.title}</h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><CalendarClock className="size-3.5" /> {car.year}</span>
          <span className="inline-flex items-center gap-1.5"><Gauge className="size-3.5" /> {car.mileage}</span>
          <span className="inline-flex items-center gap-1.5"><Tag className="size-3.5" /> {car.price}</span>
        </div>
        {car.description && <p className="mt-3 text-sm leading-6 text-muted-foreground">{car.description}</p>}
      </div>
    </article>
  );
}
