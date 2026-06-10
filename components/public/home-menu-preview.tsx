import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import type { Locale } from "@/lib/config/public-content";

type MenuPreviewProps = {
  locale: Locale;
};

const copy = {
  es: {
    eyebrow: "Carta",
    title: "Sabores de puerto, sin complicaciones",
    description:
      "Una carta mediterránea reconocible: tapas para compartir, arroces de mesa larga y pescado preparado con respeto al producto.",
    button: "Ver carta completa",
    cards: [
      {
        title: "Tapas",
        description: "Entrantes, ensaladas, mariscos y platos para abrir mesa.",
        imagePosition: "object-[35%_72%]"
      },
      {
        title: "Arroces",
        description: "Arroces marineros y especialidades pensadas para compartir.",
        imagePosition: "object-[55%_70%]"
      },
      {
        title: "Pescados",
        description: "Pescado fresco, plancha y recetas tradicionales de costa.",
        imagePosition: "object-[68%_68%]"
      }
    ]
  },
  en: {
    eyebrow: "Menu",
    title: "Harbour flavours, easy to choose",
    description:
      "A recognisable Mediterranean menu: tapas to share, rice dishes for the table and fish cooked with respect for the product.",
    button: "View full menu",
    cards: [
      {
        title: "Tapas",
        description: "Starters, salads, seafood and plates to begin the meal.",
        imagePosition: "object-[35%_72%]"
      },
      {
        title: "Rice dishes",
        description: "Seafood rice dishes and house specialities to share.",
        imagePosition: "object-[55%_70%]"
      },
      {
        title: "Fish",
        description: "Fresh fish, grill and traditional coastal recipes.",
        imagePosition: "object-[68%_68%]"
      }
    ]
  }
};

export function HomeMenuPreview({ locale }: MenuPreviewProps) {
  const t = copy[locale];

  return (
    <section id="carta" className="bg-paper px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-terracotta-700">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-harbor-900 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-harbor-900/70">
            {t.description}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.cards.map((card) => (
            <article
              className="group overflow-hidden rounded-[1.35rem] bg-white shadow-[0_20px_55px_rgba(23,59,58,0.12)]"
              key={card.title}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  alt={card.title}
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${card.imagePosition}`}
                  fill
                  sizes="(min-width: 768px) 33vw, calc(100vw - 32px)"
                  src="/hero-restaurant.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-harbor-900/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-serif text-3xl font-bold text-white">
                  {card.title}
                </h3>
              </div>
              <p className="p-5 text-sm leading-6 text-harbor-900/70">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <LinkButton
            analyticsEvent="menu_button_click"
            className="gap-2 bg-harbor-900"
            external
            href={RESTAURANT_CONFIG.menuUrl}
          >
            {t.button}
            <ArrowUpRight aria-hidden="true" size={18} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
