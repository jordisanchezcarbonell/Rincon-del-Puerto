"use server";

import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { getPilotRestaurant } from "@/lib/restaurants";
import { sendNewReservationEmails } from "@/lib/email/send";
import { mapReservation } from "@/lib/reservations/mappers";
import { isReservationTimeAvailable } from "@/lib/reservations/availability";
import { isGroupRequest } from "@/lib/reservations/policy";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { formDataToReservationInput } from "@/lib/validations/reservation";

export type ReservationActionState = {
  ok: boolean;
  message?: string;
};

export async function createReservationAction(
  _previousState: ReservationActionState,
  formData: FormData
): Promise<ReservationActionState> {
  const locale = formData.get("locale") === "en" ? "en" : "es";

  try {
    const values = formDataToReservationInput(formData);
    const restaurant = await getPilotRestaurant();
    const available = await isReservationTimeAvailable(
      restaurant.id,
      values.date,
      values.time
    );

    if (!available) {
      return {
        ok: false,
        message:
          locale === "en"
            ? "That time is no longer available. Please choose another one."
            : "Ese horario ya no está disponible. Elige otro, por favor."
      };
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        restaurant_id: restaurant.id,
        status: "pending",
        date: values.date,
        time: values.time,
        guests: values.guests,
        name: values.name,
        phone: values.phone,
        email: values.email || null,
        notes: values.notes || null,
        allergies: values.allergies || null,
        high_chair: values.highChair,
        seating_preference: values.seatingPreference,
        is_group_request: isGroupRequest(values.guests),
        group_details: values.groupDetails || null,
        privacy_accepted_at: new Date().toISOString()
      })
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        return {
          ok: false,
          message:
            locale === "en"
              ? "A similar active booking already exists for that phone and time."
              : "Ya existe una reserva activa con ese teléfono para ese horario."
        };
      }

      return {
        ok: false,
        message:
          locale === "en"
            ? "We could not save your request. Please try again."
            : "No hemos podido guardar la solicitud. Inténtalo de nuevo."
      };
    }

    if (data) {
      await sendNewReservationEmails({
        restaurantName: restaurant.name,
        reservation: mapReservation(data)
      });
      await recordAnalyticsEvent({
        restaurantId: restaurant.id,
        eventName: "reservation_completed",
        metadata: {
          reservationId: data.id,
          date: data.date,
          time: data.time,
          guests: data.guests
        }
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        message: error.issues[0]?.message ?? "Datos de reserva no válidos"
      };
    }

    return {
      ok: false,
      message:
        locale === "en"
          ? "Unexpected error while creating the booking request."
          : "Error inesperado al crear la solicitud de reserva."
    };
  }

  redirect(`/reserva/confirmacion?lang=${locale}`);
}
