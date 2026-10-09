import type { Metadata } from "next";

import { AboutView } from "@/components/pages/about-view";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Gustavo Polin, product designer based in Valencia. What I’m looking for, how I work, and the framework I bring to every project.",
  path: "/about",
  locale: "en"
});

export default function AboutPage() {
  return <AboutView locale="en" />;
}
