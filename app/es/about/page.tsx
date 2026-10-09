import type { Metadata } from "next";

import { AboutView } from "@/components/pages/about-view";
import { pageMeta } from "@/lib/seo";

// Página de prueba junto a /es/approach. Fuera del sitemap y sin indexar
// hasta que sustituya a Enfoque.
export const metadata: Metadata = {
  ...pageMeta({
    title: "Sobre mí",
    description:
      "Gustavo Polin, diseñador de producto con base en Valencia. Qué busco, cómo trabajo, las herramientas que uso y el método que aplico en cada proyecto.",
    path: "/about",
    locale: "es",
    ogTitle: "Sobre mí | Gustavo Polin"
  }),
  robots: { index: false, follow: true }
};

export default function AboutPageEs() {
  return <AboutView locale="es" />;
}
