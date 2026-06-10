import Image from "next/image";
import { ArrowDown, CalendarCheck, Utensils } from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import { LinkButton } from "@/components/ui/link-button";

type HomeHeroProps = {
  locale: Locale;
};

export function HomeHero({ locale }: HomeHeroProps) {
  const content = PUBLIC_CONTENT[locale];

  return (
    <section className="relative overflow-hidden bg-harbor-900 text-white">
      <Image
        priority
        alt={RESTAURANT_CONFIG.name}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        fill
        sizes="100vw"
        src="/hero-restaurant.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(23,59,58,0.92)_0%,rgba(23,59,58,0.66)_43%,rgba(170,74,47,0.22)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-paper to-transparent" />

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-center px-4 py-12 sm:px-6 md:min-h-[680px] md:py-14">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            {content.hero.eyebrow}
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            {content.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-xl font-semibold leading-8 text-white">
            {content.hero.subtitle}
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            {content.hero.description}
          </p>

          <div className="mt-8 grid gap-3 sm:flex">
            <LinkButton
              analyticsEvent="reservation_button_click"
              className="gap-2 bg-terracotta-700 hover:bg-terracotta-600"
              href="#reservar"
            >
              <CalendarCheck aria-hidden="true" size={18} />
              {content.hero.reserve}
            </LinkButton>
            <LinkButton
              analyticsEvent="menu_button_click"
              className="gap-2 border-white/30 bg-white/90"
              href="#carta"
              variant="secondary"
            >
              <Utensils aria-hidden="true" size={18} />
              {content.hero.menu}
            </LinkButton>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {content.trust.map((item) => (
              <span
                className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white/85 backdrop-blur"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>

          <a
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white"
            href="#reservar"
          >
            <ArrowDown aria-hidden="true" size={17} />
            {content.hero.scroll}
          </a>
        </div>
      </div>
    </section>
  );
}
