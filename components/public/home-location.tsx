import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";



type HomeLocationProps = {
  locale: Locale;
};

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Restaurante+Rincón+del+Puerto+Garrucha&output=embed";

export function HomeLocation({ locale }: HomeLocationProps) {
  const t = PUBLIC_CONTENT[locale].location;
  const hours = PUBLIC_CONTENT[locale].hours.lines;

  return (
    <section
      id="ubicacion"
      className="border-t border-harbor-900/10 bg-pearl px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta-700">
            ◇ {t.kicker}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold uppercase leading-tight tracking-[0.01em] text-harbor-900 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-harbor-900/75">
            {t.description}
          </p>

          <dl className="mt-10 grid gap-6 border-t border-harbor-900/15 pt-8">
            <div className="grid gap-1">
              <dt className="font-serif text-xs uppercase tracking-[0.22em] text-harbor-900/60">
                {t.addressLabel}
              </dt>
              <dd className="text-base text-harbor-900">
                {RESTAURANT_CONFIG.address}
              </dd>
            </div>

            <div className="grid gap-1">
              <dt className="font-serif text-xs uppercase tracking-[0.22em] text-harbor-900/60">
                {t.hoursLabel}
              </dt>
              <dd className="grid gap-1 text-base text-harbor-900">
                {hours.map((line) => (
                  <span key={line} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="font-serif text-xs text-terracotta-700">
                      ◆
                    </span>
                    <span>{line}</span>
                  </span>
                ))}
              </dd>
            </div>

            <div className="grid gap-1">
              <dt className="font-serif text-xs uppercase tracking-[0.22em] text-harbor-900/60">
                {t.phoneLabel}
              </dt>
              <dd>
                <a
                  className="inline-flex items-center gap-2 font-serif text-2xl text-harbor-900 hover:text-terracotta-700"
                  href={RESTAURANT_CONFIG.phoneHref}
                >
                  <Phone aria-hidden="true" size={18} />
                  {RESTAURANT_CONFIG.phone}
                </a>
              </dd>
            </div>
          </dl>

          <a
            className="group mt-10 inline-flex items-center gap-2 border-b-2 border-harbor-900 pb-1 text-sm font-semibold uppercase tracking-[0.14em] text-harbor-900 transition hover:border-terracotta-700 hover:text-terracotta-700"
            data-analytics-event="directions_button_click"
            href={RESTAURANT_CONFIG.googleMapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" size={16} />
            {t.directions}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden border border-harbor-900/15 bg-harbor-900/5 sm:aspect-[16/13] lg:aspect-auto lg:h-[640px]">
          <iframe
            title={t.mapAlt}
            src={MAP_EMBED_URL}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            aria-label={t.directions}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-harbor-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-terracotta-700"
            data-analytics-event="directions_button_click"
            href={RESTAURANT_CONFIG.googleMapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" size={14} />
            {t.directions}
          </a>
        </div>
      </div>
    </section>
  );
}
