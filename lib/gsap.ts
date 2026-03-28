"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  // Prevent GSAP lag compensation from fighting Lenis smooth scroll
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
