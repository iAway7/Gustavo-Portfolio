"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";

import { MagneticLink } from "@/components/magnetic-link";
import { motionEasing } from "@/lib/motion";

export function HomeHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const glowLeftRef = useRef<HTMLDivElement | null>(null);
  const glowRightRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!heroRef.current) {
      return;
    }

    const hero = heroRef.current;

    if (reduceMotion) {
      hero.style.setProperty("--pointer-x", "50%");
      hero.style.setProperty("--pointer-y", "50%");
      return;
    }

    const context = gsap.context((self) => {
      const lines = self.selector?.("[data-hero-line]") ?? [];
      const name = self.selector?.("[data-hero-name]") ?? [];
      const body = self.selector?.("[data-hero-copy]") ?? [];
      const actions = self.selector?.("[data-hero-actions]") ?? [];
      const scrollCue = self.selector?.("[data-scroll-cue]") ?? [];

      gsap.set(lines, { yPercent: 112, opacity: 0 });
      gsap.set(name, { y: 26, opacity: 0, letterSpacing: "0.48em" });
      gsap.set(body, { y: 26, opacity: 0 });
      gsap.set(actions, { y: 30, opacity: 0 });
      gsap.set(scrollCue, { y: 18, opacity: 0 });
      gsap.set(backdropRef.current, { scale: 1.06, opacity: 0 });
      gsap.set([glowLeftRef.current, glowRightRef.current], { scale: 0.92, opacity: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          name,
          { y: 26, opacity: 0, letterSpacing: "0.48em" },
          { y: 0, opacity: 1, letterSpacing: "0.28em", duration: 1 },
          0.1
        )
        .to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.18,
            stagger: 0.06
          },
          "-=0.5"
        )
        .to(
          body,
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.08
          },
          "-=0.82"
        )
        .to(
          actions,
          {
            y: 0,
            opacity: 1,
            duration: 0.9
          },
          "-=0.76"
        )
        .to(
          scrollCue,
          {
            y: 0,
            opacity: 1,
            duration: 0.8
          },
          "-=0.64"
        )
        .to(
          backdropRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1.8
          },
          0
        )
        .to(
          [glowLeftRef.current, glowRightRef.current],
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            stagger: 0.14
          },
          0.08
        );

      const xTo = gsap.quickTo(hero, "--pointer-x", {
        duration: 0.75,
        ease: "power3.out",
        unit: "%"
      });
      const yTo = gsap.quickTo(hero, "--pointer-y", {
        duration: 0.75,
        ease: "power3.out",
        unit: "%"
      });
      const rotateXTo = gsap.quickTo(hero, "rotateX", {
        duration: 0.85,
        ease: "power3.out"
      });
      const rotateYTo = gsap.quickTo(hero, "rotateY", {
        duration: 0.85,
        ease: "power3.out"
      });
      const glowXTo = gsap.quickTo(glowRightRef.current, "x", {
        duration: 1.1,
        ease: "power3.out"
      });
      const glowYTo = gsap.quickTo(glowLeftRef.current, "y", {
        duration: 1.1,
        ease: "power3.out"
      });

      const handlePointerMove = (event: PointerEvent) => {
        const xPercent = (event.clientX / window.innerWidth) * 100;
        const yPercent = (event.clientY / window.innerHeight) * 100;

        xTo(xPercent);
        yTo(yPercent);
        rotateXTo(((yPercent - 50) / 50) * -2.4);
        rotateYTo(((xPercent - 50) / 50) * 2.8);
        glowXTo((xPercent - 50) * 0.8);
        glowYTo((yPercent - 50) * -0.7);
      };

      window.addEventListener("pointermove", handlePointerMove);

      gsap.to("[data-scroll-dot]", {
        y: 15,
        opacity: 0.18,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-drift]", {
        yPercent: -3,
        xPercent: 2,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6
      });

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }, heroRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      id="home"
      className="hero-panel relative flex min-h-screen items-center overflow-hidden px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8"
      ref={heroRef}
    >
      <div ref={backdropRef} className="hero-backdrop" aria-hidden="true">
        <div className="hero-grid" />
        <div ref={glowLeftRef} data-drift className="hero-glow hero-glow--left" />
        <div ref={glowRightRef} data-drift className="hero-glow hero-glow--right" />
        <div className="hero-glow hero-glow--halo" />
        <div className="hero-lines">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="shell">
        <div className="relative z-10 grid gap-12 pb-20 sm:pb-24">
          <div className="max-w-6xl">
            <p data-hero-name className="hero-name">
              Rishabh Sharma
            </p>

            <h1 className="hero-display max-w-[13ch]">
              <span className="hero-line-clip">
                <span data-hero-line className="hero-line-text">
                  Designing digital experiences
                </span>
              </span>
              <span className="hero-line-clip">
                <span data-hero-line className="hero-line-text">
                  that people actually enjoy using.
                </span>
              </span>
            </h1>
            <p data-hero-copy className="hero-subcopy mt-8 max-w-2xl">
              Senior UX/UI Designer focused on product strategy, interaction design and scalable
              design systems.
            </p>

            <div data-hero-copy className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
              <span>Product Strategy</span>
              <span>Interaction Design</span>
              <span>Design Systems</span>
            </div>

            <div data-hero-actions className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticLink
                href="/case-studies"
                className="rounded-full bg-text px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-canvas shadow-float"
              >
                View Case Studies
              </MagneticLink>
            </div>
          </div>

          <motion.button
            type="button"
            data-scroll-cue
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.68, ease: motionEasing.smooth }}
            className="hero-scroll"
            onClick={() =>
              document.getElementById("selected-work")?.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
              })
            }
          >
            <span className="hero-scroll__label">Scroll</span>
            <span className="hero-scroll__track">
              <span data-scroll-dot className="hero-scroll__dot" />
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
