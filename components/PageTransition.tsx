"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PageTransition — cream panel that reveals each new page with a right-to-left sweep.
 * Every pathname change remounts the panel (via key increment), triggering a fresh
 * scaleX: 1 → 0 animation (curtain lifts from right, revealing the incoming page).
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((k) => k + 1);
  }, [pathname]);

  return (
    <motion.div
      key={key}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#F5F2ED",
        zIndex: 9996,
        transformOrigin: "right center",
        pointerEvents: "none",
      }}
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
