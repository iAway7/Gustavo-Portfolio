import type { Metadata } from "next";

import { ContactView } from "@/components/pages/contact-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contacto",
  description:
    "Ponte en contacto con Gustavo Polin para colaboraciones de diseño de producto y UX/UI — plataformas SaaS, aplicaciones web y productos digitales asistidos por IA.",
  path: "/contact",
  locale: "es",
  ogTitle: "Contacto | Gustavo Polin"
});

export default function ContactPageEs() {
  return <ContactView locale="es" />;
}
