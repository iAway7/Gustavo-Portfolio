"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n";

/**
 * Syncs <html lang> on the client for locale subtrees. The root layout renders
 * the static default ("en"); this corrects it to the active locale (e.g. "es")
 * without making the whole app dynamically rendered.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [locale]);

  return null;
}
