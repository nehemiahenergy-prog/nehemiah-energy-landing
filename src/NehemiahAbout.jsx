import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

/* ─── BRAND COLORS ─── */
const C = {
  green: "#1BF561",
  darkGreen: "#00AC69",
  olive: "#8DC63F",
  lime: "#BEFF39",
  dark: "#010F12",
  darkBg: "#0B1215",
  light: "#F4F5F7",
  white: "#FFFEFF",
  border: "#E4E7EB",
  muted: "#6B7280",
  mutedDark: "#9CA3AF",
  orange: "#F59E0B",
  blue: "#4285F4",
  textBody: "#4B5563",
};

/* ─── SVG PATHS (from Logo Mark 2) ─── */
const N_MAIN =
  "M 406.16 148.62 L 344.47 319.38 L 324.56 374.46 L 252.37 280.73 L 271.26 231.17 L 311.14 279.16 Z";
const N_ACCENT =
  "M 265.19 342.22 L 189.11 446.65 L 240.92 310.73 Z";
const PAT_M =
  "M 62.36 -5.65 L 40.92 53.68 L 34 72.82 L 8.92 40.25 L 15.48 23.03 L 29.34 39.71 Z";
const PAT_A =
  "M 13.37 61.62 L -13.06 97.91 L 4.94 50.68 Z";

/* ─── SOCIAL URLS (config) ─── */
// TODO: Replace placeholder handles with confirmed ones before launch
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/nehemiah_energy",
  twitter: "https://x.com/nehemiah_energy",
  facebook: "https://facebook.com/nehemiahenergy",
  linkedin: "https://linkedin.com/company/nehemiah-energy",
};

/* ─── REUSABLE COMPONENTS ─── */
function NMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="140 100 320 400"
      aria-hidden="true"
    >
      <path d={N_MAIN} fill={C.green} />
      <path d={N_ACCENT} fill={C.white} />
    </svg>
  );
}

function Pattern({ color = "#1BF561", opacity = 0.04, rows = 8, cols = 10 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${cols * 80} ${rows * 100}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {[...Array(rows)].map((_, r) =>
          [...Array(cols)].map((_, c) => (
            <g
              key={`${r}${c}`}
              transform={`translate(${c * 80}, ${r * 100})`}
            >
              <path d={PAT_M} fill="none" stroke={color} strokeWidth="0.75" />
              <path d={PAT_A} fill="none" stroke={color} strokeWidth="0.75" />
            </g>
          ))
        )}
      </svg>
    </div>
  );
}

