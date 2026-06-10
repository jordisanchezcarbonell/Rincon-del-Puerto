"use client";

import { useRef, useTransition } from "react";
import { Globe } from "lucide-react";
import { setLocaleAction } from "@/app/actions/locale";
import {
  LOCALES,
  LOCALE_SHORT_LABELS,
  PUBLIC_CONTENT,
  type Locale
} from "@/lib/config/public-content";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const t = PUBLIC_CONTENT[locale].languageSwitcher;
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      action={setLocaleAction}
      className={className}
      aria-label={t.label}
    >
      <label className="flex items-center gap-1.5 text-white/85 hover:text-white">
        <Globe aria-hidden="true" size={13} />
        <span className="sr-only">{t.label}</span>
        <select
          name="locale"
          defaultValue={locale}
          aria-label={t.current}
          disabled={pending}
          onChange={(event) => {
            event.preventDefault();
            const next = event.currentTarget.value;
            if (next === locale) return;
            startTransition(() => {
              formRef.current?.requestSubmit();
            });
          }}
          className="cursor-pointer appearance-none border-0 bg-transparent pr-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white outline-none focus:text-terracotta-300 disabled:cursor-wait"
        >
          {LOCALES.map((code) => (
            <option key={code} value={code} className="bg-harbor-900 text-white">
              {LOCALE_SHORT_LABELS[code]}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
