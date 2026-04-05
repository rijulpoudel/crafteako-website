"use client";

// Pure-CSS infinite marquee — no JS overhead, silky smooth 60fps
// Two rows scrolling in opposite directions, showing real grad names + "Your Name"

const ROW_1 = [
  "Xavier Murray",
  "Sagar Shrestha",
  "Paper Plane",
  "Bijay Tiwari",
  "Sneha Shrestha",
  "Sarthak Baral",
  "Your Name",
];

const ROW_2 = [
  "Class of 2026",
  "Graduation",
  "Portraits",
  "Lawrence KS",
  "Ceremonies",
  "Photography & Film",
  "Book Now",
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 45,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        height: "52px",
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        className={`marquee-track marquee-track--${direction}`}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((name, i) => (
          <span key={i} className="marquee-item">
            <span className={name === "Your Name" || name === "Book Now" ? "marquee-item--accent" : ""}>
              {name}
            </span>
            <span className="marquee-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function NameMarquee() {
  return (
    <section
      style={{
        backgroundColor: "#111111",
        paddingTop: "1px",
        paddingBottom: "1px",
        overflow: "hidden",
      }}
    >
      {/* Top divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(200,169,110,0.3), transparent)",
          marginBottom: "0",
        }}
      />

      <div style={{ padding: "28px 0", display: "flex", flexDirection: "column", gap: "0px" }}>
        <MarqueeRow items={ROW_1} direction="left"  speed={50} />
        <MarqueeRow items={ROW_2} direction="right" speed={40} />
      </div>

      {/* Bottom divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(200,169,110,0.3), transparent)",
        }}
      />

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }

        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
        }
        .marquee-track--left {
          animation: marquee-left var(--speed, 45s) linear infinite;
        }
        .marquee-track--right {
          animation: marquee-right var(--speed, 45s) linear infinite;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 8px;
          white-space: nowrap;
          font-family: var(--font-playfair);
          font-size: clamp(0.95rem, 1.4vw, 1.25rem);
          font-weight: 400;
          letter-spacing: 0.01em;
          color: rgba(245, 242, 237, 0.28);
          transition: color 0.3s ease;
        }
        .marquee-item:hover {
          color: rgba(245, 242, 237, 0.55);
        }
        .marquee-item--accent {
          color: rgba(200, 169, 110, 0.7);
          font-style: italic;
        }
        .marquee-sep {
          font-size: 0.35rem;
          color: rgba(200, 169, 110, 0.35);
          vertical-align: middle;
        }

        /* Pause on hover */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
