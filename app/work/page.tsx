import type { Metadata } from "next";

import { WorkView } from "@/components/pages/work-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Selected case studies spanning a field-operations mobile platform, a B2B SaaS marketplace, and conversion-led web systems — product judgment, design systems, and business impact.",
  path: "/work",
  locale: "en"
});

export default function WorkPage() {
  return <WorkView locale="en" />;
}
