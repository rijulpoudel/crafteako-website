"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCursorContext } from "@/lib/cursorContext";
import type { CursorState } from "@/lib/cursorContext";
import logoSrc from "@/public/logo-dark.svg";
import logoLightSrc from "@/public/logo-light.svg";

const TRAIL_COUNT = 10;

// Lerp factors increase with index so each dot lags more than the one before
const LERP_FACTORS = Array.from(
  { length: TRAIL_COUNT },
  (_, i) => 0.25 + i * 0.04,
);

// Dot sizes decrease with index: 10px tapering to ~3.7px
const DOT_SIZES = Array.from({ length: TRAIL_COUNT }, (_, i) => 10 - i * 0.7);

// Opacity decreases with index: ribbon dissolves into nothing
const DOT_OPACITIES = Array.from(
  { length: TRAIL_COUNT },
  (_, i) => 1 - i * 0.09,
);

const LABEL_MAP: Record<CursorState, string> = {
  default: "",
  view: "View ↗",
  book: "Book",
  visit: "Visit",
  drag: "Drag ←→",
  play: "▶",
};

const isPlay = (s: CursorState) => s === "play";

export default function CustomCursor() {
  const { state } = useCursorContext();
  const [isOverDark, setIsOverDark] = useState(false);

  // Refs for all 10 trail dots
  const trailRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: TRAIL_COUNT }, () => null),
  );

  // Leader ref used for context-aware states
  const leaderRef = useRef<HTMLDivElement | null>(null);

  const isOverDarkRef = useRef(false);

  useEffect(() => {
    let targetX = -100;
    let targetY = -100;
    const currentPositions = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }));
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Ensure first interaction snaps immediately if cursor wasn't active
      if (currentPositions[0].x === -100) {
        currentPositions.forEach(p => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }

      // Context-aware dark theme detection for logo color flip
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const dark = el?.closest('[data-theme="dark"]') !== null;
      if (dark !== isOverDarkRef.current) {
        isOverDarkRef.current = dark;
        setIsOverDark(dark);
      }
    };

    const animate = () => {
      // Lerp leader (dot 0) using higher physics sensitivity
      currentPositions[0].x += (targetX - currentPositions[0].x) * 0.25;
      currentPositions[0].y += (targetY - currentPositions[0].y) * 0.25;

      if (leaderRef.current) {
        leaderRef.current.style.transform = `translate(${currentPositions[0].x}px, ${currentPositions[0].y}px) translate(-50%, -50%)`;
      }

      // Lerp trails
      for (let i = 1; i < TRAIL_COUNT; i++) {
        const prev = currentPositions[i - 1];
        const curr = currentPositions[i];
        const lf = LERP_FACTORS[i];

        curr.x += (prev.x - curr.x) * lf;
        curr.y += (prev.y - curr.y) * lf;

        const dotRef = trailRefs.current[i];
        if (dotRef) {
          dotRef.style.transform = `translate(${curr.x}px, ${curr.y}px) translate(-50%, -50%)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* ── LAYER 1: ribbon dots 1–9 (behind leader) ── */}
      {Array.from({ length: TRAIL_COUNT - 1 }, (_, i) => {
        const idx = i + 1;
        const size = DOT_SIZES[idx];
        return (
          <div
            key={idx}
            ref={(el) => {
              trailRefs.current[idx] = el;
            }}
            className="cursor-trail-dot custom-cursor"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#232323",
              opacity: DOT_OPACITIES[idx],
              pointerEvents: "none",
              zIndex: 9997,
              transform: "translate(-100px, -100px) translate(-50%, -50%)", // Hide initially off-screen
              willChange: "transform",
            }}
          />
        );
      })}

      {/* ── LAYER 0: Leader dot (dot 0) — Context-aware ── */}
      <div
        ref={(el) => {
          trailRefs.current[0] = el;
          leaderRef.current = el;
        }}
        className="custom-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          width: "26px",
          height: "26px",
          transform: "translate(-100px, -100px) translate(-50%, -50%)", // Hide initially off-screen
          willChange: "transform",
        }}
      >
        <AnimatePresence mode="wait">
          {state === "default" ? (
            <motion.div
              key="cursor-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ width: "26px", height: "26px" }}
            >
              <Image
                src={isOverDark ? logoLightSrc : logoSrc}
                alt="Crafteako cursor"
                width={26}
                height={26}
                style={{
                  width: "26px",
                  height: "26px",
                  objectFit: "contain",
                  transition: "opacity 0.3s ease",
                  filter: isOverDark
                    ? "brightness(0) saturate(100%) invert(1)"
                    : "brightness(0) saturate(100%)",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="cursor-pill"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: isPlay(state) ? 60 : "auto",
                height: isPlay(state) ? 60 : 28,
                backgroundColor: "#232323",
                borderRadius: isPlay(state) ? "50%" : "999px",
                padding: isPlay(state) ? "0px" : "6px 16px",
              }}
            >
              <motion.span
                key={state}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: isPlay(state) ? "normal" : "italic",
                  fontSize: isPlay(state) ? "1.2rem" : "0.7rem",
                  color: "#FFFFFF",
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                {LABEL_MAP[state]}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
