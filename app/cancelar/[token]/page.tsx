import { CheckCircle2, XCircle } from "lucide-react";
import { cancelReservationByTokenAction } from "@/app/cancelar/actions";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { mapReservation } from "@/lib/reservations/mappers";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

type CancelPageProps = {
  params: Promise<{
    token: string;
  }>;
  searchParams?: Promise<{
    status?: string;
  }>;
};

export default async function CancelReservationPage({
  params,
  searchParams
}: CancelPageProps) {
  const { token } = await params;
  const query = await searchParams;
  const supabase = createSupabaseServiceClient();
  const { data } = await supabase
    .from("reservations")
    .select("*")
    .eq("cancellation_token", token)
    .maybeSingle();

  const reservation = data ? mapReservation(data) : null;
  const cancelled = query?.status === "cancelled" || reservation?.status === "cancelled";

  return (
    <>
      <SiteHeader currentPath="/" locale="es" />
      <main className="grid min-h-[70vh] place-items-center bg-paper px-4 py-12">
        <section className="max-w-xl rounded-lg border border-harbor-900/10 bg-white p-8 text-center shadow-soft">
          {!reservation ? (
            <>
              <XCircle className="mx-auto text-red-700" size={46} />
              <h1 className="mt-4 text-3xl font-bold text-harbor-900">
                Reserva no encontrada
              </h1>
              <p className="mt-3 text-harbor-900/70">
                El enlace no es válido o la reserva ya no está disponible.
              </p>
            </>
          ) : cancelled ? (
            <>
              <CheckCircle2 className="mx-auto text-harbor-600" size={46} />
              <h1 className="mt-4 text-3xl font-bold text-harbor-900">
                Reserva cancelada
              </h1>
              <p className="mt-3 text-harbor-900/70">
                Hemos registrado la cancelación para el {reservation.date} a las{" "}
                {reservation.time}.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-harbor-900">
                Cancelar reserva
              </h1>
              <p className="mt-3 text-harbor-900/70">
                Vas a cancelar la reserva de {reservation.name} para el{" "}
                {reservation.date} a las {reservation.time}.
              </p>
              <form action={cancelReservationByTokenAction} className="mt-6">
                <input name="token" type="hidden" value={token} />
                <button className="min-h-12 rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white">
                  Confirmar cancelación
                </button>
              </form>
            </>
          )}
        </section>
      </main>
      <SiteFooter locale="es" />
    </>
  );
}
