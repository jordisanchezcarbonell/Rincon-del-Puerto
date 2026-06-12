import type {
  AvailabilitySlot,
  BlockedSlotForAvailability,
  ReservationShift,
  Weekday
} from "@/types/domain";

export const RESTAURANT_TIMEZONE = "Europe/Madrid";
export const GROUP_REQUEST_GUEST_THRESHOLD = 8;
export const MAX_STANDARD_GUESTS = 8;

export const RESERVATION_SHIFTS_BY_WEEKDAY: Record<
  Weekday,
  ReservationShift[]
> = {
  monday: [
    { label: "lunch", startTime: "13:00", endTime: "16:00" },
    { label: "dinner", startTime: "20:00", endTime: "23:00" }
  ],
  tuesday: [],
  wednesday: [
    { label: "lunch", startTime: "13:00", endTime: "16:00" },
    { label: "dinner", startTime: "20:00", endTime: "23:00" }
  ],
  thursday: [
    { label: "lunch", startTime: "13:00", endTime: "16:00" },
    { label: "dinner", startTime: "20:00", endTime: "23:00" }
  ],
  friday: [
    { label: "lunch", startTime: "13:00", endTime: "16:00" },
    { label: "dinner", startTime: "20:00", endTime: "23:30" }
  ],
  saturday: [
    { label: "lunch", startTime: "13:00", endTime: "16:30" },
    { label: "dinner", startTime: "20:00", endTime: "23:30" }
  ],
  sunday: [{ label: "lunch", startTime: "13:00", endTime: "16:30" }]
};

const WEEKDAYS: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

export function isGroupRequest(guests: number) {
  return guests > GROUP_REQUEST_GUEST_THRESHOLD;
}

export function getConfiguredTimeSlotsForDate(date: string) {
  const weekday = getWeekday(date);

  return RESERVATION_SHIFTS_BY_WEEKDAY[weekday].flatMap((shift) =>
    buildThirtyMinuteSlots(shift.startTime, shift.endTime)
  );
}

export function getAvailabilitySlots(
  date: string,
  blockedSlots: BlockedSlotForAvailability[]
): AvailabilitySlot[] {
  const now = getCurrentMadridDateTime();
  return getConfiguredTimeSlotsForDate(date).map((time) => ({
    time,
    disabled:
      isTimeBlocked(time, blockedSlots) || isPastSlot(date, time, now)
  }));
}

function isPastSlot(
  date: string,
  time: string,
  now: { date: string; time: string }
) {
  if (date < now.date) {
    return true;
  }
  if (date > now.date) {
    return false;
  }
  return time <= now.time;
}

function getCurrentMadridDateTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: RESTAURANT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());

  const lookup = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return {
    date: `${lookup("year")}-${lookup("month")}-${lookup("day")}`,
    time: `${lookup("hour")}:${lookup("minute")}`
  };
}

export function getSelectableTimeSlots(
  date: string,
  blockedSlots: BlockedSlotForAvailability[]
) {
  return getAvailabilitySlots(date, blockedSlots)
    .filter((slot) => !slot.disabled)
    .map((slot) => slot.time);
}

export function isTimeBlocked(
  time: string,
  blockedSlots: BlockedSlotForAvailability[]
) {
  return blockedSlots.some((slot) => {
    if (slot.blockType === "day") {
      return true;
    }

    if (!slot.startTime || !slot.endTime) {
      return false;
    }

    return time >= normalizeTime(slot.startTime) && time < normalizeTime(slot.endTime);
  });
}

function getWeekday(date: string): Weekday {
  const parsedDate = new Date(`${date}T12:00:00`);
  return WEEKDAYS[parsedDate.getDay()];
}

function buildThirtyMinuteSlots(startTime: string, endTime: string) {
  const slots: string[] = [];
  let cursor = toMinutes(startTime);
  const end = toMinutes(endTime);

  while (cursor < end) {
    slots.push(fromMinutes(cursor));
    cursor += 30;
  }

  return slots;
}

function toMinutes(time: string) {
  const [hours, minutes] = normalizeTime(time).split(":").map(Number);
  return hours * 60 + minutes;
}

function fromMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function normalizeTime(time: string) {
  return time.slice(0, 5);
}
