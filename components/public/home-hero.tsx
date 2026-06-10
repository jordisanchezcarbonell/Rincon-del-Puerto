import Image from "next/image";
import Link from "next/link";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import { getRestaurantStatus } from "@/lib/restaurant-hours";

type HomeHeroProps = {
  locale: Locale;
};

export function HomeHero({ locale }: HomeHeroProps) {
  const content = PUBLIC_CONTENT[locale];
  const status = getRestaurantStatus();

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <div className="flex items-center gap-3 text-terracotta-700">
            <span aria-hidden="true" className="h-px w-16 bg-terracotta-700/70" />
            <span aria-hidden="true" className="font-serif text-base">◇</span>
            <span aria-hidden="true" className="h-px w-16 bg-terracotta-700/70" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-terracotta-700">
            {content.hero.since}
          </p>

          <h1 className="mt-5 font-serif text-6xl font-bold uppercase leading-[0.86] tracking-[0.01em] text-harbor-900 sm:text-7xl lg:text-[6.25rem]">
            Rincón del
            <br />
            Puerto
          </h1>

          <p className="mt-7 max-w-md font-serif text-xl italic leading-snug text-harbor-900/85 sm:text-2xl">
            {content.hero.tagline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-[3.5rem] items-center justify-center border border-terracotta-700 bg-harbor-900 px-7 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition hover:bg-tide-700"
              data-analytics-event="reservation_button_click"
              href="#reservar"
            >
              ⚓ {content.hero.reserve}
            </Link>
            <Link
              className="inline-flex min-h-[3.5rem] items-center justify-center border border-terracotta-700 bg-white/70 px-7 text-sm font-semibold uppercase tracking-[0.14em] text-harbor-900 backdrop-blur transition hover:bg-white"
              data-analytics-event="menu_button_click"
              href="/carta"
            >
              ☰ {content.hero.menu}
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-harbor-900/70">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="font-serif text-base">◆</span>
              <span>{content.topBar.place}</span>
            </div>
            <span aria-hidden="true" className="hidden h-3 w-px bg-harbor-900/20 sm:block" />
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={
                  status.openNow
                    ? "h-1.5 w-1.5 rounded-full bg-terracotta-600"
                    : "h-1.5 w-1.5 rounded-full bg-harbor-900/30"
                }
              />
              <span>{status.label[locale]}</span>
            </div>
            <span aria-hidden="true" className="hidden h-3 w-px bg-harbor-900/20 sm:block" />
            <a
              className="font-medium text-harbor-900 underline-offset-4 hover:underline"
              href={RESTAURANT_CONFIG.phoneHref}
            >
              {RESTAURANT_CONFIG.phone}
            </a>
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4">
            <div className="relative col-span-5 row-span-4 overflow-hidden border border-harbor-900/15 bg-harbor-900/5 lg:col-span-3 lg:row-span-6">
              <Image
                priority
                alt={RESTAURANT_CONFIG.name}
                className="h-full w-full object-cover"
                height={780}
                sizes="(max-width: 1024px) 100vw, 40vw"
                src="/hero-collage-1.jpg"
                width={560}
              />
            </div>
            <div className="relative col-span-3 row-span-2 overflow-hidden border border-harbor-900/15 bg-harbor-900/5 lg:col-span-2 lg:row-span-3">
              <Image
                alt=""
                className="h-full w-full object-cover"
                height={360}
                sizes="(max-width: 1024px) 60vw, 24vw"
                src="/hero-collage-2.jpg"
                width={400}
              />
            </div>
            <div className="relative col-span-2 row-span-2 overflow-hidden border border-harbor-900/15 bg-harbor-900/5 lg:col-span-2 lg:row-span-3">
              <Image
                alt=""
                className="h-full w-full object-cover"
                height={360}
                sizes="(max-width: 1024px) 40vw, 24vw"
                src="/hero-collage-3.jpg"
                width={400}
              />
            </div>
          </div>

          <p className="mt-3 text-xs italic text-harbor-900/55">
            {content.hero.caption}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <hr className="border-harbor-900/10" />
      </div>
    </section>
  );
}
