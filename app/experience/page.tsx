import type { Metadata } from "next";

import { CertificationsList } from "@/components/certifications-list";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { capabilityTags, experienceEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional background in product design, UX/UI, systems, and implementation."
};

export default function ExperiencePage() {
  return (
    <main className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-4xl">
              <p className="caption">Experience</p>
              <h1 className="section-title mt-4">A product-design career shaped by systems, execution, and business context.</h1>
              <p className="body-copy mt-6 max-w-2xl">
                My path combines SaaS product work, web implementation, growth thinking,
                design systems, and technical fluency across multiple kinds of digital products.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5">
              {experienceEntries.map((entry, index) => (
                <Reveal key={`${entry.company}-${entry.period}`} delay={index * 0.05} className="editorial-card p-6 sm:p-8">
                  <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                    <div>
                      <p className="text-sm text-muted">{entry.period}</p>
                      <p className="mt-2 text-lg font-medium text-text">{entry.company}</p>
                      <p className="text-sm text-muted">{entry.role}</p>
                    </div>

                    <div>
                      <p className="text-sm leading-7 text-muted">{entry.summary}</p>
                      <div className="mt-5 grid gap-3">
                        {entry.highlights.map((highlight) => (
                          <p key={highlight} className="text-sm leading-7 text-text">
                            {highlight}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
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
                <p className="caption">Featured next</p>
                <h2 className="section-title mt-4">See how that background translates into actual product work.</h2>
              </div>
              <MagneticLink href="/work" className="link-chip">
                Browse projects
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
