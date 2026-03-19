"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const ROTATING_WORDS = ["vision", "moments", "memories"];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const wordVariants: Variants = {
  enter: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE },
  },
  exit: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  // Rotate word every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-theme="dark"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Full-bleed background image */}
      <CldImage
        src="crafteako/hero/hero-bg"
        alt="Crafteako hero — wedding photography"
        fill
        priority={true}
        sizes="100vw"
        format="auto"
        quality="auto"
        style={{ objectFit: "cover", objectPosition: "center" }}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EAB8QAAICAQUBAAAAAAAAAAAAAAECAAMEERIhMf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCl3FmkS2sMxALRiujSj2K9cj6gRJnR2YMbcWFIIJ4IIPIgg8EEHggg/9k="
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* Centered text block */}
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Studio label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            color: "#FFFFFF",
            marginBottom: "12px",
          }}
        >
          CRAFTEAKO STUDIO
        </motion.p>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "5.5vw",
            color: "#FFFFFF",
            fontWeight: 400,
            lineHeight: 1.15,
          }}
        >
          Bringing your
        </motion.p>

        {/* Line 3 — rotating word with fixed height container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            height: "calc(5.5vw * 1.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={ROTATING_WORDS[wordIndex]}
              variants={wordVariants}
              initial="enter"
              animate="animate"
              exit="exit"
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "5.5vw",
                color: "#E4E1DB",
                fontWeight: 400,
                lineHeight: 1.15,
                position: "absolute",
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Line 4 */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "5.5vw",
            color: "#FFFFFF",
            fontWeight: 400,
            lineHeight: 1.15,
          }}
        >
          to life, one pixel at a time.
        </motion.p>
      </div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Breathing wrapper */}
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 0.9, delay: 1.4, ease: "easeOut" }}
            style={{ width: "1px", backgroundColor: "#FFFFFF" }}
          />

          {/* "scroll" label */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            scroll
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
