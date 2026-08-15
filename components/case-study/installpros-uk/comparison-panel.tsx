import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type ComparisonSide = {
  /** "Before · mobile" — the side is coded by colour, not by a badge. */
  label: string;
  /** "Fig. 03" */
  figure: string;
  lead: string;
  body: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * The pattern that carries the before/after argument. A bounded panel holding
 * two figures: before in ink, after in accent, applied to the header rule, the
 * label and the caption lead-in. No badges — the colour pair is the coding.
 *
 * Both images must share an aspect ratio or the columns fall out of alignment.
 */
export function ComparisonPanel({
  before,
  after,
  /** Phone screenshots are capped so they don't tower over the panel. */
  portrait = false,
  className
}: {
  before: ComparisonSide;
  after: ComparisonSide;
  portrait?: boolean;
  className?: string;
}) {
  const sides: [ComparisonSide, "before" | "after"][] = [
    [before, "before"],
    [after, "after"]
  ];

  return (
    <div
      className={cn(
        "rounded-[1.6rem] border border-line bg-panel p-6 sm:p-8 lg:p-10",
        className
      )}
    >
      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {sides.map(([side, kind], index) => {
          const isAfter = kind === "after";

          return (
            <Reveal key={side.figure} delay={index * 0.06}>
              <figure>
                <div
                  className={cn(
                    "flex items-baseline justify-between gap-4 border-b pb-3",
                    isAfter ? "border-accent" : "border-text"
                  )}
                >
                  <p
                    className={cn(
                      "text-[1rem] font-bold uppercase tracking-[0.18em]",
                      isAfter ? "text-accent" : "text-text"
                    )}
                  >
                    {side.label}
                  </p>
                  <p className="whitespace-nowrap text-[1rem] font-bold uppercase tracking-[0.18em] text-muted">
                    {side.figure}
                  </p>
                </div>

                <div
                  className={cn(
                    "mt-6 overflow-hidden rounded-[1.4rem] border border-line bg-canvas",
                    portrait && "mx-auto w-full max-w-[17rem]"
                  )}
                >
                  <Image
                    src={side.src}
                    alt={side.alt}
                    width={side.width}
                    height={side.height}
                    quality={90}
                    className="h-auto w-full"
                    sizes={
                      portrait
                        ? "(min-width: 768px) 17rem, 100vw"
                        : "(min-width: 1408px) 620px, (min-width: 768px) 44vw, 100vw"
                    }
                  />
                </div>

                <figcaption className="mt-5">
                  <span
                    className={cn(
                      "block text-[1.0625rem] font-medium leading-6",
                      isAfter ? "text-accent" : "text-text"
                    )}
                  >
                    {side.lead}
                  </span>
                  <span className="mt-2 block text-base leading-[1.75] text-muted">
                    {side.body}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
