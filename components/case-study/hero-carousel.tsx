"use client";

import Image from "next/image";
import { useCallback, useState, type KeyboardEvent } from "react";

import type { HeroSlide } from "@/lib/site-data";

type CaseStudyHeroCarouselProps = {
  slides: HeroSlide[];
  title: string;
};

/**
 * Hero preview of the full project archive. One board at a time,
 * never cropped (object-contain), with the same counter and arrow
 * interaction style as the testimonials carousel.
 */
export function CaseStudyHeroCarousel({ slides, title }: CaseStudyHeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goPrev = useCallback(() => {
    setIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((current) => Math.min(count - 1, current + 1));
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

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} project boards`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="grid gap-4 rounded-[1.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
    >
      <div className="editorial-image paper-tint relative aspect-[16/11] w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.src}
              aria-hidden={slideIndex !== index}
              className="h-full w-full shrink-0 p-3 sm:p-4"
            >
              <div className="relative h-full w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority={slideIndex === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-muted">
          <span className="font-medium text-text">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-black/20">/</span>
          <span>{String(count).padStart(2, "0")}</span>
          <span className="mx-3 text-black/20">·</span>
          <span>{slides[index].label}</span>
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous board"
            onClick={goPrev}
            disabled={index === 0}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 hover:border-black/15 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
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
            aria-label="Next board"
            onClick={goNext}
            disabled={index === count - 1}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 hover:border-black/15 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
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
