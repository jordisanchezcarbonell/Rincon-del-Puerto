import { Clock, MapPin, Navigation, Phone } from "lucide-react";
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
    <section id="ubicacion" className="bg-[#f2eee6] px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
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
        </div>

        <article className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_70px_rgba(23,59,58,0.14)]">
          <div className="relative min-h-48 bg-harbor-900 p-5 text-white">
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(135deg,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(45deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative flex h-full min-h-40 flex-col justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                <Navigation aria-hidden="true" size={22} />
              </span>
              <p className="max-w-sm font-serif text-3xl font-bold">
                Puerto, brisa y cocina mediterránea.
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <Info icon={<MapPin aria-hidden="true" size={18} />} label={t.address}>
              {RESTAURANT_CONFIG.address}
            </Info>
            <Info icon={<Clock aria-hidden="true" size={18} />} label={t.hours}>
              {RESTAURANT_CONFIG.reservationHours.join(" · ")}
            </Info>
            <Info icon={<Phone aria-hidden="true" size={18} />} label={t.phone}>
              {RESTAURANT_CONFIG.phone}
            </Info>
          </div>

          <div className="border-t border-harbor-900/10 p-5">
            <LinkButton
              analyticsEvent="directions_button_click"
              className="w-full gap-2 sm:w-auto"
              external
              href={RESTAURANT_CONFIG.googleMapsUrl}
            >
              <MapPin aria-hidden="true" size={18} />
              {t.directions}
            </LinkButton>
          </div>
        </article>
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
    <div className="min-w-0">
      <dt className="flex items-center gap-2 text-sm font-bold text-harbor-900">
        <span className="text-terracotta-700">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-harbor-900/70">{children}</dd>
    </div>
  );
}
