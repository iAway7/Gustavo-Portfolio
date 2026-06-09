"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, PropsWithChildren } from "react";

import { motionDuration, motionEasing } from "@/lib/motion";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  distance?: number;
  style?: CSSProperties;
}>;

export function Reveal({ children, className, delay = 0, distance = 24, style }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: motionDuration.base, delay, ease: motionEasing.smooth }}
    >
      {children}
    </motion.div>
  );
}
