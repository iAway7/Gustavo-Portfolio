import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const HEAD = "text-[1rem] font-bold uppercase tracking-[0.18em] text-text";

export type ContinuationRow = {
  step: string;
  reached: string;
  percent: string;
  /** Bar width, 0–100. */
  width: number;
  /** The step that loses half the people. */
  highlight?: boolean;
};

/** Continuation per form step, with the rate drawn inline beside the figure. */
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
      <div className="overflow-x-auto">
        <table className="w-full min-w-[26rem] border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={cn(HEAD, "py-3 pr-4")}>
                {columns[0]}
              </th>
              <th scope="col" className={cn(HEAD, "py-3 pr-4")}>
                {columns[1]}
              </th>
              <th scope="col" className={cn(HEAD, "py-3")}>
                {columns[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.step} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="py-5 pr-4 align-middle text-[1.0625rem] font-medium text-text"
                >
                  {row.step}
                </th>
                <td className="py-5 pr-4 align-middle text-[0.9375rem] text-muted">
                  {row.reached}
                </td>
                <td className="py-5 align-middle">
                  <div className="flex items-center gap-4">
                    <span
                      className="h-3 flex-1 overflow-hidden rounded-full bg-line"
                      aria-hidden="true"
                    >
                      <span
                        className={cn(
                          "block h-full rounded-full",
                          row.highlight ? "bg-accent" : "bg-barMuted"
                        )}
                        style={{ width: `${row.width}%` }}
                      />
                    </span>
                    <span className="min-w-[3rem] text-right text-lg font-medium text-text">
                      {row.percent}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

/** Core Web Vitals, both stacks side by side. Lower is better throughout. */
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
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={cn(HEAD, "py-4 pr-6")}>
                {columns[0]}
              </th>
              <th scope="col" className={cn(HEAD, "px-6 py-4 text-center")}>
                {columns[1]}
              </th>
              <th scope="col" className={cn(HEAD, "px-6 py-4 text-center")}>
                {columns[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.metric} className="border-b border-line last:border-b-0">
                <th scope="row" className="py-5 pr-6 align-middle font-normal">
                  <span className="block text-[1.0625rem] font-medium leading-6 text-text">
                    {row.metric}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-6 text-muted">
                    {row.gloss}
                  </span>
                </th>
                <td className="px-6 py-5 text-center align-middle text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium tracking-[-0.03em] text-text">
                  {row.before}
                </td>
                <td className="px-6 py-5 text-center align-middle text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium tracking-[-0.03em] text-accent">
                  {row.after}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export type LighthouseScore = { label: string; before: string; after: string };

/** Four Lighthouse categories, before → after. The green is PageSpeed's own. */
export function LighthouseRow({ scores }: { scores: LighthouseScore[] }) {
  return (
    <Reveal className="grid gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {scores.map((score, index) => (
        <div
          key={score.label}
          className={cn(
            "flex h-full flex-col lg:px-8",
            index > 0 && "lg:border-l lg:border-line",
            index === 0 && "lg:pl-0"
          )}
        >
          <p className="text-[1rem] font-bold uppercase tracking-[0.18em] text-muted">
            {score.label}
          </p>
          <p className="mt-auto flex items-baseline gap-2 pt-6">
            <span className="text-[clamp(1.25rem,1.6vw,1.5rem)] font-medium text-muted">
              {score.before}
            </span>
            <span aria-hidden="true" className="text-muted">
              →
            </span>
            <span className="text-[clamp(2rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.04em] text-pass">
              {score.after}
            </span>
          </p>
        </div>
      ))}
    </Reveal>
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
