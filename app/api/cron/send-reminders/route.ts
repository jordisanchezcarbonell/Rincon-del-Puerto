import { NextResponse } from "next/server";
import { sendUpcomingReservationReminder } from "@/lib/email/reminders";
import { getOptionalServerEnv } from "@/lib/env";
import { mapReservation } from "@/lib/reservations/mappers";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

function tomorrowDateString() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const cronSecret = getOptionalServerEnv("CRON_SECRET");
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const supabase = createSupabaseServiceClient();
  const targetDate = tomorrowDateString();

  const { data: rows, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("status", "accepted")
    .eq("date", targetDate)
    .eq("reminder_sent", false)
    .not("email", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const restaurantIds = Array.from(new Set((rows ?? []).map((r) => r.restaurant_id)));
  const restaurantNames = new Map<string, string>();

  if (restaurantIds.length > 0) {
    const { data: restaurants } = await supabase
      .from("restaurants")
      .select("id, name")
      .in("id", restaurantIds);
    for (const r of restaurants ?? []) {
      restaurantNames.set(r.id, r.name);
    }
  }

  const results = await Promise.all(
    (rows ?? []).map(async (row) => {
      const restaurantName = restaurantNames.get(row.restaurant_id) ?? "Reservas";
      const reservation = mapReservation(row);

      const result = await sendUpcomingReservationReminder({
        restaurantName,
        reservation
      });

      if (result.status === "sent") {
        await supabase
          .from("reservations")
          .update({ reminder_sent: true })
          .eq("id", reservation.id);
      }

      return { id: reservation.id, ...result };
    })
  );

  return NextResponse.json({
    date: targetDate,
    processed: results.length,
    results
  });
}
