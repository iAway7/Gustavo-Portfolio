export const motionEasing = {
  smooth: [0.22, 1, 0.36, 1] as const,
  soft: [0.16, 1, 0.3, 1] as const,
  spring: {
    type: "spring" as const,
    stiffness: 220,
    damping: 24,
    mass: 0.7
  }
};

export const motionDuration = {
  fast: 0.32,
  base: 0.68,
  slow: 0.96
} as const;
