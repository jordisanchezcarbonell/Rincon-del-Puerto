"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { createReservationAction } from "@/app/reservar/actions";
import { PUBLIC_CONTENT, type Locale } from "@/lib/config/public-content";
import type { AvailabilitySlot } from "@/types/domain";

type LandingReservationFormProps = {
  initialDate: string;
  initialSlots: AvailabilitySlot[];
  locale: Locale;
};

const FIELD_INPUT_CLASS =
  "min-h-[3.25rem] w-full border-0 border-b border-white/25 bg-transparent px-0 text-lg text-white outline-none transition [color-scheme:dark] placeholder:text-white/45 focus:border-terracotta-300";

const FIELD_LABEL_CLASS =
  "block text-xs font-semibold uppercase tracking-[0.22em] text-white/70";

function RequiredMark({ label }: { label: string }) {
  return (
    <span aria-label={label} className="ml-1 text-terracotta-300">
      *
    </span>
  );
}

function OptionalSuffix({ label }: { label: string }) {
  return (
    <span className="ml-2 text-[0.65rem] normal-case tracking-normal text-white/45">
      ({label})
    </span>
  );
}

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
    <form action={formAction} className="grid gap-7">
      <input name="locale" type="hidden" value={locale} />
      <input name="allergies" type="hidden" value="" />
      <input name="seatingPreference" type="hidden" value="no_preference" />
      <input name="groupDetails" type="hidden" value="" />

      {!state.ok && state.message ? (
        <div className="flex gap-2 border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle aria-hidden="true" size={18} />
          {state.message}
        </div>
      ) : null}

      <p className="text-xs text-white/55">{t.requiredLegend}</p>

      <div className="grid gap-7 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-date">
            {t.date}
            <RequiredMark label={t.requiredMark} />
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
            <RequiredMark label={t.requiredMark} />
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
            {t.guestsShort}
            <RequiredMark label={t.requiredMark} />
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
            <RequiredMark label={t.requiredMark} />
          </label>
          <input
            id="reservation-name"
            className={FIELD_INPUT_CLASS}
            name="name"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-phone">
            {t.phone}
            <RequiredMark label={t.requiredMark} />
          </label>
          <input
            id="reservation-phone"
            autoComplete="tel"
            className={FIELD_INPUT_CLASS}
            inputMode="tel"
            maxLength={24}
            minLength={7}
            name="phone"
            pattern="[+()0-9\s.\-]{7,24}"
            placeholder={t.phonePlaceholder}
            required
            title={t.phoneHint}
            type="tel"
          />
        </div>

        <div className="grid gap-2">
          <label className={FIELD_LABEL_CLASS} htmlFor="reservation-email">
            {t.email}
            <RequiredMark label={t.requiredMark} />
          </label>
          <input
            id="reservation-email"
            className={FIELD_INPUT_CLASS}
            name="email"
            required
            type="email"
          />
        </div>
      </div>

      {loadingSlots ? (
        <p className="text-sm italic text-white/70">{t.loading}</p>
      ) : null}
      {slotsError ? (
        <p className="text-sm text-terracotta-300">{t.errorSlots}</p>
      ) : null}
      {!loadingSlots && !slotsError && availableSlots.length === 0 ? (
        <p className="text-sm italic text-white/70">{t.noSlots}</p>
      ) : null}

      <div className="grid gap-2">
        <label className={FIELD_LABEL_CLASS} htmlFor="reservation-notes">
          {t.notesShort}
          <OptionalSuffix label={t.optionalSuffix} />
        </label>
        <textarea
          id="reservation-notes"
          className="min-h-[6rem] w-full resize-y border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base leading-relaxed text-white outline-none transition placeholder:text-white/45 focus:border-terracotta-300"
          name="notes"
          placeholder={t.notesPlaceholder}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-white/80">
        <input
          className="mt-1 h-4 w-4 accent-terracotta-700"
          name="privacyAccepted"
          required
          type="checkbox"
        />
        <span>
          {t.privacy}
          <RequiredMark label={t.requiredMark} />
        </span>
      </label>

      <button
        aria-busy={pending}
        className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 border border-terracotta-700 bg-paper px-8 text-sm font-semibold uppercase tracking-[0.18em] text-harbor-900 shadow-soft transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        disabled={pending || loadingSlots || availableSlots.length === 0}
        type="submit"
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" size={16} />
            {t.submitting}
          </>
        ) : (
          <>⚓ {t.submit}</>
        )}
      </button>
    </form>
  );
}
