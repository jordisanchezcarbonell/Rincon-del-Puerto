import { ArrowUpRight } from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";

type MenuPreviewProps = {
  locale: Locale;
};

export function HomeMenuPreview({ locale }: MenuPreviewProps) {
  const t = PUBLIC_CONTENT[locale].specialties;

  return (
    <section id="carta" className="bg-paper px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-serif text-sm italic text-harbor-600">
              — {t.kicker}
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium leading-tight tracking-tight text-harbor-900 sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-harbor-900/70">
              {t.description}
            </p>
          </div>

          <a
            className="group inline-flex items-center gap-2 self-start border-b-2 border-harbor-900 pb-1 text-sm font-semibold uppercase tracking-[0.14em] text-harbor-900 transition hover:border-terracotta-700 hover:text-terracotta-700 md:self-auto"
            data-analytics-event="menu_button_click"
            href={RESTAURANT_CONFIG.menuUrl}
            rel="noreferrer"
            target="_blank"
          >
            {t.cta}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div className="mt-12 grid gap-px bg-harbor-900/15 md:grid-cols-2">
          {t.groups.map((group) => (
            <article
              key={group.title}
              className="relative bg-pearl p-6 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 font-serif text-5xl italic text-harbor-900/10 sm:text-6xl"
              >
                {group.numeral}
              </span>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-xs uppercase tracking-[0.22em] text-terracotta-700">
                  {group.numeral}
                </span>
                <span className="h-px flex-1 bg-harbor-900/20" />
              </div>

              <h3 className="mt-3 font-serif text-3xl font-medium text-harbor-900">
                {group.title}
              </h3>
              <p className="mt-1 font-serif text-sm italic text-harbor-600">
                {group.subtitle}
              </p>

              <ul className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-[15px] text-harbor-900"
                  >
                    <span>{item}</span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 translate-y-[-3px] border-b border-dotted border-harbor-900/25"
                    />
                    <span className="font-serif text-xs italic text-harbor-900/50">
                      {t.priceNote}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
