import type { Metadata } from "next";

import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { WorkGallery } from "@/components/work-gallery";
import { projectIndex } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Selected case studies spanning a field-operations mobile platform, a B2B SaaS marketplace, and conversion-led web systems — product judgment, design systems, and business impact.",
  path: "/work"
});

const featuredProject = projectIndex.find((project) => project.featured) ?? projectIndex[0];
const supportingProjects = projectIndex.filter((project) => project.slug !== featuredProject.slug);

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-4xl">
              <p className="caption">Work</p>
              <h1 className="section-title mt-4">Product, platform, and growth-focused work shaped by systems thinking.</h1>
              <p className="body-copy mt-6 max-w-2xl">
                The work is selected to show product judgment, design-system thinking, technical
                understanding, and business awareness across different contexts.
              </p>
            </Reveal>

            <WorkGallery
              featuredProject={featuredProject}
              supportingProjects={supportingProjects}
            />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="caption">Next step</p>
                <h2 className="section-title mt-4">Need the deeper story behind the featured work?</h2>
              </div>
              <MagneticLink href={featuredProject.href} className="link-chip">
                Read the case study
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
