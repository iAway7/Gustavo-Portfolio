import { Fragment } from "react";
import Image from "next/image";

import { Reveal } from "@/components/reveal";

type FlowStep = {
  title: string;
  detail: string;
  icon: "form" | "automation" | "discord" | "review" | "reply";
};

const steps: FlowStep[] = [
  { title: "Website Form", detail: "Visitor submits the Contact page form.", icon: "form" },
  { title: "Zapier", detail: "Submission is captured and routed automatically.", icon: "automation" },
  { title: "Discord Notification", detail: "A structured alert posts to the team channel.", icon: "discord" },
  { title: "Team Review", detail: "A human reads context and qualifies the lead.", icon: "review" },
  { title: "Client Response", detail: "A tailored reply opens the conversation.", icon: "reply" }
];

function StepIcon({ icon }: { icon: FlowStep["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      {icon === "form" && (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2" {...common} />
          <path d="M8 8h8M8 12h8M8 16h5" {...common} />
        </>
      )}
      {icon === "automation" && <path d="M13 3L5 13h6l-2 8 8-10h-6l2-8z" {...common} />}
      {icon === "discord" && (
        <>
          <path d="M8 7c2.5-1 5.5-1 8 0M8 17c2.5 1 5.5 1 8 0" {...common} />
          <path d="M8 7C5.5 9 5 13 6 18c1 .8 2 1 2 1l1-2M16 7c2.5 2 3 6 2 11-1 .8-2 1-2 1l-1-2" {...common} />
          <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {icon === "review" && (
        <>
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" {...common} />
          <circle cx="12" cy="12" r="2.5" {...common} />
        </>
      )}
      {icon === "reply" && <path d="M10 8L4 13l6 5M4 13h9a6 6 0 016 6" {...common} />}
    </svg>
  );
}

/**
 * Lead Capture Workflow — presented deliberately as a supporting system, not
 * the product. A single linear flow, a short rationale, and one Discord
 * screenshot as evidence the pipeline actually runs.
 */
export function LeadCaptureFlow({ screenshot }: { screenshot: { src: string; alt: string } }) {
  return (
    <div className="grid gap-10">
      <Reveal>
        <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <li className="flex flex-1 flex-col rounded-[1.4rem] border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-text">
                    <StepIcon icon={step.icon} />
                  </span>
                  <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-base font-medium tracking-[-0.02em] text-text">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{step.detail}</p>
              </li>
              {index < steps.length - 1 ? (
                <li
                  aria-hidden="true"
                  className="flex items-center justify-center text-black/25 lg:px-1"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 lg:rotate-0" aria-hidden="true">
                    <path
                      d="M5 12h14m0 0l-6-6m6 6l-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                  </svg>
                </li>
              ) : null}
            </Fragment>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.06}>
        <figure className="grid gap-4">
          <div className="overflow-hidden rounded-[1.4rem] border border-line bg-[#1e1f22] shadow-[0_18px_42px_rgba(23,23,23,0.08)]">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="ml-1 text-[0.7rem] tracking-[0.06em] text-white/55">
                Discord · #contact-form
              </span>
            </div>
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={2400}
              height={1662}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 70vw, 100vw"
            />
          </div>
          <figcaption className="max-w-2xl text-base leading-7 text-muted">
            Each submission lands as a structured message — name, service, and campaign source — so the
            team reviews a qualified lead, not a raw email. The automation removes the lag between
            interest and reply; the judgement stays human.
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
