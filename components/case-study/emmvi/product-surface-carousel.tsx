"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";

import { BrowserFrame } from "@/components/case-study/emmvi/browser-frame";

export type SurfaceSlide = {
  src: string;
  alt: string;
  label: string;
  url: string;
  intent: string;
};

type ProductSurfaceCarouselProps = {
  slides: SurfaceSlide[];
};

/**
 * Large horizontal carousel of the full Emmvi product surface. One browser-
 * framed page at a time occupying most of the content width, each paired with
 * a short statement of design intent. Mirrors the keyboard + counter pattern
 * already used by the hero and testimonials carousels.
 */
export function ProductSurfaceCarousel({ slides }: ProductSurfaceCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const reduceMotion = useReducedMotion();

  const goPrev = useCallback(() => {
    setIndex((current) => (current === 0 ? count - 1 : current - 1));
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((current) => (current === count - 1 ? 0 : current + 1));
  }, [count]);

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

  const active = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Emmvi product surface"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="grid gap-6 rounded-[1.6rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244de8]/30"
    >
      <div className="overflow-hidden">
        <div
          className={
            reduceMotion ? "flex" : "flex transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
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
              className="w-full shrink-0"
            >
              <BrowserFrame
                src={slide.src}
                alt={slide.alt}
                url={slide.url}
                aspect="aspect-[16/10] sm:aspect-[16/9]"
                sizes="(min-width: 1024px) 88vw, 100vw"
                priority={slideIndex === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="max-w-2xl">
          <p className="section-label">
            <span className="text-text">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-black/20">/</span>
            <span>{String(count).padStart(2, "0")}</span>
            <span className="mx-3 text-black/20">·</span>
            <span className="text-text">{active.label}</span>
          </p>
          <p
            key={active.label}
            role="status"
            aria-live="polite"
            className="mt-3 text-base leading-7 text-muted sm:text-lg"
          >
            {active.intent}
          </p>
        </div>

        <div className="flex items-center gap-3 sm:justify-self-end">
          <button
            type="button"
            aria-label="Previous page design"
            onClick={goPrev}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:border-black/20"
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
            aria-label="Next page design"
            onClick={goNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:border-black/20"
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

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Jump to page design">
        {slides.map((slide, dotIndex) => {
          const isActive = dotIndex === index;
          return (
            <button
              key={slide.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={slide.label}
              onClick={() => setIndex(dotIndex)}
              className={
                isActive
                  ? "rounded-full bg-text px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-white transition-colors duration-200"
                  : "rounded-full border border-line bg-white px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:border-black/20 hover:text-text"
              }
            >
              {slide.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
