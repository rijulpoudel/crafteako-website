"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import Footer from "@/components/Footer";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k=";

const PACKAGES = [
  {
    id: "classic",
    name: "The Classic",
    price: "$199",
    tagline: "Clean, timeless portraits. Every detail, done right.",
    duration: "1-hour session",
    location: "1 campus location",
    deliverables: [
      "15 fully edited high-resolution images",
      "Private online gallery with print release",
      "Pre-shoot style consultation",
      "Turnaround: 5–7 business days",
    ],
    featured: false,
  },
  {
    id: "signature",
    name: "The Signature",
    price: "$379",
    tagline: "Multiple outfits, golden hour light, and real editorial craft.",
    duration: "1.5–2 hour session",
    location: "Up to 3 campus locations",
    deliverables: [
      "45 fully edited high-resolution images",
      "Off-camera cinematic lighting",
      "Sunset / golden hour (weather permitting)",
      "1 complimentary 8×10 fine art print",
      "Turnaround: 5–7 business days",
    ],
    featured: true,
  },
  {
    id: "group",
    name: "The Group",
    price: "$549",
    tagline: "Bring your crew. Share the session. Keep the memories forever.",
    duration: "Up to 2-hour session",
    location: "Full campus coverage",
    priceNote: "up to 4 people · +$40/person after",
    deliverables: [
      "90–130 edited images (solos + group shots)",
      "$75 print or album credit",
      "Behind-the-scenes short video reel",
      "Turnaround: 7–10 business days",
    ],
    featured: false,
  },
];

// Carefully selected images with objectPositions to show faces, not torsos
const GALLERY = [
  {
    src: "crafteako/projects/xavier/img-01",
    alt: "Xavier Murray — graduation portrait, University of Kansas",
    aspect: "3/4",
    objectPosition: "center 10%",
  },
  {
    src: "crafteako/projects/paperplane/img-04",
    alt: "Graduation portrait session — University of Kansas",
    aspect: "4/5",
    objectPosition: "center 15%",
  },
  {
    src: "crafteako/projects/bijay/img-01",
    alt: "Bijay Tiwari — structural engineering graduate",
    aspect: "3/4",
    objectPosition: "center 12%",
  },
  {
    src: "crafteako/projects/sneha/img-01",
    alt: "Sneha Shrestha — architecture graduate portrait",
    aspect: "4/5",
    objectPosition: "center 8%",
  },
  {
    src: "crafteako/projects/xavier/img-08",
    alt: "Xavier Murray — candid graduation moment",
    aspect: "3/4",
    objectPosition: "center 18%",
  },
  {
    src: "crafteako/projects/sagar/img-04",
    alt: "Sagar Shrestha — graduation session at KU",
    aspect: "4/5",
    objectPosition: "center 10%",
  },
];

