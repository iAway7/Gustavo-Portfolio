import type { ReactNode } from "react";

import { BrowserFrame } from "@/components/case-study/emmvi/browser-frame";
import { LeadCaptureFlow } from "@/components/case-study/emmvi/lead-capture-flow";
import {
  ProductSurfaceCarousel,
  type SurfaceSlide
} from "@/components/case-study/emmvi/product-surface-carousel";
import { CaseStudyHero, GlanceSection } from "@/components/case-study/sections";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { ProjectCaseStudy } from "@/lib/site-data";

type EmmviCaseStudyProps = {
  project: ProjectCaseStudy;
  nextProject?: {
    href: string;
    title: string;
  };
};

const IMG = "/projects/emmvi";

const surfaceSlides: SurfaceSlide[] = [
  {
    src: `${IMG}/homepage-full.png`,
    alt: "Emmvi homepage",
    label: "Homepage",
    url: "emmvi.com",
    intent:
      "Resolves the buyer's first question — is this for me? — with one outcome-led promise, recognizable client logos, and language that mirrors the visitor before offering the path forward."
  },
  {
    src: `${IMG}/service-website-design.png`,
    alt: "Emmvi website design service page",
    label: "Website Design",
    url: "emmvi.com/website-design",
    intent:
      "Opens on the business result and treats the craft as supporting evidence, so value is read before deliverables ever appear."
  },
  {
    src: `${IMG}/service-seo.png`,
    alt: "Emmvi SEO service page",
    label: "SEO",
    url: "emmvi.com/seo",
    intent:
      "Frames search as compounding growth rather than a checklist, keeping the same outcome-first template that holds the system together."
  },
  {
    src: `${IMG}/service-ppc.png`,
    alt: "Emmvi PPC service page",
    label: "PPC",
    url: "emmvi.com/ppc",
    intent:
      "Positions paid media as measured acquisition, pairing the promise with proof so spend reads as investment, not risk."
  },
  {
    src: `${IMG}/service-email.png`,
    alt: "Emmvi email marketing service page",
    label: "Email",
    url: "emmvi.com/email-marketing",
    intent:
      "Presents retention as the quiet engine of growth, completing a service set that argues each offer in the same disciplined voice."
  },
  {
    src: `${IMG}/about-full.png`,
    alt: "Emmvi about page",
    label: "About",
    url: "emmvi.com/about",
    intent:
      "Builds credibility on clarity, not adjectives: a one-line mission, three evenly weighted principles, and a tonal shift that marks what the studio stands for."
  },
  {
    src: `${IMG}/contact-full.png`,
    alt: "Emmvi contact page",
    label: "Contact",
    url: "emmvi.com/contact",
    intent:
      "Reframes the form as a conversation — asking which service and what's needed — so qualification begins in the input itself."
  }
];

