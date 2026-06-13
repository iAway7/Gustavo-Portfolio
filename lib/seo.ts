/**
 * Centralized SEO constants and helpers so titles, descriptions, canonical
 * URLs, Open Graph images, and structured data stay consistent site-wide.
 */

import type { Metadata } from "next";

export const SITE_URL = "https://gpolin.com";

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
 * Build per-page metadata with a unique canonical URL, Open Graph, and
 * Twitter card. `title` is the short page title (the layout applies the
 * "%s | Gustavo Polin" template); `ogTitle` is the full social title.
 */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  ogTitle,
  ogType = "website"
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  ogTitle?: string;
  ogType?: "website" | "article";
}): Metadata {
  const fullTitle = ogTitle ?? `${title} | ${SITE_NAME}`;
  const alt = imageAlt ?? fullTitle;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
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
