import type { Metadata } from "next";

import { AboutView } from "@/components/pages/about-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sobre mí",
  description:
    "Gustavo Polin, diseñador de producto con base en Valencia. Qué busco, cómo trabajo y el método que aplico en cada proyecto.",
  path: "/about",
  locale: "es",
  ogTitle: "Sobre mí | Gustavo Polin"
});

export default function AboutPageEs() {
  return <AboutView locale="es" />;
}
