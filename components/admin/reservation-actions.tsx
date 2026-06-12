"use client";

import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFormStatus } from "react-dom";
import {
  acceptReservationAction,
  cancelReservationAction,
  rejectReservationAction
} from "@/app/admin/actions";
import {
  initialReservationActionState,
  type ReservationActionResult
} from "@/app/admin/action-types";

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
      <ToastFeedback result={latest} />
    </div>
  );
}

type Variant = "accept" | "reject" | "cancel";

const variantStyles: Record<Variant, string> = {
  accept: "hover:bg-emerald-50 hover:border-emerald-300",
  reject: "hover:bg-red-50 hover:border-red-300",
  cancel: "hover:bg-zinc-100 hover:border-zinc-300"
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
      aria-busy={pending}
      className={`flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-harbor-900/15 bg-white px-2 text-sm font-bold text-harbor-900 transition disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]}`}
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <Loader2 aria-hidden="true" className="animate-spin" size={14} />
          <span className="hidden sm:inline">Procesando…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

function ToastFeedback({ result }: { result: ReservationActionResult }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (result.status === "idle") {
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 6000);
    return () => window.clearTimeout(timer);
  }, [result]);

  if (!mounted || result.status === "idle") {
    return null;
  }

  const styles =
    result.status === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : "border-red-200 bg-red-50 text-red-900";

  return createPortal(
    <div
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
      role="status"
    >
      <div
        className={`pointer-events-auto max-w-md rounded-lg border px-4 py-3 text-sm font-semibold shadow-soft ${styles}`}
      >
        {result.message}
      </div>
    </div>,
    document.body
  );
}

function pickLatest(
  ...states: ReservationActionResult[]
): ReservationActionResult {
  return (
    states.find((state) => state.status !== "idle") ?? initialReservationActionState
  );
}
