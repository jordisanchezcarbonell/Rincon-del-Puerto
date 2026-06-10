const TIME_ZONE = "Europe/Madrid";

const CLOSED_WEEKDAYS = new Set<number>([2]);

const SERVICE_WINDOWS = [
  { start: 13 * 60, end: 16 * 60 + 30 },
  { start: 20 * 60, end: 23 * 60 + 30 }
];

const WEEKDAY_NAMES = {
  es: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
} as const;

export type RestaurantStatus = {
  openNow: boolean;
  closedToday: boolean;
  label: { es: string; en: string };
};

function getMadridNow() {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const parts = formatter.formatToParts(new Date());
  const weekdayShort = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const map: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
  };
  return {
    weekday: map[weekdayShort] ?? 1,
    minutesOfDay: hour * 60 + minute
  };
}

function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function getRestaurantStatus(): RestaurantStatus {
  const { weekday, minutesOfDay } = getMadridNow();
  const closedToday = CLOSED_WEEKDAYS.has(weekday);

  if (!closedToday) {
    for (const window of SERVICE_WINDOWS) {
      if (minutesOfDay >= window.start && minutesOfDay <= window.end) {
        return {
          openNow: true,
          closedToday: false,
          label: { es: "Abierto ahora", en: "Open now" }
        };
      }
    }
    const nextWindow = SERVICE_WINDOWS.find((w) => w.start > minutesOfDay);
    if (nextWindow) {
      const time = formatMinutes(nextWindow.start);
      return {
        openNow: false,
        closedToday: false,
        label: {
          es: `Hoy abrimos a las ${time}`,
          en: `Opens today at ${time}`
        }
      };
    }
  }

  let daysAhead = 1;
  while (daysAhead < 8 && CLOSED_WEEKDAYS.has((weekday + daysAhead) % 7)) {
    daysAhead++;
  }
  const nextDay = (weekday + daysAhead) % 7;
  const firstTime = formatMinutes(SERVICE_WINDOWS[0].start);

  const esDay =
    daysAhead === 1 ? "mañana" : WEEKDAY_NAMES.es[nextDay];
  const enDay =
    daysAhead === 1 ? "tomorrow" : WEEKDAY_NAMES.en[nextDay];

  return {
    openNow: false,
    closedToday: true,
    label: {
      es: `Reabrimos ${esDay} a las ${firstTime}`,
      en: `Reopens ${enDay} at ${firstTime}`
    }
  };
}