function Icon({ kind, size = 24, color = "#010F12", strokeWidth = 2 }) {
  const paths = {
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} />,
    leaf: (
      <>
        <path d="M11 20A7 7 0 014 13c0-2.24.91-4.27 2.37-5.74l1.08-1.08A9.95 9.95 0 0115 4c5.52 0 10 4.48 10 10a10 10 0 01-10 10v-4z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth={strokeWidth} />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth={strokeWidth} fill="none" />
      </>
    ),
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" />
      </>
    ),
    heart: (
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="12" cy="12" r="6" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="12" cy="12" r="2" fill={color} />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" />
      </>
    ),
    arrow: (
      <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={strokeWidth + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    cross: <path d="M12 2v20M5 9h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />,
    flag: (
      <>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
        <line x1="4" y1="22" x2="4" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </>
    ),
    shield: (
      <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
    ),
    sparkle: (
      <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
    ),
    instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
    twitter: (
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
    ),
    facebook: (
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
        <rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="4" cy="4" r="2" stroke={color} strokeWidth={strokeWidth} fill="none" />
      </>
    ),
    quote: (
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 .985 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill={color} />
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      {paths[kind]}
    </svg>
  );
}

/* ─── SCROLL FADE-UP HOOK ─── */
function useFadeUp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function FadeSection({ children, delay = 0, style = {} }) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN ABOUT PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function NehemiahAbout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: C.white,
        fontFamily: "'Space Grotesk', sans-serif",
        color: C.dark,
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .neh-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .neh-container-narrow {
          max-width: 920px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .neh-nav-link {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.15s ease;
          text-decoration: none;
          display: inline-block;
        }
        .neh-nav-link:hover { color: ${C.white}; background: rgba(255,255,255,0.05); }
        .neh-nav-link.active { color: ${C.green}; }

        .neh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 22px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          border: none;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          text-decoration: none;
        }
        .neh-btn:hover { transform: translateY(-1px); }
        .neh-btn-primary {
          background: linear-gradient(135deg, ${C.green}, ${C.darkGreen});
          color: ${C.dark};
          box-shadow: 0 6px 20px rgba(27, 245, 97, 0.25);
        }
        .neh-btn-primary:hover { box-shadow: 0 10px 30px rgba(27, 245, 97, 0.35); }
        .neh-btn-ghost {
          background: transparent;
          color: ${C.white};
          border: 1px solid rgba(255,255,255,0.2);
        }
        .neh-btn-ghost:hover { background: rgba(255,255,255,0.05); }

        .neh-label-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .neh-card {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 24px;
          padding: clamp(28px, 2.6vw, 40px);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .neh-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 48px rgba(1, 15, 18, 0.07);
          border-color: ${C.green}40;
        }

        /* Grid layouts */
        .neh-grid-2 { display: grid; gap: 24px; grid-template-columns: 1fr; }
        .neh-grid-3 { display: grid; gap: 24px; grid-template-columns: 1fr; }
        .neh-grid-4 { display: grid; gap: 16px; grid-template-columns: repeat(2, 1fr); }
        .neh-grid-footer { display: grid; gap: 40px; grid-template-columns: 1fr; }
        .neh-story-layout { display: grid; gap: 48px; grid-template-columns: 1fr; align-items: center; }

        @media (min-width: 700px) {
          .neh-grid-4 { grid-template-columns: repeat(4, 1fr); gap: 20px; }
          .neh-grid-footer { grid-template-columns: 2fr 1fr 1fr 1fr; }
        }
        @media (min-width: 800px) {
          .neh-grid-2 { grid-template-columns: 1fr 1fr; }
          .neh-grid-3 { grid-template-columns: repeat(2, 1fr); }
          .neh-story-layout { grid-template-columns: 1.1fr 0.9fr; gap: 64px; }
        }
        @media (min-width: 1100px) {
          .neh-grid-3 { grid-template-columns: repeat(3, 1fr); }
        }

        .neh-desktop-nav { display: none; }
        @media (min-width: 900px) { .neh-desktop-nav { display: flex; } }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .neh-fade-up {
          animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .neh-footer-link {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.15s ease;
          display: block;
        }
        .neh-footer-link:hover { color: ${C.white}; }

        .neh-social-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          text-decoration: none;
        }
        .neh-social-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <SiteNav />

      <main>
        {/* ═══ HERO ═══ */}
        <section
          style={{
            background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`,
            position: "relative",
            overflow: "hidden",
            paddingTop: "clamp(160px, 16vw, 220px)",
            paddingBottom: "clamp(120px, 14vw, 180px)",
          }}
        >
          <Pattern color={C.green} opacity={0.04} rows={14} cols={16} />

          {/* Radial glow */}
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(900px, 95vw)",
              height: "min(900px, 95vw)",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.green}1A 0%, ${C.green}06 35%, transparent 65%)`,
              pointerEvents: "none",
            }}
          />

          <div
            className="neh-container"
            style={{ position: "relative", zIndex: 2, textAlign: "center" }}
          >
            {/* Location pill */}
            <div
              className="neh-fade-up neh-label-pill"
              style={{
                background: "rgba(27, 245, 97, 0.08)",
                border: "1px solid rgba(27, 245, 97, 0.25)",
                color: C.green,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.green,
                  animation: "pulseDot 1.6s ease-in-out infinite",
                }}
              />
              BUILT IN ACCRA, GHANA
            </div>

            {/* Main headline */}
            <h1
              className="neh-fade-up"
              style={{
                fontSize: "clamp(44px, 7vw, 96px)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: C.white,
                marginBottom: 28,
                animationDelay: "0.1s",
                maxWidth: 1100,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Called to rebuild.
              <br />
              <span style={{ color: C.green }}>Built for Ghana.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="neh-fade-up"
              style={{
                fontSize: "clamp(17px, 1.5vw, 22px)",
                color: "rgba(255, 255, 255, 0.75)",
                maxWidth: 720,
                margin: "0 auto 44px",
                lineHeight: 1.6,
                animationDelay: "0.2s",
              }}
            >
              A fully Ghanaian renewable energy company serving the drivers, the
              riders, the families, and the communities who keep this country
              moving.
            </p>

            {/* CTA buttons */}
            <div
              className="neh-fade-up"
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
                animationDelay: "0.3s",
              }}
            >
              <a className="neh-btn neh-btn-primary" href="#">
                Find a Station
                <Icon kind="arrow" size={14} color={C.dark} />
              </a>
              <a className="neh-btn neh-btn-ghost" href="#mission">
                Read Our Mission
              </a>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.4,
              animation: "floatY 2.5s ease-in-out infinite",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke={C.white}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* ═══ TRUELINE ═══ */}
        <section
          style={{
            background: C.white,
            padding: "clamp(80px, 10vw, 140px) 0",
          }}
        >
          <FadeSection>
            <div className="neh-container-narrow" style={{ textAlign: "center" }}>
              <div
                className="neh-label-pill"
                style={{
                  background: "rgba(27, 245, 97, 0.08)",
                  border: "1px solid rgba(27, 245, 97, 0.25)",
                  color: C.darkGreen,
                  marginBottom: 36,
                }}
              >
                <Icon kind="quote" size={12} color={C.darkGreen} />
                OUR TRUELINE
              </div>

              <h2
                style={{
                  fontSize: "clamp(32px, 4.5vw, 60px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: C.dark,
                  marginBottom: 32,
                  fontStyle: "italic",
                }}
              >
                {"\u201C"}We were called to rebuild,
                <br />
                and we will not build it broken.{"\u201D"}
              </h2>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{ width: 32, height: 1, background: C.darkGreen }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.darkGreen,
                    letterSpacing: 1.5,
                  }}
                >
                  NEHEMIAH ENERGY
                </span>
                <div
                  style={{ width: 32, height: 1, background: C.darkGreen }}
                />
              </div>
            </div>
          </FadeSection>
        </section>

        {/* ═══ OUR STORY ═══ */}
        <section
          style={{
            background: C.light,
            padding: "clamp(80px, 10vw, 140px) 0",
          }}
        >
          <div className="neh-container">
            <div className="neh-story-layout">
              {/* Text column */}
              <FadeSection>
                <div>
                  <div
                    className="neh-label-pill"
                    style={{
                      background: "rgba(27, 245, 97, 0.08)",
                      color: C.darkGreen,
                      marginBottom: 24,
                      padding: "6px 14px",
                    }}
                  >
                    OUR STORY
                  </div>
                  <h2
                    style={{
                      fontSize: "clamp(32px, 4.5vw, 60px)",
                      fontWeight: 800,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      color: C.dark,
                      marginBottom: 28,
                    }}
                  >
                    A fully Ghanaian renewable energy company.
                  </h2>
                  <p
                    style={{
                      fontSize: "clamp(17px, 1.4vw, 20px)",
                      lineHeight: 1.6,
                      color: C.textBody,
                      marginBottom: 20,
                    }}
                  >
                    Nehemiah Energy exists because the call to rebuild was not a
                    suggestion. We are here in obedience to serve the everyday
                    Ghanaian through work that was placed in our hands to do.
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(15px, 1.1vw, 17px)",
                      lineHeight: 1.7,
                      color: C.textBody,
                      marginBottom: 20,
                    }}
                  >
                    From EV charging stations to solar solutions to energy
                    literacy for our children, we serve the people who need us
                    most. The drivers, the riders, the families, and the
                    communities who keep this country moving forward.
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(15px, 1.1vw, 17px)",
                      lineHeight: 1.7,
                      color: C.textBody,
                    }}
                  >
                    We did not start Nehemiah Energy to chase trends. We started
                    it because Ghana deserves a renewable energy company built by
                    Ghanaians, for Ghanaians, with the quality and care our
                    communities have been waiting for.
                  </p>
                </div>
              </FadeSection>

              {/* Visual card */}
              <FadeSection delay={0.15}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: 28,
                    overflow: "hidden",
                    background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkBg} 100%)`,
                    minHeight: 480,
                    padding: 48,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Pattern color={C.green} opacity={0.06} rows={6} cols={6} />

                  {/* Big radial glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 480,
                      height: 480,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${C.green}25 0%, transparent 60%)`,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Top: FOUNDED 2026 */}
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: 1.2,
                      }}
                    >
                      FOUNDED
                    </div>
                    <div
                      style={{
                        fontSize: 96,
                        fontWeight: 800,
                        color: C.white,
                        lineHeight: 0.95,
                        letterSpacing: "-0.04em",
                        marginTop: 8,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      2026
                    </div>
                  </div>

                  {/* Center N mark */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                      opacity: 0.85,
                      animation: "floatY 5s ease-in-out infinite",
                    }}
                  >
                    <NMark size={140} />
                  </div>

                  {/* Bottom stats */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      display: "flex",
                      gap: 32,
                      alignItems: "flex-end",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 800,
                          color: C.green,
                          lineHeight: 1,
                        }}
                      >
                        1
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 600,
                          marginTop: 4,
                          letterSpacing: 0.5,
                        }}
                      >
                        STATION LIVE
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 800,
                          color: C.green,
                          lineHeight: 1,
                        }}
                      >
                        6+
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 600,
                          marginTop: 4,
                          letterSpacing: 0.5,
                        }}
                      >
                        COMING SOON
                      </div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            </div>
          </div>
        </section>

        {/* ═══ MISSION & VISION ═══ */}
        <section
          id="mission"
          style={{
            background: C.white,
            padding: "clamp(80px, 10vw, 140px) 0",
          }}
        >
          <div className="neh-container">
            <FadeSection>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div
                  className="neh-label-pill"
                  style={{
                    background: "rgba(27, 245, 97, 0.08)",
                    color: C.darkGreen,
                    marginBottom: 20,
                    padding: "6px 14px",
                  }}
                >
                  WHERE WE ARE GOING
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 60px)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: C.dark,
                  }}
                >
                  Our mission & vision.
                </h2>
              </div>
            </FadeSection>

            <div className="neh-grid-2">
              {/* Mission card */}
              <FadeSection delay={0.1}>
                <div className="neh-card">
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(27, 245, 97, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <Icon kind="target" size={28} color={C.darkGreen} />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.muted,
                      letterSpacing: 1.2,
                      marginBottom: 8,
                    }}
                  >
                    OUR MISSION
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(20px, 1.6vw, 24px)",
                      fontWeight: 800,
                      color: C.dark,
                      marginBottom: 16,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Called to serve. Answering by building.
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(15px, 1.1vw, 17px)",
                      lineHeight: 1.6,
                      color: C.textBody,
                    }}
                  >
                    To provide renewable energy solutions for the people who need
                    them most. From chargers to solar to energy literacy for our
                    children, we serve the everyday Ghanaian because that is the
                    assignment.
                  </p>
                </div>
              </FadeSection>

              {/* Vision card */}
              <FadeSection delay={0.2}>
                <div className="neh-card">
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(0, 172, 105, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <Icon kind="eye" size={28} color={C.darkGreen} />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.muted,
                      letterSpacing: 1.2,
                      marginBottom: 8,
                    }}
                  >
                    OUR VISION BY 2031
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(20px, 1.6vw, 24px)",
                      fontWeight: 800,
                      color: C.dark,
                      marginBottom: 16,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Ghana's renewable energy company.
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(15px, 1.1vw, 17px)",
                      lineHeight: 1.6,
                      color: C.textBody,
                      marginBottom: 16,
                    }}
                  >
                    Charging stations nationwide. Solar streetlights in every
                    region. Emergency lighting in new construction. Energy
                    education in our schools.
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: C.darkGreen,
                      letterSpacing: 0.3,
                    }}
                  >
                    Built by Ghanaians. Known by Ghanaians. For Ghanaians.
                  </p>
                </div>
              </FadeSection>
            </div>
          </div>
        </section>

        {/* ═══ WHAT WE BELIEVE ═══ */}
        <section style={{ background: C.light, padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="neh-container">
            <FadeSection>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div
                  className="neh-label-pill"
                  style={{
                    background: "rgba(27, 245, 97, 0.08)",
                    color: C.darkGreen,
                    marginBottom: 20,
                    padding: "6px 14px",
                  }}
                >
                  OUR CHARACTER
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 60px)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: C.dark,
                    marginBottom: 16,
                  }}
                >
                  What we believe.
                </h2>
                <p
                  style={{
                    fontSize: "clamp(17px, 1.4vw, 20px)",
                    lineHeight: 1.6,
                    color: C.textBody,
                    maxWidth: 640,
                    margin: "0 auto",
                  }}
                >
                  Five characteristics that shape every decision we make and
                  every station we build.
                </p>
              </div>
            </FadeSection>

            <div className="neh-grid-3">
              {[
                {
                  title: "Rooted in Faith",
                  desc: "Everything begins with God. Our tone, our decisions, and our posture are grounded in spiritual obedience. We move with purpose, not panic.",
                  icon: "cross",
                  color: C.green,
                },
                {
                  title: "Bold but Warm",
                  desc: "We speak with conviction and without apology, but never without care. We are direct because we respect the people we serve.",
                  icon: "heart",
                  color: C.darkGreen,
                },
                {
                  title: "Culturally Ghanaian",
                  desc: "We sound like home. We build for the local context and never dilute our identity to impress outsiders.",
                  icon: "flag",
                  color: C.olive,
                },
                {
                  title: "Trustworthy and Consistent",
                  desc: "What we say is what we do. Dependable in service, transparent in operations, authoritative because we have earned it.",
                  icon: "shield",
                  color: C.darkGreen,
                },
                {
                  title: "Forward-Thinking",
                  desc: "Innovation serves community. We adopt new technology to solve real problems, shaped by the people we build for.",
                  icon: "sparkle",
                  color: C.green,
                },
              ].map((item, i) => (
                <FadeSection key={i} delay={i * 0.08}>
                  <div className="neh-card">
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 13,
                        background: `${item.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Icon kind={item.icon} size={26} color={item.color} />
                    </div>
                    <h3
                      style={{
                        fontSize: 19,
                        fontWeight: 800,
                        color: C.dark,
                        marginBottom: 10,
                        letterSpacing: -0.2,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: C.textBody,
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ IMPACT STATS ═══ */}
        <section
          style={{
            background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`,
            padding: "clamp(80px, 10vw, 140px) 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Pattern color={C.green} opacity={0.04} rows={8} cols={12} />

          <div
            className="neh-container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <FadeSection>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div
                  className="neh-label-pill"
                  style={{
                    background: "rgba(27, 245, 97, 0.1)",
                    border: "1px solid rgba(27, 245, 97, 0.25)",
                    color: C.green,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: C.green,
                      animation: "pulseDot 1.6s ease-in-out infinite",
                    }}
                  />
                  LIVE FROM OUR NETWORK
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 60px)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: C.white,
                    marginBottom: 16,
                  }}
                >
                  Our impact so far.
                </h2>
                <p
                  style={{
                    fontSize: "clamp(17px, 1.4vw, 20px)",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.6)",
                    maxWidth: 560,
                    margin: "0 auto",
                  }}
                >
                  Real numbers from a real network. Just getting started.
                </p>
              </div>
            </FadeSection>

            {/* TODO: fetch live stats from /api/impact-stats */}
            <div className="neh-grid-4">
              {[
                { icon: "users", value: "50+", label: "Active Drivers" },
                { icon: "bolt", value: "30", suffix: "min", label: "Avg Charge Time" },
                { icon: "pin", value: "1", label: "Station Live" },
                { icon: "globe", value: "120", suffix: "kW", label: "DC Fast Charging" },
              ].map((stat, i) => (
                <FadeSection key={i} delay={i * 0.08}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 20,
                      padding: "32px 24px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "rgba(27, 245, 97, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 18,
                      }}
                    >
                      <Icon kind={stat.icon} size={24} color={C.green} />
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(36px, 4vw, 52px)",
                        fontWeight: 800,
                        color: C.white,
                        letterSpacing: "-0.025em",
                        lineHeight: 1,
                        fontVariantNumeric: "tabular-nums",
                        display: "flex",
                        alignItems: "baseline",
                        gap: 6,
                      }}
                    >
                      {stat.value}
                      {stat.suffix && (
                        <span
                          style={{
                            fontSize: "clamp(16px, 1.6vw, 22px)",
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.5)",
                            letterSpacing: 0,
                          }}
                        >
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.55)",
                        marginTop: 8,
                        letterSpacing: 0.4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FROM THE FOUNDER ═══ */}
        <section style={{ background: C.white, padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="neh-container">
            <FadeSection>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div
                  className="neh-label-pill"
                  style={{
                    background: "rgba(27, 245, 97, 0.08)",
                    color: C.darkGreen,
                    marginBottom: 20,
                    padding: "6px 14px",
                  }}
                >
                  FROM THE FOUNDER
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 60px)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: C.dark,
                  }}
                >
                  The voice behind the mission.
                </h2>
              </div>
            </FadeSection>

            <FadeSection delay={0.1}>
              <div
                style={{
                  maxWidth: 820,
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    marginBottom: 24,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Icon kind="quote" size={48} color={C.green} />
                </div>
                <p
                  style={{
                    fontSize: "clamp(20px, 1.9vw, 28px)",
                    fontWeight: 500,
                    color: C.dark,
                    lineHeight: 1.5,
                    marginBottom: 36,
                    fontStyle: "italic",
                  }}
                >
                  {"\u201C"}We are not here to chase trends or build what looks
                  good on a pitch deck. We are here because God called us to
                  rebuild, and we will not build it broken. Every station we put
                  up, every driver we serve, every child we teach. That is the
                  assignment! And we will keep answering it.{"\u201D"}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 2,
                      background: C.green,
                      borderRadius: 2,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 800,
                        color: C.dark,
                        letterSpacing: -0.2,
                      }}
                    >
                      Eunice K. Asemnor
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: C.muted,
                        fontWeight: 500,
                        marginTop: 2,
                      }}
                    >
                      Founder & CEO, Nehemiah Energy
                    </div>
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 2,
                      background: C.green,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ═══ NEHEMIAH PROJECT CALLOUT ═══ */}
        <section
          style={{
            background: C.light,
            padding: "clamp(60px, 8vw, 100px) 0",
          }}
        >
          <div className="neh-container">
            <FadeSection>
              <div
                style={{
                  background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkBg} 100%)`,
                  borderRadius: 32,
                  padding: "clamp(40px, 6vw, 72px)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Pattern color={C.green} opacity={0.05} rows={6} cols={10} />

                {/* Big glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${C.green}15 0%, transparent 60%)`,
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: 720,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: "rgba(27, 245, 97, 0.12)",
                      border: "1px solid rgba(27, 245, 97, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <Icon kind="heart" size={32} color={C.green} />
                  </div>

                  <div
                    className="neh-label-pill"
                    style={{
                      background: "rgba(27, 245, 97, 0.08)",
                      border: "1px solid rgba(27, 245, 97, 0.2)",
                      color: C.green,
                      marginBottom: 24,
                    }}
                  >
                    ENERGY LITERACY FOR OUR CHILDREN
                  </div>

                  <h2
                    style={{
                      fontSize: "clamp(32px, 4.5vw, 60px)",
                      fontWeight: 800,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      color: C.white,
                      marginBottom: 20,
                    }}
                  >
                    The Nehemiah Project.
                  </h2>

                  <p
                    style={{
                      fontSize: "clamp(17px, 1.4vw, 20px)",
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: 36,
                    }}
                  >
                    A portion of every charge and every round-up donation goes
                    toward teaching Ghanaian kids about clean energy, solar
                    power, and the future they will inherit. 200+ kids reached so
                    far.
                  </p>

                  <a className="neh-btn neh-btn-primary" href="#">
                    Learn About the Project
                    <Icon kind="arrow" size={14} color={C.dark} />
                  </a>
                </div>
              </div>
            </FadeSection>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
