import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { GarmentVisual } from "@/components/garment-visual";
import type { catalogue } from "@/lib/catalogue";

type CatalogueItem = (typeof catalogue)[number];

export function CatalogueCard({ item }: { item: CatalogueItem }) {
  return (
    <article className="product-card group">
      <div className="aspect-[4/5] overflow-hidden bg-secondary">
        <GarmentVisual garment="shirt" tone={item.tone} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.025]" />
      </div>
      <div className="border-x border-b border-border bg-background p-5 sm:p-6">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">{item.detail}</p>
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
          </div>
          <Link to={`/enquiry?style=${encodeURIComponent(item.name)}`} className="icon-link" aria-label={`Enquire about ${item.name}`}>
            <ArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
