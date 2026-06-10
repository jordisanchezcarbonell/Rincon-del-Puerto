type LocalizedLabel = {
  es: string;
  en: string;
};

export type MenuLanguage = "es" | "en" | "fr" | "de" | "visual";

export type MenuOrientation = "portrait" | "landscape";

export type NativeMenuPage = {
  number: number;
  title: string;
  language: MenuLanguage;
  src: string;
  width: number;
  height: number;
  orientation: MenuOrientation;
  summary: string;
};

export type MenuSectionLink = {
  id: string;
  label: LocalizedLabel;
  description: LocalizedLabel;
};

export const MENU_LANGUAGE_LABELS: Record<MenuLanguage, LocalizedLabel> = {
  es: {
    es: "Castellano",
    en: "Spanish"
  },
  en: {
    es: "Inglés",
    en: "English"
  },
  fr: {
    es: "Francés",
    en: "French"
  },
  de: {
    es: "Alemán",
    en: "German"
  },
  visual: {
    es: "Información",
    en: "Information"
  }
};

export const MENU_SECTIONS: MenuSectionLink[] = [
  {
    id: "page-1",
    label: {
      es: "Entrantes",
      en: "Starters"
    },
    description: {
      es: "Ensaladas, sopas y pan",
      en: "Salads, soups and bread"
    }
  },
  {
    id: "page-2",
    label: {
      es: "Mariscos",
      en: "Seafood"
    },
    description: {
      es: "Marisco, conchas y raciones",
      en: "Shellfish and seafood plates"
    }
  },
  {
    id: "page-3",
    label: {
      es: "Especialidades",
      en: "Specialities"
    },
    description: {
      es: "Cocina de la casa y carnes",
      en: "House dishes and meat"
    }
  },
  {
    id: "page-4",
    label: {
      es: "Pescados",
      en: "Fish"
    },
    description: {
      es: "Pescado de lonja y plancha",
      en: "Market fish and grill"
    }
  },
  {
    id: "page-6",
    label: {
      es: "Postres",
      en: "Desserts"
    },
    description: {
      es: "Helados y postres de la casa",
      en: "Ice cream and house desserts"
    }
  },
  {
    id: "page-8",
    label: {
      es: "Vinos",
      en: "Wines"
    },
    description: {
      es: "Tintos, blancos, cava y champagne",
      en: "Red, white, cava and champagne"
    }
  },
  {
    id: "page-10",
    label: {
      es: "English",
      en: "English"
    },
    description: {
      es: "Carta en inglés",
      en: "English menu"
    }
  },
  {
    id: "page-11",
    label: {
      es: "Français",
      en: "Francais"
    },
    description: {
      es: "Carta en francés",
      en: "French menu"
    }
  },
  {
    id: "page-12",
    label: {
      es: "Deutsch",
      en: "Deutsch"
    },
    description: {
      es: "Carta en alemán",
      en: "German menu"
    }
  }
];

export const MENU_PAGES: NativeMenuPage[] = [
  {
    number: 1,
    title: "Entrantes, ensaladas y sopas",
    language: "es",
    src: "/menu/rincon-del-puerto-page-01.jpg",
    width: 1250,
    height: 1769,
    orientation: "portrait",
    summary: "Entrantes, ensaladas, sopas y pan."
  },
  {
    number: 2,
    title: "Mariscos, conchas y raciones",
    language: "es",
    src: "/menu/rincon-del-puerto-page-02.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Marisco, conchas, frituras y raciones para compartir."
  },
  {
    number: 3,
    title: "Especialidades y carnes",
    language: "es",
    src: "/menu/rincon-del-puerto-page-03.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Especialidades de la casa, platos tradicionales y carnes."
  },
  {
    number: 4,
    title: "Pescados",
    language: "es",
    src: "/menu/rincon-del-puerto-page-04.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Pescados preparados al estilo del restaurante."
  },
  {
    number: 5,
    title: "Alérgenos y condiciones",
    language: "es",
    src: "/menu/rincon-del-puerto-page-05.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Información de alérgenos, reservas y condiciones de servicio."
  },
  {
    number: 6,
    title: "Helados",
    language: "es",
    src: "/menu/rincon-del-puerto-page-06.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Carta de helados."
  },
  {
    number: 7,
    title: "Postres de la casa",
    language: "es",
    src: "/menu/rincon-del-puerto-page-07.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Postres caseros y dulces para terminar la comida."
  },
  {
    number: 8,
    title: "Vinos tintos y blancos",
    language: "es",
    src: "/menu/rincon-del-puerto-page-08.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Selección de vinos tintos y blancos."
  },
  {
    number: 9,
    title: "Rosados, cava y champagne",
    language: "es",
    src: "/menu/rincon-del-puerto-page-09.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "Vinos rosados, cavas, champagne y bebidas."
  },
  {
    number: 10,
    title: "English menu",
    language: "en",
    src: "/menu/rincon-del-puerto-page-10.jpg",
    width: 1250,
    height: 1767,
    orientation: "portrait",
    summary: "English version of the restaurant menu."
  },
  {
    number: 11,
    title: "Menu français",
    language: "fr",
    src: "/menu/rincon-del-puerto-page-11.jpg",
    width: 1767,
    height: 1250,
    orientation: "landscape",
    summary: "French version of the restaurant menu."
  },
  {
    number: 12,
    title: "Deutsche Speisekarte",
    language: "de",
    src: "/menu/rincon-del-puerto-page-12.jpg",
    width: 1767,
    height: 1250,
    orientation: "landscape",
    summary: "German version of the restaurant menu."
  },
  {
    number: 13,
    title: "Deutsche Speisekarte und Allergenhinweise",
    language: "de",
    src: "/menu/rincon-del-puerto-page-13.jpg",
    width: 1767,
    height: 1250,
    orientation: "landscape",
    summary: "German menu continuation with allergen information."
  },
  {
    number: 14,
    title: "Información adicional",
    language: "visual",
    src: "/menu/rincon-del-puerto-page-14.jpg",
    width: 1250,
    height: 1769,
    orientation: "portrait",
    summary: "Página final de la carta."
  }
];
