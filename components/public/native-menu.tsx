import Image from "next/image";
import { CalendarCheck, Languages, MapPin, Utensils } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import {
  MENU_LANGUAGE_LABELS,
  MENU_PAGES,
  MENU_SECTIONS
} from "@/lib/menu/menu-pages";
import { cn } from "@/lib/utils";

type NativeMenuProps = {
  locale: Locale;
};

export function NativeMenu({ locale }: NativeMenuProps) {
  const content = PUBLIC_CONTENT[locale].menuPage;

  return (
    <main className="bg-paper">
      <section className="border-b border-harbor-900/10 bg-harbor-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
              <Utensils aria-hidden="true" size={17} />
              {content.eyebrow}
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg">
              {content.description}
            </p>
            <div className="mt-7 grid gap-3 sm:flex">
              <LinkButton
                analyticsEvent="reservation_button_click"
                className="gap-2"
                href={`/reservar?lang=${locale}`}
              >
                <CalendarCheck aria-hidden="true" size={18} />
                {content.reserve}
              </LinkButton>
              <LinkButton
                analyticsEvent="directions_button_click"
                className="gap-2"
                external
                href={RESTAURANT_CONFIG.googleMapsUrl}
                variant="secondary"
              >
                <MapPin aria-hidden="true" size={18} />
                {content.directions}
              </LinkButton>
            </div>
          </div>

          <div className="mt-9 rounded-lg border border-white/15 bg-white/10 p-4">
            <div className="mb-4 flex items-start gap-3">
              <span className="rounded-lg bg-white/10 p-2 text-white">
                <Languages aria-hidden="true" size={20} />
              </span>
              <div>
                <h2 className="font-bold">{content.quickAccess}</h2>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  {content.quickAccessDescription}
                </p>
              </div>
            </div>
            <nav
              aria-label={content.quickAccess}
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap"
            >
              {MENU_SECTIONS.map((section) => (
                <a
                  className="min-w-[9.5rem] rounded-lg border border-white/15 bg-white/10 px-3 py-3 text-sm transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-0"
                  href={`#${section.id}`}
                  key={section.id}
                >
                  <span className="block font-bold">
                    {section.label[locale]}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/70">
                    {section.description[locale]}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="mb-7 flex flex-col gap-3 border-b border-harbor-900/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-harbor-600">
              {content.pagesLabel}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-harbor-900 sm:text-3xl">
              {content.fullMenuTitle}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-harbor-900/70">
            {content.sourceNote}
          </p>
        </div>

        <div className="grid gap-8 md:gap-10">
          {MENU_PAGES.map((page) => (
            <article
              className={cn(
                "mx-auto w-full scroll-mt-24 rounded-lg border border-harbor-900/10 bg-white p-3 shadow-soft",
                page.orientation === "landscape" ? "max-w-5xl" : "max-w-3xl"
              )}
              id={`page-${page.number}`}
              key={page.src}
              lang={page.language === "visual" ? locale : page.language}
            >
              <div className="flex flex-col gap-3 px-1 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-harbor-600">
                    {content.pageLabel} {page.number}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-harbor-900">
                    {page.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-harbor-900/60">
                    {page.summary}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-harbor-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-harbor-600">
                  {MENU_LANGUAGE_LABELS[page.language][locale]}
                </span>
              </div>
              <Image
                alt={`${content.pageLabel} ${page.number}: ${page.title}`}
                className="h-auto w-full rounded-md border border-harbor-900/10"
                height={page.height}
                priority={page.number === 1}
                sizes={
                  page.orientation === "landscape"
                    ? "(min-width: 1024px) 960px, calc(100vw - 32px)"
                    : "(min-width: 768px) 720px, calc(100vw - 32px)"
                }
                src={page.src}
                width={page.width}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
