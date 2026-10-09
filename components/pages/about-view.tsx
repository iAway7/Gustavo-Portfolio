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

// Workflow stack shown under the AI principle.
const aiTools = [
  { src: "/logos/ai/claude.svg", label: "Claude" },
  { src: "/logos/ai/claude-code.svg", label: "Claude Code" },
  { src: "/logos/ai/chatgpt.svg", label: "ChatGPT" },
  { src: "/logos/ai/codex-2.svg", label: "Codex" },
  { src: "/logos/ai/lovable.svg", label: "Lovable" }
];

/** Label / value rows for "What I'm looking for". */
function InfoRows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="mt-10 max-w-4xl">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-line py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8"
        >
          <dt className="text-base font-medium text-text">{row.label}</dt>
          <dd className="text-base leading-7 text-muted">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.about;
  const approach = dict.approach;
  const principles = locale === "es" ? approachPrinciplesEs : approachPrinciples;
  const tags = locale === "es" ? capabilityTagsEs : capabilityTags;
  const framework = locale === "es" ? frameworkStepsEs : frameworkSteps;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8">
      {/* Who: dark band so the light-dot portrait reads at full contrast */}
      <section
        className="relative overflow-hidden bg-[#0d0d0f]"
        style={{ backgroundImage: "radial-gradient(ellipse 70% 90% at 78% 40%, #1d1e24 0%, #0d0d0f 70%)" }}
      >
        {/* Grid texture: 1px lines every 20px, as in the TextureOverlay "grid" pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        />
        <div className="shell section-space relative">
          <div className="section-rule grid gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end lg:gap-16">
            <Reveal className="max-w-3xl">
              <p className="caption text-white/55">{t.caption}</p>
              <h1 className="page-title mt-4 text-white">{t.h1}</h1>
              <p className="body-copy mt-6 max-w-2xl text-white/65">{t.intro}</p>
              <ul role="list" className="mt-8 flex flex-wrap gap-3">
                {t.facts.map((fact) => (
                  <li key={fact} className="pill border-white/15 text-white/65">
                    {fact}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="w-full max-w-[20rem] lg:max-w-none">
              <Image
                src="/portrait-dither-3-transparent.png"
                alt={t.portraitAlt}
                width={960}
                height={976}
                priority
                // Dithered pixel art: resampling to srcset widths causes moiré, so serve the source as-is.
                unoptimized
                className="h-auto w-full"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What I'm looking for */}
      <section className="section-space">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-3xl">
              <p className="caption">{t.lookingCaption}</p>
              <h2 className="section-title mt-4">{t.lookingHeading}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <InfoRows rows={t.looking} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="section-space pt-0">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-3xl">
              <p className="caption">{t.howCaption}</p>
              <h2 className="section-title mt-4">{t.howHeading}</h2>
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

      {/* The framework */}
      <section className="section-space pt-0">
        <div className="shell">
          <div className="section-rule">
            <Reveal className="max-w-2xl">
              <p className="caption">{approach.frameworkCaption}</p>
              <h2 className="section-title mt-4">{approach.frameworkHeading}</h2>
              <p className="body-copy mt-6 max-w-2xl">{approach.frameworkIntro}</p>
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

      {/* Core expertise + certifications */}
      <section className="section-space pt-0">
        <div className="shell">
          <div className="section-rule grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="caption">{approach.coreExpertise}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="caption">{approach.relevantCertifications}</p>
              <CertificationsList />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-space pt-0">
        <div className="shell">
          <Reveal className="section-rule">
            <div className="max-w-2xl">
              <p className="caption">{t.contactCaption}</p>
              <h2 className="section-title mt-4">{t.contactHeading}</h2>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticLink href={localizedPath("/contact", locale)} className="link-chip">
                  {t.getInTouch}
                </MagneticLink>
                <MagneticLink href={localizedPath("/work", locale)} className="link-chip link-chip--secondary">
                  {t.viewWork}
                </MagneticLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
