import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

const apparelNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Customise", to: "/customise" },
  { label: "Collection", to: "/collection" },
  { label: "Appointments", to: "/appointments" },
  { label: "Contact", to: "/contact" },
] as const;

const automotiveNav = [
  { label: "Cars for sale", to: "/automotive" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isAuto = pathname.startsWith("/automotive");
  const nav = isAuto ? automotiveNav : apparelNav;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl px-5 text-xs font-semibold uppercase tracking-[0.16em] sm:px-8 lg:px-12">
          <Link to="/" className={`px-4 py-2.5 ${!isAuto ? "bg-primary text-primary-foreground" : "text-cream/70 hover:text-cream"}`}>Apparel</Link>
          <Link to="/automotive" className={`px-4 py-2.5 ${isAuto ? "bg-primary text-primary-foreground" : "text-cream/70 hover:text-cream"}`}>Automotive</Link>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12">
          <BrandMark to={isAuto ? "/automotive" : "/"} sub={isAuto ? "Automotive" : "Trading Limited"} />
          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-5" aria-label="Main navigation">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} className={`nav-link ${pathname === item.to ? "nav-link-active" : ""}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
            {!isAuto && (
              <Button asChild variant="trade" size="lg">
                <Link to="/enquiry">Request a quote</Link>
              </Button>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <div className="border-t border-border bg-background px-5 py-5 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile navigation">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} className="border-b border-border py-3 font-medium text-foreground" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              {!isAuto && (
                <Button asChild variant="trade" size="lg" className="mt-5 w-full">
                  <Link to="/enquiry" onClick={() => setOpen(false)}>Request a quote</Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
          <div className="grid gap-12 border-b border-cream/15 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <BrandMark />
              <p className="mt-5 max-w-sm text-sm leading-7 text-cream/65">
                Custom shirts, t-shirts, trousers and tuxedos, made to your specification — and a small gallery of cars
                currently for sale.
              </p>
            </div>
            <div>
              <p className="footer-heading">Quick links</p>
              <div className="mt-5 grid gap-3 text-sm text-cream/70">
                {apparelNav.slice(1).map((item) => (
                  <Link key={item.to} to={item.to} className="w-fit hover:text-cream">{item.label}</Link>
                ))}
                <Link to="/automotive" className="w-fit hover:text-cream">Automotive — cars for sale</Link>
              </div>
            </div>
            <div>
              <p className="footer-heading">Get in touch</p>
              <a href="mailto:info@shaaqtrading.com" className="mt-5 block text-sm text-cream/70 hover:text-cream">info@shaaqtrading.com</a>
              <div className="mt-6 flex gap-2">
                <a className="social-button" href="https://facebook.com/shaaqtrading" target="_blank" rel="noreferrer" aria-label="Shaaq Trading on Facebook"><Facebook /></a>
                <a className="social-button" href="https://instagram.com/shaaqtrading" target="_blank" rel="noreferrer" aria-label="Shaaq Trading on Instagram"><Instagram /></a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-7 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Shaaq Trading Limited. All rights reserved.</p>
            <p>Made to your specification.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
