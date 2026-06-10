import { CalendarCheck, MapPin, Utensils } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { MENU_ITEMS, type MenuItem } from "@/lib/menu/menu-items";

type NativeMenuProps = {
  locale: Locale;
};

const priceFormatter = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function formatPrice(item: MenuItem) {
  if (item.price === null) {
    return "S/M";
  }
  return `${priceFormatter.format(item.price)} €`;
}

function buildMeta(item: MenuItem) {
  const parts: string[] = [];
  if (item.unit) parts.push(item.unit);
  if (item.region) parts.push(item.region);
  if (item.byRequest) parts.push("por encargo");
  if (item.seasonal) parts.push("temporada");
  return parts.join(" · ");
}

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

          <nav
            aria-label={content.quickAccess}
            className="mt-9 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap"
          >
            {MENU_ITEMS.map((category) => (
              <a
                className="min-w-[9.5rem] rounded-lg border border-white/15 bg-white/10 px-3 py-3 text-sm font-bold transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-0"
                href={`#${category.id}`}
                key={category.id}
              >
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
        <div className="mb-7 border-b border-harbor-900/10 pb-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-harbor-600">
            {content.pagesLabel}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-harbor-900 sm:text-3xl">
            {content.fullMenuTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-harbor-900/70">
            {content.sourceNote}
          </p>
        </div>

        <div className="space-y-12">
          {MENU_ITEMS.map((category) => (
            <section
              aria-labelledby={`${category.id}-title`}
              className="scroll-mt-24"
              id={category.id}
              key={category.id}
            >
              <h3
                className="border-b-2 border-harbor-900/20 pb-2 text-xl font-bold uppercase tracking-[0.12em] text-harbor-900 sm:text-2xl"
                id={`${category.id}-title`}
              >
                {category.title}
              </h3>
              <ul className="mt-5 divide-y divide-harbor-900/10">
                {category.items.map((item, index) => {
                  const meta = buildMeta(item);
                  return (
                    <li
                      className="flex items-baseline gap-4 py-3"
                      key={`${category.id}-${item.number ?? index}-${item.name}-${item.unit ?? ""}`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-harbor-900 sm:text-lg">
                          {item.number ? (
                            <span className="mr-2 text-harbor-600">
                              {item.number}.
                            </span>
                          ) : null}
                          {item.name}
                        </p>
                        {item.description ? (
                          <p className="mt-1 text-sm leading-6 text-harbor-900/70">
                            {item.description}
                          </p>
                        ) : null}
                        {meta ? (
                          <p className="mt-1 text-xs uppercase tracking-[0.1em] text-harbor-600">
                            {meta}
                          </p>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-base font-bold tabular-nums text-harbor-900 sm:text-lg">
                        {formatPrice(item)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
