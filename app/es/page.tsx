import type { Metadata } from "next";

import { HomeView } from "@/components/pages/home-view";
import { absoluteUrl, hreflangAlternates, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Gustavo Polin | Diseñador de Producto" },
  description:
    "Diseñador de Producto y Diseñador UX/UI con más de 9 años creando plataformas SaaS, aplicaciones web y experiencias digitales asistidas por IA.",
  alternates: { canonical: "/es", languages: hreflangAlternates("/") },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "es_ES",
    alternateLocale: "en_US",
    url: absoluteUrl("/es"),
    title: "Gustavo Polin | Diseñador de Producto",
    description:
      "Diseñador de Producto y Diseñador UX/UI con más de 9 años creando plataformas SaaS, aplicaciones web y experiencias digitales asistidas por IA.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Gustavo Polin — Diseñador de Producto" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Polin | Diseñador de Producto",
    images: ["/og/home.png"]
  }
};

export default function HomePageEs() {
  return <HomeView locale="es" />;
}
