"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";
import { testimonials as testimonialsEn, testimonialsEs, type TestimonialEntry } from "@/lib/site-data";

const GAP = 24;
export const LINKEDIN_URL = "https://www.linkedin.com/in/gustavo-polin/details/recommendations/";
const QUOTE_CLAMP_LINES = 7;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialAvatar({ testimonial }: { testimonial: TestimonialEntry }) {
  if (testimonial.image) {
    return (
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line">
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
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line bg-[#f2f2f0] text-lg font-medium text-text">
      {getInitials(testimonial.name)}
    </div>
  );
}

export function TestimonialQuote({
  name,
  quote,
  locale,
  className = "text-[1.5rem] leading-[1.42] tracking-[-0.02em]",
  lines = QUOTE_CLAMP_LINES
}: {
  name: string;
  quote: string;
  locale: Locale;
  className?: string;
  lines?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const moreLabel = locale === "es" ? "Leer más" : "Read more";
  const lessLabel = locale === "es" ? "Leer menos" : "Read less";
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
  }, [quote, lines]);

  const clampStyle: CSSProperties | undefined = expanded
    ? undefined
    : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        overflow: "hidden"
      };

  return (
    <div>
      <p
        id={quoteId}
        ref={quoteRef}
        style={clampStyle}
        className={cn(className, "text-text")}
      >
        {quote}
      </p>

      {(isClamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={quoteId}
          aria-label={
            locale === "es"
              ? expanded
                ? `Leer menos del testimonio de ${name}`
                : `Leer más del testimonio de ${name}`
              : expanded
                ? `Read less of ${name}'s testimonial`
                : `Read more of ${name}'s testimonial`
          }
          className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-muted underline underline-offset-4 transition-colors duration-200 hover:text-text"
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </div>
  );
}

export function ArrowButton({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous testimonials" : "Next testimonials"}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:border-black/15 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d={direction === "prev" ? "M14.5 5.5L8 12l6.5 6.5" : "M9.5 5.5L16 12l-6.5 6.5"}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </button>
  );
}

/* Centered title + intro, LinkedIn link over every reviewer's face, then a three-up carousel.
   With three cards in view the middle one is highlighted. */
export function TestimonialsCarousel({
  locale,
  title,
  intro,
  viewAll
}: {
  locale: Locale;
  title: string;
  intro: string;
  viewAll: string;
}) {
  const items = locale === "es" ? testimonialsEs : testimonialsEn;
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w >= 1280 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, items.length - visible);
  useEffect(() => setIndex((i) => Math.min(i, maxIndex)), [maxIndex]);

  const translate = `calc(-${(index * 100) / visible}% - ${(index * GAP) / visible}px)`;
  const shown = useMemo(() => new Set(Array.from({ length: visible }, (_, o) => index + o)), [index, visible]);
  // With three cards in view, the middle one carries the highlight, as in the reference.
  const highlighted = visible === 3 ? index + 1 : -1;
  const compact = visible === 3;

  return (
    <div className="pt-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">{title}</h2>
        <p className="body-copy mx-auto mt-6 max-w-2xl">{intro}</p>
      </Reveal>

      <Reveal delay={0.06} className="mt-10 flex flex-col items-center">
        <span aria-hidden="true" className="block h-10 w-px bg-line" />
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="View all testimonials on LinkedIn (opens in a new tab)"
          className="mt-10 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
        >
          {viewAll}
          <span aria-hidden="true">-&gt;</span>
        </a>
        <ul role="list" aria-hidden="true" className="mt-4 flex -space-x-3">
          {items.map((t) => (
            <li key={t.name} className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-[#f2f2f0]">
              {t.image ? <Image src={t.image} alt="" fill sizes="48px" className="object-cover" /> : null}
            </li>
          ))}
        </ul>
      </Reveal>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        className="mt-14 overflow-x-clip"
      >
        <div className="-mx-px overflow-hidden px-px py-1">
          <div
            className={cn("flex items-stretch ease-out", reduceMotion ? "transition-none" : "transition-transform duration-500")}
            style={{ gap: `${GAP}px`, transform: `translate3d(${translate}, 0, 0)` }}
          >
            {items.map((t, i) => (
              <article
                key={t.name}
                aria-hidden={!shown.has(i)}
                style={
                  {
                    width: `calc((100% - ${(visible - 1) * GAP}px) / ${visible})`,
                    visibility: shown.has(i) ? "visible" : "hidden"
                  } as CSSProperties
                }
                className={cn(
                  "editorial-card flex shrink-0 flex-col p-8 transition-colors duration-300 sm:p-10",
                  i === highlighted && "border-accent"
                )}
              >
                <TestimonialQuote
                  name={t.name}
                  quote={t.quote}
                  locale={locale}
                  className={
                    compact
                      ? "text-[1.2rem] leading-[1.5] tracking-[-0.015em]"
                      : "text-[1.5rem] leading-[1.42] tracking-[-0.02em]"
                  }
                />
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-4 border-t border-line pt-8">
                    <TestimonialAvatar testimonial={t} />
                    <div>
                      <p className="text-[1.1rem] font-medium text-text">{t.name}</p>
                      <p className="text-[1rem] text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <ArrowButton direction="prev" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))} />
          <ArrowButton direction="next" disabled={index === maxIndex} onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))} />
        </div>
      </div>
    </div>
  );
}
