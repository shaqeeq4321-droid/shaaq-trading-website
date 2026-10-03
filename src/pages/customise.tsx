import { useSearchParams } from "react-router-dom";

import { GarmentBuilder } from "@/components/garment-builder";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";

export default function CustomisePage() {
  const [params] = useSearchParams();
  const garment = params.get("garment") ?? undefined;

  return (
    <SiteShell>
      <PageIntro eyebrow="Customisation studio" title="Build the garment, detail by detail.">
        Choose a garment, select every specification, add your own logo to preview placement, and describe the fabric and
        stitching you need. Send it to us and we'll price it for the quantity you want.
      </PageIntro>
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <GarmentBuilder {...(garment ? { initialGarment: garment } : {})} />
        </div>
      </section>
    </SiteShell>
  );
}
