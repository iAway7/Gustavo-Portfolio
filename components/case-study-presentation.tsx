"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const chapterLinks = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "process", label: "UX Process" },
  { id: "wireframes", label: "Wireframes" },
  { id: "system", label: "Design System" },
  { id: "final-ui", label: "Final UI" },
  { id: "results", label: "Results" },
  { id: "metrics", label: "Metrics" }
] as const;

const problemPoints = [
  "The post-booking experience lacked a visible next step.",
  "Important care instructions were spread across multiple channels.",
  "Support teams filled gaps that product design should have solved."
];

const researchNotes = [
  {
    label: "Interviews",
    title: "12 moderated patient sessions",
    body: "Participants consistently valued reassurance and sequencing over raw feature breadth."
  },
  {
    label: "Support logs",
    title: "420 tickets coded into themes",
    body: "A small set of repeat questions explained most service effort: what happens next, where to find documents, and who owns the next action."
  },
  {
    label: "Journey mapping",
    title: "Confidence drops at handoff moments",
    body: "Trust improved whenever users could see status, responsibility, and upcoming tasks in one place."
  }
] as const;

const processSteps = [
  {
    number: "01",
    title: "Map the service journey",
    body: "Aligned patient, clinician, and support actions into one operating picture."
  },
  {
    number: "02",
    title: "Reorder the information hierarchy",
    body: "Made the next best action more prominent than legacy navigation patterns."
  },
  {
    number: "03",
    title: "Prototype critical flows",
    body: "Validated onboarding, appointment prep, and secure messaging through task-led prototypes."
  },
  {
    number: "04",
    title: "Scale successful patterns",
    body: "Turned validated interface decisions into reusable rules, tokens, and components."
  }
] as const;

const resultCards = [
  {
    title: "Clearer patient handoffs",
    body: "The redesigned experience made pre-visit tasks and follow-up expectations easier to understand."
  },
  {
    title: "Lower operational friction",
    body: "Support volume shifted away from repetitive clarification and toward higher-value assistance."
  }
] as const;

const metricCards = [
  { value: "31%", label: "Fewer support contacts tied to appointment preparation" },
  { value: "22%", label: "Increase in pre-visit task completion" },
  { value: "4.6/5", label: "Satisfaction score for clarity and confidence" },
  { value: "9 days", label: "Faster stakeholder approval using the presentation format" }
] as const;

function ZoomBoard({
  children,
  caption,
  className
}: {
  children: React.ReactNode;
  caption: string;
  className?: string;
}) {
  return (
    <motion.figure
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group rounded-[2rem] border border-[rgba(24,35,31,0.1)] bg-white/[0.7] p-3 shadow-[0_28px_80px_rgba(20,27,24,0.12)]",
        className
      )}
    >
      <div className="overflow-hidden rounded-[1.4rem]">{children}</div>
      <figcaption className="px-2 pb-2 pt-4 text-sm leading-6 text-[rgba(24,35,31,0.62)]">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

