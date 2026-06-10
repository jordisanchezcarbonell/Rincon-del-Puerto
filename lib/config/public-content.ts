export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export function resolveLocale(locale?: string): Locale {
  return locale === "en" ? "en" : "es";
}

export const PUBLIC_CONTENT = {
  es: {
    nav: {
      home: "Inicio",
      menu: "Carta",
      reserve: "Reservar",
      location: "Ubicación"
    },
    hero: {
      eyebrow: "Puerto de Garrucha",
      title: "Rincón del Puerto",
      subtitle: "Cocina mediterránea junto al mar",
      description:
        "Mariscos, arroces y pescado fresco en una mesa tranquila frente al puerto. Reserva en un minuto y nosotros confirmamos tu mesa.",
      reserve: "Reservar mesa",
      menu: "Ver carta",
      directions: "Cómo llegar"
    },
    menuPage: {
      eyebrow: "Carta directa",
      title: "Carta del Restaurante Rincón del Puerto",
      description:
        "Hemos traído la carta a esta web para consultarla sin visor externo. Navega por secciones, idiomas y páginas originales desde el móvil.",
      reserve: "Reservar mesa",
      directions: "Cómo llegar",
      quickAccess: "Acceso rápido",
      quickAccessDescription:
        "Salta a las secciones principales o a las versiones en otros idiomas.",
      pagesLabel: "14 páginas",
      fullMenuTitle: "Carta completa",
      pageLabel: "Página",
      sourceNote:
        "Contenido trasladado desde la carta digital vigente y servido localmente para una carga más estable.",
      backHome: "Volver al inicio"
    },
    footer: {
      title: "Restaurante mediterráneo en el puerto de Garrucha.",
      quickLinks: "Links rápidos"
    }
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      reserve: "Book",
      location: "Location"
    },
    hero: {
      eyebrow: "Garrucha harbour",
      title: "Rincón del Puerto",
      subtitle: "Mediterranean cooking by the sea",
      description:
        "Seafood, rice dishes and fresh fish at a calm table by the harbour. Book in a minute and the team will confirm your table.",
      reserve: "Book a table",
      menu: "View menu",
      directions: "Get directions"
    },
    menuPage: {
      eyebrow: "Direct menu",
      title: "Restaurante Rincón del Puerto menu",
      description:
        "The menu is now served directly from this website, without an external viewer. Browse the original pages by section and language on mobile.",
      reserve: "Book a table",
      directions: "Get directions",
      quickAccess: "Quick access",
      quickAccessDescription:
        "Jump to the main sections or to menu versions in other languages.",
      pagesLabel: "14 pages",
      fullMenuTitle: "Full menu",
      pageLabel: "Page",
      sourceNote:
        "Content migrated from the current digital menu and served locally for a more stable experience.",
      backHome: "Back home"
    },
    footer: {
      title: "Mediterranean restaurant at Garrucha harbour.",
      quickLinks: "Quick links"
    }
  }
} as const;
