"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const cursorModes = {
  default: { label: "", scale: 1 },
  link: { label: "Open", scale: 1.55 },
  lift: { label: "View", scale: 1.9 }
} as const;

export function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState<keyof typeof cursorModes>("default");

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      const nextMode = target?.getAttribute("data-cursor");

      setPosition({ x: event.clientX, y: event.clientY });
      setMode(nextMode === "link" || nextMode === "lift" ? nextMode : "default");
    };

    const handleLeave = () => setMode("default");

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="cursor-follower"
      animate={{
        x: position.x,
        y: position.y,
        scale: cursorModes[mode].scale
      }}
      transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.28 }}
    >
      <span>{cursorModes[mode].label}</span>
    </motion.div>
  );
}
