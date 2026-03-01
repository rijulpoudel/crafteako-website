"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "CRAFTEAKO".split("");

export default function Preloader() {
  // null = not yet determined, true = show, false = hide (triggers exit anim)
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("crafteako_preloader_seen");
    if (seen) {
      setVisible(false);
      return;
    }
    setVisible(true);

    // After stagger (9 letters × 0.07s ≈ 0.63s) + letter duration (0.6s) + buffer
    // total ≈ 2.2s before we trigger the slide-up exit
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything until we know whether to show
  if (visible === null || visible === false) {
    // Still render AnimatePresence so exit anim plays when visible → false
    if (visible === null) return null;
  }

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
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#F5F2ED",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Staggered letters */}
          <motion.div
            style={{ display: "flex", gap: "0.05em" }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07 },
              },
            }}
          >
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  letterSpacing: "0.4em",
                  color: "#232323",
                  display: "inline-block",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Animated underline — grows as letters appear */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "clamp(160px, 20vw, 320px)" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
            style={{
              height: "1px",
              backgroundColor: "#232323",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
