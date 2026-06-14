import Image from "next/image";
import type { ReactNode } from "react";

import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import {
  AgencyHubOverviewCarousel,
  type OverviewSlide
} from "@/components/case-study/agencyhub/overview-carousel";
import type { ProductCaseStudy, ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/agencyhub";

// Overview product walkthrough — real AgencyHub surfaces, in flow order, so the
// Overview communicates a connected platform (browse → detail → cart →
// checkout → client payment) rather than a single screen.
const overviewSlides: OverviewSlide[] = [
  { src: `${IMG}/cs/screen-marketplace.webp`, alt: "AgencyHub marketplace browsing curated services", label: "Marketplace" },
  { src: `${IMG}/cs/screen-product-page.webp`, alt: "AgencyHub service detail page", label: "Service detail" },
  { src: `${IMG}/cs/screen-cart.webp`, alt: "AgencyHub cart with order details and totals", label: "Cart" },
  { src: `${IMG}/cs/screen-checkout.webp`, alt: "AgencyHub checkout with payment options", label: "Checkout" },
  { src: `${IMG}/cs/screen-payment-link.webp`, alt: "AgencyHub client-facing payment link", label: "Payment link" }
];

// AgencyHub reading paragraph: ~24px desktop, scaling down on mobile, lh ~1.5.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

/** Large, uncropped evidence image at its natural aspect ratio. */
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
    <figure className="mx-auto w-full max-w-[78rem]">
      <div className="editorial-image paper-tint overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(min-width: 1248px) 78rem, 100vw"
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className="mt-4 max-w-2xl text-base leading-7 text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Left-aligned section header: label, moderate headline, optional intro. */
function SectionHead({
  label,
  title,
  intro
}: {
  label: string;
  title: string;
  intro?: string;
}) {
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

export function AgencyHubCaseStudy({
  project,
  nextProject
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
}) {
  const data = project as ProductCaseStudy;
  const { decisions, outcome } = data;
  const decisionShots = [
    { width: 2400, height: 1500 },
    { width: 2400, height: 1500 },
    { width: 2400, height: 1500 }
  ];

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Hero — left aligned */}
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
            <AgencyHubOverviewCarousel slides={overviewSlides} />
          </Reveal>
        </div>
      </section>

      {/* Context */}
      <Section>
        <SectionHead
          label="Context"
          title="Agencies grow by saying yes — but vetting partners is a private struggle."
        />
        <div className="mt-8 grid max-w-2xl gap-5">
          {data.context.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* Two sides, three parties */}
      <Section>
        <SectionHead
          label="Two sides, three parties"
          title="The marketplace isn't just agency and provider."
          intro="The agency's own client never logs in — yet they pay, set requirements, and judge the result. Most of the hard decisions came from that triangle, not the marketplace."
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
            src={`${IMG}/cs/user-flow.webp`}
            alt="AgencyHub provider and agency user flows"
            width={2400}
            height={3552}
            caption={data.usersVisual?.caption}
          />
        </Reveal>
      </Section>

      {/* Process */}
      <Section>
        <SectionHead
          label="Process"
          title="A five-phase design sprint, kept in view."
          intro="The work behind the product: from problem framing and lightning demos to sketches, wireframes, and the final system."
        />
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${IMG}/cs/design-process.webp`}
            alt="AgencyHub design sprint process across five phases"
            width={2400}
            height={1520}
          />
        </Reveal>
      </Section>

      {/* Three independent decision chapters: Problem → Decision → Evidence */}
      {decisions.map((block, index) => {
        const shot = decisionShots[index] ?? { width: 2400, height: 1500 };
        const image = block.visual && block.visual.visual.type === "image" ? block.visual.visual : null;
        return (
          <Section key={block.question}>
            <Reveal className="max-w-2xl">
              <p className="section-label">Key Product Decision {String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
                {block.decision}
              </h2>
              {/* Subtitle: larger, with extra space above the body. */}
              <p className="mt-8 text-[1.375rem] font-medium leading-[1.25] text-text sm:mt-11 sm:text-[1.875rem]">
                {block.question}
              </p>
              <div className="mt-8 grid gap-5">
                <p className={PARA}>{block.rationale}</p>
                <p className={PARA}>
                  <span className="font-medium text-text">Trade-off accepted: </span>
                  {block.tradeoff}
                </p>
              </div>
            </Reveal>
            {image ? (
              <Reveal delay={0.06} className="mt-14">
                <Figure
                  src={image.src}
                  alt={image.alt}
                  width={shot.width}
                  height={shot.height}
                  caption={block.visual?.caption}
                />
              </Reveal>
            ) : null}
          </Section>
        );
      })}

      {/* System & workflows */}
      <Section>
        <SectionHead label="System & workflows" title="Four surfaces, one reusable system." />
        <div className="mt-8 grid max-w-2xl gap-5">
          {data.system.body.map((paragraph) => (
            <p key={paragraph} className={PARA}>
              {paragraph}
            </p>
          ))}
        </div>
        <Reveal delay={0.06} className="mt-14">
          <Figure
            src={`${IMG}/cs/ui-showcase.webp`}
            alt="AgencyHub final UI across marketplace, cart, and checkout"
            width={2400}
            height={3274}
          />
        </Reveal>
      </Section>

      {/* Outcome */}
      <Section>
        <SectionHead label="Outcome" title="What the design made possible." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {outcome.results.map((item) => (
            <Reveal key={item} className="editorial-card p-6">
              <p className="text-[1.0625rem] leading-7 text-muted">{item}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Reflection — promoted, prominent section */}
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
