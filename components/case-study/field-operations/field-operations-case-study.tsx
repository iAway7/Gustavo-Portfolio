import Image from "next/image";
import type { ReactNode } from "react";

import {
  AgencyHubOverviewCarousel as ProductCarousel,
  type OverviewSlide as ProductSlide
} from "@/components/case-study/agencyhub/overview-carousel";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { ProductCaseStudy, ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/installpros-app/shots";
const BOARDS = `${IMG}/boards`;

// Same reading paragraph as AgencyHub: ~24px desktop, scaling down on mobile.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

// Overview walkthrough — the full board set, so the Overview reads as a complete
// field operating system rather than one screen.
const overviewSlides: ProductSlide[] = [
  { src: `${BOARDS}/overview.webp`, alt: "Field Operations Platform overview board", label: "Overview" },
  { src: `${BOARDS}/problem-statement.webp`, alt: "Problem statement board", label: "Problem Statement" },
  { src: `${BOARDS}/personas.webp`, alt: "Technician personas board", label: "User Personas" },
  { src: `${BOARDS}/access-security.webp`, alt: "Access and security board", label: "Access & Security" },
  { src: `${BOARDS}/identity-verification.webp`, alt: "Identity verification board", label: "Identity Verification" },
  { src: `${BOARDS}/onboarding.webp`, alt: "Onboarding and personalization board", label: "Onboarding" },
  { src: `${BOARDS}/job-management.webp`, alt: "Job management board", label: "Job Management" },
  { src: `${BOARDS}/installation-workflow.webp`, alt: "Guided installation workflow board", label: "Installation Workflow" },
  { src: `${BOARDS}/payment.webp`, alt: "Payment and payout flow board", label: "Payment Flow" },
  { src: `${BOARDS}/completion.webp`, alt: "Job completion and feedback board", label: "Completion & Feedback" },
  { src: `${BOARDS}/operational-context.webp`, alt: "Operational context board with network scale", label: "Operational Context" },
  { src: `${BOARDS}/final-reflection.webp`, alt: "Final reflection board", label: "Final Reflection" }
];

type Decision = {
  decision: string;
  problem: string;
  rationale: string;
  tradeoff: string;
  image: { src: string; alt: string };
};

// Field Operations key product decisions (offline-first, guided installation,
// trust/identity, centralized job management, payment in the workflow).
const decisions: Decision[] = [
  {
    decision: "Workflows survive the dead zone.",
    problem:
      "The customer is buying satellite internet because coverage there is poor — so the product has to assume no signal at the exact moment of work.",
    rationale:
      "Every workflow is offline-first: progress, photo evidence, and completion are captured locally and reconciled when a connection returns. A technician never loses state or stares at a spinner mid-install — the app confirms the action and syncs later.",
    tradeoff:
      "More engineering complexity in local state and conflict resolution, accepted so the tool works where the job actually happens.",
    image: { src: `${BOARDS}/completion.webp`, alt: "Completion flow capturing photo evidence offline" }
  },
  {
    decision: "Installation runs as a recoverable state machine.",
    problem:
      "Installs rarely fail at step one; they fail in the middle — a blocked roof, a missing part, no signal.",
    rationale:
      "The workflow models progress as discrete states a technician can complete, pause, annotate, or flag, and the flow knows how to resume from any of them. A deviation becomes structured data instead of a phone call to dispatch.",
    tradeoff:
      "Modeled states cost more design and engineering than a free-form checklist and constrain edge cases not yet mapped. We accepted that rigidity because recoverability was worth more than flexibility.",
    image: { src: `${BOARDS}/installation-workflow.webp`, alt: "Installation workflow showing step states" }
  },
  {
    decision: "Trust is verified before the first job.",
    problem:
      "A stranger represents the brand on a customer's roof, so the network's integrity has to start at the door, not the install.",
    rationale:
      "Access, identity verification, and onboarding were designed as one gated sequence: a technician proves who they are, then is personalized into the work — not dropped into a feature set. Dispatch can't assign a job to an unverified installer.",
    tradeoff:
      "A heavier first-run experience, accepted because a failed-trust install costs far more than a few extra onboarding minutes.",
    image: { src: `${BOARDS}/identity-verification.webp`, alt: "Identity verification flow for technicians" }
  },
  {
    decision: "The pocket holds action; dispatch holds control.",
    problem: "How much job management actually belongs in a technician's pocket?",
    rationale:
      "Job views were stripped to what a technician acts on: today's sequence, each job's state, and completion evidence. Assignment logic and exception handling stayed with dispatch, which kept the mobile scope shippable by a small team.",
    tradeoff:
      "Some technician autonomy — reordering jobs, self-assignment — was deliberately left out of the first release to protect operational consistency.",
    image: { src: `${BOARDS}/job-management.webp`, alt: "Job management screens with status hierarchy" }
  },
  {
    decision: "Payment closes the job, inside the job.",
    problem:
      "Where should a technician collect and confirm payment — a separate app, or the workflow that completes the install?",
    rationale:
      "Earnings, payment capture, and payout status (Stripe, PayPal) live inside the job, not in a separate tool. The transaction becomes the natural last step of the work rather than an errand afterward, so nothing is left uncollected on site.",
    tradeoff:
      "Embedding payments widened compliance and integration scope, accepted because a job isn't done until it's paid — and splitting that across tools is where money and technicians get lost.",
    image: { src: `${BOARDS}/payment.webp`, alt: "Payment and payout flow with Stripe and PayPal" }
  }
];

function Figure({
  src,
  alt,
  width,
  height,
  caption
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="mx-auto w-full max-w-[78rem]">
      <div className="editorial-image paper-tint overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(min-width: 1248px) 78rem, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className="mt-4 max-w-2xl text-base leading-7 text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function SectionHead({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="section-label">{label}</p>
      <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
        {title}
      </h2>
      {intro ? <p className={`mt-6 ${PARA}`}>{intro}</p> : null}
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="shell">{children}</div>
    </section>
  );
}

export function FieldOperationsCaseStudy({
  project,
  nextProject
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
}) {
  const data = project as ProductCaseStudy;
  const { outcome } = data;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Overview — hero + product walkthrough */}
      <section className="pb-12 pt-6 sm:pb-16">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[clamp(2.2rem,4.4vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.04em] text-text">
              {project.title}
            </h1>
            <p className={`mt-5 max-w-2xl ${PARA}`}>{project.summary}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                ["Role", project.role],
                ["Period", project.period],
                ["Scope", project.scope]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="section-label">{label}</dt>
                  <dd className="mt-2 text-base text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <ProductCarousel slides={overviewSlides} />
          </Reveal>
        </div>
      </section>

      {/* Context */}
      <Section>
        <SectionHead
          label="Context"
          title="A truck roll costs the same whether the install succeeds or fails."
        />
        <div className="mt-8 grid max-w-2xl gap-5">
          {data.context.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* The field is the spec (operating conditions + personas) */}
      <Section>
        <SectionHead
          label="The field is the spec"
          title="The hardest part of the spec is the field itself."
          intro="The interface is used standing, outdoors, one-handed, in direct sunlight — and built for technicians across a wide digital-fluency range."
        />
        <div className="mt-8 grid max-w-2xl gap-5">
          {data.operatingConditions.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${BOARDS}/personas.webp`}
            alt="Technician personas across the digital-fluency range"
            width={2000}
            height={3281}
            caption="The product had to work for technicians across the digital-fluency range, not just the most confident ones."
          />
        </Reveal>
      </Section>

      {/* Key Product Decisions — independent chapters */}
      {decisions.map((block, index) => (
        <Section key={block.decision}>
          <Reveal className="max-w-2xl">
            <p className="section-label">Key Product Decision {String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
              {block.decision}
            </h2>
            <p className="mt-8 text-[1.375rem] font-medium leading-[1.25] text-text sm:mt-11 sm:text-[1.875rem]">
              {block.problem}
            </p>
            <div className="mt-8 grid gap-5">
              <p className={PARA}>{block.rationale}</p>
              <p className={PARA}>
                <span className="font-medium text-text">Trade-off accepted: </span>
                {block.tradeoff}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="mt-14">
            <Figure src={block.image.src} alt={block.image.alt} width={2000} height={1787} />
          </Reveal>
        </Section>
      ))}

      {/* System & workflows */}
      <Section>
        <SectionHead label="System & workflows" title="One pattern set, reused across every surface." />
        <div className="mt-8 grid max-w-2xl gap-5">
          {data.system.body.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* Outcome */}
      <Section>
        <SectionHead label="Outcome" title="What the design made possible." />
        <Reveal delay={0.06} className="mt-12">
          <Figure
            src={`${BOARDS}/operational-context.webp`}
            alt="Operational context: 9,163 installations and over $7M processed across the network"
            width={2000}
            height={1787}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {outcome.results.map((item) => (
            <Reveal key={item} className="editorial-card p-6">
              <p className="text-[1.0625rem] leading-7 text-muted">{item}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What I'd measure next — promoted reflection */}
      <Section>
        <Reveal className="max-w-3xl">
          <p className="section-label">What I&apos;d measure next</p>
          <p className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.4] tracking-[-0.02em] text-text">
            {outcome.reflection}
          </p>
        </Reveal>

        {project.deckUrl || nextProject ? (
          <div className="mt-14 grid gap-8 border-t border-line pt-10">
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
          </div>
        ) : null}
      </Section>
    </main>
  );
}
