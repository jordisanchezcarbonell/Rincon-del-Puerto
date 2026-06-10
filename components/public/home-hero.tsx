import Image from "next/image";
import { CalendarCheck, MapPin, Phone, Utensils } from "lucide-react";
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
        className="absolute inset-0 h-full w-full object-cover opacity-82"
        fill
        sizes="100vw"
        src="/hero-restaurant.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,49,47,0.9)_0%,rgba(16,49,47,0.64)_38%,rgba(16,49,47,0.18)_100%)]" />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-12 sm:px-6 md:min-h-[650px] md:py-16">
        <div className="max-w-2xl border-l border-white/30 pl-5 sm:pl-7">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-white/76">
            {content.hero.eyebrow}
          </p>
          <h1 className="font-serif text-5xl font-bold leading-none tracking-tight sm:text-6xl md:text-7xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-xl font-semibold leading-8 text-white">
            {content.hero.subtitle}
          </p>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            {content.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              analyticsEvent="reservation_button_click"
              className="gap-2 rounded-full bg-terracotta-700 hover:bg-terracotta-600"
              href="#reservar"
            >
              <CalendarCheck aria-hidden="true" size={18} />
              {content.hero.reserve}
            </LinkButton>
            <LinkButton
              analyticsEvent="menu_button_click"
              className="gap-2 rounded-full border-white/30 bg-white/90"
              href="#carta"
              variant="secondary"
            >
              <Utensils aria-hidden="true" size={18} />
              {content.hero.menu}
            </LinkButton>
          </div>

          <dl className="mt-9 grid gap-3 text-sm text-white/78 sm:grid-cols-3">
            <div>
              <dt className="flex items-center gap-2 font-bold text-white">
                <Utensils aria-hidden="true" size={16} />
                Cocina
              </dt>
              <dd className="mt-1">Mediterránea y de puerto</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-bold text-white">
                <MapPin aria-hidden="true" size={16} />
                Zona
              </dt>
              <dd className="mt-1">Puerto de Garrucha</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-bold text-white">
                <Phone aria-hidden="true" size={16} />
                Teléfono
              </dt>
              <dd className="mt-1">{RESTAURANT_CONFIG.phone}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
