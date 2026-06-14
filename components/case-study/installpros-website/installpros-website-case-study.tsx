import Image from "next/image";
import type { ReactNode } from "react";

import {
  AgencyHubOverviewCarousel as ProductCarousel,
  type OverviewSlide as ProductSlide
} from "@/components/case-study/agencyhub/overview-carousel";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/installpros-website/shots2";

// Same reading paragraph as the rest of the case-study system.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

// Overview walkthrough — the site's key surfaces, so the Overview reads as one
// connected web system rather than a single page.
const overviewSlides: ProductSlide[] = [
  { src: `${IMG}/site-homepage.webp`, alt: "Install Pros homepage", label: "Homepage" },
  { src: `${IMG}/site-service.webp`, alt: "Starlink installation service page", label: "Starlink Service" },
  { src: `${IMG}/site-digital.webp`, alt: "Digital signage service page", label: "Digital Signage" },
  { src: `${IMG}/site-gaming.webp`, alt: "Gaming simulator service page", label: "Gaming Simulator" },
  { src: `${IMG}/site-leo.webp`, alt: "Amazon LEO campaign landing", label: "Campaign Landing" },
  { src: `${IMG}/site-contact.webp`, alt: "Contact and quote page", label: "Contact" }
];

const phases = [
  { name: "Research", body: "Mapped the two dominant intent states — the urgent buyer and the comparison shopper — and how trust gets earned in local-service search." },
  { name: "Information Architecture", body: "Restructured one stretched homepage into clear page roles, grouping services by how customers name the need rather than by internal business unit." },
  { name: "Wireframing", body: "Settled the message hierarchy before visuals: claim → coverage → proof → ask, with each page making one claim and supporting it." },
  { name: "Visual Design", body: "Built a restrained, product-grade visual language where looking like a serious operation is itself the trust signal." },
  { name: "Validation", body: "Pressure-tested flows against real intent paths and built the system so every page and CTA maps to a funnel stage that can be measured." }
];

type Decision = {
  decision: string;
  problem: string;
  rationale: string;
  tradeoff: string;
  image: { src: string; alt: string; width: number; height: number };
};

