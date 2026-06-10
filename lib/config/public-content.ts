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
    topBar: {
      place: "Puerto de Garrucha",
      openToday: "Abierto hoy",
      closedToday: "Cerrado hoy",
      reopens: "Reabrimos"
    },
    hero: {
      eyebrow: "Puerto de Garrucha",
      title: "Rincón del Puerto",
      tagline: "Arroces, pescado fresco y tapas junto al puerto de Garrucha.",
      subtitle: "Cocina mediterránea junto al mar",
      description:
        "Mariscos, arroces y pescado fresco en una mesa tranquila frente al puerto. Reserva en un minuto y nosotros confirmamos tu mesa.",
      reserve: "Reservar mesa",
      menu: "Ver carta",
      directions: "Cómo llegar"
    },
    specialties: {
      kicker: "Nuestra carta",
      title: "Lo que se pide más",
      description:
        "Cuatro familias de plato que casi siempre acaban en la mesa. La carta completa cambia con la lonja y la temporada.",
      priceNote: "según carta",
      cta: "Ver carta completa",
      groups: [
        {
          numeral: "I",
          title: "Arroces",
          subtitle: "A fuego lento, al centro de la mesa.",
          items: [
            "Arroz caldoso de marisco",
            "Fideuá",
            "Arroz negro",
            "Arroz con bogavante"
          ]
        },
        {
          numeral: "II",
          title: "Pescados",
          subtitle: "Lo que ha entrado esta mañana en la lonja.",
          items: [
            "Pescado fresco del día",
            "Lubina a la sal",
            "Pulpo a la brasa",
            "Fritura de pescado"
          ]
        },
        {
          numeral: "III",
          title: "Tapas",
          subtitle: "Para empezar mientras se decide.",
          items: [
            "Gambas al ajillo",
            "Calamares a la andaluza",
            "Boquerones en vinagre",
            "Mejillones al vapor"
          ]
        },
        {
          numeral: "IV",
          title: "Postres",
          subtitle: "De cuchara, sin prisa.",
          items: [
            "Tarta de la abuela",
            "Flan casero",
            "Helado artesano",
            "Sorbete de limón"
          ]
        }
      ]
    },
    reservation: {
      kicker: "Reservar mesa",
      title: "Reserva tu mesa",
      description:
        "Déjanos tus datos y te confirmaremos la reserva lo antes posible.",
      sideTitle: "Por teléfono",
      sideCopy: "Si lo prefieres, llámanos y te atendemos directamente.",
      callLabel: "Llamar al",
      hoursTitle: "Horario de cocina",
      alternativeShort: "También puedes reservar llamando al"
    },
    location: {
      kicker: "Cómo llegar",
      title: "Junto al puerto de Garrucha",
      description:
        "Estamos junto al puerto de Garrucha, a pocos pasos del paseo marítimo.",
      addressLabel: "Dirección",
      hoursLabel: "Horario",
      phoneLabel: "Teléfono",
      directions: "Abrir en Google Maps",
      mapAlt: "Mapa del puerto de Garrucha"
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
      quickLinks: "Links rápidos",
      hoursTitle: "Horario"
    }
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      reserve: "Book",
      location: "Location"
    },
    topBar: {
      place: "Garrucha harbour",
      openToday: "Open today",
      closedToday: "Closed today",
      reopens: "Reopens"
    },
    hero: {
      eyebrow: "Garrucha harbour",
      title: "Rincón del Puerto",
      tagline: "Rice dishes, fresh fish and tapas by Garrucha harbour.",
      subtitle: "Mediterranean cooking by the sea",
      description:
        "Seafood, rice dishes and fresh fish at a calm table by the harbour. Book in a minute and the team will confirm your table.",
      reserve: "Book a table",
      menu: "View menu",
      directions: "Get directions"
    },
    specialties: {
      kicker: "Our menu",
      title: "What tables order most",
      description:
        "Four families of dishes that almost always make it to the table. The full menu changes with the fish market and the season.",
      priceNote: "see menu",
      cta: "View full menu",
      groups: [
        {
          numeral: "I",
          title: "Rice dishes",
          subtitle: "Slow-cooked, served in the middle.",
          items: [
            "Seafood broth rice",
            "Fideuá",
            "Black rice",
            "Rice with lobster"
          ]
        },
        {
          numeral: "II",
          title: "Fish",
          subtitle: "Whatever came in this morning from the market.",
          items: [
            "Catch of the day",
            "Salt-baked sea bass",
            "Grilled octopus",
            "Mixed fried fish"
          ]
        },
        {
          numeral: "III",
          title: "Tapas",
          subtitle: "To start while you decide.",
          items: [
            "Garlic prawns",
            "Andalusian fried squid",
            "Anchovies in vinegar",
            "Steamed mussels"
          ]
        },
        {
          numeral: "IV",
          title: "Desserts",
          subtitle: "Slow spoonfuls.",
          items: [
            "Grandmother's cake",
            "Homemade flan",
            "Artisan ice cream",
            "Lemon sorbet"
          ]
        }
      ]
    },
    reservation: {
      kicker: "Book a table",
      title: "Reserve your table",
      description:
        "Leave us your details and we'll confirm your booking as soon as possible.",
      sideTitle: "By phone",
      sideCopy: "If you prefer, call us and we'll take it from there.",
      callLabel: "Call",
      hoursTitle: "Kitchen hours",
      alternativeShort: "You can also book by calling"
    },
    location: {
      kicker: "How to get here",
      title: "Right by Garrucha harbour",
      description:
        "We're next to Garrucha harbour, a few steps from the seafront promenade.",
      addressLabel: "Address",
      hoursLabel: "Hours",
      phoneLabel: "Phone",
      directions: "Open in Google Maps",
      mapAlt: "Map of Garrucha harbour"
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
      quickLinks: "Quick links",
      hoursTitle: "Hours"
    }
  }
} as const;
