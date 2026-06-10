import type { Metadata } from "next";
import { AnalyticsTracker } from "@/components/public/analytics-tracker";
import { NativeMenu } from "@/components/public/native-menu";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getServerLocale } from "@/lib/config/locale";
import { PUBLIC_CONTENT } from "@/lib/config/public-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: PUBLIC_CONTENT[locale].metadata.menu.title,
    description: PUBLIC_CONTENT[locale].metadata.menu.description
  };
}

export default async function MenuPage() {
  const locale = await getServerLocale();

  return (
    <>
      <SiteHeader currentPath="/carta" locale={locale} />
      <AnalyticsTracker />
      <NativeMenu locale={locale} />
      <SiteFooter locale={locale} />
    </>
  );
}
