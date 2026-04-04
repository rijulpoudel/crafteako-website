"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const COUNTS = [5, 4, 3, 2, 1];
const COUNT_DURATION = 260; // ms each number is shown

export default function Preloader() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("crafteako_preloader_seen");
  });

  const [phase, setPhase] = useState<"counting" | "logo">("counting");
  const [countIndex, setCountIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;

    // Tick through 5→4→3→2→1
    if (phase === "counting" && countIndex < COUNTS.length - 1) {
      const t = setTimeout(() => setCountIndex((i) => i + 1), COUNT_DURATION);
      return () => clearTimeout(t);
    }

    // After last number, switch to logo phase
    if (phase === "counting" && countIndex === COUNTS.length - 1) {
      const t = setTimeout(() => setPhase("logo"), COUNT_DURATION + 80);
      return () => clearTimeout(t);
    }

    // Hold logo for 700ms then dismiss
    if (phase === "logo") {
      const t = setTimeout(() => setVisible(false), 700);
      return () => clearTimeout(t);
    }
  }, [visible, phase, countIndex]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        sessionStorage.setItem("crafteako_preloader_seen", "1");
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#F5F2ED",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
            overflow: "hidden",
          }}
        >
          {/* Film countdown numbers */}
          <AnimatePresence mode="wait">
            {phase === "counting" && (
              <motion.div
                key={`count-${countIndex}`}
                initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0.6 }}
                animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
                exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  fontSize: "clamp(5rem, 12vw, 10rem)",
                  color: "#232323",
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  userSelect: "none",
                  minWidth: "1ch",
                  textAlign: "center",
                }}
              >
                {COUNTS[countIndex]}
              </motion.div>
            )}

            {/* Logo phase */}
            {phase === "logo" && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Image
                  src="/logo-dark.svg"
                  alt="Crafteako"
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                  priority
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 160 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  style={{ height: "1px", backgroundColor: "#232323" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Film strip ticker at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              backgroundColor: "#E4E1DB",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: COUNTS.length * (COUNT_DURATION / 1000) + 0.7,
                ease: "linear",
              }}
              style={{ height: "100%", backgroundColor: "#232323" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
