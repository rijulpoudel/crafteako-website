"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCursorContext } from "@/lib/cursorContext";
import Footer from "@/components/Footer";

const EVENT_TYPES = [
  "Graduation",
  "Wedding",
  "Senior Portrait",
  "Event",
  "Music Video",
  "Other",
];

type FormState = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  eventType: string;
  date: string;
  message: string;
}

const INITIAL: FormFields = { name: "", email: "", eventType: "", date: "", message: "" };

export default function ContactPage() {
  const { setState } = useCursorContext();
  const [fields, setFields] = useState<FormFields>(INITIAL);
  const [focused, setFocused] = useState<keyof FormFields | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...fields,
        }),
      });
      const data = await res.json();
      if (data.success) { setFormState("success"); setFields(INITIAL); }
      else throw new Error(data.message || "Submission failed");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const isActive = (f: keyof FormFields) => focused === f || fields[f] !== "";

  return (
    <>
      {/* ── DARK HERO ── */}
      <section className="ct-hero">
        <div className="ct-hero-inner">
          <motion.p
            className="ct-hero-label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Lawrence, KS · Est. 2022
          </motion.p>
          <div style={{ overflow: "hidden", paddingBottom: "0.15em", marginBottom: "-0.15em" }}>
            <motion.h1
              className="ct-hero-title"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Let&apos;s talk.
            </motion.h1>
          </div>
          <motion.p
            className="ct-hero-sub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            We take on a limited number of sessions each season so every client
            gets our full attention. Tell us about your day.
          </motion.p>
        </div>
      </section>

      {/* ── MAIN BODY ── */}
      <main className="ct-main">
        <div className="ct-grid">

          {/* ── LEFT: Studio info ── */}
          <aside className="ct-info">
            <div className="ct-info-block">
              <p className="ct-info-label">Studio</p>
              <p className="ct-info-value">Crafteako</p>
            </div>
            <div className="ct-info-block">
              <p className="ct-info-label">Based in</p>
              <p className="ct-info-value">Lawrence, KS</p>
              <p className="ct-info-note">Available for travel</p>
            </div>
            <div className="ct-info-block">
              <p className="ct-info-label">Email</p>
              <a href="mailto:hello@crafteako.com" className="ct-info-link">
                hello@crafteako.com
              </a>
            </div>
            <div className="ct-info-block">
              <p className="ct-info-label">Instagram</p>
              <a
                href="https://instagram.com/crafteako"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-info-link"
              >
                @crafteako
              </a>
            </div>
            <div className="ct-info-block">
              <p className="ct-info-label">Response time</p>
              <p className="ct-info-value">Within 24 hours</p>
            </div>

            <div className="ct-divider" />

            <p className="ct-info-quote">
              &ldquo;We don&apos;t just capture your day.
              <br />
              We tell your story.&rdquo;
            </p>

            <Link href="/portfolio" className="ct-portfolio-link">
              View our portfolio →
            </Link>
          </aside>

          {/* ── RIGHT: Form ── */}
          <div className="ct-form-panel">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="ct-success"
                >
                  <div className="ct-success-check">✓</div>
                  <h2 className="ct-success-title">Message sent.</h2>
                  <p className="ct-success-body">
                    Thank you — we&apos;ll be in touch within 24 hours to confirm
                    your details and hold your date.
                  </p>
                  <Link href="/portfolio" className="ct-success-link">
                    Browse the portfolio while you wait →
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  noValidate
                  className="ct-form"
                >
                  {/* Name */}
                  <div className={`ct-field ${isActive("name") ? "ct-field--active" : ""} ${focused === "name" ? "ct-field--focused" : ""}`}>
                    <label htmlFor="ct-name" className="ct-label">Full Name</label>
                    <input
                      id="ct-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={fields.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className="ct-input"
                    />
                    <div className="ct-line" />
                  </div>

                  {/* Email */}
                  <div className={`ct-field ${isActive("email") ? "ct-field--active" : ""} ${focused === "email" ? "ct-field--focused" : ""}`}>
                    <label htmlFor="ct-email" className="ct-label">Email Address</label>
                    <input
                      id="ct-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="ct-input"
                    />
                    <div className="ct-line" />
                  </div>

                  {/* Two-col row: type + date */}
                  <div className="ct-row">
                    <div className={`ct-field ${isActive("eventType") ? "ct-field--active" : ""} ${focused === "eventType" ? "ct-field--focused" : ""}`}>
                      <label htmlFor="ct-eventType" className="ct-label">Session type</label>
                      <div style={{ position: "relative" }}>
                        <select
                          id="ct-eventType"
                          name="eventType"
                          required
                          value={fields.eventType}
                          onChange={handleChange}
                          onFocus={() => setFocused("eventType")}
                          onBlur={() => setFocused(null)}
                          className="ct-input ct-select"
                        >
                          <option value="" disabled />
                          {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <span className="ct-chevron">↓</span>
                      </div>
                      <div className="ct-line" />
                    </div>

                    <div className={`ct-field ${isActive("date") ? "ct-field--active" : ""} ${focused === "date" ? "ct-field--focused" : ""}`}>
                      <label htmlFor="ct-date" className="ct-label">Preferred date</label>
                      <input
                        id="ct-date"
                        name="date"
                        type="date"
                        value={fields.date}
                        onChange={handleChange}
                        onFocus={() => setFocused("date")}
                        onBlur={() => setFocused(null)}
                        className="ct-input"
                      />
                      <div className="ct-line" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`ct-field ${isActive("message") ? "ct-field--active" : ""} ${focused === "message" ? "ct-field--focused" : ""}`}>
                    <label htmlFor="ct-message" className="ct-label">Tell us about your vision</label>
                    <textarea
                      id="ct-message"
                      name="message"
                      required
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className="ct-input ct-textarea"
                    />
                    <div className="ct-line" />
                  </div>

                  {formState === "error" && (
                    <p className="ct-error">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    onMouseEnter={() => setState("book")}
                    onMouseLeave={() => setState("default")}
                    className="ct-submit"
                  >
                    {formState === "submitting" ? (
                      <span className="ct-submit-spinner">Sending…</span>
                    ) : (
                      <>Send enquiry<span className="ct-submit-arrow">→</span></>
                    )}
                  </button>

                  <p className="ct-form-note">
                    No deposit required to hold your date. We&apos;ll confirm within 24 hours.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        /* ── HERO ── */
        .ct-hero {
          background: #0d1117;
          padding: 160px clamp(24px, 8vw, 120px) 100px;
          overflow: hidden;
        }
        .ct-hero-inner {
          max-width: 680px;
        }
        .ct-hero-label {
          font-family: var(--font-inter);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.38em;
          color: rgba(52,77,102,0.8);
          margin-bottom: 24px;
        }
        .ct-hero-title {
          font-family: var(--font-playfair);
          font-size: clamp(4rem, 9vw, 9rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: #F5F2ED;
          margin: 0 0 32px;
          display: block;
        }
        .ct-hero-sub {
          font-family: var(--font-inter);
          font-size: clamp(0.88rem, 1.2vw, 1.05rem);
          font-weight: 300;
          line-height: 1.75;
          color: rgba(245,242,237,0.48);
          max-width: 480px;
        }

        /* ── MAIN ── */
        .ct-main {
          background: #F5F2ED;
          padding: clamp(72px, 9vw, 120px) clamp(24px, 8vw, 120px) 0;
        }
        .ct-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 36% 1fr;
          gap: clamp(48px, 6vw, 120px);
          align-items: start;
          padding-bottom: clamp(80px, 10vw, 140px);
        }

        /* ── INFO ASIDE ── */
        .ct-info {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ct-info-block {
          padding: 20px 0;
          border-bottom: 1px solid #E4E1DB;
        }
        .ct-info-block:first-child { padding-top: 0; }
        .ct-info-label {
          font-family: var(--font-inter);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.32em;
          color: rgba(35,35,35,0.38);
          margin-bottom: 6px;
        }
        .ct-info-value {
          font-family: var(--font-inter);
          font-size: 0.92rem;
          color: #232323;
          font-weight: 300;
        }
        .ct-info-note {
          font-family: var(--font-inter);
          font-size: 0.75rem;
          color: rgba(35,35,35,0.42);
          margin-top: 3px;
        }
        .ct-info-link {
          font-family: var(--font-inter);
          font-size: 0.92rem;
          color: #344D66;
          text-decoration: none;
          font-weight: 300;
          border-bottom: 1px solid rgba(52,77,102,0.3);
          transition: border-color 0.25s ease;
          display: inline-block;
          padding-bottom: 1px;
        }
        .ct-info-link:hover { border-color: #344D66; }

        .ct-divider {
          height: 1px;
          background: #E4E1DB;
          margin: 32px 0 28px;
        }
        .ct-info-quote {
          font-family: var(--font-playfair);
          font-style: italic;
          font-size: 1rem;
          color: rgba(35,35,35,0.55);
          line-height: 1.65;
          margin-bottom: 24px;
        }
        .ct-portfolio-link {
          font-family: var(--font-inter);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #344D66;
          text-decoration: none;
          border-bottom: 1px solid rgba(52,77,102,0.3);
          display: inline-block;
          padding-bottom: 2px;
          transition: border-color 0.25s;
          width: fit-content;
        }
        .ct-portfolio-link:hover { border-color: #344D66; }

        /* ── FORM ── */
        .ct-form-panel {}
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .ct-field {
          position: relative;
          padding-bottom: 8px;
          margin-bottom: 36px;
        }
        .ct-label {
          display: block;
          font-family: var(--font-inter);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: rgba(35,35,35,0.42);
          margin-bottom: 10px;
          transition: color 0.25s ease;
        }
        .ct-field--focused .ct-label { color: #344D66; }
        .ct-input {
          width: 100%;
          font-family: var(--font-playfair);
          font-size: 1.15rem;
          color: #232323;
          background: transparent;
          border: none;
          outline: none;
          padding: 0;
          display: block;
        }
        .ct-select {
          appearance: none;
          -webkit-appearance: none;
          padding-right: 20px;
        }
        .ct-chevron {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.7rem;
          color: rgba(35,35,35,0.35);
          pointer-events: none;
        }
        .ct-textarea {
          resize: none;
          line-height: 1.75;
        }
        .ct-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #E4E1DB;
          transition: background 0.25s ease;
        }
        .ct-line::after {
          content: "";
          position: absolute;
          inset: 0;
          background: #344D66;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ct-field--focused .ct-line::after { transform: scaleX(1); }

        .ct-error {
          font-family: var(--font-inter);
          font-size: 0.75rem;
          color: #c0392b;
          margin-bottom: 16px;
        }

        .ct-submit {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: #1a1a1a;
          color: #F5F2ED;
          font-family: var(--font-inter);
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 20px 28px;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          margin-top: 8px;
          margin-bottom: 20px;
        }
        .ct-submit:not(:disabled):hover {
          background: transparent;
          color: #1a1a1a;
        }
        .ct-submit:disabled { opacity: 0.55; }
        .ct-submit-arrow {
          transition: transform 0.3s ease;
        }
        .ct-submit:not(:disabled):hover .ct-submit-arrow {
          transform: translateX(5px);
        }

        .ct-form-note {
          font-family: var(--font-inter);
          font-size: 0.65rem;
          color: rgba(35,35,35,0.35);
          letter-spacing: 0.02em;
          line-height: 1.6;
        }

        /* ── SUCCESS ── */
        .ct-success {
          padding: 60px 0 80px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .ct-success-check {
          width: 48px;
          height: 48px;
          border: 1px solid #344D66;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: #344D66;
          margin-bottom: 8px;
        }
        .ct-success-title {
          font-family: var(--font-playfair);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: #1a1a1a;
          margin: 0;
        }
        .ct-success-body {
          font-family: var(--font-inter);
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(35,35,35,0.6);
          max-width: 420px;
        }
        .ct-success-link {
          font-family: var(--font-inter);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #344D66;
          text-decoration: none;
          border-bottom: 1px solid rgba(52,77,102,0.3);
          display: inline-block;
          width: fit-content;
          padding-bottom: 2px;
          transition: border-color 0.25s;
        }
        .ct-success-link:hover { border-color: #344D66; }

        /* ── RESPONSIVE ── */
        @media (max-width: 767px) {
          .ct-hero { padding-top: 130px; padding-bottom: 64px; }
          .ct-grid {
            grid-template-columns: 1fr;
          }
          .ct-info { position: static; }
          .ct-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>
    </>
  );
}
