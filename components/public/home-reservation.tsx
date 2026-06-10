import { Phone } from "lucide-react";
import { LandingReservationForm } from "@/components/public/landing-reservation-form";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import type { AvailabilitySlot } from "@/types/domain";

type HomeReservationProps = {
  initialDate: string;
  initialSlots: AvailabilitySlot[];
  locale: Locale;
};

export function HomeReservation({
  initialDate,
  initialSlots,
  locale
}: HomeReservationProps) {
  const t = PUBLIC_CONTENT[locale].reservation;
  const hours = PUBLIC_CONTENT[locale].hours.lines;

  return (
    <section
      id="reservar"
      className="relative bg-gradient-to-br from-harbor-900 to-tide-700 px-4 py-16 text-white sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta-300">
              ◇ {t.kicker}
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold uppercase leading-tight tracking-[0.01em] text-white sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
              {t.description}
            </p>

            <div className="mt-10">
              <LandingReservationForm
                initialDate={initialDate}
                initialSlots={initialSlots}
                locale={locale}
              />
            </div>
          </div>

          <aside className="border border-terracotta-700/40 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8 lg:sticky lg:top-32 lg:self-start">
            <p className="font-serif text-xs uppercase tracking-[0.22em] text-terracotta-300">
              ◇ {t.sideTitle}
            </p>
            <p className="mt-3 font-serif text-2xl italic leading-snug text-white">
              {t.sideCopy}
            </p>

            <a
              className="mt-6 inline-flex items-center gap-3 text-white transition hover:text-terracotta-300"
              href={RESTAURANT_CONFIG.phoneHref}
              data-analytics-event="reservation_button_click"
            >
              <span className="grid h-11 w-11 place-items-center border border-terracotta-700/60 bg-harbor-900 text-terracotta-300">
                <Phone aria-hidden="true" size={18} />
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.18em] text-white/65">
                  {t.callLabel}
                </span>
                <span className="font-serif text-2xl font-bold">
                  {RESTAURANT_CONFIG.phone}
                </span>
              </span>
            </a>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="font-serif text-xs uppercase tracking-[0.22em] text-white/65">
                {t.hoursTitle}
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-white/85">
                {hours.map((line) => (
                  <li
                    key={line}
                    className="flex items-baseline gap-3 border-b border-dotted border-white/15 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span aria-hidden="true" className="font-serif text-xs text-terracotta-300">
                      ◆
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
