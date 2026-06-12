"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";

import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import { projectIndex } from "@/lib/site-data";

type ProjectCarouselProps = {
  projects: (typeof projectIndex)[number][];
};

function getVisibleCount(width: number) {
  if (width >= 1280) {
    return 3;
  }

  if (width >= 768) {
    return 2;
  }

  return 1;
}

function getPeekFraction(width: number) {
  if (width >= 1280) {
    return 0.28;
  }

  if (width >= 768) {
    return 0.2;
  }

  return 0;
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [peekFraction, setPeekFraction] = useState(0.28);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateMetrics = () => {
      const width = window.innerWidth;

      setVisibleCount(getVisibleCount(width));
      setPeekFraction(getPeekFraction(width));
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);

    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);
  const dotCount = maxIndex + 1;
  const canNavigate = maxIndex > 0;
  const desktopPeek = peekFraction > 0;

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  const translate = useMemo(() => {
    return `${(currentIndex * 100) / visibleCount}%`;
  }, [currentIndex, visibleCount]);

  const cardWidth = useMemo(() => {
    return `${100 / (visibleCount + peekFraction)}%`;
  }, [peekFraction, visibleCount]);

  const activeIndices = useMemo(() => {
    return new Set(
      Array.from({ length: visibleCount }, (_, offset) => currentIndex + offset).filter(
        (index) => index < projects.length
      )
    );
  }, [currentIndex, projects.length, visibleCount]);

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
      aria-label="Projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="space-y-5 overflow-x-clip"
    >
      <div className={desktopPeek ? "overflow-hidden pr-8 xl:pr-10" : "overflow-hidden"}>
        <div
          className={cn("flex ease-out", reduceMotion ? "transition-none" : "transition-transform duration-500")}
          style={{ transform: `translate3d(-${translate}, 0, 0)` }}
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="shrink-0 px-3"
              style={{ width: cardWidth }}
              aria-hidden={!activeIndices.has(index)}
            >
              <div style={{ visibility: activeIndices.has(index) ? "visible" : "hidden" }}>
                <ProjectCard project={project} compact />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: dotCount }).map((_, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setCurrentIndex(index)}
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
            disabled={!canNavigate || currentIndex === 0}
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
            aria-label="Next projects"
            onClick={() => setCurrentIndex((index) => Math.min(maxIndex, index + 1))}
            disabled={!canNavigate || currentIndex === maxIndex}
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
