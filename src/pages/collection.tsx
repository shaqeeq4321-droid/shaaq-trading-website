import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { CatalogueCard } from "@/components/catalogue-card";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { catalogue } from "@/lib/catalogue";

export default function CollectionPage() {
  return (
    <SiteShell>
      <PageIntro eyebrow="The collection" title="Formalwear foundations, considered in every detail.">
        A representative selection of our approach to cloth, collar and finish. Pick a starting point, then customise every detail in the studio.
      </PageIntro>
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {catalogue.map((item) => <CatalogueCard key={item.name} item={item} />)}
          </div>
          <div className="mt-16 border-t border-border pt-10 text-center">
            <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground">Styles shown are representative catalogue concepts. Final specifications, colours and order quantities can be discussed with our trade team.</p>
            <Button asChild variant="trade" size="xl" className="mt-7"><Link to="/customise">Customise a shirt <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
