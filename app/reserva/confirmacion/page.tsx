import { CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { LinkButton } from "@/components/ui/link-button";
import { getServerLocale } from "@/lib/config/locale";
import { PUBLIC_CONTENT } from "@/lib/config/public-content";

export default async function ReservationConfirmationPage() {
  const locale = await getServerLocale();
  const t = PUBLIC_CONTENT[locale].confirmation;

  return (
    <>
      <SiteHeader currentPath="/" locale={locale} />
      <main className="grid min-h-[70vh] place-items-center bg-paper px-4 py-12">
        <section className="max-w-xl rounded-lg border border-harbor-900/10 bg-white p-8 text-center shadow-soft">
          <CheckCircle2 className="mx-auto text-harbor-600" size={48} />
          <h1 className="mt-4 text-3xl font-bold text-harbor-900">{t.title}</h1>
          <p className="mt-3 text-harbor-900/70">{t.description}</p>
          <LinkButton className="mt-6" href="/">
            {t.home}
          </LinkButton>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
