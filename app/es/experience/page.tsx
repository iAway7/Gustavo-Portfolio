import type { Metadata } from "next";

import { ExperienceView } from "@/components/pages/experience-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Experiencia",
  description:
    "Más de 9 años de diseño de producto y UX/UI en SaaS, B2B y herramientas operativas — roles, certificaciones y el pensamiento sistémico que conecta a las personas, el negocio y la tecnología.",
  path: "/experience",
  locale: "es",
  ogTitle: "Experiencia | Gustavo Polin"
});

export default function ExperiencePageEs() {
  return <ExperienceView locale="es" />;
}
