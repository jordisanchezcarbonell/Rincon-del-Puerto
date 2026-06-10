import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { BlockedSlotsPanel } from "@/components/admin/blocked-slots-panel";
import { ReservationsPanel } from "@/components/admin/reservations-panel";
import { getAdminContext } from "@/lib/admin/context";
import type { ReservationStatus } from "@/types/domain";

export const metadata: Metadata = {
  title: "Panel de reservas"
};

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams?: Promise<{
    date?: string;
    status?: string;
  }>;
};

const allowedStatuses = new Set(["pending", "accepted", "rejected", "cancelled"]);

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const selectedDate = params?.date ?? getTodayISODate();
  const selectedStatus = parseStatus(params?.status);
  const { supabase, restaurant, user } = await getAdminContext();

  if (!restaurant) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-4">
        <section className="max-w-lg rounded-lg border border-harbor-900/10 bg-white p-6 text-center shadow-soft">
          <h1 className="text-2xl font-bold text-harbor-900">Sin restaurante asignado</h1>
          <p className="mt-2 text-harbor-900/70">
            Tu usuario existe, pero todavía no está vinculado a un restaurante en
            `restaurant_admins`.
          </p>
        </section>
      </main>
    );
  }

  let query = supabase
    .from("reservations")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .eq("date", selectedDate)
    .order("time", { ascending: true });

  if (selectedStatus !== "all") {
    query = query.eq("status", selectedStatus);
  }

  const { data: reservations, error } = await query;

  if (error) {
    throw new Error(`Could not load reservations: ${error.message}`);
  }

  const { data: blockedSlots, error: blockedSlotsError } = await supabase
    .from("blocked_slots")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .eq("date", selectedDate)
    .order("start_time", { ascending: true });

  if (blockedSlotsError) {
    throw new Error(`Could not load blocked slots: ${blockedSlotsError.message}`);
  }

  return (
    <main className="min-h-screen bg-[#eef6f5]">
      <header className="border-b border-harbor-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-harbor-600">{restaurant.name}</p>
            <h1 className="text-2xl font-bold text-harbor-900">Panel de reservas</h1>
            <p className="mt-1 text-sm text-harbor-900/65">{user.email}</p>
          </div>
          <form action={logoutAction}>
            <button className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-harbor-900/15 bg-white px-4 text-sm font-semibold text-harbor-900">
              <LogOut aria-hidden="true" size={16} />
              Salir
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid gap-6">
          <ReservationsPanel
            reservations={reservations ?? []}
            selectedDate={selectedDate}
            selectedStatus={selectedStatus}
          />
          <BlockedSlotsPanel
            blockedSlots={blockedSlots ?? []}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </main>
  );
}

function parseStatus(status?: string): ReservationStatus | "all" {
  if (status && allowedStatuses.has(status)) {
    return status as ReservationStatus;
  }

  return "all";
}

function getTodayISODate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}
