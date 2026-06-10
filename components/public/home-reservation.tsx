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
    title: "Pide mesa sin perder el trato de siempre",
    description:
      "Solicitud online, confirmación manual del restaurante y teléfono visible por si prefieres hablar directamente."
  },
  en: {
    eyebrow: "Bookings",
    title: "Request a table without losing the human touch",
    description:
      "Online request, manual confirmation by the restaurant and the phone visible if you prefer to call."
  }
};

export function HomeReservation({
  initialDate,
  initialSlots,
  locale
}: HomeReservationProps) {
  const t = copy[locale];

  return (
    <section id="reservar" className="relative bg-paper px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta-700">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-harbor-900 sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-harbor-900/70">
            {t.description}
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
