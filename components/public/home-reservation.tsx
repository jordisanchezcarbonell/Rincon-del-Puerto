import { LandingReservationForm } from "@/components/public/landing-reservation-form";
import type { Locale } from "@/lib/config/public-content";
import type { AvailabilitySlot } from "@/types/domain";

type HomeReservationProps = {
  initialDate: string;
  initialSlots: AvailabilitySlot[];
  locale: Locale;
};

const copy = {
  es: {
    eyebrow: "Reservas",
    title: "Una reserva clara, sin esperas innecesarias",
    description:
      "Elige fecha, hora y personas. Recibimos la solicitud como pendiente y el restaurante la confirma antes de tu visita.",
    detail: "Ideal para comidas familiares, cenas tranquilas y mesas junto al puerto."
  },
  en: {
    eyebrow: "Bookings",
    title: "A clear booking, without unnecessary waiting",
    description:
      "Choose date, time and guests. The request arrives as pending and the restaurant confirms it before your visit.",
    detail: "Made for family lunches, quiet dinners and tables by the harbour."
  }
};

export function HomeReservation({
  initialDate,
  initialSlots,
  locale
}: HomeReservationProps) {
  const t = copy[locale];

  return (
    <section id="reservar" className="relative bg-paper px-4 pb-14 pt-4 sm:px-6 md:pb-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-terracotta-700">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-harbor-900 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-harbor-900/70">
            {t.description}
          </p>
          <p className="mt-5 rounded-2xl border border-terracotta-700/20 bg-terracotta-50 px-4 py-3 text-sm font-semibold leading-6 text-harbor-900">
            {t.detail}
          </p>
        </div>

        <LandingReservationForm
          initialDate={initialDate}
          initialSlots={initialSlots}
          locale={locale}
        />
      </div>
    </section>
  );
}
