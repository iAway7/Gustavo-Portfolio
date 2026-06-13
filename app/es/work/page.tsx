import type { Metadata } from "next";

import { WorkView } from "@/components/pages/work-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Proyectos",
  description:
    "Casos de estudio seleccionados: una plataforma móvil de operaciones de campo, un marketplace SaaS B2B y sistemas web orientados a la conversión — criterio de producto, sistemas de diseño e impacto de negocio.",
  path: "/work",
  locale: "es",
  ogTitle: "Proyectos | Gustavo Polin"
});

export default function WorkPageEs() {
  return <WorkView locale="es" />;
}
