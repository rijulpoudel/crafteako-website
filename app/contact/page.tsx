"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorContext } from "@/lib/cursorContext";
import Footer from "@/components/Footer";

const EVENT_TYPES = [
  "Wedding",
  "Graduation",
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

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  eventType: "",
  date: "",
  message: "",
};

export default function ContactPage() {
  const { setState } = useCursorContext();
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [focused, setFocused] = useState<keyof FormFields | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: fields.name,
          email: fields.email,
          eventType: fields.eventType,
          date: fields.date,
          message: fields.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFormState("success");
        setFields(INITIAL_FIELDS);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      setFormState("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  // Shared field wrapper style
  const fieldWrapper = (name: keyof FormFields): React.CSSProperties => ({
    borderBottom: `1px solid ${focused === name ? "#232323" : "#E4E1DB"}`,
    paddingBottom: "16px",
    marginBottom: "32px",
    transition: "border-color 0.3s ease",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-inter)",
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "rgba(35,35,35,0.5)",
    marginBottom: "10px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "var(--font-playfair)",
    fontSize: "1.1rem",
    color: "#232323",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: 0,
  };

  return (
    <>
      <main
        style={{
          backgroundColor: "#F5F2ED",
          minHeight: "100vh",
          paddingTop: "120px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(24px, 6vw, 80px)",
          }}
          className="contact-layout"
        >
          {/* ── LEFT: sticky editorial copy ── */}
          <div className="contact-left">
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                lineHeight: 1.05,
                color: "#232323",
                fontWeight: 400,
                whiteSpace: "pre-line",
              }}
            >
              {"Let's Create\nSomething\nBeautiful"}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                color: "rgba(35,35,35,0.6)",
                lineHeight: 1.7,
                marginTop: "24px",
                maxWidth: "380px",
              }}
            >
              Tell us about your story. We take on a limited number of sessions
              each season to ensure every client receives our full creative
              attention.
            </p>

            <div
              style={{
                marginTop: "48px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8rem",
                  color: "#232323",
                }}
              >
                📧 hello@crafteako.com
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8rem",
                  color: "#232323",
                }}
              >
                📍 Available worldwide
              </p>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="contact-right">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    textAlign: "center",
                    padding: "80px 0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontStyle: "italic",
                      fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                      color: "#232323",
                      lineHeight: 1.6,
                    }}
                  >
                    Thank you — we&apos;ll be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  {/* Full Name */}
                  <div style={fieldWrapper("name")}>
                    <label htmlFor="name" style={labelStyle}>
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={fields.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle}
                      aria-label="Full Name"
                    />
                  </div>

                  {/* Email */}
                  <div style={fieldWrapper("email")}>
                    <label htmlFor="email" style={labelStyle}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle}
                      aria-label="Email Address"
                    />
                  </div>

                  {/* Event Type */}
                  <div style={fieldWrapper("eventType")}>
                    <label htmlFor="eventType" style={labelStyle}>
                      Event Type
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        value={fields.eventType}
                        onChange={handleChange}
                        onFocus={() => setFocused("eventType")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle,
                          appearance: "none",
                          WebkitAppearance: "none",
                          paddingRight: "24px",
                        }}
                        aria-label="Event Type"
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {EVENT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {/* Custom chevron */}
                      <span
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.75rem",
                          color: "rgba(35,35,35,0.4)",
                        }}
                      >
                        ↓
                      </span>
                    </div>
                  </div>

                  {/* Event Date */}
                  <div style={fieldWrapper("date")}>
                    <label htmlFor="date" style={labelStyle}>
                      Event Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={fields.date}
                      onChange={handleChange}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle}
                      aria-label="Event Date"
                    />
                  </div>

                  {/* Message */}
                  <div style={fieldWrapper("message")}>
                    <label htmlFor="message" style={labelStyle}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, resize: "none", lineHeight: 1.7 }}
                      aria-label="Message"
                    />
                  </div>

                  {/* Error message */}
                  {formState === "error" && (
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.75rem",
                        color: "#c0392b",
                        marginBottom: "16px",
                      }}
                    >
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit button */}
                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      onMouseEnter={() => setState("book")}
                      onMouseLeave={() => setState("default")}
                      style={{
                        width: "100%",
                        backgroundColor: "#232323",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-playfair)",
                        fontStyle: "italic",
                        fontSize: "1rem",
                        letterSpacing: "0.05em",
                        padding: "18px 0",
                        borderRadius: "4px",
                        border: "1px solid #232323",
                        transition:
                          "background-color 0.4s ease, color 0.4s ease",
                        opacity: formState === "submitting" ? 0.6 : 1,
                      }}
                      className="contact-submit"
                      aria-label="Submit enquiry"
                    >
                      {formState === "submitting" ? "Sending…" : "Send Enquiry"}
                    </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: clamp(40px, 6vw, 100px);
          align-items: start;
        }
        .contact-left {
          position: sticky;
          top: 140px;
        }
        .contact-submit:hover {
          background-color: #F5F2ED !important;
          color: #232323 !important;
        }
        @media (max-width: 767px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .contact-left {
            position: static;
          }
        }
      `}</style>
    </>
  );
}
