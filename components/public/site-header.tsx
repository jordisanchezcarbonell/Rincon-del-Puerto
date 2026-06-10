import Link from "next/link";
import { Phone } from "lucide-react";
import { BrandMark } from "@/components/public/brand-mark";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import { getRestaurantStatus } from "@/lib/restaurant-hours";

type SiteHeaderProps = {
  locale: Locale;
  currentPath: "/" | "/carta" | "/reservar";
};

export function SiteHeader({ locale, currentPath }: SiteHeaderProps) {
  const content = PUBLIC_CONTENT[locale];
  const menuHref = `/carta?lang=${locale}`;
  const reserveHref =
    currentPath === "/" ? "#reservar" : `/?lang=${locale}#reservar`;
  const locationHref =
    currentPath === "/" ? "#ubicacion" : `/?lang=${locale}#ubicacion`;
  const status = getRestaurantStatus();
  const statusLabel = status.label[locale];

  return (
    <header className="sticky top-0 z-30 border-b border-harbor-900/10 bg-paper/95 backdrop-blur-xl">
      <div className="border-b border-harbor-900/10 bg-harbor-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] sm:px-6">
          <span className="hidden sm:inline">{content.topBar.place}</span>
          <a
            className="flex items-center gap-2 hover:text-terracotta-300"
            href={RESTAURANT_CONFIG.phoneHref}
          >
            <Phone aria-hidden="true" size={13} />
            <span>{RESTAURANT_CONFIG.phone}</span>
          </a>
          <span
            className={
              status.openNow
                ? "flex items-center gap-2 text-white"
                : "flex items-center gap-2 text-white/70"
            }
          >
            <span
              aria-hidden="true"
              className={
                status.openNow
                  ? "h-1.5 w-1.5 rounded-full bg-terracotta-300"
                  : "h-1.5 w-1.5 rounded-full bg-white/40"
              }
            />
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link className="flex min-w-0 items-center gap-2" href={`/?lang=${locale}`}>
          <BrandMark compact />
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-harbor-900/75 md:flex"
          aria-label="Principal"
        >
          <Link
            className="transition hover:text-harbor-900"
            data-analytics-event="menu_button_click"
            href={menuHref}
          >
            {content.nav.menu}
          </Link>
          <Link
            className="transition hover:text-harbor-900"
            data-analytics-event="reservation_button_click"
            href={reserveHref}
          >
            {content.nav.reserve}
          </Link>
          <Link
            className="transition hover:text-harbor-900"
            data-analytics-event="directions_button_click"
            href={locationHref}
          >
            {content.nav.location}
          </Link>
        </nav>

        <Link
          className="inline-flex min-h-11 items-center justify-center bg-terracotta-700 px-5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-terracotta-600 sm:px-6"
          data-analytics-event="reservation_button_click"
          href={reserveHref}
        >
          {content.nav.reserve}
        </Link>
      </div>
    </header>
  );
}
