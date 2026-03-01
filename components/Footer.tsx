"use client";

import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorContext } from "@/lib/cursorContext";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/crafteako" },
  { label: "TikTok", href: "https://tiktok.com/@crafteako" },
  { label: "YouTube", href: "https://youtube.com/@crafteako" },
];

export default function Footer() {
  const { setState } = useCursorContext();

  return (
    <footer
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
              whiteSpace: "pre-line",
            }}
          >
            {"Every frame\ntells a story."}
          </p>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              letterSpacing: "0.6em",
              color: "rgba(228, 225, 219, 0.6)",
              marginTop: "40px",
              textTransform: "uppercase",
            }}
          >
            CRAFTEAKO
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

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
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
                      style={{
                        transition: "transform 0.25s ease",
                        display: "inline-block",
                      }}
                    >
                      {label}
                    </span>
                  </Link>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* CENTER — Decorative vertical line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "1px",
                height: "80px",
                backgroundColor: "rgba(228, 225, 219, 0.15)",
              }}
            />
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
                color: "rgba(228, 225, 219, 0.5)",
              }}
            >
              Available Worldwide
            </p>
          </div>
        </div>

        {/* ── BOTTOM bar ── */}
        <div
          style={{
            marginTop: "80px",
            borderTop: "1px solid rgba(228, 225, 219, 0.1)",
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
              color: "rgba(228, 225, 219, 0.3)",
            }}
          >
            © 2025 Crafteako. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "rgba(228, 225, 219, 0.3)",
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
        @media (max-width: 767px) {
          .footer-cols {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-cols > div:nth-child(2) {
            display: none;
          }
          .footer-cols > div:last-child {
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
}
