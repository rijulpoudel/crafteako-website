"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";

const ROTATING_WORDS = ["vision", "moments", "celebrations"];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const wordVariants: Variants = {
  enter: {
    y: 80,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE },
  },
  exit: {
    y: -80,
    opacity: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Rotate word every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Set up scroll animations for the text closing gap
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Top text translates down as user scrolls
  const topTextY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "30vh"]);
  const topTextOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // Middle word fades out
  const middleTextOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // Bottom text translates up as user scrolls
  const bottomTextY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-30vh"]);
  const bottomTextOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // Initial scroll indicator fades early
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      style={{
        position: "relative",
        width: "100%",
        height: "150vh", // The photo is 1.5x screen height, allowing normal scroll
        overflow: "hidden", 
      }}
    >
      {/* Full-bleed background image filling the 150vh container perfectly */}
      <CldImage
        src="crafteako/hero/hero-bg"
        alt="Crafteako hero — wedding photography"
        fill
        priority={true}
        sizes="100vw"
        format="auto"
        quality="auto"
        className="hero-bg"
        style={{ objectFit: "cover", objectPosition: "center" }}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EAB8QAAICAQUBAAAAAAAAAAAAAAECAAMEERIhMf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oAMBAAIRAxEAPwCl3FmkS2sMxALRiujSj2K9cj6gRJnR2YMbcWFIIJ4IIPIgg8EEHggg/9k="
      />

      {/* Subtle bottom gradient to ensure text readability ONLY at the bottom, restoring original clear look on top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 30%)",
          zIndex: 1,
        }}
      />

      {/* --- INITIAL HERO TEXT --- */}
      {/* Container is explicitly 100vh so the text is vertically centered in the INITIAL viewport view */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Studio label */}
        <motion.div style={{ y: topTextY, opacity: topTextOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.5em",
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              marginBottom: "16px",
            }}
          >
            CRAFTEAKO STUDIO
          </motion.p>
        </motion.div>

        {/* Line 2 */}
        <motion.div style={{ y: topTextY, opacity: topTextOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            Bringing your
          </motion.p>
        </motion.div>

        {/* Line 3 — rotating word */}
        <motion.div
          style={{
            height: "calc(clamp(3.5rem, 8vw, 8rem) * 1.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            opacity: middleTextOpacity,
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
                fontSize: "clamp(3.5rem, 8vw, 8rem)",
                color: "#ffffff",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                position: "absolute",
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Line 4 */}
        <motion.div style={{ y: bottomTextY, opacity: bottomTextOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            to life, one pixel at a time.
          </motion.p>
        </motion.div>
      </div>

      {/* --- SECOND PHASE CONTENT (Sits at the very bottom of the 150vh photo) --- */}
      <div
        style={{
          position: "absolute",
          bottom: "10vh",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          width: "100%",
          maxWidth: "700px",
          gap: "36px",
        }}
      >
        {/* White elegant line */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
          }}
        />

        {/* Elegant subheadline */}
        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
            color: "#ffffff",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: "0.04em",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          Celebrating your milestone with artistry, intention, and a story worth keeping.
        </h2>

        {/* Minimal bordered button */}
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            padding: "13px 36px",
            backgroundColor: "transparent",
            color: "#ffffff",
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 400,
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.borderColor = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
          }}
        >
          Check Availability
        </Link>
      </div>

      {/* Scroll indicator — bottom of first viewport (100vh) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: "absolute",
          top: "calc(100vh - 80px)", // Place it just above the bottom fold of the first 100vh
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: indicatorOpacity,
        }}
      >
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
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 0.9, delay: 1.4, ease: "easeOut" }}
            style={{ width: "1px", backgroundColor: "#FFFFFF" }}
          />
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
