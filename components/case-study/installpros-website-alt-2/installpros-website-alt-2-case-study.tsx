import Image from "next/image";
import type { ReactNode } from "react";

import {
  AgencyHubOverviewCarousel as ProductCarousel,
  type OverviewSlide as ProductSlide
} from "@/components/case-study/agencyhub/overview-carousel";
import { BrowserFrame } from "@/components/case-study/emmvi/browser-frame";
import { GlanceSection } from "@/components/case-study/sections";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import type { CaseStudyGlance, ProjectCaseStudy } from "@/lib/site-data";

const IMG = "/projects/installpros-website/alt2";

// Same reading paragraph scale as the other case studies.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

// This case study is a self-contained iteration: hero meta and glance are
// defined here (not pulled from the marketing-led project record) so the story
// reads as product design driven by research, not a site walkthrough.
const HERO = {
  tags: ["Product Design", "Customer Research", "Conversion"],
  title: "InstallPros",
  summary:
    "I designed the InstallPros website from scratch — not as a visual exercise, but as the answer to one question the support inbox kept asking: why do people hesitate before booking an installation?",
  role: "Product Designer",
  timeline: "2024 — Present",
  scope: "Research, product decisions & web system — U.S. (and U.K.)"
};

const glance: CaseStudyGlance = {
  challenge:
    "InstallPros could install Starlink anywhere, but visitors stalled before booking. The job was to find what created the hesitation and design it out — starting from evidence, not aesthetics.",
  role:
    "Sole Product Designer. I built a research workflow over 300+ support conversations, turned the patterns into product principles, and designed the site that acted on them.",
  outcome:
    "A website structured around certainty: availability, trust, and the next step are resolved in the order customers actually ask for them — before the form, not after."
};

// The three highest-signal question categories pulled from the support corpus.
const questionThemes: {
  label: string;
  questions: string[];
  insight: string;
}[] = [
  {
    label: "Payment",
    questions: [
      "How much does installation cost?",
      "Can I see pricing before I schedule?",
      "What are the payment options? Do you offer financing?",
      "Why do I have to book before I get a quote?"
    ],
    insight:
      "The highest-volume category. People were hitting pricing uncertainty before they were ready to commit — and a hidden price reads as a risk, not a quote."
  },
  {
    label: "Availability",
    questions: [
      "Do you serve my area? Do you install in my state?",
      "Can you install on a metal roof? On a boat?",
      "Will this actually work where I live?"
    ],
    insight:
      "Availability is validated before scheduling. Customers first need confidence that InstallPros can help them at all — coverage is the real first question."
  },
  {
    label: "Scheduling",
    questions: [
      "How quickly can someone come out?",
      "What happens after I submit the form?",
      "How long does the installation take?"
    ],
    insight:
      "People aren't chasing megabits. They're chasing fast resolution of a painful problem — the speed they care about is how quickly it gets handled."
  }
];

const personas: { name: string; traits: string; need: string }[] = [
  {
    name: "The frustrated rural homeowner",
    traits: "Non-technical, risk-averse, tired of unreliable internet.",
    need: "Wants reliability and someone to handle the whole thing — not a spec sheet."
  },
  {
    name: "The remote worker under pressure",
    traits: "Internet affects their income, so every day offline costs them.",
    need: "Values responsiveness, speed, and certainty that the problem is being solved now."
  }
];

