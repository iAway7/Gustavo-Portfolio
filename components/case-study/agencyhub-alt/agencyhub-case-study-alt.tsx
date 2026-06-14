import Image from "next/image";
import type { ReactNode } from "react";

import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { ProductCaseStudy, ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/agencyhub";

/** Centered text column for narrative copy. */
function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-2xl ${className ?? ""}`}>{children}</div>;
}

/** Wider centered wrapper for large visuals. */
function Wide({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[72rem] ${className ?? ""}`}>{children}</div>;
}

/** A large, uncropped figure shown at its natural aspect ratio. */
function Figure({
  src,
  alt,
  width,
  height,
  caption,
  priority = false
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="grid gap-4">
      <div className="editorial-image paper-tint overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(min-width: 1152px) 72rem, 100vw"
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className="mx-auto max-w-2xl text-center text-base leading-7 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Section header: small eyebrow, moderate centered heading, short intro. */
function SectionHeader({
  eyebrow,
  title,
  intro
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="caption">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(1.6rem,2.6vw,2.15rem)] font-medium leading-[1.15] tracking-[-0.03em] text-text">
        {title}
      </h2>
      {intro ? <p className="body-copy mt-5">{intro}</p> : null}
    </Reveal>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div className="shell">{children}</div>
    </section>
  );
}

export function AgencyHubCaseStudyAlt({
  project,
  nextProject
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
}) {
  // The alt layout is specific to the product-shaped AgencyHub data.
  const data = project as ProductCaseStudy;
  const { decisions, outcome } = data;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* 1 — Hero */}
      <section className="pb-12 pt-6 sm:pb-16">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[clamp(2.2rem,4.4vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.04em] text-text">
              {project.title}
            </h1>
            <p className="body-copy mx-auto mt-5 max-w-2xl">{project.summary}</p>

            <dl className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-3">
              {[
                ["Role", project.role],
                ["Period", project.period],
                ["Scope", project.scope]
              ].map(([label, value]) => (
                <div key={label} className="text-center sm:text-left">
                  <dt className="section-label">{label}</dt>
                  <dd className="mt-2 text-base text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <Wide>
              <Figure
                src={`${IMG}/Cover - Agencyhub Website.png`}
                alt="AgencyHub marketplace cover"
                width={4320}
                height={3072}
                priority
              />
            </Wide>
          </Reveal>
        </div>
      </section>

      {/* 2 — Context */}
      <Section>
        <SectionHeader eyebrow="Context" title="Agencies grow by saying yes — but vetting partners is a private struggle." />
        <Prose className="mt-10 grid gap-5">
          {data.context.map((paragraph) => (
            <p key={paragraph} className="body-copy">
              {paragraph}
            </p>
          ))}
        </Prose>
      </Section>

      {/* 3 — Two Sides, Three Parties */}
      <Section>
        <SectionHeader
          eyebrow="Two sides, three parties"
          title="The marketplace isn't just agency and provider."
          intro="The agency's own client never logs in — yet they pay, set requirements, and judge the result. Most of the hard decisions came from that triangle, not the marketplace."
        />
        <Prose className="mt-8 grid gap-5">
          {data.operatingConditions.map((paragraph) => (
            <p key={paragraph} className="body-copy">
              {paragraph}
            </p>
          ))}
        </Prose>
        <Reveal delay={0.06} className="mt-12">
          <Wide>
            <Figure
              src={`${IMG}/user-flow.png`}
              alt="AgencyHub provider and agency user flows"
              width={4200}
              height={5928}
              caption={data.usersVisual?.caption}
            />
          </Wide>
        </Reveal>
      </Section>

      {/* 4 — Process / User Flow */}
      <Section>
        <SectionHeader
          eyebrow="Process"
          title="A five-phase design sprint, kept in view."
          intro="The work behind the product: from problem framing and lightning demos to sketches, wireframes, and the final system."
        />
        <Reveal delay={0.06} className="mt-12">
          <Wide>
            <Figure
              src={`${IMG}/design-process.png`}
              alt="AgencyHub design sprint process across five phases"
              width={4200}
              height={2658}
            />
          </Wide>
        </Reveal>
      </Section>

      {/* 5 — Key Decisions */}
      <Section>
        <SectionHeader
          eyebrow="Key decisions"
          title="Three decisions shaped by the third party."
        />
        <div className="mt-12 grid gap-16">
          {decisions.map((block, index) => (
            <Reveal key={block.question} className="grid gap-6">
              <Prose className="grid gap-4 text-center">
                <p className="section-label">
                  Decision {String(index + 1).padStart(2, "0")} · {block.question}
                </p>
                <p className="text-[clamp(1.35rem,2vw,1.7rem)] font-medium leading-[1.2] tracking-[-0.02em] text-text">
                  {block.decision}
                </p>
              </Prose>
              <Prose className="grid gap-4">
                <p className="body-copy">{block.rationale}</p>
                <p className="body-copy">
                  <span className="font-medium text-text">Trade-off accepted: </span>
                  {block.tradeoff}
                </p>
              </Prose>
              {block.visual && block.visual.visual.type === "image" ? (
                <Wide className="mt-2">
                  <Figure
                    src={block.visual.visual.src}
                    alt={block.visual.visual.alt}
                    width={2000}
                    height={1250}
                    caption={block.visual.caption}
                  />
                </Wide>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6 — System & Workflows */}
      <Section>
        <SectionHeader
          eyebrow="System & workflows"
          title="Four surfaces, one reusable system."
        />
        <Prose className="mt-8 grid gap-5">
          {data.system.body.map((paragraph) => (
            <p key={paragraph} className="body-copy">
              {paragraph}
            </p>
          ))}
        </Prose>
        <Reveal delay={0.06} className="mt-12">
          <Wide>
            <Figure
              src={`${IMG}/ui-showcase.png`}
              alt="AgencyHub final UI across marketplace, cart, and checkout"
              width={4200}
              height={5481}
            />
          </Wide>
        </Reveal>
      </Section>

      {/* 7 — Outcome & reflection */}
      <Section>
        <SectionHeader eyebrow="Outcome & reflection" title="What the design made possible." />
        <Reveal className="mx-auto mt-10 grid max-w-[72rem] gap-5 md:grid-cols-3">
          {outcome.results.map((item) => (
            <div key={item} className="editorial-card p-6">
              <p className="text-base leading-7 text-muted">{item}</p>
            </div>
          ))}
        </Reveal>
        <Prose className="mt-12 text-center">
          <p className="section-label">Reflection</p>
          <p className="body-copy mt-4">{outcome.reflection}</p>
        </Prose>

        {project.deckUrl || nextProject ? (
          <Prose className="mt-12 grid justify-items-center gap-8 text-center">
            {project.deckUrl ? (
              <a
                href={project.deckUrl}
                className="inline-flex text-base text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-text"
              >
                View Full Case Study (PDF) →
              </a>
            ) : null}
            {nextProject ? (
              <div>
                <p className="section-label">Next project</p>
                <MagneticLink
                  href={nextProject.href}
                  className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text"
                >
                  {nextProject.title}
                </MagneticLink>
              </div>
            ) : null}
          </Prose>
        ) : null}
      </Section>
    </main>
  );
}
