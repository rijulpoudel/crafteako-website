"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorContext } from "@/lib/cursorContext";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setState } = useCursorContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(24px, 5vw, 80px)",
          height: "72px",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
          background: scrolled ? "rgba(245,242,237,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Wordmark */}
        <MagneticButton>
          <Link
            href="/"
            onMouseEnter={() => setState("visit")}
            onMouseLeave={() => setState("default")}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "0.85rem",
              letterSpacing: "0.3em",
              color: "#232323",
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            CRAFTEAKO
          </Link>
        </MagneticButton>

        {/* Desktop nav links */}
        <nav
          style={{ display: "flex", gap: "clamp(24px, 3vw, 48px)" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <MagneticButton key={label}>
              <Link
                href={href}
                onMouseEnter={() => setState("visit")}
                onMouseLeave={() => setState("default")}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#232323",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "4px",
                }}
                className="nav-link"
              >
                {label}
              </Link>
            </MagneticButton>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          className="hamburger"
          style={{
            display: "none",
            background: "none",
            border: "none",
            padding: "8px",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-end",
          }}
        >
          <motion.span
            animate={
              menuOpen
                ? { rotate: 45, y: 7, width: "24px" }
                : { rotate: 0, y: 0, width: "24px" }
            }
            transition={{ duration: 0.3 }}
            style={{
              display: "block",
              height: "1px",
              backgroundColor: "#232323",
              transformOrigin: "center",
            }}
          />
          <motion.span
            animate={
              menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
            style={{
              display: "block",
              height: "1px",
              width: "16px",
              backgroundColor: "#232323",
            }}
          />
          <motion.span
            animate={
              menuOpen
                ? { rotate: -45, y: -7, width: "24px" }
                : { rotate: 0, y: 0, width: "24px" }
            }
            transition={{ duration: 0.3 }}
            style={{
              display: "block",
              height: "1px",
              backgroundColor: "#232323",
              transformOrigin: "center",
            }}
          />
        </button>
      </header>

      {/* ── Mobile full-screen overlay nav ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#F5F2ED",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 8vw, 4rem)",
                    color: "#232323",
                    textDecoration: "none",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scoped styles ── */}
      <style>{`
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #232323;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
