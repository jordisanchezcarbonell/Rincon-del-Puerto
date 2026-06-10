"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { AlertCircle, Phone } from "lucide-react";
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
    date: "Fecha",
    time: "Hora",
    guests: "Personas",
    name: "Nombre",
    phone: "Teléfono",
    notes: "Comentarios",
    notesPlaceholder: "Preferencias, hora flexible, carrito, ocasión especial...",
    privacy: "Acepto la política básica de privacidad",
    submit: "Enviar solicitud",
    loading: "Cargando horarios...",
    noSlots: "No hay horarios disponibles para esta fecha.",
    errorSlots: "No se han podido cargar los horarios.",
    phoneAlternative: "También puedes reservar por teléfono"
  },
  en: {
    date: "Date",
    time: "Time",
    guests: "Guests",
    name: "Name",
    phone: "Phone",
    notes: "Comments",
    notesPlaceholder: "Preferences, flexible time, stroller, special occasion...",
    privacy: "I accept the basic privacy policy",
    submit: "Send request",
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
      className="border-y border-harbor-900/10 bg-[#fbfaf6] py-5 sm:border sm:px-5"
    >
      <input name="locale" type="hidden" value={locale} />
      <input name="email" type="hidden" value="" />
      <input name="allergies" type="hidden" value="" />
      <input name="seatingPreference" type="hidden" value="no_preference" />
      <input name="groupDetails" type="hidden" value="" />

      {!state.ok && state.message ? (
        <div className="mb-4 flex gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle aria-hidden="true" size={18} />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-3 md:grid-cols-[1fr_0.85fr_0.7fr_1.05fr_1fr]">
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
            className="min-h-[3.15rem] border border-harbor-900/15 bg-white px-3 text-base outline-none transition focus:border-terracotta-600 focus:ring-4 focus:ring-terracotta-600/10"
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
        <Field label={t.name} name="name" required />
        <Field label={t.phone} name="phone" required type="tel" />
      </div>

      {loadingSlots ? <p className="mt-2 text-sm text-harbor-900/65">{t.loading}</p> : null}
      {slotsError ? <p className="mt-2 text-sm text-red-700">{t.errorSlots}</p> : null}
      {!loadingSlots && !slotsError && availableSlots.length === 0 ? (
        <p className="mt-2 text-sm text-harbor-900/65">{t.noSlots}</p>
      ) : null}

      <label className="mt-3 grid gap-2 text-sm font-semibold text-harbor-900">
        {t.notes}
        <textarea
          className="min-h-20 border border-harbor-900/15 bg-white px-3 py-3 text-base outline-none transition placeholder:text-harbor-900/40 focus:border-terracotta-600 focus:ring-4 focus:ring-terracotta-600/10"
          name="notes"
          placeholder={t.notesPlaceholder}
        />
      </label>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-start gap-3 text-sm font-semibold text-harbor-900">
          <input
            className="mt-0.5 h-5 w-5 border-harbor-900/20 text-terracotta-700"
            name="privacyAccepted"
            required
            type="checkbox"
          />
          {t.privacy}
        </label>

        <button
          className="inline-flex min-h-[3.15rem] items-center justify-center bg-terracotta-700 px-6 py-3 text-base font-bold text-white transition hover:bg-terracotta-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={pending || loadingSlots || availableSlots.length === 0}
          type="submit"
        >
          {t.submit}
        </button>
      </div>

      <a
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-harbor-900 hover:text-terracotta-700"
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
        className={`min-h-[3.15rem] border border-harbor-900/15 bg-white px-3 text-base outline-none transition placeholder:text-harbor-900/40 focus:border-terracotta-600 focus:ring-4 focus:ring-terracotta-600/10 ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}
