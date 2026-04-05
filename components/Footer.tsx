"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitText from "@/components/ui/SplitText";
import { useCursorContext } from "@/lib/cursorContext";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/crafteako" },
  { label: "TikTok", href: "https://tiktok.com/@crafteako" },
  { label: "YouTube", href: "https://youtube.com/@crafteako" },
];

export default function Footer() {
  const { setState } = useCursorContext();

  return (
    <>
      {/* ── PRE-FOOTER CTA — the ask, before the footer strip ── */}
      <section
        style={{
          backgroundColor: "#F5F2ED",
          padding: "140px clamp(24px, 8vw, 120px) 120px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Thin top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #E4E1DB, transparent)",
            margin: "0 auto 80px",
            transformOrigin: "center",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.62rem",
            textTransform: "uppercase",
            letterSpacing: "0.45em",
            color: "rgba(35,35,35,0.4)",
            marginBottom: "36px",
          }}
        >
          Ready when you are
        </p>

        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "clamp(2.8rem, 6vw, 6rem)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#232323",
            marginBottom: "56px",
            maxWidth: "900px",
            margin: "0 auto 56px",
          }}
        >
          <SplitText
            text="Let's create something timeless."
            delay={0.05}
            stagger={0.06}
            once
          />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton>
            <Link
              href="/contact"
              onMouseEnter={() => setState("book")}
              onMouseLeave={() => setState("default")}
              style={{
                display: "inline-block",
                padding: "16px 48px",
                backgroundColor: "#232323",
                color: "#F5F2ED",
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                fontWeight: 400,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.28em",
                borderRadius: "2px",
                border: "1px solid #232323",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
              className="prefooter-cta"
            >
              Book a Session →
            </Link>
          </MagneticButton>
        </motion.div>
      </section>

      {/* ── MAIN FOOTER ── */}
      <footer
        data-theme="dark"
        style={{
          backgroundColor: "#232323",
          padding: "100px 0 48px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(24px, 6vw, 80px)",
          }}
        >
          {/* ── TOP: editorial quote ── */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                color: "#F5F2ED",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
              }}
            >
              {"Every frame\ntells a story."}
            </p>
          </div>

          {/* ── MIDDLE: 3-column section ── */}
          <div className="footer-cols" style={{ marginTop: "80px" }}>
            {/* LEFT — Social links */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  color: "rgba(228, 225, 219, 0.4)",
                  marginBottom: "16px",
                }}
              >
                Follow
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <MagneticButton key={label}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setState("visit")}
                      onMouseLeave={() => setState("default")}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.85rem",
                        color: "#E4E1DB",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0px",
                        transition: "gap 0.25s ease",
                        position: "relative",
                      }}
                      className="footer-social-link"
                    >
                      <span
                        className="footer-arrow"
                        style={{
                          display: "inline-block",
                          opacity: 0,
                          transform: "translateX(-8px)",
                          transition: "opacity 0.25s ease, transform 0.25s ease",
                          marginRight: "0px",
                          fontSize: "0.75rem",
                        }}
                      >
                        →
                      </span>
                      <span
                        className="footer-link-label"
                        style={{ transition: "transform 0.25s ease", display: "inline-block" }}
                      >
                        {label}
                      </span>
                    </Link>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* CENTER — Motto + logo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: "rgba(228, 225, 219, 0.7)",
                  textAlign: "center",
                }}
              >
                Every frame tells a story.
              </p>

              <MagneticButton>
                <div
                  onMouseEnter={() => setState("visit")}
                  onMouseLeave={() => setState("default")}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  <Image
                    src="/logo-light.svg"
                    alt="Crafteako"
                    width={80}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </MagneticButton>
            </div>

            {/* RIGHT — Contact info */}
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  color: "rgba(228, 225, 219, 0.4)",
                  marginBottom: "16px",
                }}
              >
                Reach Out
              </p>

              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.85rem",
                  color: "#E4E1DB",
                  marginBottom: "8px",
                }}
              >
                hello@crafteako.com
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  color: "rgba(228, 225, 219, 0.45)",
                  lineHeight: 1.6,
                }}
              >
                Available for inquiries,<br />bookings, or just to say hi.
              </p>
            </div>
          </div>

          {/* ── BOTTOM bar ── */}
          <div
            style={{
              marginTop: "80px",
              borderTop: "1px solid rgba(228, 225, 219, 0.08)",
              paddingTop: "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.65rem",
                color: "rgba(228, 225, 219, 0.25)",
              }}
            >
              © 2026 Crafteako. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "0.75rem",
                color: "rgba(228, 225, 219, 0.25)",
              }}
            >
              Made with intention.
            </p>
          </div>
        </div>

        {/* Scoped styles */}
        <style>{`
          .footer-cols {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: start;
            gap: 40px;
          }
          .footer-social-link:hover .footer-arrow {
            opacity: 1 !important;
            transform: translateX(0) !important;
            margin-right: 6px !important;
          }
          .footer-social-link:hover .footer-link-label {
            transform: translateX(4px);
          }
          .prefooter-cta:hover {
            background-color: transparent !important;
            color: #232323 !important;
          }
          @media (max-width: 767px) {
            .footer-cols {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .footer-cols > div:last-child {
              text-align: left;
            }
          }
        `}</style>
      </footer>
    </>
  );
}
