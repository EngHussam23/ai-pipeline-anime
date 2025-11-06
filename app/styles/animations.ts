/* eslint-disable @typescript-eslint/no-explicit-any */
import { animate, Timeline, stagger } from "animejs";

// Common easing functions
export const easings = {
  smooth: "inOutQuad",
  elastic: "outElastic(1, 0.8)",
  bounce: "outBounce",
  spring: "spring(1, 80, 10, 0)",
};

// Common animation durations
export const durations = {
  fast: 500,
  normal: 1000,
  slow: 1500,
  verySlow: 2000,
};

// Particle animation helper
export const animateParticles = (targets: any, config: any) => {
  return animate(targets, {
    ease: easings.smooth,
    ...config,
  });
};

// Fade animation helper
export const fadeIn = (targets: any, duration: number = durations.normal) => {
  return animate(targets, {
    opacity: [0, 1],
    duration,
    ease: easings.smooth,
  });
};

export const fadeOut = (targets: any, duration: number = durations.normal) => {
  return animate(targets, {
    opacity: [1, 0],
    duration,
    ease: easings.smooth,
  });
};

// Scale animation helper
export const scaleIn = (targets: any, duration: number = durations.normal) => {
  return animate(targets, {
    scale: [0, 1],
    opacity: [0, 1],
    duration,
    ease: easings.elastic,
  });
};

// Glow effect animation
export const pulseGlow = (targets: any, color: string = "#10b981") => {
  return animate(targets, {
    filter: [
      `drop-shadow(0 0 2px ${color})`,
      `drop-shadow(0 0 8px ${color})`,
      `drop-shadow(0 0 2px ${color})`,
    ],
    duration: durations.slow,
    loop: true,
    ease: easings.smooth,
  });
};

// Timeline helper
export const createTimeline = (config?: any) => {
  return new Timeline({
    ease: easings.smooth,
    ...config,
  });
};

export { animate, Timeline, stagger };
