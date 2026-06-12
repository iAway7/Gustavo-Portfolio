"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function SmoothScrollProvider() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true
    });
    lenisRef.current = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      window.scrollTo(0, 0);
      return;
    }

    lenisRef.current?.scrollTo(0, {
      immediate: true
    });
    window.scrollTo(0, 0);
  }, [pathname, reduceMotion]);

  return null;
}
