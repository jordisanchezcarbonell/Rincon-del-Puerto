"use client";

import { useEffect, useMemo, useState, useActionState } from "react";
import { AlertCircle, CalendarCheck, Loader2 } from "lucide-react";
import { createReservationAction } from "@/app/reservar/actions";
import { GROUP_REQUEST_GUEST_THRESHOLD } from "@/lib/reservations/policy";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import type { AvailabilitySlot } from "@/types/domain";

type ReservationFormProps = {
  locale: Locale;
  initialDate: string;
  initialSlots: AvailabilitySlot[];
};

export function ReservationForm({
  locale,
  initialDate,
  initialSlots
}: ReservationFormProps) {
  const [state, formAction, pending] = useActionState(createReservationAction, {
    ok: true
  });
  const [date, setDate] = useState(initialDate);
  const [guests, setGuests] = useState(2);
  const [slots, setSlots] = useState(initialSlots);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const t = PUBLIC_CONTENT[locale].reservationForm;

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
      className="mx-auto grid max-w-2xl gap-5 rounded-lg border border-harbor-900/10 bg-white p-5 shadow-soft sm:p-7"
    >
      <input name="locale" type="hidden" value={locale} />
      <div>
        <h1 className="text-3xl font-bold text-harbor-900">{t.title}</h1>
        <p className="mt-2 text-sm leading-6 text-harbor-900/70">
          {t.description}
        </p>
      </div>

      {!state.ok && state.message ? (
        <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle aria-hidden="true" size={18} />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.name} name="name" required />
        <Field label={t.phone} name="phone" required type="tel" />
        <Field label={t.email} name="email" type="email" />
        <Field
          label={t.date}
          name="date"
          required
          type="date"
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
        />
        <Field
          label={t.guests}
          min={1}
          max={40}
          name="guests"
          required
          type="number"
          value={guests}
          onChange={(event) => setGuests(Number(event.currentTarget.value))}
        />
        <label className="grid gap-2 text-sm font-semibold text-harbor-900">
          {t.time}
          <select
            className="min-h-12 rounded-lg border border-harbor-900/15 bg-white px-3 text-base"
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
      </div>

      {loadingSlots ? <p className="text-sm text-harbor-900/65">{t.loading}</p> : null}
      {slotsError ? <p className="text-sm text-red-700">{t.errorSlots}</p> : null}
      {!loadingSlots && !slotsError && availableSlots.length === 0 ? (
        <p className="text-sm text-harbor-900/65">{t.noSlots}</p>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-harbor-900">
        {t.seating}
        <select
          className="min-h-12 rounded-lg border border-harbor-900/15 bg-white px-3 text-base"
          name="seatingPreference"
          required
        >
          <option value="no_preference">{t.noPreference}</option>
          <option value="terrace">{t.terrace}</option>
          <option value="inside">{t.inside}</option>
        </select>
      </label>

      {guests > GROUP_REQUEST_GUEST_THRESHOLD ? (
        <div className="rounded-lg border border-harbor-600/20 bg-harbor-50 p-4">
          <p className="text-sm font-semibold text-harbor-900">{t.group}</p>
          <Textarea className="mt-3" label={t.groupDetails} name="groupDetails" />
        </div>
      ) : null}

      <Textarea label={t.notes} name="notes" />
      <Textarea label={t.allergies} name="allergies" />

      <label className="flex items-center gap-3 text-sm font-semibold text-harbor-900">
        <input className="h-5 w-5 rounded border-harbor-900/20" name="highChair" type="checkbox" />
        {t.highChair}
      </label>

      <label className="flex items-start gap-3 text-sm font-semibold text-harbor-900">
        <input
          className="mt-0.5 h-5 w-5 rounded border-harbor-900/20"
          name="privacyAccepted"
          required
          type="checkbox"
        />
        {t.privacy}
      </label>

      <button
        aria-busy={pending}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-harbor-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-harbor-600 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={pending || loadingSlots || availableSlots.length === 0}
        type="submit"
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" size={18} />
            {t.submitting}
          </>
        ) : (
          <>
            <CalendarCheck aria-hidden="true" size={18} />
            {t.submit}
          </>
        )}
      </button>
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
        className={`min-h-12 rounded-lg border border-harbor-900/15 bg-white px-3 text-base ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-harbor-900">
      {label}
      <textarea
        className={`min-h-28 rounded-lg border border-harbor-900/15 bg-white px-3 py-3 text-base ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}
