"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

import { motionDuration, motionEasing } from "@/lib/motion";

type StaggeredTextProps = {
  as?: ElementType;
  className?: string;
  delay?: number;
  text: string;
};

export function StaggeredText({
  as: Tag = "h1",
  className,
  delay = 0,
  text
}: StaggeredTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        className="stagger-line"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: delay,
              staggerChildren: 0.06
            }
          }
        }}
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="stagger-word"
            variants={{
              hidden: {
                opacity: 0,
                y: "0.8em",
                rotateX: -16,
                filter: "blur(8px)"
              },
              visible: {
                opacity: 1,
                y: "0em",
                rotateX: 0,
                filter: "blur(0px)",
                transition: {
                  duration: motionDuration.base,
                  ease: motionEasing.smooth
                }
              }
            }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
