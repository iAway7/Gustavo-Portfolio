/**
 * Centralized SEO constants and helpers so titles, descriptions, canonical
 * URLs, Open Graph images, and structured data stay consistent site-wide.
 */

import type { Metadata } from "next";

import { type Locale, localizedPath } from "@/lib/i18n";

export const SITE_URL = "https://www.gpolin.com";

export const SITE_NAME = "Gustavo Polin";

export const PERSON = {
  name: "Gustavo Polin",
  jobTitle: "Product Designer",
  location: "Valencia, Spain",
  sameAs: [
    "https://www.linkedin.com/in/gustavo-polin/",
    "https://www.behance.net/gustavopolin"
  ]
} as const;

export const DEFAULT_OG_IMAGE = "/og/default.png";

/** Maps a case-study slug to its dedicated 1200×630 Open Graph image. */
export const OG_IMAGE_BY_SLUG: Record<string, string> = {
  "installpros-technician-app": "/og/installpros-app.png",
  "agencyhub-platform": "/og/agencyhub.png",
  "installpros-website": "/og/installpros-website.png",
  "emmvi-growth-platform": "/og/emmvi.png"
};

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/** A standard OpenGraph image descriptor for a given image path. */
export function ogImage(path: string, alt: string) {
  return [{ url: path, width: 1200, height: 630, alt }];
}

/**
 * hreflang map for a locale-agnostic path, including x-default (English).
 * `path` is the canonical path WITHOUT a locale prefix (e.g. "/work").
 */
export function hreflangAlternates(path: string) {
  return {
    en: absoluteUrl(localizedPath(path, "en")),
    es: absoluteUrl(localizedPath(path, "es")),
    "x-default": absoluteUrl(localizedPath(path, "en"))
  };
}

/**
 * Build per-page, locale-aware metadata: canonical (self), hreflang
 * alternates, Open Graph, and Twitter card. `path` is the locale-agnostic
 * path (e.g. "/work"); `locale` selects which canonical/OG locale to emit.
 */
export function pageMeta({
  title,
  description,
  path,
  locale = "en",
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  ogTitle,
  ogType = "website"
}: {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  image?: string;
  imageAlt?: string;
  ogTitle?: string;
  ogType?: "website" | "article";
}): Metadata {
  const fullTitle = ogTitle ?? `${title} | ${SITE_NAME}`;
  const alt = imageAlt ?? fullTitle;
  const canonical = localizedPath(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates(path)
    },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
      url: canonical,
      title: fullTitle,
      description,
      images: ogImage(image, alt)
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image]
    }
  };
}
