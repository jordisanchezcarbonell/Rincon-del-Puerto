import type { Metadata } from "next";
import { AnalyticsTracker } from "@/components/public/analytics-tracker";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getServerLocale } from "@/lib/config/locale";
import { PUBLIC_CONTENT } from "@/lib/config/public-content";
import { getPilotRestaurant } from "@/lib/restaurants";
import { getAvailabilityForDate } from "@/lib/reservations/availability";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: PUBLIC_CONTENT[locale].metadata.reserve.title,
    description: PUBLIC_CONTENT[locale].metadata.reserve.description
  };
}

export const dynamic = "force-dynamic";

export default async function ReservePage() {
  const locale = await getServerLocale();
  const initialDate = getTodayISODate();
  const restaurant = await getPilotRestaurant();
  const slots = await getAvailabilityForDate(restaurant.id, initialDate);

  return (
    <>
      <SiteHeader currentPath="/reservar" locale={locale} />
      <AnalyticsTracker eventsOnMount={["web_visit", "reservation_started"]} />
      <main className="bg-paper px-4 py-10 sm:px-6 md:py-14">
        <ReservationForm
          initialDate={initialDate}
          initialSlots={slots}
          locale={locale}
        />
      </main>
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
