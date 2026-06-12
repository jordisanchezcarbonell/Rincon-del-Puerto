export const LOCALES = ["es", "en", "ca"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "en" || value === "ca";
}

export function resolveLocale(locale?: string | null): Locale {
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "Castellano",
  en: "English",
  ca: "Català"
};

export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  ca: "CA"
};

export const PUBLIC_CONTENT = {
  es: {
    languageSwitcher: {
      label: "Idioma",
      current: "Idioma actual"
    },
    nav: {
      home: "Inicio",
      menu: "Carta",
      reserve: "Reservar",
      location: "Ubicación",
      ariaLabel: "Principal"
    },
    topBar: {
      place: "Puerto de Garrucha",
      openToday: "Abierto hoy",
      closedToday: "Cerrado hoy",
      reopens: "Reabrimos"
    },
    hero: {
      eyebrow: "Puerto de Garrucha",
      since: "Desde 1998 · frente a la lonja",
      title: "Rincón del Puerto",
      tagline: "Arroces, pescado fresco y tapas junto al puerto de Garrucha.",
      subtitle: "Cocina mediterránea junto al mar",
      description:
        "Mariscos, arroces y pescado fresco en una mesa tranquila frente al puerto. Reserva en un minuto y nosotros confirmamos tu mesa.",
      reserve: "Reservar mesa",
      menu: "Ver carta",
      directions: "Cómo llegar",
      caption:
        "Terraza junto al puerto · arroces al centro · pescado de lonja."
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
            { name: "Arroz caldoso", price: "26 € · 2 pers." },
            { name: "Arroz caldoso con bogavante", price: "56 € · 2 pers." },
            { name: "Paella de pescado y marisco", price: "26 € · 2 pers." },
            { name: "Arroz negro", price: "26 € · 2 pers." }
          ]
        },
        {
          numeral: "II",
          title: "Pescados",
          subtitle: "Lo que ha entrado esta mañana en la lonja.",
          items: [
            { name: "Lubina o dorada a la sal", price: "40 € · 2 pers." },
            { name: "Fritura de pescados", price: "45 € · 2 pers." },
            { name: "Lubina a la plancha", price: "20 € · 1/2 kg" },
            { name: "Parrillada de pescado", price: "45 € · 2 pers." }
          ]
        },
        {
          numeral: "III",
          title: "Mariscos",
          subtitle: "Producto fresco del puerto.",
          items: [
            { name: "Gamba roja de Garrucha", price: "24 € · 200 g" },
            { name: "Gambón de Garrucha", price: "26 € · 200 g" },
            { name: "Gambas al ajillo", price: "24 €" },
            { name: "Bogavante", price: "80 € · kg" }
          ]
        },
        {
          numeral: "IV",
          title: "Entrantes",
          subtitle: "Para empezar mientras se decide.",
          items: [
            { name: "Pulpo a la gallega", price: "15 €" },
            { name: "Jamón ibérico", price: "20 €" },
            { name: "Cocktail de gambas", price: "12 €" },
            { name: "Mojama de almadraba", price: "12 €" }
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
    reservationForm: {
      title: "Solicitar reserva",
      description:
        "El restaurante confirmará tu solicitud. También puedes seguir reservando por teléfono.",
      date: "Fecha",
      time: "Hora",
      guests: "Comensales",
      guestsShort: "Personas",
      name: "Nombre",
      phone: "Teléfono",
      email: "Email",
      seating: "Preferencia",
      terrace: "Terraza",
      inside: "Interior",
      noPreference: "Sin preferencia",
      notes: "Observaciones",
      notesShort: "Comentarios",
      notesPlaceholder:
        "Una mesa en la terraza, hora flexible, ocasión especial...",
      allergies: "Alergias",
      highChair: "Necesito trona",
      privacy: "Acepto la política básica de privacidad",
      group:
        "Para grupos de más de 8 personas revisaremos la solicitud de forma personalizada.",
      groupDetails: "Información adicional del grupo",
      requiredLegend: "Los campos con * son obligatorios",
      requiredMark: "obligatorio",
      optionalSuffix: "opcional",
      submit: "Enviar solicitud",
      submitting: "Enviando...",
      errors: {
        slotTaken: "Ese horario ya no está disponible. Elige otro, por favor.",
        duplicate:
          "Ya existe una reserva activa con ese teléfono para ese horario.",
        saveFailed: "No hemos podido guardar la solicitud. Inténtalo de nuevo.",
        invalid: "Datos de reserva no válidos",
        unexpected: "Error inesperado al crear la solicitud de reserva."
      },
      loading: "Cargando horarios...",
      noSlots: "No hay horarios disponibles para esta fecha.",
      errorSlots: "No se han podido cargar los horarios."
    },
    confirmation: {
      title: "Solicitud recibida",
      description:
        "Gracias. El restaurante revisará la disponibilidad y confirmará la reserva lo antes posible.",
      home: "Volver al inicio"
    },
    cancel: {
      notFoundTitle: "Reserva no encontrada",
      notFoundDescription:
        "El enlace no es válido o la reserva ya no está disponible.",
      cancelledTitle: "Reserva cancelada",
      cancelledDescription: "Hemos registrado la cancelación para el {date} a las {time}.",
      confirmTitle: "Cancelar reserva",
      confirmDescription:
        "Vas a cancelar la reserva de {name} para el {date} a las {time}.",
      confirmButton: "Confirmar cancelación",
      pendingButton: "Cancelando..."
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
      hoursTitle: "Horario",
      region: "Puerto de Garrucha, Almería."
    },
    hours: {
      lines: [
        "Miércoles a lunes",
        "Comidas: 13:00-16:30",
        "Cenas: 20:00-23:30",
        "Martes cerrado"
      ]
    },
    metadata: {
      defaultTitle: "Reservas y carta digital",
      home: { title: "Inicio" },
      menu: {
        title: "Carta",
        description:
          "Consulta la carta del Restaurante Rincón del Puerto directamente en la web."
      },
      reserve: {
        title: "Reservar mesa",
        description:
          "Solicita una reserva en el Restaurante Rincón del Puerto."
      }
    }
  },
  en: {
    languageSwitcher: {
      label: "Language",
      current: "Current language"
    },
    nav: {
      home: "Home",
      menu: "Menu",
      reserve: "Book",
      location: "Location",
      ariaLabel: "Main"
    },
    topBar: {
      place: "Garrucha harbour",
      openToday: "Open today",
      closedToday: "Closed today",
      reopens: "Reopens"
    },
    hero: {
      eyebrow: "Garrucha harbour",
      since: "Since 1998 · facing the fish market",
      title: "Rincón del Puerto",
      tagline: "Rice dishes, fresh fish and tapas by Garrucha harbour.",
      subtitle: "Mediterranean cooking by the sea",
      description:
        "Seafood, rice dishes and fresh fish at a calm table by the harbour. Book in a minute and the team will confirm your table.",
      reserve: "Book a table",
      menu: "View menu",
      directions: "Get directions",
      caption:
        "Terrace by the harbour · rice in the centre · fish from the market."
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
            { name: "Seafood broth rice", price: "€26 · serves 2" },
            { name: "Lobster broth rice", price: "€56 · serves 2" },
            { name: "Seafood paella", price: "€26 · serves 2" },
            { name: "Black rice", price: "€26 · serves 2" }
          ]
        },
        {
          numeral: "II",
          title: "Fish",
          subtitle: "Whatever came in this morning from the market.",
          items: [
            { name: "Salt-baked sea bass or sea bream", price: "€40 · serves 2" },
            { name: "Mixed fried fish", price: "€45 · serves 2" },
            { name: "Grilled sea bass", price: "€20 · ½ kg" },
            { name: "Grilled fish platter", price: "€45 · serves 2" }
          ]
        },
        {
          numeral: "III",
          title: "Shellfish",
          subtitle: "Fresh from the harbour.",
          items: [
            { name: "Garrucha red prawn", price: "€24 · 200 g" },
            { name: "Garrucha king prawn", price: "€26 · 200 g" },
            { name: "Garlic prawns", price: "€24" },
            { name: "Lobster", price: "€80 · kg" }
          ]
        },
        {
          numeral: "IV",
          title: "Starters",
          subtitle: "To start while you decide.",
          items: [
            { name: "Galician-style octopus", price: "€15" },
            { name: "Iberian ham", price: "€20" },
            { name: "Prawn cocktail", price: "€12" },
            { name: "Tuna mojama", price: "€12" }
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
    reservationForm: {
      title: "Request a booking",
      description:
        "The restaurant will confirm your request. Phone bookings remain available.",
      date: "Date",
      time: "Time",
      guests: "Guests",
      guestsShort: "Guests",
      name: "Name",
      phone: "Phone",
      email: "Email",
      seating: "Preference",
      terrace: "Terrace",
      inside: "Inside",
      noPreference: "No preference",
      notes: "Notes",
      notesShort: "Comments",
      notesPlaceholder:
        "A table on the terrace, flexible time, special occasion...",
      allergies: "Allergies",
      highChair: "I need a high chair",
      privacy: "I accept the basic privacy policy",
      group:
        "For groups over 8 people, the restaurant will review the request personally.",
      groupDetails: "Additional group information",
      requiredLegend: "Fields marked with * are required",
      requiredMark: "required",
      optionalSuffix: "optional",
      submit: "Send request",
      submitting: "Sending...",
      errors: {
        slotTaken: "That time is no longer available. Please choose another one.",
        duplicate:
          "A similar active booking already exists for that phone and time.",
        saveFailed: "We could not save your request. Please try again.",
        invalid: "Invalid reservation details",
        unexpected: "Unexpected error while creating the booking request."
      },
      loading: "Loading times...",
      noSlots: "No available times for this date.",
      errorSlots: "Could not load available times."
    },
    confirmation: {
      title: "Request received",
      description:
        "Thank you. The restaurant will review availability and confirm your booking as soon as possible.",
      home: "Back home"
    },
    cancel: {
      notFoundTitle: "Reservation not found",
      notFoundDescription:
        "The link is no longer valid or the reservation is unavailable.",
      cancelledTitle: "Reservation cancelled",
      cancelledDescription: "We've recorded the cancellation for {date} at {time}.",
      confirmTitle: "Cancel reservation",
      confirmDescription:
        "You're about to cancel {name}'s reservation for {date} at {time}.",
      confirmButton: "Confirm cancellation",
      pendingButton: "Cancelling..."
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
      hoursTitle: "Hours",
      region: "Garrucha harbour, Almería."
    },
    hours: {
      lines: [
        "Wednesday to Monday",
        "Lunch: 13:00-16:30",
        "Dinner: 20:00-23:30",
        "Closed Tuesdays"
      ]
    },
    metadata: {
      defaultTitle: "Bookings and digital menu",
      home: { title: "Home" },
      menu: {
        title: "Menu",
        description:
          "Browse the Restaurante Rincón del Puerto menu directly online."
      },
      reserve: {
        title: "Book a table",
        description: "Request a booking at Restaurante Rincón del Puerto."
      }
    }
  },
  ca: {
    languageSwitcher: {
      label: "Idioma",
      current: "Idioma actual"
    },
    nav: {
      home: "Inici",
      menu: "Carta",
      reserve: "Reservar",
      location: "Ubicació",
      ariaLabel: "Principal"
    },
    topBar: {
      place: "Port de Garrucha",
      openToday: "Obert avui",
      closedToday: "Tancat avui",
      reopens: "Tornem a obrir"
    },
    hero: {
      eyebrow: "Port de Garrucha",
      since: "Des de 1998 · davant de la llotja",
      title: "Rincón del Puerto",
      tagline: "Arrossos, peix fresc i tapes al costat del port de Garrucha.",
      subtitle: "Cuina mediterrània vora el mar",
      description:
        "Marisc, arrossos i peix fresc en una taula tranquil·la davant del port. Reserva en un minut i nosaltres confirmem la teva taula.",
      reserve: "Reservar taula",
      menu: "Veure carta",
      directions: "Com arribar",
      caption:
        "Terrassa al costat del port · arrossos al centre · peix de la llotja."
    },
    specialties: {
      kicker: "La nostra carta",
      title: "El més demanat",
      description:
        "Quatre famílies de plats que gairebé sempre acaben a taula. La carta completa canvia amb la llotja i la temporada.",
      priceNote: "segons carta",
      cta: "Veure carta completa",
      groups: [
        {
          numeral: "I",
          title: "Arrossos",
          subtitle: "A foc lent, al centre de la taula.",
          items: [
            { name: "Arròs caldós", price: "26 € · 2 pers." },
            { name: "Arròs caldós amb llamàntol", price: "56 € · 2 pers." },
            { name: "Paella de peix i marisc", price: "26 € · 2 pers." },
            { name: "Arròs negre", price: "26 € · 2 pers." }
          ]
        },
        {
          numeral: "II",
          title: "Peixos",
          subtitle: "El que ha entrat aquest matí a la llotja.",
          items: [
            { name: "Llobarro o orada a la sal", price: "40 € · 2 pers." },
            { name: "Fregit de peix", price: "45 € · 2 pers." },
            { name: "Llobarro a la planxa", price: "20 € · 1/2 kg" },
            { name: "Graellada de peix", price: "45 € · 2 pers." }
          ]
        },
        {
          numeral: "III",
          title: "Marisc",
          subtitle: "Producte fresc del port.",
          items: [
            { name: "Gamba vermella de Garrucha", price: "24 € · 200 g" },
            { name: "Gambot de Garrucha", price: "26 € · 200 g" },
            { name: "Gambes a l'allet", price: "24 €" },
            { name: "Llamàntol", price: "80 € · kg" }
          ]
        },
        {
          numeral: "IV",
          title: "Entrants",
          subtitle: "Per començar mentre us decidiu.",
          items: [
            { name: "Pop a la gallega", price: "15 €" },
            { name: "Pernil ibèric", price: "20 €" },
            { name: "Còctel de gambes", price: "12 €" },
            { name: "Mojama d'almadrava", price: "12 €" }
          ]
        }
      ]
    },
    reservation: {
      kicker: "Reservar taula",
      title: "Reserva la teva taula",
      description:
        "Deixa'ns les teves dades i et confirmarem la reserva al més aviat possible.",
      sideTitle: "Per telèfon",
      sideCopy: "Si ho prefereixes, truca'ns i t'atendrem directament.",
      callLabel: "Truca al",
      hoursTitle: "Horari de cuina",
      alternativeShort: "També pots reservar trucant al"
    },
    reservationForm: {
      title: "Sol·licitar reserva",
      description:
        "El restaurant confirmarà la teva sol·licitud. També pots seguir reservant per telèfon.",
      date: "Data",
      time: "Hora",
      guests: "Comensals",
      guestsShort: "Persones",
      name: "Nom",
      phone: "Telèfon",
      email: "Correu",
      seating: "Preferència",
      terrace: "Terrassa",
      inside: "Interior",
      noPreference: "Sense preferència",
      notes: "Observacions",
      notesShort: "Comentaris",
      notesPlaceholder:
        "Una taula a la terrassa, hora flexible, ocasió especial...",
      allergies: "Al·lèrgies",
      highChair: "Necessito trona",
      privacy: "Accepto la política bàsica de privacitat",
      group:
        "Per a grups de més de 8 persones revisarem la sol·licitud de manera personalitzada.",
      groupDetails: "Informació addicional del grup",
      requiredLegend: "Els camps amb * són obligatoris",
      requiredMark: "obligatori",
      optionalSuffix: "opcional",
      submit: "Enviar sol·licitud",
      submitting: "Enviant...",
      errors: {
        slotTaken:
          "Aquest horari ja no està disponible. Tria'n un altre, si us plau.",
        duplicate:
          "Ja existeix una reserva activa amb aquest telèfon per a aquest horari.",
        saveFailed:
          "No hem pogut desar la sol·licitud. Torna-ho a provar.",
        invalid: "Dades de reserva no vàlides",
        unexpected: "Error inesperat en crear la sol·licitud de reserva."
      },
      loading: "Carregant horaris...",
      noSlots: "No hi ha horaris disponibles per a aquesta data.",
      errorSlots: "No s'han pogut carregar els horaris."
    },
    confirmation: {
      title: "Sol·licitud rebuda",
      description:
        "Gràcies. El restaurant revisarà la disponibilitat i confirmarà la reserva al més aviat possible.",
      home: "Tornar a l'inici"
    },
    cancel: {
      notFoundTitle: "Reserva no trobada",
      notFoundDescription:
        "L'enllaç no és vàlid o la reserva ja no està disponible.",
      cancelledTitle: "Reserva cancel·lada",
      cancelledDescription: "Hem registrat la cancel·lació per al {date} a les {time}.",
      confirmTitle: "Cancel·lar reserva",
      confirmDescription:
        "Estàs a punt de cancel·lar la reserva de {name} per al {date} a les {time}.",
      confirmButton: "Confirmar cancel·lació",
      pendingButton: "Cancel·lant..."
    },
    location: {
      kicker: "Com arribar",
      title: "Al costat del port de Garrucha",
      description:
        "Estem al costat del port de Garrucha, a pocs passos del passeig marítim.",
      addressLabel: "Adreça",
      hoursLabel: "Horari",
      phoneLabel: "Telèfon",
      directions: "Obrir a Google Maps",
      mapAlt: "Mapa del port de Garrucha"
    },
    menuPage: {
      eyebrow: "Carta directa",
      title: "Carta del Restaurant Rincón del Puerto",
      description:
        "Hem portat la carta a aquesta web per consultar-la sense visor extern. Navega per seccions, idiomes i pàgines originals des del mòbil.",
      reserve: "Reservar taula",
      directions: "Com arribar",
      quickAccess: "Accés ràpid",
      quickAccessDescription:
        "Salta a les seccions principals o a les versions en altres idiomes.",
      pagesLabel: "14 pàgines",
      fullMenuTitle: "Carta completa",
      pageLabel: "Pàgina",
      sourceNote:
        "Contingut traslladat des de la carta digital vigent i servit localment per a una càrrega més estable.",
      backHome: "Tornar a l'inici"
    },
    footer: {
      title: "Restaurant mediterrani al port de Garrucha.",
      quickLinks: "Enllaços ràpids",
      hoursTitle: "Horari",
      region: "Port de Garrucha, Almeria."
    },
    hours: {
      lines: [
        "De dimecres a dilluns",
        "Dinars: 13:00-16:30",
        "Sopars: 20:00-23:30",
        "Dimarts tancat"
      ]
    },
    metadata: {
      defaultTitle: "Reserves i carta digital",
      home: { title: "Inici" },
      menu: {
        title: "Carta",
        description:
          "Consulta la carta del Restaurant Rincón del Puerto directament a la web."
      },
      reserve: {
        title: "Reservar taula",
        description: "Sol·licita una reserva al Restaurant Rincón del Puerto."
      }
    }
  }
} as const;

export function getContent(locale: Locale) {
  return PUBLIC_CONTENT[locale];
}

export function format(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    values[key] !== undefined ? String(values[key]) : `{${key}}`
  );
}
