import type { Metadata } from "next";

import { HomeView } from "@/components/pages/home-view";
import { absoluteUrl, hreflangAlternates, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: hreflangAlternates("/") },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: "es_ES",
    url: absoluteUrl("/"),
    title: "Gustavo Polin | Product Designer",
    description:
      "Product Designer and UX/UI Designer with 9+ years building SaaS platforms, web applications, and AI-assisted digital experiences.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Gustavo Polin — Product Designer" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Polin | Product Designer",
    images: ["/og/home.png"]
  }
};

export default function HomePage() {
  return <HomeView locale="en" />;
}
