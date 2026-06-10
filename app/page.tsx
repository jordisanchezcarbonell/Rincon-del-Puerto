import type { Metadata } from "next";
import { AnalyticsTracker } from "@/components/public/analytics-tracker";
import { HomeHero } from "@/components/public/home-hero";
import { HomeLocation } from "@/components/public/home-location";
import { HomeMenuPreview } from "@/components/public/home-menu-preview";
import { HomeReservation } from "@/components/public/home-reservation";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { resolveLocale } from "@/lib/config/public-content";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { getAvailabilityForDate } from "@/lib/reservations/availability";
import { getPilotRestaurant } from "@/lib/restaurants";

export const metadata: Metadata = {
  title: "Inicio",
  description: RESTAURANT_CONFIG.description
};

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
  const initialDate = getTodayISODate();
  const restaurant = await getPilotRestaurant();
  const slots = await getAvailabilityForDate(restaurant.id, initialDate);

  return (
    <>
      <SiteHeader currentPath="/" locale={locale} />
      <AnalyticsTracker />
      <HomeHero locale={locale} />
      <HomeReservation
        initialDate={initialDate}
        initialSlots={slots}
        locale={locale}
      />
      <HomeMenuPreview locale={locale} />
      <HomeLocation locale={locale} />
      <SiteFooter locale={locale} />
    </>
  );
}

function getTodayISODate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}