// The four insights that became the spine of the design.
const insights: { kicker: string; statement: string; body: string }[] = [
  {
    kicker: "Insight 01",
    statement: "Customers aren't buying internet. They're buying certainty.",
    body: "The strongest pattern across conversations wasn't technical — it was uncertainty. People wanted to know who is coming, when, what it costs, whether their area is covered, and whether it will be done right. Reassurance was the product."
  },
  {
    kicker: "Insight 02",
    statement: "Availability comes before almost everything.",
    body: "Before pricing, before features, before scheduling, the question was “Can you help me where I live?” Coverage confidence is the gate every other decision sits behind — so it had to be answered immediately."
  },
  {
    kicker: "Insight 03",
    statement: "Trust beats technical specifications.",
    body: "People rarely asked about Mbps. They asked about reviews, legitimacy, professionalism, and installation quality. The site had to sell trust before it sold features."
  },
  {
    kicker: "Insight 04",
    statement: "Authority first, speed second.",
    body: "Customers do care about speed — but as quick scheduling, quick communication, quick resolution, not marketing jargon. The positioning became “professional installation, done right the first time, scheduled quickly,” not “fast internet, fast speeds.”"
  }
];

const principles: { title: string; body: string }[] = [
  {
    title: "Reduce uncertainty early",
    body: "Answer the unspoken questions — cost signals, coverage, what happens next — before asking for anything."
  },
  {
    title: "Validate availability immediately",
    body: "Make “can you help me where I live?” the first interaction, not a buried step."
  },
  {
    title: "Build trust before selling features",
    body: "Lead with proof and professionalism; treat specifications as support, not the pitch."
  },
  {
    title: "Make the next step obvious",
    body: "One clear action, repeated at decision points, so no one has to hunt for how to move forward."
  },
  {
    title: "Design for mobile scanning",
    body: "Most visitors arrive on a phone, mid-frustration. Structure for fast scanning, not slow reading."
  }
];

// How the research translated into the designed surfaces.
const decisions: {
  eyebrow: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
}[] = [
  {
    eyebrow: "Availability checker in the hero",
    title: "The first thing the page does is answer the first question.",
    body: "Because customers asked about coverage before anything else, the hero opens on a single positioning line and a zip-code availability check. Confidence about “can you help me?” is resolved in the first screen, before pricing or features are even introduced.",
    image: { src: `${IMG}/hero.webp`, alt: "Hero with positioning line and zip-code availability checker" }
  },
  {
    eyebrow: "Coverage as proof",
    title: "Show the footprint, then let them check it.",
    body: "Coverage doubts were answered twice: a national footprint with hard numbers establishes that InstallPros operates at scale, and a “Find My Installer” check turns that claim into a personal, location-specific answer.",
    image: { src: `${IMG}/coverage.webp`, alt: "Nationwide coverage section with stats and service map" }
  },
  {
    eyebrow: "Sell certainty, not speed",
    title: "Frame the offer as a problem handled end to end.",
    body: "Service framing leads with an all-in-one, done-for-you promise, same-week scheduling, and clear upfront pricing — the certainty signals the inbox kept asking for — instead of technical performance claims.",
    image: { src: `${IMG}/solution.webp`, alt: "Service framing: all-in-one solution, same-week install, clear pricing" }
  },
  {
    eyebrow: "Authority before features",
    title: "Make professionalism the headline.",
    body: "The installation story leads with customized setup, complete installation, and quality of work — positioning InstallPros as the team that does it right the first time. Trust is established before any feature has to do the convincing.",
    image: { src: `${IMG}/installation.webp`, alt: "Professional installation section emphasizing quality and process" }
  }
];

const surfaceSlides: ProductSlide[] = [
  { src: `${IMG}/hero.webp`, alt: "Hero with availability checker", label: "Hero · Availability check" },
  { src: `${IMG}/solution.webp`, alt: "Complete Starlink solution", label: "Certainty framing" },
  { src: `${IMG}/installation.webp`, alt: "Professional installation", label: "Professional installation" },
  { src: `${IMG}/coverage.webp`, alt: "Nationwide coverage", label: "Coverage proof" }
];

