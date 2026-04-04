"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const ROTATING_WORDS = ["vision", "moments", "celebrations"];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const wordVariants: Variants = {
  enter: { y: 80, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  exit:  { y: -80, opacity: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const topTextY       = useTransform(scrollYProgress, [0, 0.4], ["0vh", "30vh"]);
  const topTextOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const middleTextOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const bottomTextY       = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-30vh"]);
  const bottomTextOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const indicatorOpacity  = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      style={{
        position: "relative",
        width: "100%",
        height: "150vh",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed background */}
      <CldImage
        src="crafteako/hero/hero-bg"
        alt="Crafteako hero — wedding photography, a couple embracing in soft golden light"
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

      {/* Bottom gradient for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 30%)",
          zIndex: 1,
        }}
      />

      {/* ── INITIAL HERO TEXT (first 100vh) ── */}
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
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.35em",
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              marginBottom: "20px",
            }}
          >
            CRAFTEAKO STUDIO
          </motion.p>
        </motion.div>

        {/* Line 2 — split-text reveal */}
        <motion.div style={{ y: topTextY, opacity: topTextOpacity }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.35 }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
            }}
          >
            <SplitText
              text="Bringing your"
              delay={0.4}
              stagger={0.08}
              animateOnMount
            />
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
                letterSpacing: "-0.04em",
                position: "absolute",
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Line 4 — split-text reveal */}
        <motion.div style={{ y: bottomTextY, opacity: bottomTextOpacity }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.5 }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
            }}
          >
            <SplitText
              text="to life."
              delay={0.55}
              stagger={0.09}
              animateOnMount
            />
          </motion.p>
        </motion.div>
      </div>

      {/* ── SECOND PHASE — bottom of 150vh photo ── */}
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
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
          }}
        />

        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
            color: "#ffffff",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: "0.03em",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          Celebrating your milestone with artistry, intention, and a story worth keeping.
        </h2>

        <Link
          href="/contact"
          style={{
            display: "inline-block",
            padding: "13px 36px",
            backgroundColor: "transparent",
            color: "#ffffff",
            fontFamily: "var(--font-inter)",
            fontSize: "0.72rem",
            fontWeight: 400,
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "2px",
            transition: "border-color 0.3s ease, background-color 0.3s ease",
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

      {/* ── Refined scroll indicator — animated dot on a line ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        style={{
          position: "absolute",
          top: "calc(100vh - 88px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: indicatorOpacity as unknown as number,
        }}
      >
        {/* Static vertical rail */}
        <div
          style={{
            width: "1px",
            height: "56px",
            backgroundColor: "rgba(255,255,255,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Sliding dot */}
          <motion.div
            animate={{ y: ["0%", "100%"] }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
            style={{
              width: "1px",
              height: "40%",
              backgroundColor: "#ffffff",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
