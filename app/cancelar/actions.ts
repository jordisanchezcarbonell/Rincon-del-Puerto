"use server";

import { redirect } from "next/navigation";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { sendReservationCancelledEmails } from "@/lib/email/send";
import { mapReservation } from "@/lib/reservations/mappers";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function cancelReservationByTokenAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");

  if (!token) {
    return;
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("reservations")
    .update({ status: "cancelled" })
    .eq("cancellation_token", token)
    .neq("status", "cancelled")
    .select("*")
    .single();

  if (error || !data) {
    redirect(`/cancelar/${token}?status=not-found`);
  }

  const reservation = mapReservation(data);
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("name")
    .eq("id", reservation.restaurantId)
    .maybeSingle();

  await sendReservationCancelledEmails({
    restaurantName: restaurant?.name ?? "Restaurante",
    reservation
  });
  await recordAnalyticsEvent({
    restaurantId: reservation.restaurantId,
    eventName: "reservation_cancelled",
    metadata: {
      reservationId: reservation.id,
      source: "customer_link"
    }
  });

  redirect(`/cancelar/${token}?status=cancelled`);
}
