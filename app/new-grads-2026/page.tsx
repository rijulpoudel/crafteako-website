"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import Footer from "@/components/Footer";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k=";

// A curated selection of graduation photos for the gallery strip
const GRAD_GALLERY = [
  { src: "crafteako/projects/xavier/img-01", alt: "Xavier graduation photo 1" },
  { src: "crafteako/projects/paperplane/img-02", alt: "Graduation portrait 2" },
  { src: "crafteako/projects/bijay/img-01", alt: "Bijay graduation photo 1" },
  { src: "crafteako/projects/xavier/img-04", alt: "Xavier graduation photo 4" },
  { src: "crafteako/projects/paperplane/img-05", alt: "Graduation portrait 5" },
  { src: "crafteako/projects/xavier/img-08", alt: "Xavier graduation photo 8" },
  { src: "crafteako/projects/bijay/img-04", alt: "Bijay graduation photo 4" },
  { src: "crafteako/projects/paperplane/img-09", alt: "Graduation portrait 9" },
  { src: "crafteako/projects/xavier/img-12", alt: "Xavier graduation photo 12" },
];

export default function NewGradsPage() {
  return (
    <main
      style={{
        backgroundColor: "#F5F2ED",
        minHeight: "100vh",
        color: "#232323",
        paddingTop: "140px",
      }}
    >
      {/* ── HERO SECTION ── */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 clamp(24px, 5vw, 64px)",
          marginBottom: "100px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            backgroundColor: "#DAA520", // Warm gold tone
            color: "#1A1A1A",
            padding: "8px 24px",
            borderRadius: "50px",
            fontFamily: "var(--font-inter)",
            fontSize: "0.85rem",
            fontWeight: 500,
            marginBottom: "32px",
            boxShadow: "0 4px 12px rgba(218, 165, 32, 0.2)",
          }}
        >
          🎉 Limited-Time: 10% off all packages when booked before May 1st — use code <span style={{ fontWeight: 700 }}>GRAD2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "24px",
          }}
        >
          New Grads 2026 🎓
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            fontWeight: 300,
            color: "rgba(35,35,35,0.7)",
          }}
        >
          Your moment. Your story. Captured forever.
        </motion.p>
      </section>

      {/* ── PRICING SECTION ── */}
      <section
        style={{
          padding: "0 clamp(24px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "120px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "16px",
            }}
          >
            Graduation Photography Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1.1rem",
              color: "rgba(35,35,35,0.6)",
            }}
          >
            Transparent pricing. No surprises. Just stunning photos.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "stretch",
          }}
        >
          {/* Card 1: The Classic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "48px 32px",
              borderRadius: "4px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", marginBottom: "8px" }}>The Classic</h3>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "2rem", fontWeight: 300, marginBottom: "16px" }}>$199</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(35,35,35,0.6)", marginBottom: "32px", minHeight: "60px" }}>
              For the graduate who wants clean, timeless shots.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, flexGrow: 1, fontFamily: "var(--font-inter)", fontSize: "0.95rem", lineHeight: 1.6, color: "#232323", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>✓ 1-Hour Session at 1 campus location</li>
              <li>✓ 15 Fully Edited High-Resolution Images</li>
              <li>✓ Online gallery with print release</li>
              <li style={{ color: "rgba(35,35,35,0.5)", marginTop: "auto", paddingTop: "24px" }}>Turnaround: 5–7 business days</li>
            </ul>
          </motion.div>

          {/* Card 2: The Signature (Highlighted text match the logo color typically or stand out) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{
              backgroundColor: "#344D66", // Brand primary dark
              color: "#FFFFFF",
              padding: "48px 32px",
              borderRadius: "4px",
              boxShadow: "0 12px 32px rgba(52, 77, 102, 0.2)",
              display: "flex",
              flexDirection: "column",
              transform: "scale(1.02)",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#DAA520", color: "#1A1A1A", padding: "6px 16px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ⭐ Most Popular
            </div>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", marginBottom: "8px" }}>The Signature</h3>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "2rem", fontWeight: 300, marginBottom: "16px", color: "#F5F2ED" }}>$379</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginBottom: "32px", minHeight: "60px" }}>
              Multiple outfits, golden hour, and real editorial magic.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, flexGrow: 1, fontFamily: "var(--font-inter)", fontSize: "0.95rem", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>✓ 1.5–2 Hour Session at 3 campus locations</li>
              <li>✓ 45 Fully Edited High-Resolution Images</li>
              <li>✓ Off-camera cinematic lighting setup</li>
              <li>✓ 1 complimentary 8×10 fine art print</li>
              <li>✓ Sunset/golden hour included (weather perm.)</li>
              <li style={{ color: "rgba(255,255,255,0.6)", marginTop: "auto", paddingTop: "24px" }}>Turnaround: 5–7 business days</li>
            </ul>
          </motion.div>

          {/* Card 3: The Heirloom Group */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "48px 32px",
              borderRadius: "4px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", marginBottom: "8px" }}>The Heirloom Group</h3>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "2rem", fontWeight: 300 }}>$549</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "rgba(35,35,35,0.5)", marginLeft: "8px" }}>(up to 4 people)</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(35,35,35,0.6)", marginBottom: "32px", minHeight: "60px" }}>
              Bring the crew. Split the cost. Keep the memories.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, flexGrow: 1, fontFamily: "var(--font-inter)", fontSize: "0.95rem", lineHeight: 1.6, color: "#232323", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>✓ Up to 2 Hours with full campus tour coverage</li>
              <li>✓ 90–130 Edited Images (solos + group shots)</li>
              <li>✓ $75 print or album credit included</li>
              <li>✓ Extra guests: +$40/person</li>
              <li>✓ Behind-the-scenes reel (short video)</li>
              <li style={{ color: "rgba(35,35,35,0.5)", marginTop: "auto", paddingTop: "24px" }}>Turnaround: 7–10 business days</li>
            </ul>
          </motion.div>
        </div>

        {/* Small note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginTop: "64px",
            fontFamily: "var(--font-inter)",
            fontSize: "0.85rem",
            color: "rgba(35,35,35,0.5)",
            fontStyle: "italic",
          }}
        >
          *All packages include: personal print release, private online gallery, and a pre-shoot style consult call.
        </motion.p>
      </section>

      {/* ── CAPTURED MOMENTS GALLERY ── */}
      <section
        style={{
          padding: "0 clamp(24px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto 120px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "rgba(35,35,35,0.5)",
              marginBottom: "16px",
            }}
          >
            Our Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Captured Moments
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          {GRAD_GALLERY.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
              style={{
                position: "relative",
                aspectRatio: i % 3 === 1 ? "3/4" : "4/5",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <CldImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                format="auto"
                quality="auto"
                style={{ objectFit: "cover", objectPosition: "center" }}
                placeholder="blur"
                blurDataURL={BLUR}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "48px" }}
        >
          <Link
            href="/portfolio"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#232323",
              textDecoration: "none",
              borderBottom: "1px solid rgba(35,35,35,0.4)",
              paddingBottom: "2px",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#232323"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(35,35,35,0.4)"; }}
          >
            View Full Portfolio
          </Link>
        </motion.div>
      </section>

      {/* ── BOOK CTA SECTION ── */}
      <section
        style={{
          backgroundColor: "#232323", // Contrasting dark block at the bottom
          color: "#FFFFFF",
          padding: "120px clamp(24px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            marginBottom: "40px",
          }}
        >
          Ready to make it official?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "#344D66", // Consistent with logo/brand
              color: "#FFFFFF",
              fontFamily: "var(--font-inter)",
              fontSize: "0.95rem",
              fontWeight: 500,
              textDecoration: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#24374B";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#344D66";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Book Your Session
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
