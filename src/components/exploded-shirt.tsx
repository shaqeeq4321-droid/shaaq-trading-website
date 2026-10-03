/** Exploded-view hero illustration: a shirt's construction pieces drawn apart and labelled. */
export function ExplodedShirt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Exploded construction view of a formal shirt">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-cream)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-cream)" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#fade)" strokeWidth="2">
        {/* collar */}
        <path d="M330 70 L400 50 L470 70 L450 100 L400 86 L350 100 Z" />
        {/* yoke */}
        <path d="M300 130 L500 130 L480 175 L320 175 Z" />
        {/* body */}
        <path d="M300 175 L500 175 L515 420 L440 420 L430 220 L370 220 L360 420 L285 420 Z" />
        {/* left sleeve */}
        <path d="M300 175 L190 210 L175 330 L235 345 L270 240 L300 215 Z" />
        {/* right sleeve */}
        <path d="M500 175 L610 210 L625 330 L565 345 L530 240 L500 215 Z" />
        {/* left cuff */}
        <path d="M172 330 L238 345 L232 385 L178 372 Z" />
        {/* right cuff */}
        <path d="M568 345 L628 330 L622 372 L574 385 Z" />
        {/* placket */}
        <path d="M395 175 L405 175 L410 420 L390 420 Z" />
        {/* pocket */}
        <path d="M335 230 L385 230 L385 275 L335 275 Z" />
      </g>
      <g fontSize="12" fontWeight="600" letterSpacing="2" fill="var(--color-cream)" opacity="0.75">
        <text x="505" y="60">COLLAR</text>
        <line x1="500" y1="55" x2="465" y2="72" stroke="var(--color-cream)" strokeWidth="1" opacity="0.5" />
        <text x="520" y="150">YOKE</text>
        <line x1="515" y1="145" x2="485" y2="150" stroke="var(--color-cream)" strokeWidth="1" opacity="0.5" />
        <text x="640" y="220">SLEEVE</text>
        <line x1="635" y1="215" x2="615" y2="220" stroke="var(--color-cream)" strokeWidth="1" opacity="0.5" />
        <text x="640" y="365">CUFF</text>
        <line x1="635" y1="358" x2="615" y2="355" stroke="var(--color-cream)" strokeWidth="1" opacity="0.5" />
        <text x="130" y="300">SLEEVE</text>
        <text x="420" y="130">PLACKET</text>
        <text x="250" y="255">POCKET</text>
      </g>
    </svg>
  );
}
