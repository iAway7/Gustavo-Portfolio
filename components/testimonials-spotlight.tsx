"use client";

// Testimonials spotlight: title + arrows over a rule, one large quote left, the people list right.
// The active row's underline is a progress bar; when it fills, the next story shows.

import Image from "next/image";
import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { Reveal } from "@/components/reveal";
import {
  ArrowButton,
  LINKEDIN_URL,
  TestimonialAvatar,
  TestimonialQuote,
} from "@/components/testimonials-carousel";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";
import {
  testimonials as testimonialsEn,
  testimonialsEs,
} from "@/lib/site-data";

const ROTATE_MS = 9000;
const PAGE_SIZE = 5;

export function TestimonialsSpotlight({
  locale,
  title,
  viewAll,
  className,
}: {
  locale: Locale;
  title: string;
  viewAll: string;
  className?: string;
}) {
  const items = locale === "es" ? testimonialsEs : testimonialsEn;
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused || !inView;
  const current = items[active];
  const pageStart = Math.floor(active / PAGE_SIZE) * PAGE_SIZE;
  const page = items.slice(pageStart, pageStart + PAGE_SIZE);
  const go = (next: number) => setActive((next + items.length) % items.length);

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
    >
      <Reveal className="flex items-end justify-between gap-6 border-b border-line pb-10">
        <h2 className="section-title">{title}</h2>
        <div className="flex shrink-0 gap-3">
          <ArrowButton
            direction="prev"
            disabled={false}
            onClick={() => go(active - 1)}
          />
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(active + 1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-text text-white transition-opacity duration-200 hover:opacity-85"
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
      </Reveal>

      <Reveal
        delay={0.06}
        className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-20"
      >
        <div aria-live="polite" className="flex min-h-[26rem] flex-col">
          <span
            aria-hidden="true"
            className="font-serif text-6xl leading-none text-black/20"
          >
            &ldquo;
          </span>
          <div key={current.name} className="mt-6 flex flex-1 flex-col">
            <TestimonialQuote
              name={current.name}
              quote={current.quote}
              locale={locale}
              lines={6}
              className="text-[1.5rem] leading-[1.32] tracking-[-0.03em] sm:text-[1.9rem]"
            />
            <div className="mt-auto flex items-center gap-4 pt-10">
              <TestimonialAvatar testimonial={current} />
              <div>
                <p className="text-[1.1rem] font-medium text-text">
                  {current.name}
                </p>
                <p className="text-[1rem] text-muted">{current.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="self-center">
          <ul role="list" aria-label="Choose testimonial">
            {page.map((t, offset) => {
              const i = pageStart + offset;
              const isActive = i === active;
              return (
                <li key={t.name} className="relative border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center gap-4 py-5 text-left transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-80",
                    )}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-[#f2f2f0]">
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-medium text-text">
                        {t.name}
                      </p>
                      <p className="truncate text-sm text-muted">{t.role}</p>
                    </div>
                  </button>
                  {isActive ? (
                    reduceMotion ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-px bg-text"
                      />
                    ) : (
                      <span
                        key={active}
                        aria-hidden="true"
                        onAnimationEnd={() => go(active + 1)}
                        className="absolute inset-x-0 -bottom-px h-px origin-left bg-text"
                        style={{
                          animation: `testimonial-progress ${ROTATE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )
                  ) : null}
                </li>
              );
            })}
          </ul>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View all testimonials on LinkedIn (opens in a new tab)"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
          >
            {viewAll}
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
