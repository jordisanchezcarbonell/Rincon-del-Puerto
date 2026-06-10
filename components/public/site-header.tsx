import Link from "next/link";
import { BrandMark } from "@/components/public/brand-mark";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import { LinkButton } from "@/components/ui/link-button";

type SiteHeaderProps = {
  locale: Locale;
  currentPath: "/" | "/carta" | "/reservar";
};

export function SiteHeader({ locale, currentPath }: SiteHeaderProps) {
  const content = PUBLIC_CONTENT[locale];
  const menuHref = currentPath === "/" ? "#carta" : `/?lang=${locale}#carta`;
  const reserveHref =
    currentPath === "/" ? "#reservar" : `/?lang=${locale}#reservar`;

  return (
    <header className="sticky top-0 z-30 border-b border-harbor-900/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link className="flex min-w-0 items-center gap-2" href={`/?lang=${locale}`}>
          <BrandMark compact />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-bold text-harbor-900/75 md:flex" aria-label="Principal">
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
          <a
            className="transition hover:text-harbor-900"
            data-analytics-event="directions_button_click"
            href={RESTAURANT_CONFIG.googleMapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            {content.nav.location}
          </a>
        </nav>

        <LinkButton
            analyticsEvent="reservation_button_click"
            className="min-h-11 rounded-full bg-terracotta-700 px-4 hover:bg-terracotta-600 sm:px-5"
            href={reserveHref}
          >
            {content.nav.reserve}
        </LinkButton>
      </div>
    </header>
  );
}
