"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { createReservationAction } from "@/app/reservar/actions";
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
    notesPlaceholder:
      "Una mesa en la terraza, hora flexible, ocasión especial...",
    privacy: "Acepto la política básica de privacidad",
    submit: "Enviar solicitud",
    loading: "Cargando horarios...",
    noSlots: "No hay horarios disponibles para esta fecha.",
    errorSlots: "No se han podido cargar los horarios."
  },
  en: {
    date: "Date",
    time: "Time",
    guests: "Guests",
    name: "Name",
    phone: "Phone",
    notes: "Comments",
    notesPlaceholder:
      "A table on the terrace, flexible time, special occasion...",
    privacy: "I accept the basic privacy policy",
    submit: "Send request",
    loading: "Loading times...",
    noSlots: "No available times for this date.",
    errorSlots: "Could not load available times."
  }
};

const FIELD_INPUT_CLASS =
  "min-h-[3.25rem] w-full border-0 border-b border-harbor-900/25 bg-transparent px-0 text-lg text-harbor-900 outline-none transition placeholder:text-harbor-900/35 focus:border-terracotta-700";

const FIELD_LABEL_CLASS =
  "block font-serif text-xs uppercase tracking-[0.18em] text-harbor-900/65";

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
    <form action={formAction} className="grid gap-7">
      <input name="locale" type="hidden" value={locale} />
      <input name="email" type="hidden" value="" />
      <input name="allergies" type="hidden" value="" />
      <input name="seatingPreference" type="hidden" value="no_preference" />
      <input name="groupDetails" type="hidden" value="" />

      {!state.ok && state.message ? (
        <div className="flex gap-2 border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle aria-hidden="true" size={18} />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-date">
            {t.date}
          </label>
          <input
            id="reservation-date"
            className={FIELD_INPUT_CLASS}
            name="date"
            required
            type="date"
            value={date}
            onChange={(event) => setDate(event.currentTarget.value)}
          />
        </div>

        <div className="grid gap-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-time">
            {t.time}
          </label>
          <select
            id="reservation-time"
            className={`${FIELD_INPUT_CLASS} appearance-none`}
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
        </div>

        <div className="grid gap-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-guests">
            {t.guests}
          </label>
          <input
            id="reservation-guests"
            className={FIELD_INPUT_CLASS}
            max={40}
            min={1}
            name="guests"
            required
            type="number"
            value={guests}
            onChange={(event) => setGuests(Number(event.currentTarget.value))}
          />
        </div>

        <div className="grid gap-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-name">
            {t.name}
          </label>
          <input
            id="reservation-name"
            className={FIELD_INPUT_CLASS}
            name="name"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-phone">
            {t.phone}
          </label>
          <input
            id="reservation-phone"
            className={FIELD_INPUT_CLASS}
            name="phone"
            required
            type="tel"
          />
        </div>
      </div>

      {loadingSlots ? (
        <p className="text-sm italic text-harbor-900/65">{t.loading}</p>
      ) : null}
      {slotsError ? (
        <p className="text-sm text-red-700">{t.errorSlots}</p>
      ) : null}
      {!loadingSlots && !slotsError && availableSlots.length === 0 ? (
        <p className="text-sm italic text-harbor-900/65">{t.noSlots}</p>
      ) : null}

      <div className="grid gap-2">
        <label className={FIELD_LABEL_CLASS} htmlFor="reservation-notes">
          {t.notes}
        </label>
        <textarea
          id="reservation-notes"
          className="min-h-[6rem] w-full resize-y border-0 border-b border-harbor-900/25 bg-transparent px-0 py-3 text-base leading-relaxed text-harbor-900 outline-none transition placeholder:text-harbor-900/35 focus:border-terracotta-700"
          name="notes"
          placeholder={t.notesPlaceholder}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-harbor-900/75">
        <input
          className="mt-1 h-4 w-4 border-harbor-900/30 text-terracotta-700"
          name="privacyAccepted"
          required
          type="checkbox"
        />
        <span>{t.privacy}</span>
      </label>

      <button
        className="inline-flex min-h-[3.5rem] items-center justify-center bg-terracotta-700 px-8 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-terracotta-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending || loadingSlots || availableSlots.length === 0}
        type="submit"
      >
        {t.submit}
      </button>
    </form>
  );
}
