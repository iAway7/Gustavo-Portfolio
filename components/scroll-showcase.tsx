"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current || !panelRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-scroll-copy]",
        {
          opacity: 0,
          y: 34
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true
          }
        }
      );

      gsap.fromTo(
        panelRef.current,
        {
          opacity: 0,
          y: 54,
          scale: 0.965
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 82%",
            once: true
          }
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className="section-space border-t border-line">
      <div className="shell grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="max-w-2xl">
          <p data-scroll-copy className="caption">
            Scroll-triggered motion
          </p>
          <h2 data-scroll-copy className="section-title mt-4">
            Movement enters when the story is ready for it, not a moment earlier.
          </h2>
          <p data-scroll-copy className="body-copy mt-6">
            GSAP handles the heavier choreography here so pinned storytelling, layered reveals, and
            art-directed moments can live beside the lighter Motion primitives without leaking complexity
            into everyday UI.
          </p>
        </div>

        <div
          ref={panelRef}
          data-cursor="lift"
          className="eyeline relative overflow-hidden rounded-[2rem] p-6 sm:p-8"
        >
          <div className="absolute inset-x-6 top-6 h-44 rounded-[1.6rem] bg-[radial-gradient(circle_at_22%_22%,rgba(242,235,221,0.18),transparent_24%),radial-gradient(circle_at_76%_62%,rgba(193,166,111,0.22),transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]" />
          <div className="relative mt-32 grid gap-4 sm:mt-40">
            {[
              ["Page transitions", "A softened wash keeps route changes feeling cinematic, not abrupt."],
              ["Hover cues", "Surfaces lift slightly to signal intent while text remains perfectly stable."],
              ["Cursor language", "Interactive states gain tactility without turning the page into a novelty."]
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-accent">{title}</p>
                <p className="body-copy mt-3 text-base sm:text-[1.02rem]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
