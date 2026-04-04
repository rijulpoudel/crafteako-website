"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorContext } from "@/lib/cursorContext";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Work", href: "/#work" },
  { label: "Grads 2026", href: "/new-grads-2026" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
          background: scrolled ? "rgba(245,242,237,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          // color adapts: cream text on dark hero, dark text on scrolled bar
        }}
      >
        {/* Wordmark */}
        <MagneticButton>
          <Link
            href="/"
            className="flex items-center"
            onMouseEnter={() => setState("visit")}
            onMouseLeave={() => setState("default")}
          >
            <Image
              src={scrolled ? "/logo-dark.svg" : "/logo-light.svg"}
              alt="Crafteako"
              width={36}
              height={36}
              style={{ objectFit: "contain", transition: "opacity 0.3s ease" }}
              priority
            />
          </Link>
        </MagneticButton>

        {/* Desktop nav links */}
        <nav
          style={{ display: "flex", gap: "clamp(24px, 3vw, 48px)", alignItems: "center" }}
          className="desktop-nav"
        >
          {/* Instagram Icon */}
          <MagneticButton>
            <a
              href="https://www.instagram.com/crafteako"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onMouseEnter={() => setState("visit")}
              onMouseLeave={() => setState("default")}
              style={{
                display: "flex",
                alignItems: "center",
                color: scrolled ? "#232323" : "#F5F2ED",
                transition: "opacity 0.3s ease, color 0.4s ease",
              }}
              className="nav-icon-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </MagneticButton>

          {NAV_LINKS.map(({ label, href }) => (
            <MagneticButton key={label}>
              <Link
                href={href}
                onMouseEnter={() => setState("visit")}
                onMouseLeave={() => setState("default")}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: scrolled ? "#232323" : "#F5F2ED",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "4px",
                  transition: "color 0.4s ease",
                }}
                className={`nav-link ${scrolled ? "nav-link--dark" : "nav-link--light"}`}
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
            animate={menuOpen ? { rotate: 45, y: 7, width: "24px", backgroundColor: "#F5F2ED" } : { rotate: 0, y: 0, width: "24px", backgroundColor: "#232323" }}
            transition={{ duration: 0.3 }}
            style={{ display: "block", height: "1px", transformOrigin: "center" }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block", height: "1px", width: "16px", backgroundColor: scrolled ? "#232323" : "#F5F2ED" }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7, width: "24px", backgroundColor: "#F5F2ED" } : { rotate: 0, y: 0, width: "24px", backgroundColor: "#232323" }}
            transition={{ duration: 0.3 }}
            style={{ display: "block", height: "1px", transformOrigin: "center" }}
          />
        </button>
      </header>

      {/* ── Mobile full-screen overlay nav — dark, atmospheric ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#1a1a1a",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "0 clamp(32px, 8vw, 80px)",
              gap: "0px",
              overflow: "hidden",
            }}
          >
            {/* Blurred hero image at low opacity for atmosphere */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('https://res.cloudinary.com/crafteako/image/upload/f_auto,q_10,w_400/crafteako/hero/hero-bg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(24px) saturate(0.4)",
                opacity: 0.18,
                transform: "scale(1.1)", // prevents blur edge artifacts
              }}
            />

            {/* Dark scrim over the blurred image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
              }}
            />

            {/* Instagram link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", zIndex: 1, marginBottom: "8px" }}
            >
              <a
                href="https://www.instagram.com/crafteako"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2rem, 7vw, 3.5rem)",
                  color: "rgba(245,242,237,0.45)",
                  textDecoration: "none",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  display: "block",
                  lineHeight: 1.3,
                  transition: "color 0.25s ease",
                }}
                className="mobile-nav-link"
              >
                Instagram ↗
              </a>
            </motion.div>

            {/* Thin divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: "1px",
                backgroundColor: "rgba(245,242,237,0.1)",
                transformOrigin: "left",
                marginBottom: "24px",
                marginTop: "8px",
              }}
            />

            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ position: "relative", zIndex: 1 }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 7vw, 3.5rem)",
                    color: "#F5F2ED",
                    textDecoration: "none",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    display: "block",
                    lineHeight: 1.3,
                    transition: "color 0.25s ease, opacity 0.25s ease",
                  }}
                  className="mobile-nav-link"
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Bottom meta — studio name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              style={{
                position: "absolute",
                bottom: "clamp(24px, 4vw, 48px)",
                left: "clamp(32px, 8vw, 80px)",
                zIndex: 1,
                fontFamily: "var(--font-inter)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.35em",
                color: "rgba(245,242,237,0.25)",
              }}
            >
              Crafteako · Est. 2022
            </motion.p>
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
          transition: width 0.3s ease;
        }
        .nav-link--dark::after  { background-color: #232323; }
        .nav-link--light::after { background-color: #F5F2ED; }
        .nav-link:hover::after {
          width: 100%;
        }

        .nav-icon-link:hover {
          opacity: 0.55 !important;
        }

        .mobile-nav-link:hover {
          opacity: 0.7 !important;
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
