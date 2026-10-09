import type { Metadata } from "next";

import { AboutView } from "@/components/pages/about-view";
import { pageMeta } from "@/lib/seo";

// Trial page, built alongside /approach for comparison. Kept out of the
// sitemap and search indexes until it replaces Approach.
export const metadata: Metadata = {
  ...pageMeta({
    title: "About",
    description:
      "Gustavo Polin, product designer based in Valencia. What I’m looking for, how I work, the tools I use and the framework I bring to every project.",
    path: "/about",
    locale: "en"
  }),
  robots: { index: false, follow: true }
};

export default function AboutPage() {
  return <AboutView locale="en" />;
}
