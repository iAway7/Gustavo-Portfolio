import Image from "next/image";
import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** "Part 01 · Where the money went" — the baseline-aligned opener of each part. */
export function PartLabel({ part, label }: { part: string; label: string }) {
  return (
    <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <p className="section-label">{part}</p>
      <p className="text-[1rem] font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
    </Reveal>
  );
}

export type Stat = { value: string; caption: string };

/** Four figures under a hairline, with rules between the cells. */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    // Two-up on mobile so the four figures read as one block instead of a
    // four-screen scroll; the dividing rules only appear once they are in a row.
    <Reveal className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-8 lg:grid-cols-4 lg:gap-y-0">
      {stats.map((stat, index) => (
        <div
          key={stat.caption}
          className={cn(
            "px-0 lg:px-8",
            index > 0 && "lg:border-l lg:border-line",
            index === 0 && "lg:pl-0"
          )}
        >
          <p className="text-[clamp(2rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.04em] text-text">
            {stat.value}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-6 text-muted">{stat.caption}</p>
        </div>
      ))}
    </Reveal>
  );
}

export type Hypothesis = { kicker: string; statement: string; body: string };

export function HypothesisCards({ items }: { items: Hypothesis[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal key={item.kicker} delay={index * 0.06} className="editorial-card p-7">
          <p className="text-[1rem] font-bold uppercase tracking-[0.18em] text-muted">
            {item.kicker}
          </p>
          <p className="mt-4 text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-[1.25] tracking-[-0.02em] text-text">
            {item.statement}
          </p>
          <p className="mt-4 text-base leading-[1.75] text-muted">{item.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export type EvidenceRow = {
  label: string;
  finding: string;
  /** Source wordmark. Omitted on the row that is a reading, not a tool. */
  logo?: { src: string; alt: string; width: number; height: number };
  /** The row where the story turns. Steps up and takes an accent rule. */
  turn?: boolean;
};

/**
 * Four sources and the contradiction between them. The last row deliberately
 * breaks the pattern — it is the turn of the argument, not another tool.
 */
export function EvidenceLedger({ rows }: { rows: EvidenceRow[] }) {
  return (
    <div>
      {rows.map((row, index) => (
        <Reveal key={row.label} delay={index * 0.05}>
          <div
            className={cn(
              "flex flex-wrap gap-x-6 gap-y-4 border-b border-line py-7",
              row.turn && "border-l-[3px] border-l-accent bg-panel pl-6"
            )}
          >
            <div className="flex-[1_1_8rem]">
              {row.logo ? (
                <Image
                  src={row.logo.src}
                  alt={row.logo.alt}
                  width={row.logo.width}
                  height={row.logo.height}
                  unoptimized
                  style={{ height: row.logo.height, width: "auto" }}
                />
              ) : null}
              <p
                className={cn(
                  "text-[0.9375rem] leading-6 text-muted",
                  row.logo && "mt-3",
                  row.turn && "font-medium text-text"
                )}
              >
                {row.label}
              </p>
            </div>
            <p
              className={cn(
                "flex-[3_1_15rem] text-[clamp(1rem,1.05vw,1.125rem)] leading-[1.75] text-text",
                row.turn && "text-[clamp(1.0625rem,1.2vw,1.25rem)] leading-[1.6]"
              )}
            >
              {row.finding}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export type DecisionRow = {
  title: string;
  /** Description, with the load-bearing clause split out. */
  body: string;
  /** The clause that carries the data — rendered in ink against muted body copy. */
  emphasis?: string;
};

export function DecisionLedger({ rows }: { rows: DecisionRow[] }) {
  return (
    <div>
      {rows.map((row, index) => (
        <Reveal key={row.title} delay={index * 0.04}>
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line py-7">
            <p className="flex-[0_0_2.5rem] text-sm font-bold tracking-[0.1em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="flex-[1_1_13rem] text-[clamp(1.0625rem,1.2vw,1.25rem)] font-medium leading-[1.35] tracking-[-0.02em] text-text">
              {row.title}
            </p>
            <p className="flex-[2_1_15rem] text-base leading-[1.75] text-muted">
              {row.body}
              {row.emphasis ? <span className="text-text"> {row.emphasis}</span> : null}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export type Explainer = { heading: string; body: string };

/** Three unbordered columns that unpack the panel above them. */
export function ExplainerColumns({ items }: { items: Explainer[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.heading} delay={index * 0.05}>
          <p className="section-label">{item.heading}</p>
          <p className="mt-4 text-base leading-[1.75] text-muted">{item.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Accent-ruled closing statement. */
export function PullStatement({ lead, follow }: { lead: string; follow?: ReactNode }) {
  return (
    <Reveal className="max-w-[52rem] border-l-[3px] border-accent pl-6">
      <p className="text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.55] text-text">{lead}</p>
      {follow ? <p className="mt-4 text-base leading-[1.75] text-muted">{follow}</p> : null}
    </Reveal>
  );
}
