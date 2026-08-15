import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type FunnelStep = {
  label: string;
  value: string;
  /** Bar width, 0–100. Decoration; the percentage carries the meaning. */
  width: number;
  /** The leak. Exactly one step should carry this. */
  highlight?: boolean;
};

/**
 * The funnel end to end. Only the highlighted bar is accent — that contrast is
 * the whole graphic: the accented bar is where the money leaves.
 */
export function FunnelBars({ steps }: { steps: FunnelStep[] }) {
  return (
    <ol role="list" className="grid gap-5">
      {steps.map((step, index) => (
        <Reveal key={step.label} delay={index * 0.05}>
          <li>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xl font-medium tracking-[-0.02em] text-text">{step.label}</p>
              <p className="text-xl font-medium tracking-[-0.02em] text-text">{step.value}</p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div
                className={cn("h-full rounded-full", step.highlight ? "bg-accent" : "bg-barMuted")}
                style={{ width: `${step.width}%` }}
              />
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
