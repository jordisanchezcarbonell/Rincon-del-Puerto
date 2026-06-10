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
      href: `/?lang=${locale}#carta`,
      label: content.nav.menu
    },
    {
      href: `/?lang=${locale}#reservar`,
      label: content.nav.reserve
    },
    {
      href: RESTAURANT_CONFIG.googleMapsUrl,
      label: content.nav.location,
      external: true
    }
  ];

  return (
    <footer className="border-t border-harbor-900/10 bg-harbor-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:px-6 md:grid-cols-[1fr_auto_auto]">
        <div>
          <p className="font-serif text-2xl font-bold">{RESTAURANT_CONFIG.name}</p>
          <p className="mt-2 max-w-sm leading-6 text-white/70">
            {content.footer.title}
          </p>
        </div>

        <div className="grid gap-3 text-white/78">
          <a
            className="inline-flex items-start gap-2 hover:text-white"
            href={RESTAURANT_CONFIG.googleMapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" size={16} />
            {RESTAURANT_CONFIG.address}
          </a>
          <a
            className="inline-flex items-center gap-2 hover:text-white"
            href={RESTAURANT_CONFIG.phoneHref}
          >
            <Phone aria-hidden="true" size={16} />
            {RESTAURANT_CONFIG.phone}
          </a>
        </div>

        <nav className="grid gap-2" aria-label={content.footer.quickLinks}>
          <p className="font-bold text-white">{content.footer.quickLinks}</p>
          {quickLinks.map((link) =>
            link.external ? (
              <a
                className="text-white/70 hover:text-white"
                href={link.href}
                key={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ) : (
              <Link
                className="text-white/70 hover:text-white"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}
