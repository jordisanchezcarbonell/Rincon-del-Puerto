import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { getServerLocale } from "@/lib/config/locale";
import { PUBLIC_CONTENT } from "@/lib/config/public-content";
import { RESTAURANT_CONFIG, SITE_URL } from "@/lib/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const content = PUBLIC_CONTENT[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${RESTAURANT_CONFIG.name} | ${content.metadata.defaultTitle}`,
      template: `%s | ${RESTAURANT_CONFIG.name}`
    },
    description: RESTAURANT_CONFIG.description,
    openGraph: {
      title: RESTAURANT_CONFIG.name,
      description: RESTAURANT_CONFIG.description,
      type: "website",
      locale,
      images: [
        {
          url: "/brand/hero.jpg",
          width: 1200,
          height: 800,
          alt: RESTAURANT_CONFIG.name
        }
      ]
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b2547"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
