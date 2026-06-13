"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { LOCALE_STORAGE_KEY } from "@/components/language-switcher";
import {
  ENABLE_LANGUAGE_SWITCHER,
  localeFromPathname,
  localizedPath,
  stripLocale
} from "@/lib/i18n";

/**
 * Remembers the visitor's language across sessions WITHOUT browser-language
 * detection. If a returning visitor stored "es" but lands on an English URL,
 * we send them to the Spanish equivalent once. English is always the default.
 */
export function LocalePreference() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  useEffect(() => {
    // While the language system is disabled, never auto-redirect to /es.
    if (!ENABLE_LANGUAGE_SWITCHER) {
      return;
    }
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      return;
    }
    if (stored === "es" && localeFromPathname(pathname) === "en") {
      router.replace(localizedPath(stripLocale(pathname), "es"));
    }
  }, [pathname, router]);

  return null;
}
