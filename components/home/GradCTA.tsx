"use client";

import { useRef } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion, useScroll, useTransform } from "framer-motion";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k=";

export default function GradCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="gcta-section">
      {/* Parallax background photo */}
      <motion.div className="gcta-bg" style={{ y: bgY }}>
        <CldImage
          src="crafteako/projects/paperplane/img-04"
          alt="Graduate celebrating — a Crafteako session"
          fill
          sizes="100vw"
          format="auto"
          quality="auto"
          placeholder="blur"
          blurDataURL={BLUR}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="gcta-overlay" />

      {/* Content */}
      <div className="gcta-content">
        {/* Urgency badge */}
        <motion.div
          className="gcta-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          ⚡ Limited spots remaining for Spring 2026
        </motion.div>

        {/* Headline */}
        <div className="gcta-headline-wrap">
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="gcta-headline"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              You only graduate
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="gcta-headline gcta-headline--italic"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              once.
            </motion.h2>
          </div>
        </div>

        <motion.p
          className="gcta-sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Sessions are filling up fast. Secure your date before it's gone.
        </motion.p>

        <motion.div
          className="gcta-buttons"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/contact" className="gcta-btn gcta-btn--primary">
            Book My Session
          </Link>
          <Link href="/new-grads-2026" className="gcta-btn gcta-btn--ghost">
            See 2026 Deals
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="gcta-trust"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span className="gcta-trust-item">No deposit required to hold your date</span>
          <span className="gcta-trust-sep">·</span>
          <span className="gcta-trust-item">Reschedule-friendly</span>
          <span className="gcta-trust-sep">·</span>
          <span className="gcta-trust-item">Columbus, OH & surrounding</span>
        </motion.div>
      </div>

      <style>{`
        .gcta-section {
          position: relative;
          width: 100%;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #111111;
        }

        .gcta-bg {
          position: absolute;
          inset: -12%;
          z-index: 0;
        }

        .gcta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(17,17,17,0.88) 0%,
            rgba(17,17,17,0.72) 50%,
            rgba(17,17,17,0.88) 100%
          );
          z-index: 1;
        }

        .gcta-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px);
          max-width: 900px;
          margin: 0 auto;
        }

        .gcta-badge {
          display: inline-block;
          padding: 6px 18px;
          background: rgba(200,169,110,0.12);
          border: 1px solid rgba(200,169,110,0.35);
          border-radius: 999px;
          font-family: var(--font-inter);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: #C8A96E;
          margin-bottom: 40px;
        }

        .gcta-headline-wrap {
          margin-bottom: 24px;
        }
        .gcta-headline {
          font-family: var(--font-playfair);
          font-size: clamp(3.2rem, 7vw, 7.5rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #F5F2ED;
          margin: 0;
        }
        .gcta-headline--italic {
          font-style: italic;
          color: #C8A96E;
        }

        .gcta-sub {
          font-family: var(--font-inter);
          font-size: clamp(0.85rem, 1.2vw, 1rem);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(245,242,237,0.55);
          max-width: 460px;
          margin-bottom: 44px;
        }

        .gcta-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 36px;
        }
        .gcta-btn {
          display: inline-block;
          text-decoration: none;
          font-family: var(--font-inter);
          font-size: 0.72rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 15px 36px;
          border-radius: 2px;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gcta-btn--primary {
          background: #C8A96E;
          color: #111111;
          border: 1px solid #C8A96E;
        }
        .gcta-btn--primary:hover {
          background: transparent;
          color: #C8A96E;
        }
        .gcta-btn--ghost {
          background: transparent;
          color: rgba(245,242,237,0.7);
          border: 1px solid rgba(245,242,237,0.25);
        }
        .gcta-btn--ghost:hover {
          border-color: rgba(245,242,237,0.55);
          color: #F5F2ED;
        }

        .gcta-trust {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .gcta-trust-item {
          font-family: var(--font-inter);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          color: rgba(245,242,237,0.25);
        }
        .gcta-trust-sep {
          color: rgba(200,169,110,0.3);
        }

        @media (max-width: 540px) {
          .gcta-buttons {
            flex-direction: column;
          }
          .gcta-btn {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
