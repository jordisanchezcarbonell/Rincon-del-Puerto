export const RESERVATION_STATUSES = [
  "pending",
  "accepted",
  "rejected",
  "cancelled"
] as const;

export const SEATING_PREFERENCES = [
  "terrace",
  "inside",
  "no_preference"
] as const;

export const BLOCK_TYPES = ["slot", "shift", "day"] as const;

export const ANALYTICS_EVENTS = [
  "web_visit",
  "reservation_button_click",
  "menu_button_click",
  "directions_button_click",
  "reservation_started",
  "reservation_completed",
  "reservation_accepted",
  "reservation_rejected",
  "reservation_cancelled"
] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];
export type SeatingPreference = (typeof SEATING_PREFERENCES)[number];
export type BlockType = (typeof BLOCK_TYPES)[number];
export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type ReservationShiftLabel = "lunch" | "dinner";

export type ReservationShift = {
  label: ReservationShiftLabel;
  startTime: string;
  endTime: string;
};

export type RestaurantPublicConfig = {
  name: string;
  slug: string;
  description: string;
  menuUrl: string;
  googleMapsUrl: string;
  address: string;
  phone: string;
  phoneHref: string;
  reservationHours: string[];
};

export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
  menuUrl: string;
  googleMapsUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Reservation = {
  id: string;
  restaurantId: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
  cancellationToken: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  allergies: string | null;
  highChair: boolean;
  seatingPreference: SeatingPreference;
  internalNotes: string | null;
  isGroupRequest: boolean;
  groupDetails: string | null;
  privacyAcceptedAt: string;
};

export type NewReservationInput = {
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  allergies?: string;
  highChair: boolean;
  seatingPreference: SeatingPreference;
  groupDetails?: string;
  privacyAccepted: boolean;
};

export type BlockedSlot = {
  id: string;
  restaurantId: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  reason: string | null;
  blockType: BlockType;
  createdAt: string;
  updatedAt: string;
};

export type BlockedSlotForAvailability = Pick<
  BlockedSlot,
  "startTime" | "endTime" | "blockType"
>;

export type AvailabilitySlot = {
  time: string;
  disabled: boolean;
};

export type AnalyticsEvent = {
  id: string;
  restaurantId: string | null;
  eventName: AnalyticsEventName;
  metadata: Record<string, unknown>;
  createdAt: string;
};