function PackageCard({ pkg, index }: { pkg: (typeof PACKAGES)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`pkg-card ${pkg.featured ? "pkg-card--featured" : ""}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {pkg.featured && (
        <div className="pkg-featured-label">Most Requested</div>
      )}

      <div className="pkg-top">
        <p className="pkg-name">{pkg.name}</p>
        <div className="pkg-price-wrap">
          <span className="pkg-price">{pkg.price}</span>
          {pkg.priceNote && <span className="pkg-price-note">{pkg.priceNote}</span>}
        </div>
        <p className="pkg-tagline">{pkg.tagline}</p>
      </div>

      <div className="pkg-meta">
        <span className="pkg-meta-item">{pkg.duration}</span>
        <span className="pkg-meta-sep">·</span>
        <span className="pkg-meta-item">{pkg.location}</span>
      </div>

      <div className="pkg-divider" />

      <ul className="pkg-list">
        {pkg.deliverables.map((item, i) => (
          <li key={i} className={`pkg-list-item ${i === pkg.deliverables.length - 1 ? "pkg-list-item--faint" : ""}`}>
            {i < pkg.deliverables.length - 1 && <span className="pkg-check">—</span>}
            {item}
          </li>
        ))}
      </ul>

      <Link href="/contact" className={`pkg-cta ${pkg.featured ? "pkg-cta--featured" : ""}`}>
        <span>Book this package</span>
        <span
          className="pkg-cta-arrow"
          style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.25s ease" }}
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

export default function NewGradsPage() {
  return (
    <main style={{ backgroundColor: "#F5F2ED", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section className="grads-hero">
        {/* Background photo */}
        <div className="grads-hero-img">
          <CldImage
            src="crafteako/projects/xavier/img-01"
            alt="Graduation portrait at University of Kansas"
            fill
            sizes="100vw"
            format="auto"
            quality="90"
            priority
            placeholder="blur"
            blurDataURL={BLUR}
            style={{ objectFit: "cover", objectPosition: "center 15%" }}
          />
        </div>

        {/* Overlay gradient */}
        <div className="grads-hero-overlay" />

        {/* Content */}
        <div className="grads-hero-content">
          <motion.p
            className="grads-hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Class of 2026 · Lawrence, KS · University of Kansas
          </motion.p>

          <motion.h1
            className="grads-hero-h1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Four years earned.
            <br />
            <em>One session to show it.</em>
          </motion.h1>

          <motion.p
            className="grads-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            Graduation photography based in Lawrence, KS.
            <br />
            We photograph people, not events.
          </motion.p>

          <motion.div
            className="grads-hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" className="grads-btn-primary">Book your session</Link>
            <a href="#packages" className="grads-btn-ghost">View packages ↓</a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grads-hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grads-stat">
              <span className="grads-stat-val">100+</span>
              <span className="grads-stat-label">sessions shot</span>
            </div>
            <div className="grads-stat-sep" />
            <div className="grads-stat">
              <span className="grads-stat-val">Est. 2022</span>
              <span className="grads-stat-label">Lawrence, KS</span>
            </div>
            <div className="grads-stat-sep" />
            <div className="grads-stat">
              <span className="grads-stat-val">Next-day</span>
              <span className="grads-stat-label">delivery available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EDITORIAL BREAK ── */}
      <section className="grads-editorial">
        <motion.div
          className="grads-editorial-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.blockquote
          className="grads-editorial-quote"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          "The difference between a good photo and a great one is
          <br />
          whether the person in it actually feels like themselves."
        </motion.blockquote>
        <motion.div
          className="grads-editorial-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="grads-packages-section">
        <div className="grads-packages-header">
          <motion.p
            className="grads-eyebrow"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Graduation Packages · 2026
          </motion.p>
          <motion.h2
            className="grads-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Transparent pricing.
            <br />
            <em>Nothing hidden.</em>
          </motion.h2>
          <motion.p
            className="grads-section-sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            All packages include a private online gallery, personal print release, and a pre-shoot style consultation.
            <br />
            No deposit required to hold your date.
          </motion.p>
        </div>

        <div className="grads-packages-grid">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="grads-gallery-section">
        <div className="grads-gallery-header">
          <motion.p
            className="grads-eyebrow"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Selected Work · KU Graduates
          </motion.p>
          <motion.h2
            className="grads-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Every frame
            <br />
            <em>worth keeping.</em>
          </motion.h2>
        </div>

        <div className="grads-gallery-grid">
          {GALLERY.map((photo, i) => (
            <motion.div
              key={photo.src}
              className={`grads-gallery-cell grads-gallery-cell--${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ aspectRatio: photo.aspect }}
            >
              <CldImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                format="auto"
                quality="90"
                placeholder="blur"
                blurDataURL={BLUR}
                style={{
                  objectFit: "cover",
                  objectPosition: photo.objectPosition,
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grads-gallery-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/portfolio" className="grads-portfolio-link">
            View full portfolio →
          </Link>
        </motion.div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="grads-expect-section">
        <div className="grads-expect-inner">
          <motion.p
            className="grads-eyebrow grads-eyebrow--light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Experience
          </motion.p>
          <motion.h2
            className="grads-expect-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Relaxed. Directed.
            <br />
            <em>Completely worth it.</em>
          </motion.h2>

          <div className="grads-expect-grid">
            {[
              {
                num: "01",
                title: "We guide, you shine",
                body: "You don't need to know how to pose. We direct every shot so you always look natural — never stiff, never forced.",
              },
              {
                num: "02",
                title: "Your campus, your story",
                body: "Every KU graduate has their spot. We'll use yours — or help you find one you'll love even more.",
              },
              {
                num: "03",
                title: "Gallery in your inbox",
                body: "Your edited photos land ready to post, print, and share. High-resolution, yours forever, no expiry.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                className="grads-expect-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="grads-expect-num">{item.num}</span>
                <h3 className="grads-expect-title">{item.title}</h3>
                <p className="grads-expect-body">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="grads-final-cta">
        <motion.div
          className="grads-final-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="grads-eyebrow"
          style={{ marginBottom: "32px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Limited spots · Spring 2026
        </motion.p>

        <motion.h2
          className="grads-final-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          You only graduate
          <br />
          <em>once.</em>
        </motion.h2>

        <motion.p
          className="grads-final-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          No deposit required. We confirm within 24 hours.
          <br />
          Lawrence, KS and surrounding areas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/contact" className="grads-final-btn">
            Book your session →
          </Link>
        </motion.div>
      </section>

      <Footer />

      {/* ── STYLES ── */}
      <style>{`
        /* ── HERO ── */
        .grads-hero {
          position: relative;
          height: 100svh;
          min-height: 640px;
          display: flex;
          align-items: flex-end;
          padding: 0 clamp(24px, 6vw, 80px) clamp(60px, 8vh, 100px);
          overflow: hidden;
        }
        .grads-hero-img {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .grads-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 14, 20, 0.95) 0%,
            rgba(10, 14, 20, 0.65) 45%,
            rgba(10, 14, 20, 0.25) 100%
          );
          z-index: 1;
        }
        .grads-hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }
        .grads-hero-eyebrow {
          font-family: var(--font-inter);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(123, 170, 200, 0.85);
          margin-bottom: 24px;
        }
        .grads-hero-h1 {
          font-family: var(--font-playfair);
          font-size: clamp(3.2rem, 7vw, 6.5rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #F5F2ED;
          margin-bottom: 28px;
        }
        .grads-hero-h1 em {
          color: #7BAAC8;
          font-style: italic;
        }
        .grads-hero-sub {
          font-family: var(--font-inter);
          font-size: clamp(0.85rem, 1.4vw, 1rem);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(228, 225, 219, 0.6);
          margin-bottom: 44px;
        }
        .grads-hero-actions {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          margin-bottom: 72px;
        }
        .grads-btn-primary {
          display: inline-block;
          padding: 14px 40px;
          background: #344D66;
          color: #F5F2ED;
          font-family: var(--font-inter);
          font-size: 0.72rem;
          font-weight: 400;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          border-radius: 2px;
          transition: background 0.3s ease;
        }
        .grads-btn-primary:hover {
          background: #2a3d52;
        }
        .grads-btn-ghost {
          font-family: var(--font-inter);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(228, 225, 219, 0.55);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .grads-btn-ghost:hover {
          color: rgba(228, 225, 219, 0.9);
        }
        .grads-hero-stats {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }
        .grads-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .grads-stat-val {
          font-family: var(--font-playfair);
          font-style: italic;
          font-size: 1.1rem;
          color: rgba(228, 225, 219, 0.9);
          letter-spacing: -0.01em;
        }
        .grads-stat-label {
          font-family: var(--font-inter);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: rgba(228, 225, 219, 0.35);
        }
        .grads-stat-sep {
          width: 1px;
          height: 32px;
          background: rgba(228, 225, 219, 0.15);
        }

        /* ── EDITORIAL BREAK ── */
        .grads-editorial {
          background: #F5F2ED;
          padding: clamp(64px, 8vw, 100px) clamp(24px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }
        .grads-editorial-line {
          width: 100%;
          max-width: 560px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #E4E1DB, transparent);
          transform-origin: center;
        }
        .grads-editorial-quote {
          font-family: var(--font-playfair);
          font-style: italic;
          font-size: clamp(1.1rem, 2.2vw, 1.6rem);
          font-weight: 400;
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: rgba(35, 35, 35, 0.65);
          max-width: 720px;
          margin: 0;
        }

        /* ── SHARED TYPOGRAPHY ── */
        .grads-eyebrow {
          font-family: var(--font-inter);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(35, 35, 35, 0.4);
          margin-bottom: 20px;
        }
        .grads-eyebrow--light {
          color: rgba(228, 225, 219, 0.4);
        }
        .grads-section-heading {
          font-family: var(--font-playfair);
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: #1a1a1a;
          margin-bottom: 20px;
        }
        .grads-section-heading em {
          font-style: italic;
          color: rgba(35, 35, 35, 0.45);
        }
        .grads-section-sub {
          font-family: var(--font-inter);
          font-size: 0.85rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(35, 35, 35, 0.55);
        }

        /* ── PACKAGES ── */
        .grads-packages-section {
          background: #0d1117;
          padding: clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px);
        }
        .grads-packages-header {
          max-width: 560px;
          margin: 0 auto clamp(52px, 6vw, 80px);
          text-align: center;
        }
        .grads-packages-header .grads-eyebrow { color: rgba(228, 225, 219, 0.35); }
        .grads-packages-header .grads-section-heading { color: #F5F2ED; }
        .grads-packages-header .grads-section-heading em { color: rgba(228, 225, 219, 0.4); }
        .grads-packages-header .grads-section-sub { color: rgba(228, 225, 219, 0.45); }

        .grads-packages-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(228, 225, 219, 0.08);
        }

        .pkg-card {
          background: #0d1117;
          padding: clamp(36px, 4vw, 52px) clamp(28px, 3vw, 44px);
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          transition: background 0.3s ease;
        }
        .pkg-card:hover {
          background: #131820;
        }
        .pkg-card--featured {
          background: #111822;
        }
        .pkg-card--featured:hover {
          background: #16202c;
        }
        .pkg-featured-label {
          font-family: var(--font-inter);
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          color: #7BAAC8;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(52, 77, 102, 0.4);
        }
        .pkg-top {
          margin-bottom: 28px;
        }
        .pkg-name {
          font-family: var(--font-playfair);
          font-size: 1.4rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #E4E1DB;
          margin-bottom: 16px;
        }
        .pkg-price-wrap {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 14px;
        }
        .pkg-price {
          font-family: var(--font-playfair);
          font-style: italic;
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: #344D66;
          line-height: 1;
        }
        .pkg-price-note {
          font-family: var(--font-inter);
          font-size: 0.72rem;
          color: rgba(228, 225, 219, 0.35);
          line-height: 1.4;
        }
        .pkg-tagline {
          font-family: var(--font-inter);
          font-size: 0.82rem;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(228, 225, 219, 0.5);
          font-style: italic;
        }
        .pkg-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .pkg-meta-item {
          font-family: var(--font-inter);
          font-size: 0.68rem;
          color: rgba(228, 225, 219, 0.45);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .pkg-meta-sep {
          color: rgba(228, 225, 219, 0.2);
          font-size: 0.7rem;
        }
        .pkg-divider {
          height: 1px;
          background: rgba(228, 225, 219, 0.07);
          margin-bottom: 24px;
        }
        .pkg-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pkg-list-item {
          font-family: var(--font-inter);
          font-size: 0.8rem;
          line-height: 1.5;
          color: rgba(228, 225, 219, 0.7);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .pkg-list-item--faint {
          color: rgba(228, 225, 219, 0.3);
          font-style: italic;
          margin-top: 8px;
        }
        .pkg-check {
          color: #344D66;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .pkg-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-inter);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(228, 225, 219, 0.5);
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(228, 225, 219, 0.15);
          transition: color 0.25s ease, border-color 0.25s ease;
          margin-top: auto;
        }
        .pkg-cta:hover {
          color: #E4E1DB;
          border-color: rgba(228, 225, 219, 0.4);
        }
        .pkg-cta--featured {
          color: #7BAAC8;
          border-bottom-color: rgba(52, 77, 102, 0.4);
        }
        .pkg-cta--featured:hover {
          color: #9FC6DE;
          border-color: rgba(52, 77, 102, 0.7);
        }

        /* ── GALLERY ── */
        .grads-gallery-section {
          background: #F5F2ED;
          padding: clamp(80px, 10vw, 120px) clamp(20px, 4vw, 56px);
        }
        .grads-gallery-header {
          max-width: 1200px;
          margin: 0 auto clamp(40px, 5vw, 64px);
        }
        .grads-gallery-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 8px;
        }
        .grads-gallery-cell {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          background: #E4E1DB;
        }
        .grads-gallery-cell--0 { grid-column: 1; grid-row: 1; }
        .grads-gallery-cell--1 { grid-column: 2; grid-row: 1; }
        .grads-gallery-cell--2 { grid-column: 3; grid-row: 1; }
        .grads-gallery-cell--3 { grid-column: 1; grid-row: 2; }
        .grads-gallery-cell--4 { grid-column: 2; grid-row: 2; }
        .grads-gallery-cell--5 { grid-column: 3; grid-row: 2; }
        .grads-gallery-footer {
          max-width: 1200px;
          margin: 48px auto 0;
          text-align: center;
        }
        .grads-portfolio-link {
          font-family: var(--font-inter);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #344D66;
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(52, 77, 102, 0.35);
          transition: border-color 0.3s ease;
        }
        .grads-portfolio-link:hover {
          border-color: #344D66;
        }

        /* ── WHAT TO EXPECT ── */
        .grads-expect-section {
          background: #111111;
          padding: clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px);
        }
        .grads-expect-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        .grads-expect-heading {
          font-family: var(--font-playfair);
          font-size: clamp(2.2rem, 4vw, 3.6rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 1.2;
          color: #F5F2ED;
          margin-bottom: clamp(52px, 6vw, 80px);
        }
        .grads-expect-heading em {
          font-style: italic;
          color: rgba(228, 225, 219, 0.4);
        }
        .grads-expect-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .grads-expect-item {
          padding: clamp(28px, 3vw, 44px) clamp(24px, 3vw, 40px);
          border-left: 1px solid rgba(228, 225, 219, 0.07);
        }
        .grads-expect-item:first-child {
          border-left: none;
        }
        .grads-expect-num {
          display: block;
          font-family: var(--font-playfair);
          font-style: italic;
          font-size: clamp(3rem, 5vw, 5rem);
          color: rgba(228, 225, 219, 0.06);
          line-height: 1;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
          user-select: none;
        }
        .grads-expect-title {
          font-family: var(--font-playfair);
          font-size: 1.2rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #E4E1DB;
          margin: 0 0 12px;
        }
        .grads-expect-body {
          font-family: var(--font-inter);
          font-size: 0.82rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(228, 225, 219, 0.45);
        }

        /* ── FINAL CTA ── */
        .grads-final-cta {
          background: #F5F2ED;
          padding: clamp(100px, 12vw, 160px) clamp(24px, 6vw, 80px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          overflow: hidden;
        }
        .grads-final-line {
          width: 100%;
          max-width: 400px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #E4E1DB, transparent);
          transform-origin: center;
          margin-bottom: 64px;
        }
        .grads-final-heading {
          font-family: var(--font-playfair);
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #1a1a1a;
          margin-bottom: 28px;
        }
        .grads-final-heading em {
          font-style: italic;
          color: rgba(35, 35, 35, 0.35);
        }
        .grads-final-sub {
          font-family: var(--font-inter);
          font-size: 0.82rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(35, 35, 35, 0.5);
          margin-bottom: 52px;
        }
        .grads-final-btn {
          display: inline-block;
          padding: 16px 52px;
          background: #232323;
          color: #F5F2ED;
          font-family: var(--font-inter);
          font-size: 0.72rem;
          font-weight: 400;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          border-radius: 2px;
          border: 1px solid #232323;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .grads-final-btn:hover {
          background: transparent;
          color: #232323;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .grads-packages-grid {
            grid-template-columns: 1fr;
          }
          .grads-gallery-grid {
            grid-template-columns: 1fr 1fr;
          }
          .grads-gallery-cell--0 { grid-column: 1 / 3; }
          .grads-gallery-cell--1 { grid-column: 1; }
          .grads-gallery-cell--2 { grid-column: 2; }
          .grads-gallery-cell--3 { grid-column: 1; }
          .grads-gallery-cell--4 { grid-column: 2; }
          .grads-gallery-cell--5 { grid-column: 1 / 3; }
          .grads-expect-grid {
            grid-template-columns: 1fr;
          }
          .grads-expect-item {
            border-left: none;
            border-top: 1px solid rgba(228, 225, 219, 0.07);
            padding: 28px 0;
          }
          .grads-expect-item:first-child {
            border-top: none;
          }
        }
        @media (max-width: 640px) {
          .grads-hero-stats {
            gap: 20px;
          }
          .grads-gallery-grid {
            grid-template-columns: 1fr;
          }
          .grads-gallery-cell--0,
          .grads-gallery-cell--1,
          .grads-gallery-cell--2,
          .grads-gallery-cell--3,
          .grads-gallery-cell--4,
          .grads-gallery-cell--5 {
            grid-column: 1;
            grid-row: auto;
          }
        }
      `}</style>
    </main>
  );
}
