"use client";

import { useRef } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion, useScroll, useTransform } from "framer-motion";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EAB8QAAICAQUBAAAAAAAAAAAAAAECAAMEERIhMf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oAMBAAIRAxEAPwCl3FmkS2sMxALRiujSj2K9cj6gRJnR2YMbcWFIIJ4IIPIgg8EEHggg/9k=";

export default function GradHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "680px",
        backgroundColor: "#111111",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* ── LEFT: Text panel ── */}
      <motion.div
        style={{ y: textY }}
        className="hero-text-panel"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hero-badge"
        >
          <span className="hero-badge-dot" />
          Class of 2026 · Now Booking
        </motion.div>

        {/* Main headline */}
        <div className="hero-headline">
          {/* Line 1 */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="hero-line hero-line--normal"
            >
              You worked
            </motion.p>
          </div>
          {/* Line 2 */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="hero-line hero-line--italic"
            >
              four years
            </motion.p>
          </div>
          {/* Line 3 */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, delay: 0.67, ease: [0.16, 1, 0.3, 1] }}
              className="hero-line hero-line--normal"
            >
              for this.
            </motion.p>
          </div>
        </div>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-descriptor"
        >
          Graduation photography that honours the journey.
          <br />
          Cinematic. Personal. Yours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="hero-ctas"
        >
          <Link href="/contact" className="hero-btn hero-btn--primary">
            Book a Session
          </Link>
          <Link href="/portfolio" className="hero-btn hero-btn--ghost">
            See the Work ↓
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="hero-stats"
        >
          {["200+ sessions", "Columbus, OH", "Next-day gallery"].map((s, i) => (
            <span key={i} className="hero-stat">
              {s}
              {i < 2 && <span className="hero-stat-dot">·</span>}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT: Photo panel ── */}
      <motion.div
        style={{ y: photoY }}
        className="hero-photo-panel"
      >
        <CldImage
          src="crafteako/hero/hero-bg"
          alt="Graduate celebrating their achievement — captured by Crafteako"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 52vw"
          format="auto"
          quality="auto"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          placeholder="blur"
          blurDataURL={BLUR}
        />
        {/* Left feather — blends photo into text panel */}
        <div className="hero-photo-feather" />
      </motion.div>

      {/* Mobile overlay for readability */}
      <div className="hero-mobile-overlay" />

      <style>{`
        /* ── LAYOUT ── */
        .hero-text-panel {
          position: relative;
          z-index: 2;
          width: 52%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 clamp(32px, 6vw, 96px);
          gap: 0;
        }
        .hero-photo-panel {
          position: absolute;
          right: 0;
          top: 0;
          width: 52%;
          height: 115%; /* taller than viewport for parallax room */
          overflow: hidden;
        }

        /* ── BADGE ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(200, 169, 110, 0.45);
          border-radius: 999px;
          font-family: var(--font-inter);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C8A96E;
          margin-bottom: 36px;
          width: fit-content;
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C8A96E;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* ── HEADLINE ── */
        .hero-headline {
          margin-bottom: 32px;
        }
        .hero-line {
          font-family: var(--font-playfair);
          font-size: clamp(3.2rem, 5.5vw, 6.5rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #F5F2ED;
          margin: 0;
        }
        .hero-line--italic {
          font-style: italic;
          color: #C8A96E;
        }

        /* ── DESCRIPTOR ── */
        .hero-descriptor {
          font-family: var(--font-inter);
          font-size: clamp(0.85rem, 1.1vw, 1rem);
          font-weight: 300;
          line-height: 1.75;
          color: rgba(245, 242, 237, 0.55);
          margin-bottom: 40px;
          max-width: 380px;
        }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .hero-btn {
          display: inline-block;
          text-decoration: none;
          font-family: var(--font-inter);
          font-size: 0.72rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 14px 32px;
          border-radius: 2px;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-btn--primary {
          background: #C8A96E;
          color: #111111;
          border: 1px solid #C8A96E;
        }
        .hero-btn--primary:hover {
          background: transparent;
          color: #C8A96E;
        }
        .hero-btn--ghost {
          background: transparent;
          color: rgba(245, 242, 237, 0.75);
          border: 1px solid rgba(245, 242, 237, 0.25);
        }
        .hero-btn--ghost:hover {
          border-color: rgba(245, 242, 237, 0.65);
          color: #F5F2ED;
        }

        /* ── STATS ── */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .hero-stat {
          font-family: var(--font-inter);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: rgba(245, 242, 237, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-stat-dot {
          color: rgba(200, 169, 110, 0.5);
        }

        /* ── PHOTO FEATHER ── */
        .hero-photo-feather {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 200px;
          background: linear-gradient(to right, #111111 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── MOBILE ── */
        .hero-mobile-overlay {
          display: none;
        }

        @media (max-width: 767px) {
          .hero-text-panel {
            width: 100%;
            padding: 0 clamp(24px, 6vw, 40px);
            position: relative;
            z-index: 3;
          }
          .hero-photo-panel {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 115%;
          }
          .hero-mobile-overlay {
            display: block;
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to right,
              rgba(17,17,17,0.92) 0%,
              rgba(17,17,17,0.75) 55%,
              rgba(17,17,17,0.4) 100%
            );
            z-index: 2;
          }
          .hero-line {
            font-size: clamp(2.8rem, 11vw, 4rem);
          }
          .hero-ctas {
            flex-direction: column;
            gap: 12px;
          }
          .hero-btn {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
