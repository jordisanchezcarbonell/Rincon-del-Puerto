import type { Metadata } from "next";
import { AnalyticsTracker } from "@/components/public/analytics-tracker";
import { NativeMenu } from "@/components/public/native-menu";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { resolveLocale } from "@/lib/config/public-content";
import { RESTAURANT_CONFIG } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Carta",
  description: `Consulta la carta de ${RESTAURANT_CONFIG.name} directamente en la web.`
};

type MenuPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params?.lang);

  return (
    <>
      <SiteHeader currentPath="/carta" locale={locale} />
      <AnalyticsTracker />
      <NativeMenu locale={locale} />
      <SiteFooter locale={locale} />
    </>
  );
}
