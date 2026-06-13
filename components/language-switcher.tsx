"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  alternatePathname,
  ENABLE_LANGUAGE_SWITCHER,
  localeFromPathname,
  locales,
  type Locale
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const LOCALE_STORAGE_KEY = "preferred-locale";

export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* storage unavailable — ignore */
  }
}

/**
 * Minimal EN / ES segmented control. Each option is a real link to the same
 * page in the other locale, so it works without JS and is keyboard accessible.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() || "/";
  const current = localeFromPathname(pathname);

  // Temporarily hidden via feature flag (implementation kept intact).
  if (!ENABLE_LANGUAGE_SWITCHER) {
    return null;
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line bg-white p-0.5",
        className
      )}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={alternatePathname(pathname, locale)}
            hrefLang={locale}
            aria-label={`${locale === "en" ? "English" : "Español"}`}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(locale)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244de8]/40",
              active ? "bg-text text-white" : "text-muted hover:text-text"
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
