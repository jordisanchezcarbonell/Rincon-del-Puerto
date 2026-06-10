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
    title: "Carta de puerto, de las de elegir con hambre",
    description:
      "Hemos resumido la carta en lo que normalmente decide una mesa: algo para compartir, un arroz al centro o pescado de costa.",
    button: "Ver carta completa",
    groups: [
      {
        title: "Para empezar",
        items: ["Pulpo a la gallega", "Gambas al ajillo", "Mojama", "Ensalada de ventresca"]
      },
      {
        title: "Arroces",
        items: ["Arroz con bogavante", "Arroz caldoso", "Paella mixta", "Arroz negro"]
      },
      {
        title: "Pescados",
        items: ["Dorada", "Lubina", "Rape", "Gallo Pedro"]
      }
    ]
  },
  en: {
    eyebrow: "Menu",
    title: "A harbour menu made for choosing hungry",
    description:
      "A quick view of what tables usually decide first: something to share, a rice dish for the centre or coastal fish.",
    button: "View full menu",
    groups: [
      {
        title: "To start",
        items: ["Galician-style octopus", "Garlic prawns", "Mojama", "Tuna belly salad"]
      },
      {
        title: "Rice dishes",
        items: ["Rice with lobster", "Seafood broth rice", "Mixed paella", "Black rice"]
      },
      {
        title: "Fish",
        items: ["Sea bream", "Sea bass", "Monkfish", "John Dory"]
      }
    ]
  }
};

export function HomeMenuPreview({ locale }: MenuPreviewProps) {
  const t = copy[locale];

  return (
    <section id="carta" className="bg-[#fbfaf6] px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-terracotta-700">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-harbor-900 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-harbor-900/70">
            {t.description}
          </p>
          <div className="mt-7">
            <LinkButton
              analyticsEvent="menu_button_click"
              className="gap-2 rounded-full bg-harbor-900"
              external
              href={RESTAURANT_CONFIG.menuUrl}
            >
              {t.button}
              <ArrowUpRight aria-hidden="true" size={18} />
            </LinkButton>
          </div>
        </div>

        <div className="border-y border-harbor-900/15">
          {t.groups.map((group) => (
            <section
              className="grid gap-5 border-b border-harbor-900/10 py-7 last:border-b-0 md:grid-cols-[13rem_1fr]"
              key={group.title}
            >
              <h3 className="font-serif text-3xl font-bold text-harbor-900">
                {group.title}
              </h3>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    className="flex items-baseline justify-between gap-4 text-base font-semibold text-harbor-900"
                    key={item}
                  >
                    <span>{item}</span>
                    <span className="h-px flex-1 border-b border-dotted border-harbor-900/20" />
                    <span className="text-sm font-bold text-harbor-900/40">
                      según carta
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
