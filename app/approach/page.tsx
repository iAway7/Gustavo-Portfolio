import type { Metadata } from "next";

import { ApproachView } from "@/components/pages/approach-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Approach",
  description:
    "A product-design approach built on clarity, systems thinking, and implementation awareness — designing interfaces that work for users, business stakeholders, and engineering teams.",
  path: "/approach",
  locale: "en"
});

export default function ApproachPage() {
  return <ApproachView locale="en" />;
}
