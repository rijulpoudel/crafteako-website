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

  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "680px",
        backgroundColor: "#0d1117",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* ── LEFT: Text panel ── */}
      <motion.div style={{ y: textY }} className="hero-text-panel">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hero-badge"
        >
          <span className="hero-badge-dot" />
          Lawrence, KS · Bookings Open
        </motion.div>

        {/* Main headline — each line in its own overflow container */}
        <div className="hero-headline">
          <div className="hero-line-wrap">
            <motion.p
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="hero-line hero-line--normal"
            >
              You worked
            </motion.p>
          </div>
          <div className="hero-line-wrap">
            <motion.p
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="hero-line hero-line--italic"
            >
              four years
            </motion.p>
          </div>
          <div className="hero-line-wrap">
            <motion.p
              initial={{ y: "108%" }}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-descriptor"
        >
          Graduation photography based in Lawrence, KS.
          <br />
          We photograph people, not events.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="hero-ctas"
        >
          <Link href="/contact" className="hero-btn hero-btn--primary">
            Book a Session
          </Link>
          <Link href="/portfolio" className="hero-btn hero-btn--ghost">
            See the work
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="hero-stats"
        >
          {["Est. 2022", "100+ sessions", "Next-day delivery"].map((s, i) => (
            <span key={i} className="hero-stat">
              {s}
              {i < 2 && <span className="hero-stat-sep">·</span>}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT: Photo panel ── */}
      <motion.div style={{ y: photoY }} className="hero-photo-panel">
        <CldImage
          src="crafteako/hero/hero-bg"
          alt="Graduate on campus — Crafteako photography, Lawrence, KS"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 52vw"
          format="auto"
          quality="95"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          placeholder="blur"
          blurDataURL={BLUR}
        />
        {/* Feather left edge */}
        <div className="hero-photo-feather" />
      </motion.div>

      {/* Mobile scrim */}
      <div className="hero-mobile-overlay" />

      <style>{`
        .hero-text-panel {
          position: relative;
          z-index: 2;
          width: 52%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 clamp(32px, 6vw, 96px);
        }
        .hero-photo-panel {
          position: absolute;
          right: 0;
          top: 0;
          width: 52%;
          height: 115%;
          overflow: hidden;
        }

        /* ── BADGE ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border: 1px solid rgba(52, 77, 102, 0.6);
          border-radius: 999px;
          font-family: var(--font-inter);
          font-size: 0.63rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #7BAAC8;
          margin-bottom: 36px;
          width: fit-content;
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #344D66;
          flex-shrink: 0;
          animation: pulse-dot 2.4s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.65); }
        }

        /* ── HEADLINE ── */
        .hero-headline { margin-bottom: 28px; }

        /* Give each overflow container room for descenders */
        .hero-line-wrap {
          overflow: hidden;
          padding-bottom: 0.12em;
          margin-bottom: -0.12em;
        }

        .hero-line {
          font-family: var(--font-playfair);
          font-size: clamp(3.2rem, 5.5vw, 6.5rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #F5F2ED;
          margin: 0;
          display: block;
        }
        .hero-line--italic {
          font-style: italic;
          color: #7BAAC8;
        }

        /* ── DESCRIPTOR ── */
        .hero-descriptor {
          font-family: var(--font-inter);
          font-size: clamp(0.82rem, 1.05vw, 0.95rem);
          font-weight: 300;
          line-height: 1.8;
          color: rgba(245,242,237,0.5);
          margin-bottom: 40px;
          max-width: 360px;
          letter-spacing: 0.01em;
        }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 52px;
          align-items: center;
        }
        .hero-btn {
          display: inline-block;
          text-decoration: none;
          font-family: var(--font-inter);
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 14px 32px;
          border-radius: 2px;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }
        .hero-btn--primary {
          background: #344D66;
          color: #F5F2ED;
          border: 1px solid #344D66;
        }
        .hero-btn--primary:hover {
          background: #2a3d52;
          border-color: #2a3d52;
        }
        .hero-btn--ghost {
          background: transparent;
          color: rgba(245,242,237,0.6);
          border: 1px solid rgba(245,242,237,0.18);
          padding-left: 0;
          padding-right: 0;
          border: none;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(245,242,237,0.3);
        }
        .hero-btn--ghost:hover {
          color: #F5F2ED;
          text-decoration-color: rgba(245,242,237,0.7);
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
          font-size: 0.63rem;
          letter-spacing: 0.06em;
          color: rgba(245,242,237,0.28);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-stat-sep { color: rgba(52,77,102,0.6); }

        /* ── PHOTO FEATHER ── */
        .hero-photo-feather {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 220px;
          background: linear-gradient(to right, #0d1117 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        .hero-mobile-overlay { display: none; }

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
              rgba(13,17,23,0.94) 0%,
              rgba(13,17,23,0.78) 55%,
              rgba(13,17,23,0.35) 100%
            );
            z-index: 2;
          }
          .hero-line { font-size: clamp(2.8rem, 11vw, 4rem); }
          .hero-ctas { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>
    </section>
  );
}
