import type { Metadata } from "next";
import Image from "next/image";

import { CertificationsList } from "@/components/certifications-list";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { capabilityTags, certifications, experienceEntries } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";

function CompanyLogo({
  logo,
  company,
  size
}: {
  logo?: string;
  company: string;
  size: "lg" | "sm";
}) {
  const frame = size === "lg" ? "h-14 w-14 rounded-2xl" : "h-10 w-10 rounded-xl";

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden ${frame}`}>
      {logo ? (
        <Image
          src={logo}
          alt={`${company} logo`}
          width={size === "lg" ? 56 : 40}
          height={size === "lg" ? 56 : 40}
          className="h-full w-full object-contain"
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center rounded-[inherit] bg-panel ${
            size === "lg" ? "text-xl font-medium text-muted" : "text-sm font-medium text-muted"
          }`}
        >
          {company[0]}
        </span>
      )}
    </div>
  );
}

export const metadata: Metadata = pageMeta({
  title: "Experience",
  description:
    "9+ years of product and UX/UI design across SaaS, B2B, and operational tools — roles, certifications, and the systems-thinking that connects users, business, and technology.",
  path: "/experience"
});

export default function ExperiencePage() {
  const current = experienceEntries.filter((entry) => entry.tier === "now");
  const earlier = experienceEntries.filter((entry) => entry.tier === "before");

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-4xl">
              <p className="caption">Experience</p>
              <h1 className="section-title mt-4">
                A product-design career shaped by systems, execution, and business context.
              </h1>
            </Reveal>

            <div className="mt-12">
              {current.map((entry, index) => (
                <Reveal
                  key={`${entry.company}-${entry.period}`}
                  delay={index * 0.05}
                  className="border-t border-line py-10"
                >
                  <div className="flex items-start gap-5">
                    <CompanyLogo logo={entry.logo} company={entry.company} size="lg" />
                    <div>
                      <h2 className="text-2xl font-medium tracking-[-0.04em] text-text sm:text-3xl">
                        {entry.role}
                      </h2>
                      <p className="mt-1 text-base text-muted">{entry.company}</p>
                      <p className="mt-1 text-sm text-muted">{entry.period}</p>
                      <p className="body-copy mt-4 max-w-2xl">{entry.summary}</p>
                      {entry.tags ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16">
              <Reveal>
                <p className="caption">Earlier</p>
              </Reveal>
              <div className="mt-4">
                {earlier.map((entry, index) => (
                  <Reveal
                    key={`${entry.company}-${entry.period}`}
                    delay={index * 0.04}
                    className="border-t border-line py-6"
                  >
                    <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                      <div className="flex items-start gap-4">
                        <CompanyLogo logo={entry.logo} company={entry.company} size="sm" />
                        <div>
                          <p className="text-lg font-medium text-text">
                            {entry.role} <span className="font-normal text-muted">· {entry.company}</span>
                          </p>
                          <p className="mt-1 max-w-2xl text-base leading-7 text-muted">{entry.summary}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted lg:text-right">{entry.period}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
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
              <p className="mt-6 text-sm text-muted">
                Daily tools: Figma · Miro · ChatGPT · Codex · Lovable
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="caption">Certifications</p>
              <p className="mt-6 text-base leading-7 text-muted">
                {certifications.length} certifications in UX research, UX writing, and information
                architecture · Platzi
              </p>
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium text-muted underline underline-offset-4 transition-colors duration-200 hover:text-text">
                  View all
                </summary>
                <CertificationsList />
              </details>
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
                <h2 className="section-title mt-4">
                  See how that background translates into actual product work.
                </h2>
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
