"use client";

import { useRef } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorContext } from "@/lib/cursorContext";
import SplitText from "@/components/ui/SplitText";

export default function VisionSection() {
  const { setState } = useCursorContext();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: "#F5F2ED",
        padding: "140px clamp(24px, 8vw, 120px) 140px",
        overflow: "hidden",
      }}
    >
      <div className="vision-inner">

        {/* LEFT — portrait, tilted, clip-path reveal on scroll */}
        <motion.div
          className="vision-photo-col"
          whileHover={{ rotate: 0 }}
          initial={{ rotate: -3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Clip-path reveal: bottom curtain lifts on scroll */}
          <motion.div
            style={{ overflow: "hidden", borderRadius: "4px", lineHeight: 0 }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <CldImage
              src="crafteako/vision/portrait"
              alt="Crafteako photographer — capturing a quiet, intentional moment between two people"
              width={480}
              height={680}
              sizes="(max-width: 768px) 80vw, 36vw"
              format="auto"
              quality="auto"
              className="img-grade"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k="
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </motion.div>

          {/* Small label below portrait */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "rgba(35,35,35,0.35)",
              marginTop: "16px",
              textAlign: "center",
            }}
          >
            Est. 2022 · Columbus, OH
          </motion.p>
        </motion.div>

        {/* RIGHT — text, left-aligned, open on cream */}
        <div className="vision-text-col">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.45em",
              color: "rgba(35, 35, 35, 0.45)",
              marginBottom: "28px",
            }}
          >
            Our Philosophy
          </motion.p>

          {/* Headline — split text */}
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#232323",
              marginBottom: "36px",
            }}
          >
            <SplitText
              text="Every moment deserves to be seen."
              delay={0.1}
              stagger={0.065}
              once
            />
          </h2>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
              lineHeight: 1.85,
              color: "rgba(35,35,35,0.8)",
              maxWidth: "520px",
              marginBottom: "48px",
            }}
          >
            At Crafteako, we believe every moment deserves to be preserved
            with intention. From the quiet glance shared before vows, to the
            electric energy of a graduation day — we approach every session as
            artists, not just photographers. Our work is cinematic, timeless,
            and deeply personal. We don&apos;t just capture your day. We tell
            your story.
          </motion.p>

          {/* Thin divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "80px",
              height: "1px",
              backgroundColor: "#E4E1DB",
              marginBottom: "40px",
              transformOrigin: "left",
            }}
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton>
              <Link
                href="/contact"
                onMouseEnter={() => setState("book")}
                onMouseLeave={() => setState("default")}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "#232323",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "5px",
                  display: "inline-block",
                }}
                className="vision-cta"
              >
                Check Availability →
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <style>{`
        .vision-inner {
          display: flex;
          flex-direction: row;
          gap: clamp(48px, 8vw, 120px);
          align-items: flex-start;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Portrait column — slightly oversized to bleed into whitespace */
        .vision-photo-col {
          flex: 0 0 38%;
          /* Nudge left to break the grid */
          margin-left: -clamp(0px, 3vw, 40px);
        }

        .vision-text-col {
          flex: 1;
          padding-top: clamp(20px, 4vw, 60px);
        }

        .vision-cta {
          border-bottom: 1px solid rgba(35,35,35,0.35);
          transition: border-color 0.3s ease;
        }
        .vision-cta:hover {
          border-color: #232323;
        }

        @media (max-width: 767px) {
          .vision-inner {
            flex-direction: column;
            gap: 48px;
          }
          .vision-photo-col {
            flex: none;
            width: 72%;
            margin: 0 auto;
          }
          .vision-text-col {
            padding-top: 0;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