const opportunities: { title: string; body: string }[] = [
  {
    title: "Pricing transparency",
    body: "Surface more of the cost picture earlier, so the highest-volume question is answered before the form."
  },
  {
    title: "Quote before scheduling",
    body: "Test a flow that returns an estimate without forcing a booking first — the friction customers named most."
  },
  {
    title: "Expectation setting",
    body: "Show clearly what happens after submitting: who reaches out, when, and what they'll need."
  },
  {
    title: "Scheduling visibility",
    body: "Give a real sense of timing and availability, turning “how soon?” into a visible answer."
  },
  {
    title: "Coverage discovery",
    body: "Make service-area and surface-type checks (roofs, boats, mounts) richer and more self-serve."
  }
];

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-text">
        {title}
      </h2>
      {intro ? <p className={`mt-6 ${PARA}`}>{intro}</p> : null}
    </Reveal>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="shell">{children}</div>
    </section>
  );
}

function DecisionSplit({
  eyebrow,
  title,
  body,
  image,
  reversed = false
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
  reversed?: boolean;
}) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className={reversed ? "lg:order-2" : undefined}>
            <p className="section-label">{eyebrow}</p>
            <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.14] tracking-[-0.03em] text-text">
              {title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-7 text-muted sm:text-lg">{body}</p>
          </Reveal>
          <Reveal delay={0.06} className={reversed ? "lg:order-1" : undefined}>
            <figure className="editorial-image paper-tint overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={1800}
                height={1100}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function InstallProsWebsiteAlt2CaseStudy({
  nextProject
}: {
  project: ProjectCaseStudy;
  nextProject?: { href: string; title: string };
}) {
  return (
    <main id="main-content" tabIndex={-1} className="pb-8 pt-10 sm:pt-16">
      {/* Hero */}
      <section className="pb-12 pt-6 sm:pb-16">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {HERO.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[clamp(2.2rem,4.4vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.04em] text-text">
              {HERO.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]">
              {HERO.summary}
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                ["Role", HERO.role],
                ["Timeline", HERO.timeline],
                ["Scope", HERO.scope]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="section-label">{label}</dt>
                  <dd className="mt-2 text-base text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* First image: the homepage, framed and cropped to the top so the
              hero reads as a live product instead of a 6000px-tall scroll. */}
          <Reveal delay={0.08} className="mx-auto mt-12 w-full max-w-[78rem]">
            <BrowserFrame
              src={`${IMG}/landing.webp`}
              alt="InstallPros U.S. homepage"
              url="installpros.io"
              aspect="aspect-[16/10]"
              sizes="(min-width: 1248px) 78rem, 100vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Glance — the 30-second read */}
      <GlanceSection glance={glance} />

      {/* The question that drove the project */}
      <Section>
        <SectionHead
          eyebrow="The question"
          title="Why do people hesitate before booking an installation?"
          intro="This wasn't a visual project. InstallPros could already install Starlink across the U.S., yet visitors stalled at the edge of booking. Rather than explore layouts, I started by trying to understand the hesitation — and let the evidence decide what the site needed to be."
        />
      </Section>

      {/* Research process */}
      <Section>
        <SectionHead
          eyebrow="Research process"
          title="I turned the support inbox into a design brief."
          intro="The clearest signal of what customers were unsure about was already sitting in our conversations with them. I built a lightweight workflow to mine it."
        />
        <Reveal delay={0.06} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Export", "Pulled 300+ Intercom conversations out of the support tool."],
            ["Structure", "Used a ChatGPT-assisted workflow to organize them into Google Sheets."],
            ["Analyze", "Tagged recurring questions and clustered them into recurring patterns."],
            ["Translate", "Turned each pattern into a concrete website decision."]
          ].map(([step, body], i) => (
            <div key={step} className="editorial-card p-6">
              <p className="section-label">{`Step ${i + 1}`}</p>
              <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-text">{step}</p>
              <p className="mt-3 text-base leading-7 text-muted">{body}</p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <p className={`mt-10 max-w-2xl ${PARA}`}>
            That corpus became the foundation of the project. Three categories of question dominated everything else.
          </p>
        </Reveal>
      </Section>

      {/* What customers were asking */}
      <Section>
        <SectionHead eyebrow="What customers were asking" title="Three questions, asked over and over." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {questionThemes.map((theme, i) => (
            <Reveal key={theme.label} delay={i * 0.06} className="editorial-card flex flex-col p-7">
              <p className="section-label">{theme.label}</p>
              <ul role="list" className="mt-5 space-y-3">
                {theme.questions.map((q) => (
                  <li key={q} className="text-base leading-7 text-muted">
                    “{q}”
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-[1.0625rem] leading-7 text-text">
                {theme.insight}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Audience */}
      <Section>
        <SectionHead
          eyebrow="Who we were designing for"
          title="Two people, one feeling: I need this handled."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {personas.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="editorial-card p-7">
              <p className="text-xl font-medium tracking-[-0.03em] text-text">{p.name}</p>
              <p className="mt-4 text-base leading-7 text-muted">{p.traits}</p>
              <p className="mt-3 text-base leading-7 text-muted">{p.need}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The four insights */}
      <Section>
        <SectionHead
          eyebrow="What the research made clear"
          title="Four insights became the spine of the design."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {insights.map((ins, i) => (
            <Reveal key={ins.kicker} delay={i * 0.05} className="bg-canvas">
              <div className="grid gap-4 p-7 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
                <div>
                  <p className="section-label">{ins.kicker}</p>
                  <p className="mt-3 text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-[1.2] tracking-[-0.03em] text-text">
                    {ins.statement}
                  </p>
                </div>
                <p className="text-[1.0625rem] leading-7 text-muted sm:text-lg lg:self-center">{ins.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Design principles */}
      <Section>
        <SectionHead
          eyebrow="Design principles"
          title="The rules the research handed me."
          intro="Before any layout, the insights resolved into five principles. Every decision on the site had to earn its place against them."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="editorial-card p-6">
              <p className="section-label">{`0${i + 1}`}</p>
              <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-text">{p.title}</p>
              <p className="mt-3 text-base leading-7 text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Product surface carousel */}
      <Section>
        <SectionHead
          eyebrow="The designed surface"
          title="The same principles, made visible."
          intro="Each moment on the page answers a question the research surfaced — in the order customers actually ask. Move through the key surfaces below."
        />
        <Reveal delay={0.06} className="mt-12">
          <ProductCarousel slides={surfaceSlides} />
        </Reveal>
      </Section>

      {/* Design decisions, alternating */}
      <Section>
        <SectionHead
          eyebrow="Design decisions"
          title="How the research shaped the page."
        />
      </Section>
      {decisions.map((d, i) => (
        <DecisionSplit key={d.eyebrow} {...d} reversed={i % 2 === 1} />
      ))}

      {/* UK supporting context */}
      <Section>
        <SectionHead
          eyebrow="Supporting context"
          title="Two markets, one research-led system."
          intro="InstallPros operates in the United States and the United Kingdom, and I designed for both. The customer research and business insight were concentrated in the U.S. market, so that's where this story lives — the U.K. site applies the same principles to a different audience and service mix."
        />
      </Section>

      {/* What I'd explore next */}
      <Section>
        <SectionHead
          eyebrow="What I'd explore next"
          title="The work isn't finished — the research pointed past it."
          intro="The same conversations that shaped this version also flagged where it can go further. These are the next opportunities I'd pursue."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05} className="editorial-card p-6">
              <p className="text-lg font-medium tracking-[-0.02em] text-text">{o.title}</p>
              <p className="mt-3 text-base leading-7 text-muted">{o.body}</p>
            </Reveal>
          ))}
        </div>

        {nextProject ? (
          <div className="mt-14 border-t border-line pt-10">
            <p className="section-label">Next project</p>
            <MagneticLink
              href={nextProject.href}
              className="mt-4 inline-flex text-2xl font-medium tracking-[-0.04em] text-text"
            >
              {nextProject.title}
            </MagneticLink>
          </div>
        ) : null}
      </Section>
    </main>
  );
}
