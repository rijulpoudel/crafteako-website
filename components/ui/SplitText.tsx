"use client";

import { motion, type Transition } from "framer-motion";

interface SplitTextProps {
  text: string;
  /** Delay before the first word starts (seconds) */
  delay?: number;
  /** Stagger between each word (seconds) */
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Trigger once when it enters the viewport (default true) */
  once?: boolean;
  /** Animate on mount instead of on scroll */
  animateOnMount?: boolean;
}

/**
 * Splits text into individual word spans and reveals them with a staggered
 * upward slide — like text being typeset in real time.
 */
export default function SplitText({
  text,
  delay = 0,
  stagger = 0.07,
  className,
  style,
  once = true,
  animateOnMount = false,
}: SplitTextProps) {
  const words = text.split(" ");

  const wordVariant = (i: number) => ({
    hidden: { y: "108%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: delay + i * stagger,
      } satisfies Transition,
    },
  });

  const viewportProps = animateOnMount
    ? {}
    : { viewport: { once, margin: "-40px" as const } };

  return (
    <span className={className} style={{ ...style, display: "inline" }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={wordVariant(i)}
            initial="hidden"
            {...(animateOnMount
              ? { animate: "visible" }
              : { whileInView: "visible", ...viewportProps })}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}
