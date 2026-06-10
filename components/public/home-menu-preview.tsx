import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta-700">
              ◇ {t.kicker}
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold uppercase leading-tight tracking-[0.01em] text-harbor-900 sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-harbor-900/70">
              {t.description}
            </p>
          </div>

          <Link
            className="group inline-flex items-center gap-2 self-start border border-terracotta-700 bg-harbor-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition hover:bg-tide-700 md:self-auto"
            data-analytics-event="menu_button_click"
            href="/carta"
          >
            {t.cta}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.groups.map((group) => (
            <article
              key={group.title}
              className="relative border border-terracotta-700/30 bg-pearl p-6 sm:p-8"
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

              <h3 className="mt-3 font-serif text-3xl font-bold uppercase tracking-[0.02em] text-harbor-900">
                {group.title}
              </h3>
              <p className="mt-1 font-serif text-base italic text-terracotta-700">
                {group.subtitle}
              </p>

              <ul className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline gap-3 text-[15px] text-harbor-900"
                  >
                    <span>{item.name}</span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 translate-y-[-3px] border-b border-dotted border-harbor-900/25"
                    />
                    <span className="shrink-0 font-serif text-xs italic text-harbor-900/60">
                      {item.price}
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
