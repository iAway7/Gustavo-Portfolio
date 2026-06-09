"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { testimonials, type TestimonialEntry } from "@/lib/site-data";

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

export function TestimonialsCarousel() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const pageCount = maxIndex + 1;

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  const translate = useMemo(() => {
    return `${(currentIndex * 100) / visibleCount}%`;
  }, [currentIndex, visibleCount]);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(-${translate}, 0, 0)` }}
        >
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={index * 0.04}
              className="editorial-card flex min-h-[34rem] shrink-0 flex-col justify-between p-8 sm:p-10"
              style={{ width: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})` } as CSSProperties}
            >
              <p className="text-[1.8rem] leading-[1.45] tracking-[-0.04em] text-text sm:text-[2rem]">
                {testimonial.quote}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <TestimonialAvatar testimonial={testimonial} />
                <div>
                  <p className="text-[1.1rem] font-medium text-text">{testimonial.name}</p>
                  <p className="text-[1rem] text-muted">{testimonial.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-200",
                  isActive ? "w-8 bg-text" : "w-2.5 bg-black/12 hover:bg-black/22"
                )}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
            disabled={currentIndex === 0}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 hover:border-black/15 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-text transition-colors duration-200 hover:border-black/15 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
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
