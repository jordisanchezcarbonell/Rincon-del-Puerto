import type { Database } from "@/types/database";
import type { BlockedSlotForAvailability, Reservation } from "@/types/domain";

type ReservationRow = Database["public"]["Tables"]["reservations"]["Row"];
type BlockedSlotRow = Database["public"]["Tables"]["blocked_slots"]["Row"];

export function mapReservation(row: ReservationRow): Reservation {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cancellationToken: row.cancellation_token,
    date: row.date,
    time: row.time.slice(0, 5),
    guests: row.guests,
    name: row.name,
    phone: row.phone,
    email: row.email,
    notes: row.notes,
    allergies: row.allergies,
    highChair: row.high_chair,
    seatingPreference: row.seating_preference,
    internalNotes: row.internal_notes,
    isGroupRequest: row.is_group_request,
    groupDetails: row.group_details,
    privacyAcceptedAt: row.privacy_accepted_at
  };
}

export function mapBlockedSlotForAvailability(
  row: Pick<BlockedSlotRow, "start_time" | "end_time" | "block_type">
): BlockedSlotForAvailability {
  return {
    startTime: row.start_time ? row.start_time.slice(0, 5) : null,
    endTime: row.end_time ? row.end_time.slice(0, 5) : null,
    blockType: row.block_type
  };
}
