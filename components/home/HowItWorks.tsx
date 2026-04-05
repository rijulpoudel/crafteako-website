"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Book your session",
    body: "Fill out a quick form with your date, location, and package. We'll confirm within 24 hours and lock in your spot before it's gone.",
    icon: "📅",
  },
  {
    number: "02",
    title: "Show up and shine",
    body: "We handle the direction. You handle looking great. Expect a relaxed, guided session that actually feels fun — not stiff.",
    icon: "📸",
  },
  {
    number: "03",
    title: "Receive your gallery",
    body: "Your edited photos land in your inbox within the delivery window — ready to post, print, and share for the rest of your life.",
    icon: "✨",
  },
];

// Counter animation for the stats
function StatCounter({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="stat-value">{value}<span className="stat-suffix">{suffix}</span></span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section className="hiw-section">

      {/* ── STATS ROW ── */}
      <div className="hiw-stats">
        <StatCounter value="100" suffix="+"  label="sessions shot" />
        <StatCounter value="5★"  suffix=""   label="average rating" />
        <StatCounter value="24"  suffix="hr" label="gallery delivery" />
        <StatCounter value="2022" suffix=""  label="est. Lawrence, KS" />
      </div>

      {/* ── DIVIDER ── */}
      <div className="hiw-divider" />

      {/* ── HOW IT WORKS ── */}
      <div className="hiw-header">
        <motion.p
          className="hiw-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Process
        </motion.p>
        <motion.h2
          className="hiw-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Three steps.
          <br />
          <em>One unforgettable set of photos.</em>
        </motion.h2>
      </div>

      <div className="hiw-steps">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            className="hiw-step"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hiw-step-num">{step.number}</div>
            <div className="hiw-step-content">
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-body">{step.body}</p>
            </div>
            {i < STEPS.length - 1 && <div className="hiw-step-arrow">→</div>}
          </motion.div>
        ))}
      </div>

      <style>{`
        .hiw-section {
          background: #F5F2ED;
          padding: clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px);
          overflow: hidden;
        }

        /* ── STATS ── */
        .hiw-stats {
          display: flex;
          justify-content: center;
          gap: clamp(40px, 6vw, 100px);
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto 72px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }
        .stat-value {
          font-family: var(--font-playfair);
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: #1a1a1a;
          line-height: 1;
        }
        .stat-suffix {
          font-style: italic;
          font-size: 0.7em;
          color: rgba(35,35,35,0.5);
        }
        .stat-label {
          font-family: var(--font-inter);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(35,35,35,0.45);
        }

        .hiw-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #E4E1DB, transparent);
          max-width: 900px;
          margin: 0 auto 80px;
        }

        /* ── HEADER ── */
        .hiw-header {
          max-width: 600px;
          margin: 0 auto 64px;
          text-align: center;
        }
        .hiw-eyebrow {
          font-family: var(--font-inter);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(35,35,35,0.4);
          margin-bottom: 18px;
        }
        .hiw-heading {
          font-family: var(--font-playfair);
          font-size: clamp(2.2rem, 4vw, 3.6rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: #1a1a1a;
          line-height: 1.2;
        }
        .hiw-heading em {
          color: rgba(35,35,35,0.5);
        }

        /* ── STEPS ── */
        .hiw-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .hiw-step {
          padding: clamp(28px, 3vw, 44px) clamp(24px, 3vw, 40px);
          border-left: 1px solid #E4E1DB;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hiw-step:first-child {
          border-left: none;
        }

        .hiw-step-num {
          font-family: var(--font-playfair);
          font-style: italic;
          font-size: clamp(3rem, 5vw, 5rem);
          color: rgba(35,35,35,0.08);
          line-height: 1;
          letter-spacing: -0.04em;
          user-select: none;
        }

        .hiw-step-content {
          flex: 1;
        }
        .hiw-step-title {
          font-family: var(--font-playfair);
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin: 0 0 12px;
        }
        .hiw-step-body {
          font-family: var(--font-inter);
          font-size: 0.85rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(35,35,35,0.6);
        }

        .hiw-step-arrow {
          position: absolute;
          top: 50%;
          right: -13px;
          transform: translateY(-50%);
          z-index: 2;
          font-size: 1rem;
          color: rgba(35,35,35,0.2);
          background: #F5F2ED;
          padding: 4px;
        }

        @media (max-width: 767px) {
          .hiw-steps {
            grid-template-columns: 1fr;
          }
          .hiw-step {
            border-left: none;
            border-top: 1px solid #E4E1DB;
            padding: 28px 0;
          }
          .hiw-step:first-child {
            border-top: none;
          }
          .hiw-step-arrow {
            display: none;
          }
          .hiw-stats {
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
