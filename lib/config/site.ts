import type { RestaurantPublicConfig } from "@/types/domain";

export const MENU_URL =
  process.env.NEXT_PUBLIC_MENU_URL ??
  "https://www.flipsnack.com/restauranterincondelpuerto/carta-ingles.html";

export const GOOGLE_MAPS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ??
  "https://share.google/G6rthQkXG7LqNFKGU";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const RESTAURANT_SLUG =
  process.env.NEXT_PUBLIC_RESTAURANT_SLUG ?? "rincon-del-puerto";

export const RESTAURANT_CONFIG: RestaurantPublicConfig = {
  name: "Restaurante Rincón del Puerto",
  slug: RESTAURANT_SLUG,
  description:
    "Cocina mediterránea, pescado fresco y platos tradicionales frente al puerto de Garrucha.",
  menuUrl: MENU_URL,
  googleMapsUrl: GOOGLE_MAPS_URL,
  address: "Explanada del Puerto, s/n, 04630 Garrucha, Almería",
  phone: "950 133 043",
  phoneHref: "tel:+34950133043",
  reservationHours: [
    "Miércoles a lunes",
    "Comidas: 13:00-16:30",
    "Cenas: 20:00-23:30",
    "Martes cerrado"
  ]
};
