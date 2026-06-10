import { CheckCircle2, XCircle } from "lucide-react";
import { CancelReservationForm } from "@/components/reservations/cancel-reservation-form";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getServerLocale } from "@/lib/config/locale";
import { PUBLIC_CONTENT, format } from "@/lib/config/public-content";
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
  const locale = await getServerLocale();
  const t = PUBLIC_CONTENT[locale].cancel;

  const supabase = createSupabaseServiceClient();
  const { data } = await supabase
    .from("reservations")
    .select("*")
    .eq("cancellation_token", token)
    .maybeSingle();

  const reservation = data ? mapReservation(data) : null;
  const cancelled =
    query?.status === "cancelled" || reservation?.status === "cancelled";

  return (
    <>
      <SiteHeader currentPath="/" locale={locale} />
      <main className="grid min-h-[70vh] place-items-center bg-paper px-4 py-12">
        <section className="max-w-xl rounded-lg border border-harbor-900/10 bg-white p-8 text-center shadow-soft">
          {!reservation ? (
            <>
              <XCircle className="mx-auto text-red-700" size={46} />
              <h1 className="mt-4 text-3xl font-bold text-harbor-900">
                {t.notFoundTitle}
              </h1>
              <p className="mt-3 text-harbor-900/70">{t.notFoundDescription}</p>
            </>
          ) : cancelled ? (
            <>
              <CheckCircle2 className="mx-auto text-harbor-600" size={46} />
              <h1 className="mt-4 text-3xl font-bold text-harbor-900">
                {t.cancelledTitle}
              </h1>
              <p className="mt-3 text-harbor-900/70">
                {format(t.cancelledDescription, {
                  date: reservation.date,
                  time: reservation.time
                })}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-harbor-900">
                {t.confirmTitle}
              </h1>
              <p className="mt-3 text-harbor-900/70">
                {format(t.confirmDescription, {
                  name: reservation.name,
                  date: reservation.date,
                  time: reservation.time
                })}
              </p>
              <CancelReservationForm
                token={token}
                label={t.confirmButton}
                pendingLabel={t.pendingButton}
              />
            </>
          )}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
