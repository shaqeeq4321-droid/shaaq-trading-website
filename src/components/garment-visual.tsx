type GarmentKind = "shirt" | "tshirt" | "trousers" | "tuxedo";

const paths: Record<GarmentKind, string> = {
  shirt:
    "M100 20 L128 20 L150 42 L138 58 L128 50 L128 180 L72 180 L72 50 L62 58 L50 42 L72 20 Z M100 20 C100 32 100 32 100 32 C100 38 118 38 118 32 L118 20",
  tshirt:
    "M96 24 L124 24 L158 44 L144 66 L132 56 L132 176 L68 176 L68 56 L56 66 L42 44 L76 24 Z",
  trousers:
    "M62 20 L138 20 L138 44 L128 180 L104 180 L100 90 L96 180 L72 180 L62 44 Z",
  tuxedo:
    "M98 20 L126 20 L150 40 L138 56 L126 48 L126 110 C126 150 118 176 112 176 L88 176 C82 176 74 150 74 110 L74 48 L62 56 L50 40 L74 20 Z M96 20 L82 46 L100 108 L96 20 M128 20 L142 46 L124 108 L128 20",
};

export function GarmentVisual({
  garment,
  tone = "var(--color-primary)",
  className,
}: {
  garment: GarmentKind;
  tone?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${garment} illustration`}>
      <rect width="200" height="200" fill="var(--color-secondary)" />
      <pattern id={`weave-${garment}`} width="5" height="5" patternUnits="userSpaceOnUse">
        <path d="M0 5 L5 0" stroke="var(--color-border)" strokeWidth="0.4" />
      </pattern>
      <rect width="200" height="200" fill={`url(#weave-${garment})`} opacity="0.35" />
      <path d={paths[garment]} fill="var(--color-card)" stroke={tone} strokeWidth="2.25" strokeLinejoin="round" />
    </svg>
  );
}
