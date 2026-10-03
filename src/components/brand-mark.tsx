import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/** Crafted shark-forming-"S" mark on a cream textured tile, per the Shaaq Trading brand. */
function ShaaqMark() {
  return (
    <svg viewBox="0 0 64 40" className="h-auto w-14" aria-hidden="true">
      <rect width="64" height="40" fill="var(--color-secondary)" />
      <pattern id="tile" width="7" height="7" patternUnits="userSpaceOnUse">
        <path d="M0 7 L7 0" stroke="var(--color-border)" strokeWidth="0.6" />
      </pattern>
      <rect width="64" height="40" fill="url(#tile)" opacity="0.5" />
      <path
        d="M6 28 C 14 10, 30 6, 42 10 C 36 11, 30 14, 27 19 C 34 17, 44 17, 52 22 C 45 21, 38 22, 34 26 C 42 25, 50 27, 57 33 C 47 30, 37 30, 29 33 C 22 35.5, 13 34, 6 28 Z"
        fill="var(--color-primary)"
      />
      <circle cx="40" cy="13" r="1.1" fill="var(--color-secondary)" />
    </svg>
  );
}

export function BrandMark({
  compact = false,
  className,
  sub = "Trading Limited",
  to = "/",
}: {
  compact?: boolean;
  className?: string;
  sub?: string;
  to?: string;
}) {
  return (
    <Link to={to} className={cn("group inline-flex min-w-0 items-center gap-3", className)}>
      <span className="logo-tile grid h-11 w-16 shrink-0 place-items-center overflow-hidden">
        <ShaaqMark />
      </span>
      {!compact && (
        <span className="min-w-0 leading-none">
          <span className="block font-display text-[1.3rem] font-semibold italic text-primary">SHAAQ</span>
          <span className="mt-1 block text-[0.57rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {sub}
          </span>
        </span>
      )}
    </Link>
  );
}
