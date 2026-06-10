import type { Metadata } from "next";
import { AnalyticsTracker } from "@/components/public/analytics-tracker";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { resolveLocale } from "@/lib/config/public-content";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { getPilotRestaurant } from "@/lib/restaurants";
import { getAvailabilityForDate } from "@/lib/reservations/availability";

export const metadata: Metadata = {
  title: "Reservar mesa",
  description: `Solicita una reserva en ${RESTAURANT_CONFIG.name}.`
};

export const dynamic = "force-dynamic";

type ReservePageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function ReservePage({ searchParams }: ReservePageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);
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
