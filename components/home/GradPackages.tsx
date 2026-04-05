"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PACKAGES = [
  {
    number: "01",
    name: "The Classic",
    price: "$199",
    tagline: "Perfect for a solo session",
    features: [
      "1.5-hour session",
      "50+ edited photos",
      "1 campus location",
      "Online gallery",
      "3-day delivery",
    ],
    featured: false,
    href: "/contact",
  },
  {
    number: "02",
    name: "The Signature",
    price: "$379",
    tagline: "Our most popular package",
    features: [
      "3-hour session",
      "100+ edited photos",
      "2 locations",
      "Online gallery + USB",
      "2-day delivery",
      "1 outfit change",
    ],
    featured: true,
    href: "/contact",
  },
  {
    number: "03",
    name: "The Premium",
    price: "$549",
    tagline: "The full experience",
    features: [
      "Full-day coverage",
      "200+ edited photos",
      "Ceremony + portraits",
      "3 locations",
      "All digital files",
      "Next-day delivery",
    ],
    featured: false,
    href: "/contact",
  },
];

export default function GradPackages() {
  return (
    <section className="pkg-section">
      {/* Header */}
      <div className="pkg-header">
        <motion.p
          className="pkg-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Graduation Packages · 2026
        </motion.p>
        <motion.h2
          className="pkg-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Simple pricing.
          <br />
          <span style={{ color: "#344D66" }}>No surprises.</span>
        </motion.h2>
        <motion.p
          className="pkg-sub"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Every package includes professional editing, Crafteako watermark-free delivery,
          and a photographer who actually cares.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="pkg-cards">
        {PACKAGES.map((pkg, i) => (
          <motion.div
            key={pkg.number}
            className={`pkg-card ${pkg.featured ? "pkg-card--featured" : ""}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {pkg.featured && (
              <div className="pkg-badge">Most Popular</div>
            )}

            <div className="pkg-number">{pkg.number}</div>

            <div className="pkg-name-row">
              <h3 className="pkg-name">{pkg.name}</h3>
            </div>

            <div className="pkg-price-row">
              <span className="pkg-price">{pkg.price}</span>
            </div>

            <p className="pkg-tagline">{pkg.tagline}</p>

            <div className="pkg-divider" />

            <ul className="pkg-features">
              {pkg.features.map((f) => (
                <li key={f} className="pkg-feature">
                  <span className="pkg-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={pkg.href}
              className={`pkg-btn ${pkg.featured ? "pkg-btn--gold" : "pkg-btn--outline"}`}
            >
              Book This Package →
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        className="pkg-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        All sessions take place in Lawrence, KS and surrounding areas. Travel available on request.
        <Link href="/new-grads-2026" className="pkg-note-link"> See 2026 grad deals →</Link>
      </motion.p>

      <style>{`
        .pkg-section {
          background: #111111;
          padding: clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px);
          overflow: hidden;
        }

        .pkg-header {
          max-width: 700px;
          margin: 0 auto 72px;
          text-align: center;
        }

        .pkg-eyebrow {
          font-family: var(--font-inter);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(52,77,102,0.6);
          margin-bottom: 20px;
        }

        .pkg-heading {
          font-family: var(--font-playfair);
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: #F5F2ED;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .pkg-sub {
          font-family: var(--font-inter);
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(245,242,237,0.45);
          max-width: 520px;
          margin: 0 auto;
        }

        /* ── CARDS ── */
        .pkg-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto 40px;
          align-items: start;
        }

        .pkg-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(245,242,237,0.08);
          border-radius: 8px;
          padding: clamp(28px, 4vw, 48px) clamp(24px, 3vw, 36px);
          transition: border-color 0.3s ease;
        }
        .pkg-card:hover {
          border-color: rgba(245,242,237,0.18);
        }
        .pkg-card--featured {
          background: rgba(52,77,102,0.08);
          border-color: rgba(52,77,102,0.35);
          transform: translateY(-8px);
        }
        .pkg-card--featured:hover {
          border-color: rgba(52,77,102,0.6);
        }

        .pkg-badge {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          background: #344D66;
          color: #F5F2ED;
          font-family: var(--font-inter);
          font-size: 0.58rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 4px 16px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .pkg-number {
          font-family: var(--font-inter);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(52,77,102,0.5);
          margin-bottom: 12px;
        }

        .pkg-name-row {
          margin-bottom: 16px;
        }
        .pkg-name {
          font-family: var(--font-playfair);
          font-size: 1.5rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #F5F2ED;
          margin: 0;
        }

        .pkg-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 6px;
        }
        .pkg-price {
          font-family: var(--font-playfair);
          font-size: clamp(2.5rem, 4vw, 3.2rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: #344D66;
          line-height: 1;
        }

        .pkg-tagline {
          font-family: var(--font-inter);
          font-size: 0.72rem;
          color: rgba(245,242,237,0.38);
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }

        .pkg-divider {
          height: 1px;
          background: rgba(245,242,237,0.08);
          margin-bottom: 24px;
        }

        .pkg-features {
          list-style: none;
          margin: 0 0 32px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pkg-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-inter);
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(245,242,237,0.7);
          line-height: 1.4;
        }
        .pkg-check {
          color: #344D66;
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .pkg-btn {
          display: block;
          text-align: center;
          text-decoration: none;
          font-family: var(--font-inter);
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 13px 24px;
          border-radius: 2px;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pkg-btn--gold {
          background: #344D66;
          color: #F5F2ED;
          border: 1px solid #344D66;
        }
        .pkg-btn--gold:hover {
          background: transparent;
          color: #344D66;
        }
        .pkg-btn--outline {
          background: transparent;
          color: rgba(245,242,237,0.7);
          border: 1px solid rgba(245,242,237,0.18);
        }
        .pkg-btn--outline:hover {
          border-color: rgba(245,242,237,0.45);
          color: #F5F2ED;
        }

        .pkg-note {
          text-align: center;
          font-family: var(--font-inter);
          font-size: 0.72rem;
          color: rgba(245,242,237,0.25);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .pkg-note-link {
          color: rgba(52,77,102,0.6);
          text-decoration: none;
          border-bottom: 1px solid rgba(52,77,102,0.25);
          transition: color 0.25s, border-color 0.25s;
        }
        .pkg-note-link:hover {
          color: #344D66;
          border-color: #344D66;
        }

        @media (max-width: 900px) {
          .pkg-cards {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .pkg-card--featured {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
