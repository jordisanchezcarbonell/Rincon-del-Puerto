export type MenuCategoryId =
  | "entrantes"
  | "ensaladas-sopas"
  | "mariscos"
  | "especialidades"
  | "carnes"
  | "pescados"
  | "vinos-tintos"
  | "vinos-blancos"
  | "vinos-rosados"
  | "champagne-cava";

export type MenuItem = {
  number?: number;
  name: string;
  price: number | null;
  description?: string;
  unit?: string;
  region?: string;
  byRequest?: boolean;
  seasonal?: boolean;
};

export type MenuCategory = {
  id: MenuCategoryId;
  title: string;
  items: MenuItem[];
};

export const MENU_ITEMS: MenuCategory[] = [
  {
    id: "entrantes",
    title: "Entrantes",
    items: [
      {
        number: 1,
        name: "Ensalada de ahumados",
        price: 12,
        description: "Rica ensalada compuesta por pescado ahumado, cebolla y alcaparra"
      },
      { number: 2, name: "Hueva de maruca", price: 12 },
      { number: 3, name: "Mojama de almadraba", price: 12 },
      { number: 4, name: "Jamón ibérico", price: 20 },
      { number: 5, name: "Queso Gran Padano", price: 12 },
      { number: 6, name: "Melón o piña con jamón ibérico", price: 13 },
      { number: 7, name: "Escalibada con ventresca de atún", price: 14 },
      { number: 8, name: "Cocktail de gambas", price: 12 },
      { number: 9, name: "Pulpo a la gallega", price: 15 },
      { number: 10, name: "Foie con mermelada de cebolla confitada", price: 11 },
      { number: 11, name: "Salteado de perichicos y gambas", price: 15 },
      { number: 12, name: "Revuelto de habitas baby con jamón ibérico y foie", price: 15 },
      { number: 13, name: "Ración de pan", price: 1 }
    ]
  },
  {
    id: "ensaladas-sopas",
    title: "Ensaladas y sopas",
    items: [
      {
        number: 14,
        name: "Ensalada Rincón del Puerto",
        price: 8,
        description: "Lechuga, tomate, salsa rosa, piña y gambas",
        unit: "1 pers."
      },
      {
        number: 15,
        name: "Ensalada mixta",
        price: 8,
        description: "Lechuga, tomate, atún y huevo duro",
        unit: "1 pers."
      },
      { number: 16, name: "Tomate raf con anchoas o ventresca", price: 15 },
      { number: 17, name: "Sopa de mariscos", price: 5 },
      { number: 18, name: "Gazpacho andaluz o salmorejo", price: 5, seasonal: true }
    ]
  },
  {
    id: "mariscos",
    title: "Mariscos",
    items: [
      { number: 19, name: "Gamba roja de Garrucha", price: 24, unit: "200 g" },
      { number: 20, name: "Camarón", price: 22, unit: "200 g" },
      { number: 21, name: "Gambón de Garrucha", price: 26, unit: "200 g" },
      { number: 22, name: "Gambas al ajillo", price: 24 },
      { number: 23, name: "Codillo de bogavante al ajillo", price: 20 },
      {
        number: 24,
        name: "Cigalas",
        price: null,
        unit: "kg",
        description: "Según disponibilidad"
      },
      { number: 25, name: "Langosta", price: 80, unit: "kg" },
      { number: 26, name: "Bogavante", price: 80, unit: "kg" },
      { number: 27, name: "Navajas", price: 30, unit: "kg" },
      { number: 28, name: "Almejas al vapor", price: 14 },
      { number: 29, name: "Almejas a la marinera o salteadas", price: 15 },
      { number: 30, name: "Coquinas al vapor", price: 14 },
      { number: 31, name: "Coquinas salteadas", price: 15 },
      { number: 32, name: "Mejillones al vapor", price: 12 },
      { number: 33, name: "Mejillones a la marinera", price: 13 },
      { number: 34, name: "Cañaillas", price: 15 }
    ]
  },
  {
    id: "especialidades",
    title: "Especialidades Rincón del Puerto",
    items: [
      { number: 35, name: "Arroz caldoso", price: 26, unit: "2 pers.", byRequest: true },
      {
        number: 36,
        name: "Arroz caldoso con bogavante",
        price: 56,
        unit: "2 pers.",
        byRequest: true
      },
      {
        number: 37,
        name: "Arroz caldoso con langosta",
        price: 66,
        unit: "2 pers.",
        byRequest: true
      },
      {
        number: 38,
        name: "Paella de pescado y marisco",
        price: 26,
        unit: "2 pers.",
        byRequest: true
      },
      { number: 39, name: "Arroz negro", price: 26, unit: "2 pers.", byRequest: true },
      { number: 40, name: "Dorada o lubina a la sal", price: 40, unit: "kg (2 pers.)" },
      { number: 41, name: "Gallo pedro o rape a la marinera", price: 65, unit: "2 pers." },
      { number: 42, name: "Rape al azafrán", price: 20 },
      { number: 43, name: "Gallo pedro o mero horneado al ajo pescador", price: 22 },
      { number: 44, name: "Pargo horneado al ajo pescador", price: 20 },
      { number: 45, name: "Lubina o dorada horneada al ajo pescador", price: 20 }
    ]
  },
  {
    id: "carnes",
    title: "Carnes",
    items: [
      { number: 46, name: "Entrecot de ternera a la parrilla", price: 19 },
      { number: 47, name: "Entrecot de ternera a la pimienta o roquefort", price: 20 },
      { number: 48, name: "Entrecot de buey a la parrilla", price: 19 },
      { number: 49, name: "Entrecot de buey a la pimienta o roquefort", price: 20 },
      { number: 50, name: "Solomillo de ternera a la parrilla", price: 19 },
      { number: 51, name: "Solomillo de ternera a la pimienta o roquefort", price: 20 },
      { number: 52, name: "Solomillo de cerdo a la parrilla", price: 12 },
      { number: 53, name: "Solomillo de cerdo con salsa de champiñones", price: 13 },
      { number: 54, name: "Chuletillas de cabrito salteadas con ajetes", price: 18 },
      { number: 55, name: "Presa ibérica con reducción de Pedro Ximénez", price: 16 },
      {
        number: 56,
        name: "Carrillada ibérica con foie en reducción de tinto y setas silvestres",
        price: 16
      }
    ]
  },
  {
    id: "pescados",
    title: "Pescados",
    items: [
      { number: 57, name: "Calamares fritos / plancha", price: 13 },
      { number: 58, name: "Boquerones fritos", price: 12 },
      { number: 59, name: "Saltones fritos", price: 12, seasonal: true },
      { number: 60, name: "Chanquete", price: 12 },
      { number: 61, name: "Galanes fritos", price: 42, unit: "kg", seasonal: true },
      { number: 62, name: "Chipirones fritos", price: 13 },
      { number: 63, name: "Huevas y letones fritos o a la plancha", price: 14 },
      { number: 64, name: "Sardinas a la plancha", price: 12 },
      { number: 65, name: "Emperador a la plancha", price: 15 },
      { number: 66, name: "Salmonetes fritos / plancha", price: 15, unit: "1/2 kg" },
      { number: 67, name: "Brótola frita / plancha", price: 18, unit: "1/2 kg" },
      { number: 68, name: "Rape frito / plancha", price: 18, unit: "1/2 kg" },
      { number: 69, name: "Gallineta frita / plancha", price: 22, unit: "1/2 kg" },
      { number: 70, name: "Gallo pedro frito / plancha", price: 22, unit: "1/2 kg" },
      { number: 71, name: "Dorada a la plancha", price: 18, unit: "1/2 kg" },
      { number: 72, name: "Pargo a la plancha", price: 20, unit: "1/2 kg" },
      { number: 73, name: "Lubina a la plancha", price: 20, unit: "1/2 kg" },
      { number: 74, name: "Mero frito / plancha", price: 22, unit: "1/2 kg" },
      { number: 75, name: "Rodaballo frito / plancha", price: 18, unit: "1/2 kg" },
      { number: 76, name: "Lenguado frito / plancha", price: 20, unit: "1/2 kg" },
      {
        number: 77,
        name: "Fritura de pescados",
        price: 45,
        unit: "2 pers.",
        description:
          "Plato basado en pescados de nuestra costa como gallo pedro, merluza, lubina, salmonete, etc."
      },
      {
        number: 78,
        name: "Parrillada de pescado",
        price: 45,
        unit: "2 pers.",
        description:
          "Plato basado en pescados de nuestra costa como gallo pedro, merluza, lubina, salmonete, etc."
      },
      {
        number: 79,
        name: "Cabezas y quijadas de pescado frito",
        price: 15,
        description: "Cabezas de pescados como gallo pedro, gallineta, mero, etc."
      }
    ]
  },
  {
    id: "vinos-tintos",
    title: "Vinos tintos",
    items: [
      { name: "Ramón Bilbao Crianza", price: 8, unit: "3/8 L", region: "Rioja" },
      { name: "Ramón Bilbao Reserva", price: 19, region: "Rioja" },
      { name: "Ramón Bilbao Edición Limitada", price: 17, region: "Rioja" },
      { name: "Luis Cañas Crianza", price: 16, region: "Rioja" },
      { name: "Luis Cañas Crianza Magnum", price: 30, unit: "1,5 L", region: "Rioja" },
      { name: "Beronia Edición Limitada", price: 15, region: "Rioja" },
      { name: "La Montesa", price: 19, region: "Rioja" },
      { name: "Martínez La Cuesta Crianza", price: 17, region: "Rioja" },
      { name: "Roda I", price: 58, region: "Rioja" },
      { name: "Marqués de Riscal Reserva", price: 20, region: "Rioja" },
      { name: "Contino Reserva", price: 35, region: "Rioja" },
      { name: "Viña Ardanza", price: 33, region: "Rioja" },
      { name: "Cruz de Alba", price: 19, region: "Ribera del Duero" },
      { name: "Emilio Moro", price: 25, region: "Ribera del Duero" },
      { name: "Hacienda Monasterio", price: 38, region: "Ribera del Duero" },
      { name: "Cepa 21", price: 25, region: "Ribera del Duero" },
      { name: "Malleolus", price: 36, region: "Ribera del Duero" },
      { name: "Finca Resalso", price: 17, region: "Ribera del Duero" },
      { name: "Cair Cuvée", price: 17, region: "Ribera del Duero" },
      { name: "Montecastro", price: 21, region: "Ribera del Duero" },
      { name: "Emilio Moro Magnum", price: 48, unit: "1,5 L", region: "Ribera del Duero" },
      { name: "Emilio Moro", price: 16, unit: "0,5 L", region: "Ribera del Duero" },
      { name: "Protos Cosecha", price: 14, region: "Ribera del Duero" },
      { name: "Protos Crianza", price: 22, region: "Ribera del Duero" },
      { name: "Castillo Peñafiel Crianza", price: 19, region: "Ribera del Duero" },
      { name: "Senda Olivos", price: 20, region: "Ribera del Duero" }
    ]
  },
  {
    id: "vinos-blancos",
    title: "Vinos blancos",
    items: [
      { name: "Enate Chardonnay 234", price: 16, region: "Somontano" },
      { name: "Finca Montico", price: 18, region: "Rueda" },
      { name: "José Pariente", price: 17, region: "Rueda" },
      { name: "Marqués de Riscal", price: 8, unit: "3/8 L", region: "Rueda" },
      { name: "Marqués de Riscal Verdejo", price: 16, region: "Rueda" },
      { name: "Marqués de Riscal Sauvignon", price: 17, region: "Rueda" },
      { name: "Ramón Bilbao Verdejo", price: 16, region: "Rueda" },
      { name: "Caraballas Verdejo Ecológico", price: 17, region: "Rueda" },
      { name: "Caraballas Sauvignon Ecológico", price: 18, region: "Rueda" },
      { name: "Caraballas Chardonnay", price: 18, region: "Rueda" },
      { name: "Caraballas Magnum Verdejo", price: 28, region: "Rueda" },
      { name: "Martín Códax", price: 10, unit: "3/8 L", region: "Albariño" },
      { name: "Martín Códax", price: 18, region: "Albariño" },
      { name: "Finca Valiñas", price: 25, region: "Albariño" },
      { name: "Mar de Frades Magnum", price: 35, unit: "1,5 L", region: "Albariño" },
      { name: "Mar de Frades", price: 12, region: "Albariño" },
      { name: "Lusco", price: 18, region: "Albariño" },
      { name: "Lías", price: 22, region: "Albariño" },
      { name: "Barbadillo", price: 8, unit: "3/8 L", region: "Cádiz" },
      { name: "Barbadillo", price: 7, region: "Cádiz" },
      { name: "Inurrieta", price: 12, region: "Navarra" },
      { name: "Viña Sol", price: 8, unit: "3/8 L", region: "Penedés" },
      { name: "Viña Esmeralda", price: 9, unit: "3/8 L", region: "Penedés" },
      { name: "Viña Sol", price: 13, region: "Penedés" },
      { name: "Viña Esmeralda", price: 16, region: "Penedés" },
      { name: "Waltraud", price: 20, region: "Penedés" },
      { name: "Blanc Pescador", price: 7, unit: "3/8 L", region: "Ampurdán Costa Brava" },
      { name: "Blanc Pescador", price: 12, region: "Ampurdán Costa Brava" },
      { name: "Monopole", price: 15, region: "Rioja" },
      { name: "Viña Laujar", price: 12, region: "Almería" },
      { name: "Cristina Calvache", price: 15, region: "Almería" }
    ]
  },
  {
    id: "vinos-rosados",
    title: "Vinos rosados",
    items: [
      { name: "De Casta", price: 6, unit: "3/8 L", region: "Penedés" },
      { name: "De Casta", price: 10, region: "Penedés" },
      { name: "Enate", price: 14, region: "Somontano" },
      { name: "Lambrusco", price: 10, region: "Italia" },
      { name: "Hito", price: 12, region: "Ribera del Duero" },
      { name: "Tinto, blanco, rosado (vino de la casa)", price: 12 }
    ]
  },
  {
    id: "champagne-cava",
    title: "Champagne y cava",
    items: [
      { name: "Vilarnaud Brut Nature", price: 18, region: "Cava" },
      { name: "Anna de Codorníu Brut Nature", price: 21, region: "Cava" },
      { name: "Juvé Camps Reserva de la Familia", price: 26, region: "Cava" },
      { name: "Juvé Camps Benjamín", price: 16, region: "Cava" },
      { name: "Agustí Torelló Barrica", price: 28, region: "Cava" },
      { name: "Agustí Torelló Brut Nature", price: 22, region: "Cava" },
      { name: "Vilarnaud Rosado", price: 18, region: "Cava" },
      { name: "Edone Rosé", price: 28, region: "Cava" },
      { name: "Moët & Chandon Brut Impérial", price: 60, region: "Champagne" },
      { name: "Dom Pérignon", price: 170, region: "Champagne" },
      { name: "Laurent-Perrier Brut", price: 65, region: "Champagne" }
    ]
  }
];
