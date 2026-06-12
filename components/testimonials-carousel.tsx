"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { testimonials, type TestimonialEntry } from "@/lib/site-data";

const CAROUSEL_GAP = 24;
const QUOTE_CLAMP_LINES = 7;

function getVisibleCount(width: number) {
  if (width >= 1280) {
    return 2;
  }

  return 1;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function TestimonialAvatar({ testimonial }: { testimonial: TestimonialEntry }) {
  if (testimonial.image) {
    return (
      <div className="relative h-16 w-16 overflow-hidden rounded-full border border-line">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-[#f2f2f0] text-lg font-medium text-text">
      {getInitials(testimonial.name)}
    </div>
  );
}

function TestimonialQuote({ name, quote }: { name: string; quote: string }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const quoteId = useId();

  useEffect(() => {
    const element = quoteRef.current;
    if (!element) {
      return;
    }

    const checkClamp = () => {
      setIsClamped(element.scrollHeight > element.clientHeight + 1);
    };

    checkClamp();

    const observer = new ResizeObserver(checkClamp);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const clampStyle: CSSProperties | undefined = expanded
    ? undefined
    : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: QUOTE_CLAMP_LINES,
        overflow: "hidden"
      };

  return (
    <div>
      <p
        id={quoteId}
        ref={quoteRef}
        style={clampStyle}
        className="text-[1.45rem] leading-[1.42] tracking-[-0.04em] text-text sm:text-[1.7rem]"
      >
        {quote}
      </p>

      {(isClamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={quoteId}
          aria-label={expanded ? `Read less of ${name}'s testimonial` : `Read more of ${name}'s testimonial`}
          className="mt-4 text-sm font-medium text-muted underline underline-offset-4 transition-colors duration-200 hover:text-text"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export function TestimonialsCarousel() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  const translate = useMemo(() => {
    // Each step moves one card width plus its share of the gap:
    // step = 100% / visibleCount + gap / visibleCount
    const percent = (currentIndex * 100) / visibleCount;
    const gapOffset = (currentIndex * CAROUSEL_GAP) / visibleCount;

    return `calc(-${percent}% - ${gapOffset}px)`;
  }, [currentIndex, visibleCount]);

  const activeIndices = useMemo(() => {
    return new Set(
      Array.from({ length: visibleCount }, (_, offset) => currentIndex + offset).filter(
        (index) => index < testimonials.length
      )
    );
  }, [currentIndex, visibleCount]);

  const currentLabel = testimonials[currentIndex]
    ? `${currentIndex + 1} of ${testimonials.length}: ${testimonials[currentIndex].name}`
    : `0 of ${testimonials.length}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setCurrentIndex((index) => Math.max(0, index - 1));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setCurrentIndex((index) => Math.min(maxIndex, index + 1));
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="space-y-8 overflow-x-clip"
    >
      <div className="-mx-px overflow-hidden px-px">
        <div
          className={cn("flex items-start ease-out", reduceMotion ? "transition-none" : "transition-transform duration-500")}
          style={{ gap: `${CAROUSEL_GAP}px`, transform: `translate3d(${translate}, 0, 0)` }}
        >
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={index * 0.04}
              className="editorial-card flex min-h-[27rem] shrink-0 flex-col p-8 sm:min-h-[30rem] sm:p-10"
              style={{ width: `calc((100% - ${(visibleCount - 1) * CAROUSEL_GAP}px) / ${visibleCount})` } as CSSProperties}
            >
              <article
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}: ${testimonial.name}`}
                aria-hidden={!activeIndices.has(index)}
                style={{ visibility: activeIndices.has(index) ? "visible" : "hidden" }}
                className="flex h-full flex-col"
              >
                <TestimonialQuote name={testimonial.name} quote={testimonial.quote} />

                <div className="mt-auto flex items-center gap-4 pt-10">
                  <TestimonialAvatar testimonial={testimonial} />
                  <div>
                    <p className="text-[1.1rem] font-medium text-text">{testimonial.name}</p>
                    <p className="text-[1rem] text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted">
            <span className="font-medium text-text">
              {String(Math.min(currentIndex + 1, testimonials.length)).padStart(2, "0")}
            </span>
            <span className="mx-2 text-black/20">/</span>
            <span>{String(testimonials.length).padStart(2, "0")}</span>
            <span className="sr-only">{currentLabel}</span>
          </p>

          <div className="flex items-center gap-2" aria-label="Choose testimonial">
            {testimonials.map((testimonial, index) => {
              const isActive = activeIndices.has(index);

              return (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}: ${testimonial.name}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setCurrentIndex(Math.min(index, maxIndex))}
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                    isActive ? "bg-black/[0.06]" : "hover:bg-black/[0.04]"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block h-2.5 rounded-full transition-all duration-200",
                      isActive ? "w-8 bg-text" : "w-2.5 bg-black/12"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
            disabled={currentIndex === 0}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:border-black/15 active:bg-white disabled:cursor-not-allowed disabled:opacity-40"
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
            aria-label="Next testimonials"
            onClick={() => setCurrentIndex((index) => Math.min(maxIndex, index + 1))}
            disabled={currentIndex === maxIndex}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:border-black/15 active:bg-white disabled:cursor-not-allowed disabled:opacity-40"
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
