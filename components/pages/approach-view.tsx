import Image from "next/image";

import { CertificationsList } from "@/components/certifications-list";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import {
  approachPrinciples,
  approachPrinciplesEs,
  capabilityTags,
  capabilityTagsEs,
  frameworkSteps,
  frameworkStepsEs
} from "@/lib/site-data";
import { getDict, type Locale, localizedPath } from "@/lib/i18n";

// Subtle "workflow stack" indicator — only rendered under the AI principle.
const aiTools = [
  { src: "/logos/ai/claude.svg", label: "Claude" },
  { src: "/logos/ai/claude-code.svg", label: "Claude Code" },
  { src: "/logos/ai/chatgpt.svg", label: "ChatGPT" },
  { src: "/logos/ai/codex-2.svg", label: "Codex" },
  { src: "/logos/ai/lovable.svg", label: "Lovable" }
];

export function ApproachView({ locale }: { locale: Locale }) {
  const t = getDict(locale).approach;
  const principles = locale === "es" ? approachPrinciplesEs : approachPrinciples;
  const tags = locale === "es" ? capabilityTagsEs : capabilityTags;
  const framework = locale === "es" ? frameworkStepsEs : frameworkSteps;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-4xl">
              <p className="caption">{t.caption}</p>
              <h1 className="section-title mt-4">{t.h1}</h1>
              <p className="body-copy mt-6 max-w-2xl">{t.intro}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {principles.map((principle, index) => {
                const isAiPrinciple = principle.aiTools === true;
                return (
                  <Reveal key={principle.title} delay={index * 0.05} className="editorial-card p-6 sm:p-8">
                    <p className="text-xl font-medium tracking-[-0.04em] text-text">{principle.title}</p>
                    <p className="mt-4 text-base leading-7 text-muted">{principle.summary}</p>
                    {isAiPrinciple ? (
                      <ul
                        role="list"
                        aria-label="AI tools integrated into my workflow"
                        className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 opacity-60 grayscale"
                      >
                        {aiTools.map((tool) => (
                          <li key={tool.label} className="flex">
                            <Image
                              src={tool.src}
                              alt={tool.label}
                              width={20}
                              height={20}
                              unoptimized
                              className="h-5 w-5"
                            />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-2xl">
              <p className="caption">{t.frameworkCaption}</p>
              <h2 className="section-title mt-4">{t.frameworkHeading}</h2>
              <p className="body-copy mt-6 max-w-2xl">{t.frameworkIntro}</p>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {framework.map((step, index) => (
                <Reveal key={step.phase} delay={index * 0.05} className="editorial-card p-6">
                  <p className="section-label">{step.phase}</p>
                  <p className="mt-2 text-lg font-medium text-text">{step.goal}</p>
                  <ul className="mt-4 grid gap-2">
                    {step.questions.map((question) => (
                      <li key={question} className="text-base leading-7 text-muted">
                        {question}
                      </li>
                    ))}
                  </ul>
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
              <p className="caption">{t.coreExpertise}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="caption">{t.relevantCertifications}</p>
              <CertificationsList />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="max-w-2xl">
              <p className="caption">{t.startWork}</p>
              <h2 className="section-title mt-4">{t.flagshipHeading}</h2>
              <MagneticLink
                href={localizedPath("/work/installpros-technician-app", locale)}
                className="link-chip mt-10"
              >
                {t.viewFeatured}
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
