"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { useCursorContext } from "@/lib/cursorContext";
import MagneticButton from "@/components/ui/MagneticButton";
import Footer from "@/components/Footer";

export default function AlbumPage() {
  const params = useParams();
  const router = useRouter();
  const { setState } = useCursorContext();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const lightboxPrev = useCallback(() => {
    if (lightboxIndex === null || !project) return;
    setLightboxIndex(
      (lightboxIndex - 1 + project.albumImages.length) %
        project.albumImages.length,
    );
  }, [lightboxIndex, project]);

  const lightboxNext = useCallback(() => {
    if (lightboxIndex === null || !project) return;
    setLightboxIndex((lightboxIndex + 1) % project.albumImages.length);
  }, [lightboxIndex, project]);

  // Keyboard navigation
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

  if (!project) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F2ED",
          fontFamily: "var(--font-playfair)",
          fontSize: "1.5rem",
          color: "#232323",
        }}
      >
        Album not found.
      </main>
    );
  }

  return (
    <>
      <main>
        {/* ── COVER SECTION ── */}
        <section
          style={{
            position: "relative",
            width: "100%",
            height: "130vh",
            overflow: "hidden",
          }}
        >
          {/* Cover image */}
          <CldImage
            src={project.coverImage}
            alt={`${project.firstName} ${project.lastName} — ${project.type}`}
            fill
            priority={true}
            sizes="100vw"
            format="auto"
            quality="auto"
            style={{ objectFit: "cover", objectPosition: "center" }}
            placeholder="blur"
            blurDataURL={project.coverImageBlur}
          />

          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
              zIndex: 1,
            }}
          />

          {/* Centered text */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(48px, 6vw, 96px)",
              left: 0,
              right: 0,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.5em",
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                marginBottom: "20px",
              }}
            >
              {project.type}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3rem, 7vw, 7vw)",
                color: "#ffffff",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              {project.firstName} {project.lastName}
            </h1>
          </div>

          {/* Prev / Next circular buttons */}
          {prevProject && (
            <div
              style={{
                position: "absolute",
                bottom: "clamp(24px, 4vw, 48px)",
                left: "clamp(24px, 5vw, 64px)",
                zIndex: 3,
              }}
            >
              <MagneticButton>
                <button
                  aria-label="Previous album"
                  onClick={() => router.push(`/albums/${prevProject.id}`)}
                  onMouseEnter={() => setState("visit")}
                  onMouseLeave={() => setState("default")}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.6)",
                    backgroundColor: "transparent",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ←
                </button>
              </MagneticButton>
            </div>
          )}

          {nextProject && (
            <div
              style={{
                position: "absolute",
                bottom: "clamp(24px, 4vw, 48px)",
                right: "clamp(24px, 5vw, 64px)",
                zIndex: 3,
              }}
            >
              <MagneticButton>
                <button
                  aria-label="Next album"
                  onClick={() => router.push(`/albums/${nextProject.id}`)}
                  onMouseEnter={() => setState("visit")}
                  onMouseLeave={() => setState("default")}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.6)",
                    backgroundColor: "transparent",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  →
                </button>
              </MagneticButton>
            </div>
          )}
        </section>

        {/* ── EDITORIAL SECTION ── */}
        <section
          style={{
            backgroundColor: "#F5F2ED",
            padding: "120px clamp(24px, 6vw, 80px)",
          }}
        >
          <div
            style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
          >
            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                lineHeight: 1.85,
                color: "#232323",
              }}
            >
              {project.description}
            </p>

            {/* Divider */}
            <div
              style={{
                width: "60px",
                height: "1px",
                backgroundColor: "#E4E1DB",
                margin: "48px auto",
              }}
            />

            {/* 3-column metadata */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "32px",
              }}
            >
              {[
                { label: "Venue", value: project.venue },
                { label: "Location", value: project.location },
                { label: "Format", value: project.format },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      color: "rgba(35,35,35,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "1rem",
                      color: "#232323",
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MASONRY GRID ── */}
        <section
          style={{
            backgroundColor: "#F5F2ED",
            padding: "0 clamp(16px, 4vw, 48px) 80px",
          }}
        >
          <div className="masonry-grid">
            {project.albumImages.map((img, i) => (
              <div
                key={i}
                className="masonry-item"
                onClick={() => openLightbox(i)}
                onMouseEnter={() => setState("view")}
                onMouseLeave={() => setState("default")}
                role="button"
                tabIndex={0}
                aria-label={`Open image ${i + 1} of ${project.albumImages.length}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox(i);
                }}
              >
                <CldImage
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  format="auto"
                  quality="auto"
                  style={{ width: "100%", height: "auto", display: "block" }}
                  placeholder="blur"
                  blurDataURL={img.blur}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX ── */}
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
                src={project.albumImages[lightboxIndex].src}
                alt={project.albumImages[lightboxIndex].alt}
                width={project.albumImages[lightboxIndex].width}
                height={project.albumImages[lightboxIndex].height}
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
              {String(project.albumImages.length).padStart(2, "0")}
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

      <style>{`
        .masonry-grid {
          columns: 1;
          column-gap: 10px;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 10px;
          border-radius: 6px;
          overflow: hidden;
          display: block;
          cursor: none;
        }
        @media (min-width: 768px) {
          .masonry-grid {
            columns: 2;
          }
        }
        @media (min-width: 1200px) {
          .masonry-grid {
            columns: 3;
          }
        }
      `}</style>
    </>
  );
}
