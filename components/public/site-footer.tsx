import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const content = PUBLIC_CONTENT[locale];
  const quickLinks = [
    {
      href: `/carta?lang=${locale}`,
      label: content.nav.menu
    },
    {
      href: `/?lang=${locale}#reservar`,
      label: content.nav.reserve
    },
    {
      href: `/?lang=${locale}#ubicacion`,
      label: content.nav.location
    }
  ];

  return (
    <footer className="border-t border-harbor-900/15 bg-harbor-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 text-sm sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
        <div>
          <p className="font-serif text-3xl font-bold uppercase leading-tight tracking-[0.02em]">
            Rincón del
            <br />
            <span className="text-terracotta-300">Puerto</span>
          </p>
          <p className="mt-4 max-w-xs leading-6 text-white/70">
            {content.footer.title}
          </p>
        </div>

        <div className="grid gap-3 text-white/80">
          <p className="font-serif text-xs uppercase tracking-[0.22em] text-white/55">
            {content.nav.location}
          </p>
          <a
            className="inline-flex items-start gap-2 hover:text-white"
            href={RESTAURANT_CONFIG.googleMapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" size={14} className="mt-1 shrink-0" />
            <span className="leading-6">{RESTAURANT_CONFIG.address}</span>
          </a>
          <a
            className="inline-flex items-center gap-2 hover:text-white"
            href={RESTAURANT_CONFIG.phoneHref}
          >
            <Phone aria-hidden="true" size={14} />
            {RESTAURANT_CONFIG.phone}
          </a>
        </div>

        <div className="grid gap-3 text-white/80">
          <p className="font-serif text-xs uppercase tracking-[0.22em] text-white/55">
            {content.footer.hoursTitle}
          </p>
          <ul className="grid gap-1.5 leading-6">
            {RESTAURANT_CONFIG.reservationHours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <nav className="grid gap-3" aria-label={content.footer.quickLinks}>
          <p className="font-serif text-xs uppercase tracking-[0.22em] text-white/55">
            {content.footer.quickLinks}
          </p>
          {quickLinks.map((link) => (
            <Link
              className="text-white/80 hover:text-white"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} {RESTAURANT_CONFIG.name}.</span>
          <span className="font-serif italic">
            {locale === "es"
              ? "Puerto de Garrucha, Almería."
              : "Garrucha harbour, Almería."}
          </span>
        </div>
      </div>
    </footer>
  );
}