const decisions: Decision[] = [
  {
    decision: "Lead with one clear promise and a single primary action.",
    problem: "Visitors arriving from search had seconds to understand what Install Pros offers and why it's the safe choice.",
    rationale:
      "The homepage opens on one positioning line — expert installations, without the hassle — backed by a prominent “Get a Quote” action. One claim and one next step come before any feature detail, so the value proposition lands immediately.",
    tradeoff:
      "A spare hero leaves less room for secondary messaging up top; those points move below the fold, where intent is already established.",
    image: { src: `${IMG}/site-homepage.webp`, alt: "Install Pros homepage hero with clear positioning and CTA", width: 2000, height: 1250 }
  },
  {
    decision: "Put operational proof above the ask.",
    problem: "It's a trust purchase — a stranger enters your home — so users need confidence before they'll ever contact the company.",
    rationale:
      "Coverage and scale are shown as concrete numbers: states covered, cities served, installations completed, nationwide coverage. Credibility is demonstrated, not asserted, and it arrives before any conversion moment.",
    tradeoff:
      "Leading with proof pushes the contact form further down the page; the bet is that convinced, qualified leads outweigh raw early clicks.",
    image: { src: `${IMG}/proof.webp`, alt: "Nationwide coverage and installation statistics", width: 2000, height: 543 }
  },
  {
    decision: "Organize services by how customers name the need.",
    problem: "A widening service mix — Starlink, home automation, security, Amazon LEO — buried each offer and left visitors unsure what was relevant to them.",
    rationale:
      "Services are grouped into a scannable card system by customer need rather than internal business unit, and each service page owns its offer and its search intent end to end — so discovery and SEO become the same map.",
    tradeoff:
      "Grouping strictly by need makes some cross-sell adjacencies less prominent; clarity for the visitor won over merchandising density.",
    image: { src: `${IMG}/services.webp`, alt: "Service cards organized by customer need", width: 2000, height: 1086 }
  },
  {
    decision: "A consistent CTA strategy that asks after trust, not before.",
    problem: "The path from browsing to requesting a quote wasn't obvious, and asking too early read as pushy.",
    rationale:
      "A single “Get a Quote” action repeats at decision points — after coverage, after proof, on exit paths — and the form asks only what dispatch needs to qualify a job, because every extra field is measurable friction in local services.",
    tradeoff:
      "Fewer, well-placed CTAs mean some impatient visitors scroll past a conversion moment; the bet is that qualified leads outweigh raw clicks.",
    image: { src: `${IMG}/quote.webp`, alt: "Get a Quote contact form kept short", width: 2000, height: 1214 }
  },
  {
    decision: "One professional visual language, applied everywhere.",
    problem: "Service businesses have to keep earning credibility on every screen, not just the homepage.",
    rationale:
      "The visual language borrows from product companies — restrained palette, structured layout, real work over stock metaphors, customer testimonials — applied consistently so the brand reads like a serious operation at every step of the journey.",
    tradeoff:
      "Holding a strict, credibility-first visual rule limits decorative flourish; looking serious was the trust signal worth protecting.",
    image: { src: `${IMG}/trust.webp`, alt: "Customer testimonials reinforcing credibility", width: 2000, height: 486 }
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

export function InstallProsWebsiteCaseStudy({
  project,
  nextProject
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
}) {
  const { outcome } = project;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* 01 Overview — hero + site walkthrough */}
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
                ["Timeline", project.period],
                ["Deliverables", project.scope]
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

      {/* 02 Context */}
      <Section>
        <SectionHead
          label="Context"
          title="Install Pros sells trust — a stranger entering your home."
        />
        <div className="mt-8 grid max-w-2xl gap-5">
          <p className={PARA}>
            Install Pros competes in local-service search, where the buying decision is fast and
            trust-driven: customers compare a handful of providers and pick the one that looks most
            credibly professional. The website isn&apos;t a brochure — it&apos;s the storefront where
            that comparison happens.
          </p>
          <p className={PARA}>
            The old site listed services but carried no clear hierarchy, few trust signals, and no
            obvious conversion path. The service mix was also widening — Starlink, home automation,
            security, the upcoming Amazon LEO offer — and the structure couldn&apos;t present nationwide
            coverage or each offer without burying them.
          </p>
        </div>
      </Section>

      {/* 03 Understanding the Challenge */}
      <Section>
        <SectionHead
          label="Understanding the challenge"
          title="Credibility, discoverability, and a clear path to a quote."
        />
        <div className="mt-8 grid max-w-2xl gap-5">
          <p className={PARA}>
            Two intent states drive nearly all traffic. The urgent buyer needs the fastest path to
            coverage confirmation and contact; the comparison shopper needs proof of who you are and
            what you&apos;ve installed. One structure had to serve both without decision overload.
          </p>
          <p className={PARA}>
            That set the real constraints: establish trust before asking, make a widening service set
            discoverable, remove friction on the route to a quote, and communicate expertise at
            nationwide scale — every design decision answered to those four.
          </p>
        </div>
      </Section>

      {/* 04 Design Process */}
      <Section>
        <SectionHead
          label="Design process"
          title="Strategy before layout, validated against intent."
        />
        <ol className="mt-8 grid max-w-2xl gap-5">
          {phases.map((phase, index) => (
            <li key={phase.name} className="border-t border-line pt-4">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
                {String(index + 1).padStart(2, "0")} · {phase.name}
              </p>
              <p className="mt-2 text-base leading-7 text-muted">{phase.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 05 Key Product Decisions */}
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
            <Figure
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width}
              height={block.image.height}
            />
          </Reveal>
        </Section>
      ))}

      {/* 06 System & Patterns */}
      <Section>
        <SectionHead label="System & patterns" title="One system, reused across every page." />
        <div className="mt-8 grid max-w-2xl gap-5">
          <p className={PARA}>
            The site was restructured from one stretched homepage into a system of page roles: the
            homepage routes intent, service pages own their offer and its search terms, and campaign
            landings run product-specific stories without disturbing the core structure.
          </p>
          <p className={PARA}>
            Grids, cards, CTA blocks, and service tiles were defined once and reused across homepage,
            service pages, and campaign landings — so a new offer like Amazon LEO launches from the
            existing pattern set instead of a new design cycle.
          </p>
        </div>
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${IMG}/patterns.webp`}
            alt="Reusable card and grid patterns across the site"
            width={2000}
            height={1121}
          />
        </Reveal>
      </Section>

      {/* 07 Outcome */}
      <Section>
        <SectionHead label="Outcome" title="What the redesign made possible." />
        <Reveal delay={0.06} className="mt-12">
          <Figure
            src={`${IMG}/coverage-map.webp`}
            alt="Nationwide installation coverage communicated at a glance"
            width={2000}
            height={593}
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

      {/* 08 What I'd measure next */}
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
