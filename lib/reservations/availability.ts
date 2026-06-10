import "server-only";
import { getAvailabilitySlots } from "@/lib/reservations/policy";
import { mapBlockedSlotForAvailability } from "@/lib/reservations/mappers";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function getAvailabilityForDate(restaurantId: string, date: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("blocked_slots")
    .select("start_time,end_time,block_type")
    .eq("restaurant_id", restaurantId)
    .eq("date", date);

  if (error) {
    throw new Error(`Could not load blocked slots: ${error.message}`);
  }

  return getAvailabilitySlots(
    date,
    (data ?? []).map(mapBlockedSlotForAvailability)
  );
}

export async function isReservationTimeAvailable(
  restaurantId: string,
  date: string,
  time: string
) {
  const slots = await getAvailabilityForDate(restaurantId, date);

  return slots.some((slot) => slot.time === time && !slot.disabled);
}
