import type { Metadata } from "next";

import { ExperienceView } from "@/components/pages/experience-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Experience",
  description:
    "9+ years of product and UX/UI design across SaaS, B2B, and operational tools — roles, certifications, and the systems-thinking that connects users, business, and technology.",
  path: "/experience",
  locale: "en"
});

export default function ExperiencePage() {
  return <ExperienceView locale="en" />;
}
