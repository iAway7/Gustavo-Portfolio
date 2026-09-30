import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const HEAD = "text-[1rem] font-bold uppercase tracking-[0.18em] text-text";

export type ContinuationRow = {
  step: string;
  reached: string;
  percent: string;
  /** Bar width, 0 to 100. */
  width: number;
  /** The step that loses half the people. */
  highlight?: boolean;
};

/** Continuation per form step: one bar per step, the leaking step in accent. */
export function ContinuationTable({
  caption,
  columns,
  rows
}: {
  caption: string;
  columns: [string, string, string];
  rows: ContinuationRow[];
}) {
  return (
    <Reveal>
      <ol role="list" aria-label={caption} className="grid gap-6">
        {rows.map((row) => (
          <li key={row.step} className="border-b border-line pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[1.0625rem] font-medium text-text">{row.step}</p>
              <p className="text-[0.9375rem] text-muted">
                {columns[1]}: {row.reached}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <span
                  className={cn("block h-full rounded-full", row.highlight ? "bg-accent" : "bg-barMuted")}
                  style={{ width: `${row.width}%` }}
                />
              </span>
              <span
                className={cn(
                  "min-w-[3.5rem] text-right text-xl font-medium tracking-[-0.02em]",
                  row.highlight ? "text-accent" : "text-text"
                )}
              >
                <span className="sr-only">{columns[2]}: </span>
                {row.percent}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export type VitalRow = {
  metric: string;
  /** Plain-language gloss: what the visitor actually waits for. */
  gloss: string;
  before: string;
  after: string;
};

const num = (value: string) => parseFloat(value.replace(",", ".")) || 0;

/**
 * Core Web Vitals as paired bars. Each metric is scaled to its own "before",
 * so the after bar reads as the share of the wait that is left. Lower is better.
 */
export function CoreWebVitalsTable({
  caption,
  columns,
  rows
}: {
  caption: string;
  columns: [string, string, string];
  rows: VitalRow[];
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-4" aria-hidden="true">
        <span className="flex items-center gap-2 text-[0.9375rem] text-muted">
          <span className="h-2.5 w-6 rounded-full bg-barMuted" />
          {columns[1]}
        </span>
        <span className="flex items-center gap-2 text-[0.9375rem] text-muted">
          <span className="h-2.5 w-6 rounded-full bg-accent" />
          {columns[2]}
        </span>
      </div>
      <ul role="list" aria-label={caption} className="divide-y divide-line">
        {rows.map((row) => {
          const before = num(row.before);
          const share = before > 0 ? Math.min(100, (num(row.after) / before) * 100) : 0;
          return (
            <li key={row.metric} className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10">
              <div>
                <p className="text-[1.0625rem] font-medium leading-6 text-text">{row.metric}</p>
                <p className="mt-1 text-[0.9375rem] leading-6 text-muted">{row.gloss}</p>
              </div>
              <div className="grid content-center gap-3">
                <div className="flex items-center gap-4">
                  <span className="h-3 flex-1" aria-hidden="true">
                    <span className="block h-full w-full rounded-full bg-barMuted" />
                  </span>
                  <span className="min-w-[4.5rem] text-right text-lg font-medium tracking-[-0.02em] text-text">
                    <span className="sr-only">{columns[1]}: </span>
                    {row.before}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="h-3 flex-1" aria-hidden="true">
                    <span
                      className="block h-full min-w-[0.75rem] rounded-full bg-accent"
                      style={{ width: `${share}%` }}
                    />
                  </span>
                  <span className="min-w-[4.5rem] text-right text-lg font-medium tracking-[-0.02em] text-accent">
                    <span className="sr-only">{columns[2]}: </span>
                    {row.after}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}

export type LighthouseScore = { label: string; before: string; after: string };

/**
 * Four Lighthouse categories as concentric rings, the way PageSpeed shows a
 * score: outer ring is the new landing (PageSpeed's own green), inner ring is
 * the old page. The figures stay underneath.
 */
export function LighthouseRow({ scores }: { scores: LighthouseScore[] }) {
  const ring = (r: number, value: string, cls: string, width: number) => {
    const c = 2 * Math.PI * r;
    const pct = Math.min(100, Math.max(0, num(value)));
    return (
      <>
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth={width} className="stroke-line" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
          className={cls}
        />
      </>
    );
  };
  return (
    <Reveal className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-8 lg:grid-cols-4">
      {scores.map((score) => (
        <div key={score.label} className="flex flex-col items-center text-center">
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-muted sm:text-[1rem] sm:tracking-[0.18em]">
            {score.label}
          </p>
          <div className="relative mt-5 h-28 w-28 sm:h-32 sm:w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
              {ring(44, score.after, "stroke-pass", 7)}
              {ring(32, score.before, "stroke-barMuted", 5)}
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[1.625rem] font-medium tracking-[-0.04em] text-pass">
              {score.after}
            </span>
          </div>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-lg font-medium text-muted">{score.before}</span>
            <span aria-hidden="true" className="text-muted">
              →
            </span>
            <span className="text-lg font-medium text-pass">{score.after}</span>
          </p>
        </div>
      ))}
    </Reveal>
  );
}

export type ResultRow = {
  metric: string;
  /** How the metric is defined, so the figure can't be read loosely. */
  gloss: string;
  baseline: string;
  target: string;
  actual: string;
};

/**
 * Baseline, target and what actually happened. No status column: every row
 * cleared its target, and four identical badges would be noise: the actual
 * figure carries it.
 */
export function ResultsTable({
  caption,
  columns,
  rows
}: {
  caption: string;
  columns: [string, string, string, string];
  rows: ResultRow[];
}) {
  return (
    <Reveal>
      {/* One card per metric: baseline vs actual as two donuts, target below. */}
      <ul role="list" aria-label={caption} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => (
          <li key={row.metric} className="flex flex-col rounded-2xl border border-line px-5 py-6 sm:px-6">
            <p className="text-[1.0625rem] font-medium leading-6 text-text">{row.metric}</p>
            <p className="mt-1 text-[0.9375rem] leading-6 text-muted">{row.gloss}</p>
            <div className="mt-auto grid grid-cols-2 gap-4 pt-6">
              <Donut label={columns[1]} value={row.baseline} tone="before" />
              <Donut label={columns[3]} value={row.actual} tone="after" />
            </div>
            <p className="mt-4 text-center text-[0.9375rem] leading-6 text-muted">
              {columns[2]}: {row.target}
            </p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** A rate as a ring: the filled share is the percentage itself. */
function Donut({ label, value, tone }: { label: string; value: string; tone: "before" | "after" }) {
  const pct = Math.min(100, Math.max(0, parseFloat(value.replace(",", ".")) || 0));
  const r = 42;
  const c = 2 * Math.PI * r;
  const isAfter = tone === "after";
  return (
    <figure className="flex flex-col items-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className="stroke-line" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * c} ${c}`}
            className={isAfter ? "stroke-accent" : "stroke-barMuted"}
          />
        </svg>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center font-medium tracking-[-0.03em]",
            isAfter ? "text-[1.375rem] text-accent" : "text-[1.125rem] text-muted"
          )}
        >
          {value}
        </span>
      </div>
      <figcaption className="mt-3 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

export type MetricRow = { metric: string; now: string; lever: string };

/** Baseline per metric and the change expected to move it. */
export function MetricsTable({
  caption,
  columns,
  rows
}: {
  caption: string;
  columns: [string, string, string];
  rows: MetricRow[];
}) {
  return (
    <Reveal>
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              {columns.map((column) => (
                <th key={column} scope="col" className={cn(HEAD, "px-6 py-4 align-bottom")}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.metric} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="px-6 py-5 align-top text-[1.0625rem] font-medium leading-6 text-text"
                >
                  {row.metric}
                </th>
                <td className="px-6 py-5 align-top text-base leading-6 text-text">{row.now}</td>
                <td className="px-6 py-5 align-top text-base leading-6 text-muted">{row.lever}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
