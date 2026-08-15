import Image from "next/image";

import { Reveal } from "@/components/reveal";

export type Pin = {
  /** Percentage coordinates over the image, hand-placed per screenshot. */
  x: number;
  y: number;
  note: string;
};

/**
 * A screenshot with numbered pins and a matching legend. The pins are
 * decorative duplicates of the legend numbers, so they are hidden from
 * assistive tech — the legend below carries the same information in order.
 */
export function AnnotatedScreen({
  label,
  src,
  alt,
  width,
  height,
  pins,
  startAt = 1
}: {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  pins: Pin[];
  /** Pin numbering runs continuously across both screens. */
  startAt?: number;
}) {
  return (
    <Reveal>
      <figure>
        <p className="section-label">{label}</p>
        <div className="relative mt-4 overflow-hidden rounded-[1.4rem] border border-line bg-panel">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={90}
            className="h-auto w-full"
            sizes="(min-width: 1408px) 620px, (min-width: 768px) 44vw, 100vw"
          />
          {pins.map((pin, index) => (
            <span
              key={pin.note}
              aria-hidden="true"
              className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-[0.75rem] font-semibold text-canvas"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              {startAt + index}
            </span>
          ))}
        </div>
        <figcaption className="mt-6">
          <ol role="list" className="grid gap-3">
            {pins.map((pin, index) => (
              <li key={pin.note} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="text-[0.9375rem] font-semibold text-accent">
                  {startAt + index}
                </span>
                <span className="text-base leading-[1.6] text-muted">{pin.note}</span>
              </li>
            ))}
          </ol>
        </figcaption>
      </figure>
    </Reveal>
  );
}
