"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { useCursorContext } from "@/lib/cursorContext";
import Footer from "@/components/Footer";

// Stable hash function for deterministic shuffle
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return hash;
}

export default function PortfolioPage() {
  const { setState } = useCursorContext();

  const portfolioImages = useMemo(() => {
    // 1. Create shuffled pools of images per project
    const projectPools = projects.map((p) => {
      const imgs = p.albumImages.map((img) => ({
        ...img,
        projectName: `${p.firstName} ${p.lastName}`,
        projectType: p.type,
      }));
      // Deterministically mix up the images within the project itself
      imgs.sort((a, b) => hashString(a.src) - hashString(b.src));
      return imgs;
    });

    const selected = [];
    let poolIndex = 0;

    // 2. Round-robin interleave to guarantee projects never bunch together
    while (selected.length < 50) {
      // Break if all pools are completely exhausted
      if (projectPools.every((pool) => pool.length === 0)) break;

      const currentPool = projectPools[poolIndex];
      if (currentPool.length > 0) {
        selected.push(currentPool.shift()!);
      }

      poolIndex = (poolIndex + 1) % projectPools.length;
    }

    return selected;
  }, []);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const lightboxPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + portfolioImages.length) % portfolioImages.length
    );
  }, [lightboxIndex, portfolioImages.length]);

  const lightboxNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % portfolioImages.length);
  }, [lightboxIndex, portfolioImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, lightboxPrev, lightboxNext]);

  return (
    <>
      <main style={{ backgroundColor: "#F5F2ED", minHeight: "100vh", paddingTop: "140px" }}>
        
        {/* ── HEADER ── */}
        <section style={{ textAlign: "center", padding: "0 24px", marginBottom: "80px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              color: "#232323",
              marginBottom: "24px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "rgba(35,35,35,0.7)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            A selection of work across weddings, graduations, events & portraits.
          </motion.p>
        </section>

        {/* ── MASONRY GRID ── */}
        <section style={{ padding: "0 clamp(16px, 4vw, 48px) 120px" }}>
          <div className="masonry-grid">
            {portfolioImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="masonry-item portfolio-item"
                onClick={() => openLightbox(i)}
                onMouseEnter={() => setState("view")}
                onMouseLeave={() => setState("default")}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.projectName} from ${img.projectType}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox(i);
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                  <CldImage
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    format="auto"
                    quality="auto"
                    className="portfolio-image"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    placeholder="blur"
                    blurDataURL={img.blur}
                    loading="lazy"
                  />
                  <div className="portfolio-overlay">
                    <span className="portfolio-title">{img.projectName}</span>
                    <span className="portfolio-category">{img.projectType}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX (Hooking into Project Lightbox Patterns) ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(35,35,35,0.96)",
              zIndex: 9000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "5vh 5vw",
            }}
            aria-label="Image lightbox — press Escape to close"
            role="dialog"
          >
            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxHeight: "80vh",
                maxWidth: "90vw",
                borderRadius: "4px",
                overflow: "hidden",
                lineHeight: 0,
              }}
            >
              <CldImage
                src={portfolioImages[lightboxIndex].src}
                alt={portfolioImages[lightboxIndex].alt}
                width={portfolioImages[lightboxIndex].width}
                height={portfolioImages[lightboxIndex].height}
                format="auto"
                quality="auto"
                style={{
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
                priority
              />
            </motion.div>

            {/* Caption */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                marginTop: "16px",
                letterSpacing: "0.1em",
              }}
            >
              {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {String(portfolioImages.length).padStart(2, "0")}
            </p>

            {/* Navigation chevrons */}
            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrev();
              }}
              style={{
                position: "fixed",
                left: "clamp(16px, 3vw, 40px)",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#FFFFFF",
                fontFamily: "var(--font-playfair)",
                fontSize: "2rem",
                lineHeight: 1,
                opacity: 0.7,
                transition: "opacity 0.2s",
                zIndex: 9001,
                padding: "8px",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")
              }
            >
              ‹
            </button>

            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
              style={{
                position: "fixed",
                right: "clamp(16px, 3vw, 40px)",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#FFFFFF",
                fontFamily: "var(--font-playfair)",
                fontSize: "2rem",
                lineHeight: 1,
                opacity: 0.7,
                transition: "opacity 0.2s",
                zIndex: 9001,
                padding: "8px",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")
              }
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* ── CSS STYLES ── */}
      <style>{`
        .masonry-grid {
          columns: 1;
          column-gap: 12px;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 12px;
          border-radius: 4px;
          overflow: hidden;
          display: block;
          cursor: none; /* Let custom cursor handle it */
        }
        @media (min-width: 768px) {
          .masonry-grid {
            columns: 2;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            columns: 3;
          }
        }
        
        .portfolio-item .portfolio-image {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-item:hover .portfolio-image {
          transform: scale(1.04);
        }
        
        /* Subtle overlay with text at bottom */
        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 40%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          pointer-events: none;
        }
        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }
        
        /* Typography pops up gracefully on hover */
        .portfolio-title {
          font-family: var(--font-playfair);
          color: #ffffff;
          font-size: 1.4rem;
          margin-bottom: 4px;
          transform: translateY(12px);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-category {
          font-family: var(--font-inter);
          color: rgba(255,255,255,0.8);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transform: translateY(12px);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
        }
        .portfolio-item:hover .portfolio-title,
        .portfolio-item:hover .portfolio-category {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
