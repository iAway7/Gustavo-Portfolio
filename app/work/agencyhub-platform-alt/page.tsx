import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AgencyHubCaseStudyAlt } from "@/components/case-study/agencyhub-alt/agencyhub-case-study-alt";
import { getProjectBySlug } from "@/lib/site-data";

// Comparison-only alternative layout. Not indexed and not linked from nav, so
// it doesn't compete with the canonical /work/agencyhub-platform case study.
export const metadata: Metadata = {
  title: "AgencyHub — Alternative layout",
  robots: { index: false, follow: false },
  alternates: { canonical: "/work/agencyhub-platform" }
};

export default function AgencyHubAltPage() {
  const project = getProjectBySlug("agencyhub-platform");

  if (!project) {
    notFound();
  }

  const next = project.nextSlug ? getProjectBySlug(project.nextSlug) : undefined;
  const nextProject = next ? { href: next.href, title: next.title } : undefined;

  return <AgencyHubCaseStudyAlt project={project} nextProject={nextProject} />;
}
