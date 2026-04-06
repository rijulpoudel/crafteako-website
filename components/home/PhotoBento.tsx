"use client";

import { useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k=";

// Carefully chosen images + objectPosition per cell shape:
//   large (tall 2-row portrait)  → cover image, objectPosition top
//   top-mid/top-right (squarish) → portrait img at 40% from top shows face
//   bottom row (shorter wide)    → cover images with face at top
const BENTO_ITEMS = [
  {
    // Tall 2-row cell — cover is the signature shot, face near top-center
    src: projects[0].coverImage,
    alt: "Xavier Murray — graduation portrait at University of Kansas",
    project: "Xavier Murray",
    type: "Graduation · KU",
    id: projects[0].id,
    gridArea: "large",
    objectPosition: "center 15%",
  },
  {
    // Square top-mid — paperplane img-06 is 800×1000 portrait, face upper-third
    src: projects[1].albumImages[6]?.src ?? projects[1].coverImage,
    alt: "Graduation portrait session — University of Kansas",
    project: "Paper Plane",
    type: "Graduation · KU",
    id: projects[1].id,
    gridArea: "top-mid",
    objectPosition: "center 18%",
  },
  {
    // Square top-right — sneha img-01 is 800×1200, very tall portrait
    src: projects[4].albumImages[0]?.src ?? projects[4].coverImage,
    alt: "Sneha Shrestha — architecture graduate portrait",
    project: "Sneha Shrestha",
    type: "Portrait · KU",
    id: projects[4].id,
    gridArea: "top-right",
    objectPosition: "center 12%",
  },
  {
    // Shorter bottom-mid — bijay img-02 is 800×1000
    src: projects[5].albumImages[1]?.src ?? projects[5].coverImage,
    alt: "Bijay Tiwari — structural engineering graduate",
    project: "Bijay Tiwari",
    type: "Graduation · KU",
    id: projects[5].id,
    gridArea: "bottom-mid",
    objectPosition: "center 20%",
  },
  {
    // Shorter bottom-right — sagar img-04 is 800×1000
    src: projects[2].albumImages[3]?.src ?? projects[2].coverImage,
    alt: "Sagar Shrestha — graduation session",
    project: "Sagar Shrestha",
    type: "Graduation · KU",
    id: projects[2].id,
    gridArea: "bottom-right",
    objectPosition: "center 10%",
  },
];

function BentoCell({
  item,
  index,
}: {
  item: (typeof BENTO_ITEMS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`bento-cell bento-cell--${item.gridArea}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/albums/${item.id}`} className="bento-link">
        <div className="bento-img-wrap">
          <CldImage
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 767px) 100vw, 42vw"
            format="auto"
            quality="90"
            placeholder="blur"
            blurDataURL={BLUR}
            style={{
              objectFit: "cover",
              objectPosition: item.objectPosition,
              transition:
                "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              filter: hovered ? "saturate(1.1) contrast(1.03)" : "none",
            }}
          />
        </div>

        {/* Hover overlay */}
        <div className="bento-overlay" style={{ opacity: hovered ? 1 : 0 }}>
          <div className="bento-overlay-inner">
            <p className="bento-label">{item.type}</p>
            <p className="bento-name">{item.project}</p>
            <p className="bento-cta">View Album ↗</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PhotoBento() {
  return (
    <section className="bento-section">
      <div className="bento-header">
        <motion.p
          className="bento-eyebrow"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected Work · Lawrence, KS
        </motion.p>
        <motion.h2
          className="bento-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Frames worth keeping.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/portfolio" className="bento-view-all">
            View full portfolio →
          </Link>
        </motion.div>
      </div>

      <div className="bento-grid">
        {BENTO_ITEMS.map((item, i) => (
          <BentoCell key={item.id + item.gridArea} item={item} index={i} />
        ))}
      </div>

      <style>{`
        .bento-section {
          background: #F5F2ED;
          padding: clamp(80px, 10vw, 140px) clamp(20px, 4vw, 56px);
          overflow: hidden;
        }
        .bento-header {
          max-width: 1200px;
          margin: 0 auto 52px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bento-eyebrow {
          font-family: var(--font-inter);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(35,35,35,0.4);
        }
        .bento-heading {
          font-family: var(--font-playfair);
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: #1a1a1a;
          line-height: 1.1;
          font-style: italic;
        }
        .bento-view-all {
          font-family: var(--font-inter);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #344D66;
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(52,77,102,0.35);
          transition: border-color 0.3s ease;
          display: inline-block;
          width: fit-content;
        }
        .bento-view-all:hover { border-color: #344D66; }

        /* ── BENTO GRID ── */
        .bento-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          grid-template-rows: 360px 290px;
          gap: 8px;
        }
        .bento-cell {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          background: #E4E1DB;
        }
        .bento-cell--large      { grid-column: 1; grid-row: 1 / 3; }
        .bento-cell--top-mid    { grid-column: 2; grid-row: 1; }
        .bento-cell--top-right  { grid-column: 3; grid-row: 1; }
        .bento-cell--bottom-mid { grid-column: 2; grid-row: 2; }
        .bento-cell--bottom-right { grid-column: 3; grid-row: 2; }

        .bento-link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }
        .bento-img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        /* ── HOVER OVERLAY ── */
        .bento-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,17,23,0.88) 0%, rgba(13,17,23,0.15) 50%, transparent 100%);
          transition: opacity 0.38s ease;
          display: flex;
          align-items: flex-end;
          padding: 22px;
          pointer-events: none;
          z-index: 2;
        }
        .bento-overlay-inner { display: flex; flex-direction: column; gap: 3px; }
        .bento-label {
          font-family: var(--font-inter);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: rgba(119,170,200,0.9);
        }
        .bento-name {
          font-family: var(--font-playfair);
          font-size: 1.2rem;
          color: #F5F2ED;
          letter-spacing: -0.01em;
        }
        .bento-cta {
          font-family: var(--font-inter);
          font-size: 0.62rem;
          color: rgba(245,242,237,0.55);
          letter-spacing: 0.06em;
          margin-top: 5px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 280px 230px 230px;
          }
          .bento-cell--large    { grid-column: 1 / 3; grid-row: 1; }
          .bento-cell--top-mid    { grid-column: 1; grid-row: 2; }
          .bento-cell--top-right  { grid-column: 2; grid-row: 2; }
          .bento-cell--bottom-mid { grid-column: 1; grid-row: 3; }
          .bento-cell--bottom-right { grid-column: 2; grid-row: 3; }
        }
        @media (max-width: 540px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(5, 300px);
          }
          .bento-cell--large,
          .bento-cell--top-mid,
          .bento-cell--top-right,
          .bento-cell--bottom-mid,
          .bento-cell--bottom-right {
            grid-column: 1;
            grid-row: auto;
          }
        }
      `}</style>
    </section>
  );
}
