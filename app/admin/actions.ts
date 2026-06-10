"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminContext } from "@/lib/admin/context";
import { recordAnalyticsEvent } from "@/lib/analytics";
import {
  sendReservationAcceptedEmail,
  sendReservationCancelledEmails,
  sendReservationRejectedEmail
} from "@/lib/email/send";
import { mapReservation } from "@/lib/reservations/mappers";
import type { ReservationStatus } from "@/types/domain";

export async function logoutAction() {
  const { supabase } = await getAdminContext();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function acceptReservationAction(formData: FormData) {
  await updateReservationStatus(formData, "accepted");
}

export async function rejectReservationAction(formData: FormData) {
  await updateReservationStatus(formData, "rejected");
}

export async function cancelReservationAction(formData: FormData) {
  await updateReservationStatus(formData, "cancelled");
}

export async function updateInternalNotesAction(formData: FormData) {
  const reservationId = String(formData.get("reservationId") ?? "");
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();
  const { supabase, restaurant } = await getAdminContext();

  if (!restaurant || !reservationId) {
    return;
  }

  await supabase
    .from("reservations")
    .update({ internal_notes: internalNotes || null })
    .eq("restaurant_id", restaurant.id)
    .eq("id", reservationId);

  revalidatePath("/admin");
}

export async function createBlockedSlotAction(formData: FormData) {
  const date = String(formData.get("date") ?? "");
  const blockType = String(formData.get("blockType") ?? "");
  const startTime = String(formData.get("startTime") ?? "");
  const endTime = String(formData.get("endTime") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  const { supabase, restaurant } = await getAdminContext();

  if (!restaurant || !date || !["slot", "shift", "day"].includes(blockType)) {
    return;
  }

  if (blockType !== "day" && (!startTime || !endTime)) {
    return;
  }

  await supabase.from("blocked_slots").insert({
    restaurant_id: restaurant.id,
    date,
    block_type: blockType as "slot" | "shift" | "day",
    start_time: blockType === "day" ? null : startTime,
    end_time: blockType === "day" ? null : endTime,
    reason: reason || null
  });

  revalidatePath("/admin");
}

export async function deleteBlockedSlotAction(formData: FormData) {
  const blockedSlotId = String(formData.get("blockedSlotId") ?? "");
  const { supabase, restaurant } = await getAdminContext();

  if (!restaurant || !blockedSlotId) {
    return;
  }

  await supabase
    .from("blocked_slots")
    .delete()
    .eq("restaurant_id", restaurant.id)
    .eq("id", blockedSlotId);

  revalidatePath("/admin");
}

async function updateReservationStatus(
  formData: FormData,
  status: ReservationStatus
) {
  const reservationId = String(formData.get("reservationId") ?? "");
  const { supabase, restaurant } = await getAdminContext();

  if (!restaurant || !reservationId) {
    return;
  }

  const { data, error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("restaurant_id", restaurant.id)
    .eq("id", reservationId)
    .select("*")
    .single();

  if (error || !data) {
    return;
  }

  const context = {
    restaurantName: restaurant.name,
    reservation: mapReservation(data)
  };

  if (status === "accepted") {
    await sendReservationAcceptedEmail(context);
    await recordAnalyticsEvent({
      restaurantId: restaurant.id,
      eventName: "reservation_accepted",
      metadata: { reservationId }
    });
  }

  if (status === "rejected") {
    await sendReservationRejectedEmail(context);
    await recordAnalyticsEvent({
      restaurantId: restaurant.id,
      eventName: "reservation_rejected",
      metadata: { reservationId }
    });
  }

  if (status === "cancelled") {
    await sendReservationCancelledEmails(context);
    await recordAnalyticsEvent({
      restaurantId: restaurant.id,
      eventName: "reservation_cancelled",
      metadata: { reservationId, source: "admin" }
    });
  }

  revalidatePath("/admin");
}
