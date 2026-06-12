import type { Metadata } from "next";

import { CertificationsList } from "@/components/certifications-list";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { approachPrinciples, capabilityTags } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Approach",
  description: "How I approach product design, UX/UI systems, and AI-assisted workflows."
};

export default function ApproachPage() {
  return (
    <main className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-4xl">
              <p className="caption">Approach</p>
              <h1 className="section-title mt-4">A product-design approach built on clarity, systems, and implementation awareness.</h1>
              <p className="body-copy mt-6 max-w-2xl">
                My goal is not just to make interfaces look good. It&apos;s to help products work
                better for users, business stakeholders, and the teams responsible for shipping them.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {approachPrinciples.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.05} className="editorial-card p-6 sm:p-8">
                  <p className="text-xl font-medium tracking-[-0.04em] text-text">{principle.title}</p>
                  <p className="mt-4 text-base leading-7 text-muted">{principle.summary}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <div className="section-rule grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="caption">Core expertise</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {capabilityTags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="caption">Relevant certifications</p>
              <CertificationsList />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="caption">Start with the work</p>
                <h2 className="section-title mt-4">My flagship project shows this approach in practice through mobile UX and field workflow design.</h2>
              </div>
              <MagneticLink href="/work/installpros-technician-app" className="link-chip">
                View featured case study
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
