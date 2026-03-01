"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorContext } from "@/lib/cursorContext";

export default function VisionSection() {
  const { setState } = useCursorContext();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance: scrolls up into view from below
      gsap.fromTo(
        cardRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: false,
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: "#F5F2ED",
        padding: "120px clamp(24px, 6vw, 80px)",
      }}
    >
      <div
        ref={cardRef}
        style={{
          background: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "20px",
          padding: "clamp(40px, 5vw, 64px)",
          maxWidth: "940px",
          margin: "0 auto",
          boxShadow: "0 32px 80px rgba(35, 35, 35, 0.08)",
        }}
      >
        {/* Flex row on desktop, column on mobile */}
        <div className="vision-inner">
          {/* LEFT — portrait photo */}
          <motion.div
            whileHover={{ rotate: 0 }}
            initial={{ rotate: -2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              flexShrink: 0,
              lineHeight: 0,
            }}
            className="vision-photo-wrapper"
          >
            <Image
              src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80"
              alt="Crafteako photographer portrait"
              width={400}
              height={560}
              sizes="(max-width: 768px) 80vw, 30vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k="
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </motion.div>

          {/* RIGHT — text content */}
          <div style={{ flex: 1 }}>
            {/* Label */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: "rgba(35, 35, 35, 0.5)",
                marginBottom: "24px",
              }}
            >
              Our Philosophy
            </p>

            {/* Body paragraph */}
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                lineHeight: 1.8,
                color: "#232323",
              }}
            >
              At Crafteako, we believe every moment deserves to be preserved
              with intention. From the quiet glance shared before vows, to the
              electric energy of a graduation day — we approach every session as
              artists, not just photographers. Our work is cinematic, timeless,
              and deeply personal. We don&apos;t just capture your day. We tell
              your story.
            </p>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#E4E1DB",
                margin: "32px 0",
              }}
            />

            {/* CTA link */}
            <MagneticButton>
              <Link
                href="/contact"
                onMouseEnter={() => setState("book")}
                onMouseLeave={() => setState("default")}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#232323",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "4px",
                  display: "inline-block",
                }}
                className="vision-cta"
              >
                Check Availability →
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .vision-inner {
          display: flex;
          flex-direction: row;
          gap: 48px;
          align-items: flex-start;
        }
        .vision-photo-wrapper {
          width: 30%;
        }
        .vision-cta {
          border-bottom: 1px solid #232323;
          transition: border-color 0.3s ease;
        }
        .vision-cta::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #232323;
          transition: width 0.3s ease;
        }
        .vision-cta:hover::after {
          width: 100%;
        }
        @media (max-width: 767px) {
          .vision-inner {
            flex-direction: column;
          }
          .vision-photo-wrapper {
            width: 70%;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
