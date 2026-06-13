import type { Metadata } from "next";

import { ContactView } from "@/components/pages/contact-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Get in touch with Gustavo Polin for product design and UX/UI collaborations — SaaS platforms, web applications, and AI-assisted digital products.",
  path: "/contact",
  locale: "en"
});

export default function ContactPage() {
  return <ContactView locale="en" />;
}
