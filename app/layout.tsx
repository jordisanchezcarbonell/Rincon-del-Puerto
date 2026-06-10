import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import { RESTAURANT_CONFIG, SITE_URL } from "@/lib/config/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "opsz"]
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${RESTAURANT_CONFIG.name} | Reservas y carta digital`,
    template: `%s | ${RESTAURANT_CONFIG.name}`
  },
  description: RESTAURANT_CONFIG.description,
  openGraph: {
    title: RESTAURANT_CONFIG.name,
    description: RESTAURANT_CONFIG.description,
    type: "website",
    images: [
      {
        url: "/hero-restaurant.png",
        width: 1200,
        height: 800,
        alt: RESTAURANT_CONFIG.name
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#173b3a"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
