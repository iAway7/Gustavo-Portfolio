"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { useReducedMotion } from "motion/react";

export type OverviewSlide = {
  src: string;
  alt: string;
  label: string;
};

/**
 * Overview product walkthrough. A refined, editorial gallery of the real
 * AgencyHub surfaces (browse → detail → cart → checkout → payment link), so the
 * Overview immediately reads as a connected system rather than one screen.
 * Counter + screen name + prev/next, keyboard arrows, and touch swipe. No autoplay.
 */
export function AgencyHubOverviewCarousel({ slides }: { slides: OverviewSlide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex((current) => Math.max(0, Math.min(count - 1, next))),
    [count]
  );
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="AgencyHub product walkthrough"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="mx-auto grid w-full max-w-[78rem] gap-5 rounded-[1.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244de8]/30"
    >
      <div
        className="editorial-image paper-tint overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={
            reduceMotion ? "flex" : "flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          }
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${count}: ${slide.label}`}
              aria-hidden={slideIndex !== index}
              className="relative aspect-[16/10] w-full shrink-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1248px) 78rem, 100vw"
                priority={slideIndex === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted">
          <span className="font-medium text-text">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-black/20">/</span>
          <span>{String(count).padStart(2, "0")}</span>
          <span className="mx-3 text-black/20">·</span>
          <span className="text-text">{slides[index].label}</span>
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous screen"
            onClick={goPrev}
            disabled={index === 0}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M14.5 5.5L8 12l6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next screen"
            onClick={goNext}
            disabled={index === count - 1}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M9.5 5.5L16 12l-6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