/** Full-width section shell — eyebrow, heading, optional intro, then content. */
function EmmviSection({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line">
      <div className="shell py-16 sm:py-20">
        <Reveal className="max-w-3xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="section-title mt-4">{title}</h2>
          {intro ? <p className="body-copy mt-5 max-w-2xl">{intro}</p> : null}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

/** Alternating two-column layout that fills the full content width. */
function EditorialSplit({
  media,
  reversed = false,
  children
}: {
  media: ReactNode;
  reversed?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <Reveal className={reversed ? "lg:order-2" : undefined}>{children}</Reveal>
      <Reveal delay={0.06} className={reversed ? "lg:order-1" : undefined}>
        {media}
      </Reveal>
    </div>
  );
}

function DesignMoves({ moves }: { moves: string[] }) {
  return (
    <ul className="mt-8 grid gap-3">
      {moves.map((move) => (
        <li
          key={move}
          className="flex gap-3 border-t border-line pt-3 text-sm leading-6 text-muted"
        >
          <span aria-hidden="true" className="text-text">
            —
          </span>
          <span>{move}</span>
        </li>
      ))}
    </ul>
  );
}

export function EmmviCaseStudy({ project, nextProject }: EmmviCaseStudyProps) {
  const { outcome } = project;

  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-14">
      <CaseStudyHero project={project} />
      <GlanceSection glance={project.glance} />

      {/* Product Surface — the full platform at a glance. */}
      <EmmviSection
        eyebrow="Product Surface"
        title="The full surface, page by page."
        intro="Emmvi is a complete digital platform, not a stack of marketing pages — a connected set of surfaces that carry one offer from first impression to qualified conversation. Move through the major pages below."
      >
        <ProductSurfaceCarousel slides={surfaceSlides} />
      </EmmviSection>

      {/* Homepage deep-dive. */}
      <EmmviSection eyebrow="Homepage" title="One promise, made legible in a single screen.">
        <EditorialSplit
          media={
            <BrowserFrame
              src={`${IMG}/homepage-full.png`}
              alt="Emmvi homepage hero and proof section"
              url="emmvi.com"
              aspect="aspect-[16/12]"
            />
          }
        >
          <p className="body-copy">
            The homepage answers the hardest question first — is this for me? A single outcome-led
            headline carries the offer, recognizable client logos supply instant credibility, and a
            “Does this sound familiar?” section mirrors the visitor&apos;s own words before pointing to
            the next step.
          </p>
          <DesignMoves
            moves={[
              "Outcome-led headline in place of a feature list",
              "Client logos as immediate, low-effort credibility",
              "Objection-mirroring copy before the first ask"
            ]}
          />
        </EditorialSplit>
      </EmmviSection>

      {/* Services deep-dive (reversed). */}
      <EmmviSection eyebrow="Services" title="Service pages that sell change, not deliverables.">
        <EditorialSplit
          reversed
          media={
            <BrowserFrame
              src={`${IMG}/service-website-design.png`}
              alt="Emmvi website design service page"
              url="emmvi.com/website-design"
              aspect="aspect-[16/12]"
            />
          }
        >
          <p className="body-copy">
            Website Design, SEO, PPC, and Email Marketing each open on the business result they
            produce and treat the method as supporting evidence. A shared template keeps the system
            coherent while letting every offer argue its own value in the same disciplined voice.
          </p>
          <DesignMoves
            moves={[
              "A consistent, outcome-first template across all four services",
              "Benefit framing positioned ahead of process detail",
              "A conversion module that reinforces the single next step"
            ]}
          />
        </EditorialSplit>
      </EmmviSection>

      {/* About deep-dive. */}
      <EmmviSection eyebrow="About" title="Credibility built on clarity, not adjectives.">
        <EditorialSplit
          media={
            <BrowserFrame
              src={`${IMG}/about-full.png`}
              alt="Emmvi about page with mission and principles"
              url="emmvi.com/about"
              aspect="aspect-[16/12]"
            />
          }
        >
          <p className="body-copy">
            “Streamlining entrepreneurial journeys” states the studio&apos;s mission in one line, then
            three principles — expertise, client-centricity, transparency — ground it. A dark mission
            band interrupts the rhythm to signal the values at the core of the offer.
          </p>
          <DesignMoves
            moves={[
              "A mission a visitor can repeat in one sentence",
              "Three principles, evenly weighted, no hierarchy games",
              "A tonal shift used to mark what actually matters"
            ]}
          />
        </EditorialSplit>
      </EmmviSection>

      {/* Contact deep-dive (reversed). */}
      <EmmviSection eyebrow="Contact" title="A form that starts qualification, not just collection.">
        <EditorialSplit
          reversed
          media={
            <BrowserFrame
              src={`${IMG}/contact-full.png`}
              alt="Emmvi contact page with lead form and testimonial"
              url="emmvi.com/contact"
              aspect="aspect-[16/13]"
            />
          }
        >
          <p className="body-copy">
            “Talk to our specialists” reframes the form as a conversation. Asking which service and
            what&apos;s needed begins qualification inside the input itself, while a testimonial placed
            beside the fields lowers the cost of hitting submit.
          </p>
          <DesignMoves
            moves={[
              "Service and intent captured up front",
              "Proof positioned right next to the form",
              "One unambiguous action, no competing CTAs"
            ]}
          />
        </EditorialSplit>
      </EmmviSection>

      {/* Lead Capture Workflow — supporting system. */}
      <EmmviSection
        eyebrow="Lead Capture Workflow"
        title="A quiet system behind the conversation."
        intro="Automation is supporting infrastructure here, not the product. A single linear path moves a form submission to a human reply without dropping context along the way."
      >
        <LeadCaptureFlow
          screenshot={{
            src: `${IMG}/discord-automation.png`,
            alt: "Discord channel showing a structured Emmvi lead notification posted by a bot"
          }}
        />
      </EmmviSection>

      {/* Outcome & reflection — full width. */}
      <section className="border-t border-line">
        <div className="shell py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="section-label">Outcome</p>
            <h2 className="section-title mt-4">A repeatable growth system, owned end to end.</h2>
          </Reveal>

          <Reveal delay={0.06} className="mt-10 grid gap-5 md:grid-cols-3">
            {outcome.results.map((item) => (
              <div key={item} className="editorial-card p-6">
                <p className="text-base leading-7 text-muted">{item}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-12 max-w-3xl">
            <p className="section-label">Reflection</p>
            <p className="body-copy mt-4">{outcome.reflection}</p>
          </Reveal>

          <Reveal delay={0.14} className="mt-12 grid gap-8">
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
