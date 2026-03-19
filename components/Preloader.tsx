"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("crafteako_preloader_seen");
  });

  useEffect(() => {
    if (!visible) return;

    // After stagger (9 letters × 0.07s ≈ 0.63s) + letter duration (0.6s) + buffer
    // total ≈ 2.2s before we trigger the slide-up exit
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, [visible]);

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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src="/logo-dark.svg"
              alt="Crafteako"
              width={120}
              height={120}
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>

          {/* Thin line appears after logo */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
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
