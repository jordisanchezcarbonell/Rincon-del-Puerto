"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  acceptReservationAction,
  cancelReservationAction,
  initialReservationActionState,
  rejectReservationAction,
  type ReservationActionResult
} from "@/app/admin/actions";

type Props = {
  reservationId: string;
};

export function ReservationActions({ reservationId }: Props) {
  const [acceptState, acceptAction] = useActionState(
    acceptReservationAction,
    initialReservationActionState
  );
  const [rejectState, rejectAction] = useActionState(
    rejectReservationAction,
    initialReservationActionState
  );
  const [cancelState, cancelAction] = useActionState(
    cancelReservationAction,
    initialReservationActionState
  );

  const latest = pickLatest(acceptState, rejectState, cancelState);

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3 gap-2">
        <ButtonForm action={acceptAction} id={reservationId} variant="accept">
          Aceptar
        </ButtonForm>
        <ButtonForm action={rejectAction} id={reservationId} variant="reject">
          Rechazar
        </ButtonForm>
        <ButtonForm action={cancelAction} id={reservationId} variant="cancel">
          Cancelar
        </ButtonForm>
      </div>
      <FeedbackMessage result={latest} />
    </div>
  );
}

type Variant = "accept" | "reject" | "cancel";

const variantStyles: Record<Variant, string> = {
  accept: "hover:bg-emerald-50 hover:border-emerald-300",
  reject: "hover:bg-red-50 hover:border-red-300",
  cancel: "hover:bg-zinc-100 hover:border-zinc-300"
};

const pendingLabels: Record<Variant, string> = {
  accept: "Aceptando…",
  reject: "Rechazando…",
  cancel: "Cancelando…"
};

type ButtonFormProps = {
  action: (formData: FormData) => void;
  id: string;
  variant: Variant;
  children: string;
};

function ButtonForm({ action, id, variant, children }: ButtonFormProps) {
  return (
    <form action={action}>
      <input name="reservationId" type="hidden" value={id} />
      <SubmitButton variant={variant}>{children}</SubmitButton>
    </form>
  );
}

function SubmitButton({
  variant,
  children
}: {
  variant: Variant;
  children: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`min-h-10 w-full rounded-lg border border-harbor-900/15 bg-white px-3 text-xs font-bold text-harbor-900 transition disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]}`}
      disabled={pending}
      type="submit"
    >
      {pending ? pendingLabels[variant] : children}
    </button>
  );
}

function FeedbackMessage({ result }: { result: ReservationActionResult }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result.status === "idle") {
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timer);
  }, [result]);

  if (!visible || result.status === "idle") {
    return null;
  }

  const styles =
    result.status === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <p
      aria-live="polite"
      className={`rounded-lg border px-3 py-2 text-xs font-semibold ${styles}`}
    >
      {result.message}
    </p>
  );
}

function pickLatest(
  ...states: ReservationActionResult[]
): ReservationActionResult {
  return (
    states.find((state) => state.status !== "idle") ?? initialReservationActionState
  );
}
