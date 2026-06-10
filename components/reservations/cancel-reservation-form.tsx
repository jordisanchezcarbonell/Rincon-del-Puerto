"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cancelReservationByTokenAction } from "@/app/cancelar/actions";

type CancelReservationFormProps = {
  token: string;
  label: string;
  pendingLabel: string;
};

export function CancelReservationForm({
  token,
  label,
  pendingLabel
}: CancelReservationFormProps) {
  return (
    <form action={cancelReservationByTokenAction} className="mt-6">
      <input name="token" type="hidden" value={token} />
      <SubmitButton label={label} pendingLabel={pendingLabel} />
    </form>
  );
}

function SubmitButton({
  label,
  pendingLabel
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <Loader2 aria-hidden="true" className="animate-spin" size={16} />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