export function CaseStudyPresentation() {
  const [activeSection, setActiveSection] = useState<string>(chapterLinks[0].id);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = chapterLinks
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-18% 0px -42% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#efe7dc] pt-28 text-[#18231f]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,118,79,0.18),transparent_22%),radial-gradient(circle_at_80%_8%,rgba(148,164,145,0.18),transparent_18%),linear-gradient(180deg,#f4ede5_0%,#e9dfd2_52%,#ece5db_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.45),transparent_90%)]" />

      <div className="shell relative grid gap-6 pb-24 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <Reveal className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
          <aside className="rounded-[2rem] border border-white/50 bg-[rgba(252,247,240,0.72)] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl">
            <p className="caption !text-[rgba(184,118,79,0.88)]">Case Study</p>
            <h1 className="mt-4 font-serif text-[clamp(2.2rem,3vw,3.4rem)] leading-[0.92] tracking-display text-[#18231f]">
              Altura Health Platform Redesign
            </h1>
            <p className="mt-5 text-sm leading-7 text-[rgba(24,35,31,0.65)]">
              A presentation-led UX case study designed to read like a design review deck, not a
              portfolio gallery.
            </p>

            <div className="mt-8 grid gap-2">
              {chapterLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={cn(
                      "rounded-full border px-4 py-3 text-sm uppercase tracking-[0.18em] transition-all duration-300",
                      isActive
                        ? "border-[rgba(24,35,31,0.06)] bg-white/[0.78] text-[#18231f] translate-x-1"
                        : "border-transparent text-[rgba(24,35,31,0.56)] hover:border-[rgba(24,35,31,0.06)] hover:bg-white/[0.56] hover:text-[#18231f]"
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </aside>
        </Reveal>

        <div className="grid gap-6">
          <section
            id="overview"
            className="relative overflow-hidden rounded-[2.25rem] border border-white/50 bg-[rgba(255,250,244,0.74)] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <p className="caption !text-[rgba(184,118,79,0.88)]">Project Overview</p>
                <h2 className="mt-5 font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] tracking-display text-[#18231f]">
                  Designing a care experience that feels calm, guided, and accountable.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[rgba(24,35,31,0.72)] sm:text-lg">
                  Altura Health needed to replace a fragmented patient portal with a product experience
                  that could carry trust, reduce confusion, and align internal teams around a single
                  service narrative.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    ["Role", "Lead Product Designer"],
                    ["Timeline", "14 weeks"],
                    ["Scope", "Portal, scheduling, messaging"]
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[1.5rem] border border-[rgba(24,35,31,0.08)] bg-white/[0.62] p-5"
                    >
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(24,35,31,0.48)]">
                        {label}
                      </p>
                      <p className="mt-4 text-sm uppercase tracking-[0.08em] text-[#18231f]">{value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08} className="grid gap-5">
                <ZoomBoard caption="North-star dashboard framing onboarding, care plans, and follow-up.">
                  <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(234,226,217,0.88)),linear-gradient(135deg,#f0e7dc,#f7f2eb)] p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                    <div className="rounded-2xl bg-[rgba(24,35,31,0.08)] h-10" />
                    <div className="mt-4 grid gap-4">
                      <div className="h-48 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(184,118,79,0.18),rgba(34,54,47,0.12))]" />
                      <div className="grid grid-cols-3 gap-4">
                        <span className="h-24 rounded-[1.2rem] bg-[rgba(24,35,31,0.08)]" />
                        <span className="h-24 rounded-[1.2rem] bg-[rgba(24,35,31,0.1)]" />
                        <span className="h-24 rounded-[1.2rem] bg-[rgba(24,35,31,0.08)]" />
                      </div>
                    </div>
                  </div>
                </ZoomBoard>

                <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,#21342d,#3b5349)] p-6 text-[#f8f1e8] shadow-[0_24px_64px_rgba(20,27,24,0.22)]">
                  <p className="font-serif text-2xl leading-8">
                    “We were not presenting screens in isolation. We were presenting a calmer service
                    model.”
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <section
            id="problem"
            className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,34,30,0.94),rgba(28,42,37,0.94))] p-6 text-[#f8f1e8] shadow-[0_28px_84px_rgba(20,27,24,0.16)] sm:p-8 lg:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="caption !text-[#d8a887]">Problem</p>
                <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] tracking-display">
                  Patients were unsure what to do next, and staff carried the cost of that confusion.
                </h2>
              </Reveal>

              <div className="grid gap-5">
                <Reveal className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                  <p className="text-base leading-8 text-[#e2d8cb] sm:text-lg">
                    The existing portal split scheduling, documents, reminders, and communication into
                    disconnected moments. Users moved between email, PDFs, and phone support just to
                    complete ordinary care tasks.
                  </p>
                </Reveal>

                <Reveal delay={0.08} className="grid gap-4">
                  {problemPoints.map((point, index) => (
                    <div
                      key={point}
                      className="grid gap-3 rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:grid-cols-[56px_1fr]"
                    >
                      <span className="font-serif text-3xl text-[#d8a887]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base leading-7 text-[#e9dfd3]">{point}</p>
                    </div>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>

          <section
            id="research"
            className="rounded-[2.25rem] border border-white/50 bg-[rgba(255,250,244,0.74)] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="caption !text-[rgba(184,118,79,0.88)]">Research</p>
                <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-display text-[#18231f]">
                  We translated operational friction into behavioral evidence.
                </h2>
                <p className="mt-5 max-w-md text-base leading-8 text-[rgba(24,35,31,0.68)]">
                  Interviews, ticket analysis, and journey mapping isolated the exact moments where
                  uncertainty created avoidable effort.
                </p>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {researchNotes.map((note, index) => (
                  <Reveal
                    key={note.title}
                    delay={index * 0.06}
                    className={cn(
                      "rounded-[1.8rem] border border-[rgba(24,35,31,0.08)] bg-white/[0.66] p-6",
                      index === 2 && "md:col-span-2"
                    )}
                  >
                    <p className="caption !text-[rgba(184,118,79,0.88)]">{note.label}</p>
                    <h3 className="mt-4 text-2xl text-[#18231f]">{note.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[rgba(24,35,31,0.66)]">{note.body}</p>
                    {index === 2 ? (
                      <div className="mt-6 flex h-36 items-end gap-3">
                        {[74, 52, 88, 63, 96].map((height) => (
                          <span
                            key={height}
                            className="block flex-1 rounded-t-full bg-[linear-gradient(180deg,rgba(184,118,79,0.94),rgba(148,164,145,0.76))]"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    ) : null}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section
            id="process"
            className="rounded-[2.25rem] border border-white/50 bg-[linear-gradient(160deg,rgba(248,239,230,0.82),rgba(228,236,228,0.72))] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <Reveal className="max-w-3xl">
              <p className="caption !text-[rgba(184,118,79,0.88)]">UX Process</p>
              <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-display text-[#18231f]">
                A structured system of reduction, sequencing, and validation.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={index * 0.06}
                  className="relative rounded-[1.8rem] border border-[rgba(24,35,31,0.08)] bg-white/[0.62] p-6"
                >
                  <span className="font-serif text-4xl text-[rgba(184,118,79,0.94)]">{step.number}</span>
                  <h3 className="mt-5 text-2xl text-[#18231f]">{step.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[rgba(24,35,31,0.64)]">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            id="wireframes"
            className="rounded-[2.25rem] border border-white/50 bg-[rgba(255,250,244,0.74)] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <Reveal className="max-w-3xl">
              <p className="caption !text-[rgba(184,118,79,0.88)]">Wireframes</p>
              <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-display text-[#18231f]">
                Early structure focused on confidence, not decoration.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-5 xl:grid-cols-3">
              {[
                "Dashboard wireframe centered on task sequencing.",
                "Scheduling and preparation states reduced into one path.",
                "Secure messages and care notes merged into a single reading surface."
              ].map((caption, index) => (
                <Reveal key={caption} delay={index * 0.07}>
                  <ZoomBoard caption={caption}>
                    <div className="border border-[rgba(24,35,31,0.08)] bg-[linear-gradient(rgba(34,54,47,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,54,47,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.86),rgba(236,230,224,0.88))] bg-[size:18px_18px,18px_18px,cover] p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                      <div className="h-9 rounded-xl bg-[rgba(34,54,47,0.08)]" />
                      <div
                        className={cn(
                          "mt-5 rounded-[1.2rem] bg-[rgba(34,54,47,0.08)]",
                          index === 0 && "h-52",
                          index === 1 && "h-36",
                          index === 2 && "h-60"
                        )}
                      />
                    </div>
                  </ZoomBoard>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            id="system"
            className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,34,30,0.94),rgba(28,42,37,0.94))] p-6 text-[#f8f1e8] shadow-[0_28px_84px_rgba(20,27,24,0.16)] sm:p-8 lg:p-12"
          >
            <Reveal className="max-w-3xl">
              <p className="caption !text-[#d8a887]">Design System</p>
              <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-display">
                A restrained visual language built for trust and continuity.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-5 xl:grid-cols-[0.8fr_1.1fr_0.9fr]">
              <Reveal className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                <h3 className="text-2xl">Color</h3>
                <div className="mt-5 flex gap-3">
                  {["#f4ede4", "#20332d", "#b8734d", "#9eae9f"].map((swatch) => (
                    <span
                      key={swatch}
                      className="block h-14 w-14 rounded-2xl border border-white/10"
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.06} className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                <h3 className="text-2xl">Typography</h3>
                <p className="mt-5 font-serif text-3xl leading-9">
                  Editorial headline tone for narrative weight
                </p>
                <p className="mt-4 text-base leading-7 text-[#d6ccbe]">
                  Measured interface language for guidance, hierarchy, and clinical clarity.
                </p>
              </Reveal>

              <Reveal delay={0.12} className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                <h3 className="text-2xl">Components</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-[#b8734d] px-4 py-3 text-sm uppercase tracking-[0.18em] text-white">
                    Primary
                  </span>
                  <span className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-3 text-sm uppercase tracking-[0.18em] text-[#f8f1e8]">
                    Secondary
                  </span>
                </div>
                <div className="mt-5 h-28 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(216,168,135,0.12))]" />
              </Reveal>
            </div>
          </section>

          <section
            id="final-ui"
            className="rounded-[2.25rem] border border-white/50 bg-[rgba(255,250,244,0.74)] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="caption !text-[rgba(184,118,79,0.88)]">Final UI</p>
                <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-display text-[#18231f]">
                  Polished product surfaces balanced warmth with procedural clarity.
                </h2>
                <p className="mt-5 text-base leading-8 text-[rgba(24,35,31,0.68)]">
                  Large-format interface boards make the finished experience feel like an executive
                  review presentation rather than a thumbnail gallery.
                </p>
              </Reveal>

              <div className="grid gap-5">
                <Reveal>
                  <ZoomBoard caption="Home dashboard with clear progress, task focus, and personalized care context.">
                    <div className="border border-[rgba(24,35,31,0.08)] bg-[linear-gradient(135deg,rgba(255,253,249,0.94),rgba(236,231,223,0.92))] p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                      <div className="h-64 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(184,118,79,0.18),rgba(34,54,47,0.12))]" />
                      <div className="mt-5 grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-28 rounded-[1.2rem] bg-[rgba(24,35,31,0.08)]" />
                        <div className="h-28 rounded-[1.2rem] bg-[rgba(24,35,31,0.12)]" />
                      </div>
                    </div>
                  </ZoomBoard>
                </Reveal>

                <Reveal delay={0.08}>
                  <ZoomBoard caption="Preparation flow condenses forms, documents, and reminders into one guided sequence.">
                    <div className="grid gap-4 border border-[rgba(24,35,31,0.08)] bg-[linear-gradient(135deg,rgba(255,253,249,0.94),rgba(236,231,223,0.92))] p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04] lg:grid-cols-[1.15fr_0.85fr]">
                      <div className="h-72 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(184,118,79,0.16),rgba(34,54,47,0.12))]" />
                      <div className="grid gap-4">
                        <div className="h-28 rounded-[1.2rem] bg-[rgba(24,35,31,0.08)]" />
                        <div className="h-40 rounded-[1.2rem] bg-[rgba(24,35,31,0.12)]" />
                      </div>
                    </div>
                  </ZoomBoard>
                </Reveal>
              </div>
            </div>
          </section>

          <section
            id="results"
            className="rounded-[2.25rem] border border-white/50 bg-[linear-gradient(160deg,rgba(248,239,230,0.82),rgba(228,236,228,0.72))] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <Reveal>
                <p className="caption !text-[rgba(184,118,79,0.88)]">Results</p>
                <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-display text-[#18231f]">
                  The redesign improved comprehension and reduced avoidable service effort.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(24,35,31,0.68)]">
                  Stakeholders used the case study itself as a decision tool because strategy, evidence,
                  and interface craft were legible within one continuous narrative.
                </p>
              </Reveal>

              <div className="grid gap-4">
                {resultCards.map((card, index) => (
                  <Reveal
                    key={card.title}
                    delay={index * 0.08}
                    className="rounded-[1.8rem] border border-[rgba(24,35,31,0.08)] bg-white/[0.62] p-6"
                  >
                    <h3 className="text-2xl text-[#18231f]">{card.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[rgba(24,35,31,0.66)]">{card.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section
            id="metrics"
            className="rounded-[2.25rem] border border-white/50 bg-[rgba(255,250,244,0.74)] p-6 shadow-[0_28px_84px_rgba(20,27,24,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <Reveal className="max-w-3xl">
              <p className="caption !text-[rgba(184,118,79,0.88)]">Metrics</p>
              <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-display text-[#18231f]">
                Outcome signals grounded the narrative in product performance.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 xl:grid-cols-4">
              {metricCards.map((metric, index) => (
                <Reveal
                  key={metric.label}
                  delay={reduceMotion ? 0 : index * 0.05}
                  className="grid min-h-[220px] content-between rounded-[1.8rem] border border-[rgba(24,35,31,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(244,237,228,0.88))] p-6"
                >
                  <strong className="font-serif text-[clamp(2.8rem,4vw,4rem)] leading-none text-[#18231f]">
                    {metric.value}
                  </strong>
                  <span className="text-base leading-7 text-[rgba(24,35,31,0.64)]">{metric.label}</span>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
