"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { AlertCircle, CalendarCheck, Phone } from "lucide-react";
import { createReservationAction } from "@/app/reservar/actions";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import type { Locale } from "@/lib/config/public-content";
import type { AvailabilitySlot } from "@/types/domain";

type LandingReservationFormProps = {
  initialDate: string;
  initialSlots: AvailabilitySlot[];
  locale: Locale;
};

const copy = {
  es: {
    eyebrow: "Reserva online",
    title: "Reserva tu mesa",
    description:
      "Déjanos los datos y el equipo confirmará la solicitud lo antes posible.",
    date: "Fecha",
    time: "Hora",
    guests: "Personas",
    name: "Nombre",
    phone: "Teléfono",
    notes: "Comentarios",
    notesPlaceholder: "Preferencias, hora flexible, carrito, ocasión especial...",
    privacy: "Acepto la política básica de privacidad",
    submit: "Solicitar reserva",
    loading: "Cargando horarios...",
    noSlots: "No hay horarios disponibles para esta fecha.",
    errorSlots: "No se han podido cargar los horarios.",
    phoneAlternative: "También puedes reservar por teléfono"
  },
  en: {
    eyebrow: "Online booking",
    title: "Book your table",
    description:
      "Leave your details and the team will confirm the request as soon as possible.",
    date: "Date",
    time: "Time",
    guests: "Guests",
    name: "Name",
    phone: "Phone",
    notes: "Comments",
    notesPlaceholder: "Preferences, flexible time, stroller, special occasion...",
    privacy: "I accept the basic privacy policy",
    submit: "Request booking",
    loading: "Loading times...",
    noSlots: "No available times for this date.",
    errorSlots: "Could not load available times.",
    phoneAlternative: "You can also book by phone"
  }
};

export function LandingReservationForm({
  initialDate,
  initialSlots,
  locale
}: LandingReservationFormProps) {
  const [state, formAction, pending] = useActionState(createReservationAction, {
    ok: true
  });
  const [date, setDate] = useState(initialDate);
  const [guests, setGuests] = useState(2);
  const [slots, setSlots] = useState(initialSlots);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    let ignore = false;

    async function loadSlots() {
      setLoadingSlots(true);
      setSlotsError(false);

      try {
        const response = await fetch(`/api/availability?date=${date}`);
        if (!response.ok) {
          throw new Error("Could not load availability");
        }
        const data = (await response.json()) as { slots: AvailabilitySlot[] };
        if (!ignore) {
          setSlots(data.slots);
        }
      } catch {
        if (!ignore) {
          setSlotsError(true);
          setSlots([]);
        }
      } finally {
        if (!ignore) {
          setLoadingSlots(false);
        }
      }
    }

    if (date !== initialDate) {
      loadSlots();
    }

    return () => {
      ignore = true;
    };
  }, [date, initialDate]);

  const availableSlots = useMemo(
    () => slots.filter((slot) => !slot.disabled),
    [slots]
  );

  return (
    <form
      action={formAction}
      className="rounded-[1.5rem] border border-harbor-900/10 bg-white p-5 shadow-[0_24px_70px_rgba(23,59,58,0.16)] sm:p-6"
    >
      <input name="locale" type="hidden" value={locale} />
      <input name="email" type="hidden" value="" />
      <input name="allergies" type="hidden" value="" />
      <input name="seatingPreference" type="hidden" value="no_preference" />
      <input name="groupDetails" type="hidden" value="" />

      <div className="mb-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-700">
          {t.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-harbor-900">
          {t.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-harbor-900/70">
          {t.description}
        </p>
      </div>

      {!state.ok && state.message ? (
        <div className="mb-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle aria-hidden="true" size={18} />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          label={t.date}
          name="date"
          required
          type="date"
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
        />
        <label className="grid gap-2 text-sm font-semibold text-harbor-900">
          {t.time}
          <select
            className="min-h-[3.25rem] rounded-xl border border-harbor-900/15 bg-paper px-3 text-base outline-none transition focus:border-terracotta-600 focus:ring-4 focus:ring-terracotta-600/10"
            disabled={loadingSlots || availableSlots.length === 0}
            name="time"
            required
          >
            {availableSlots.map((slot) => (
              <option key={slot.time} value={slot.time}>
                {slot.time}
              </option>
            ))}
          </select>
        </label>
        <Field
          label={t.guests}
          max={40}
          min={1}
          name="guests"
          required
          type="number"
          value={guests}
          onChange={(event) => setGuests(Number(event.currentTarget.value))}
        />
      </div>

      {loadingSlots ? <p className="mt-2 text-sm text-harbor-900/65">{t.loading}</p> : null}
      {slotsError ? <p className="mt-2 text-sm text-red-700">{t.errorSlots}</p> : null}
      {!loadingSlots && !slotsError && availableSlots.length === 0 ? (
        <p className="mt-2 text-sm text-harbor-900/65">{t.noSlots}</p>
      ) : null}

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label={t.name} name="name" required />
        <Field label={t.phone} name="phone" required type="tel" />
      </div>

      <label className="mt-3 grid gap-2 text-sm font-semibold text-harbor-900">
        {t.notes}
        <textarea
          className="min-h-24 rounded-xl border border-harbor-900/15 bg-paper px-3 py-3 text-base outline-none transition placeholder:text-harbor-900/35 focus:border-terracotta-600 focus:ring-4 focus:ring-terracotta-600/10"
          name="notes"
          placeholder={t.notesPlaceholder}
        />
      </label>

      <label className="mt-4 flex items-start gap-3 text-sm font-semibold text-harbor-900">
        <input
          className="mt-0.5 h-5 w-5 rounded border-harbor-900/20 text-terracotta-700"
          name="privacyAccepted"
          required
          type="checkbox"
        />
        {t.privacy}
      </label>

      <button
        className="mt-5 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl bg-terracotta-700 px-5 py-3 text-base font-bold text-white shadow-[0_16px_34px_rgba(170,74,47,0.28)] transition hover:bg-terracotta-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending || loadingSlots || availableSlots.length === 0}
        type="submit"
      >
        <CalendarCheck aria-hidden="true" size={19} />
        {t.submit}
      </button>

      <a
        className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-harbor-900 hover:text-terracotta-700"
        href={RESTAURANT_CONFIG.phoneHref}
      >
        <Phone aria-hidden="true" size={16} />
        {t.phoneAlternative}: {RESTAURANT_CONFIG.phone}
      </a>
    </form>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

function Field({ label, className, ...props }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-harbor-900">
      {label}
      <input
        className={`min-h-[3.25rem] rounded-xl border border-harbor-900/15 bg-paper px-3 text-base outline-none transition placeholder:text-harbor-900/35 focus:border-terracotta-600 focus:ring-4 focus:ring-terracotta-600/10 ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}
