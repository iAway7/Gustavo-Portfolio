"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

export function SmoothScrollProvider() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
