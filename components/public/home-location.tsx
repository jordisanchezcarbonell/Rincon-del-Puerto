import { Clock, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/link-button";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import type { Locale } from "@/lib/config/public-content";

type HomeLocationProps = {
  locale: Locale;
};

const copy = {
  es: {
    eyebrow: "Ubicación",
    title: "Junto al puerto de Garrucha",
    description:
      "Ven con calma, abre la ruta y confirma tu mesa antes de salir.",
    hours: "Horario",
    address: "Dirección",
    phone: "Teléfono",
    directions: "Cómo llegar"
  },
  en: {
    eyebrow: "Location",
    title: "By Garrucha harbour",
    description: "Open the route and confirm your table before leaving.",
    hours: "Hours",
    address: "Address",
    phone: "Phone",
    directions: "Get directions"
  }
};

export function HomeLocation({ locale }: HomeLocationProps) {
  const t = copy[locale];

  return (
    <section id="ubicacion" className="bg-paper px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-harbor-900/10 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-terracotta-700">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-harbor-900 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-harbor-900/70">
            {t.description}
          </p>
          <div className="mt-7">
            <LinkButton
              analyticsEvent="directions_button_click"
              className="gap-2 rounded-full bg-harbor-900"
              external
              href={RESTAURANT_CONFIG.googleMapsUrl}
            >
              <MapPin aria-hidden="true" size={18} />
              {t.directions}
            </LinkButton>
          </div>
        </div>

        <dl className="grid gap-0 border-y border-harbor-900/15 bg-[#fbfaf6] md:grid-cols-3">
          <Info icon={<MapPin aria-hidden="true" size={18} />} label={t.address}>
            {RESTAURANT_CONFIG.address}
          </Info>
          <Info icon={<Clock aria-hidden="true" size={18} />} label={t.hours}>
            {RESTAURANT_CONFIG.reservationHours.join(" · ")}
          </Info>
          <Info icon={<Phone aria-hidden="true" size={18} />} label={t.phone}>
            {RESTAURANT_CONFIG.phone}
          </Info>
        </dl>
      </div>
    </section>
  );
}

function Info({
  children,
  icon,
  label
}: {
  children: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="min-w-0 border-b border-harbor-900/10 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <dt className="flex items-center gap-2 text-sm font-bold text-harbor-900">
        <span className="text-terracotta-700">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-harbor-900/70">{children}</dd>
    </div>
  );
}
