import type { Metadata } from "next";

import { ApproachView } from "@/components/pages/approach-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Enfoque",
  description:
    "Un enfoque de diseño de producto basado en la claridad, el pensamiento sistémico y la comprensión de la implementación — interfaces que funcionan para usuarios, negocio y equipos de ingeniería.",
  path: "/approach",
  locale: "es",
  ogTitle: "Enfoque | Gustavo Polin"
});

export default function ApproachPageEs() {
  return <ApproachView locale="es" />;
}
