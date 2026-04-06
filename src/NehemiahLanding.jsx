import { useState, useEffect, useRef } from "react";
import logoMark from "./assets/logo-mark.svg";
import logoFull from "./assets/logo-full.svg";

const NAV_LINKS = ["How It Works", "Features", "Impact"];

const STATS = [
  { value: "3", label: "Charging stations", suffix: "" },
  { value: "50", label: "Active drivers", suffix: "+" },
  { value: "30", label: "Avg. charge time", suffix: "min" },
];

const STEPS = [
  {
    num: "01",
    title: "Stop",
    desc: "Find the nearest Nehemiah station in the app with real-time availability. Navigate there in one tap.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Plug",
    desc: "Connect your EV and pay instantly with mobile money. Clean, stable power that protects your battery.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Go",
    desc: "The fastest turnaround in Accra. Get notified when done and get back on the road — anytime, day or night.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: "Charge With Care",
    desc: "Protect your EV battery with clean, stable voltage and proper power management. The safest charge in Accra.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    title: "Fast Charge in Accra",
    desc: "Less waiting. Faster turnaround. Predictable uptime. Just stop, plug, and go.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    title: "24/7 Self-Service",
    desc: "Charge anytime, day or night. Unlike traditional fuel stations, we're always open — on your schedule.",
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4v6l4 2",
  },
  {
    title: "Mobile Money Payments",
    desc: "Pay instantly with MTN MoMo, Vodafone Cash, or AirtelTigo Money. No card needed.",
    icon: "M2 17l2-2m2-2l7-7 3 3-7 7-3-3zm8 2h9m-9-4h4",
  },
];

const TESTIMONIALS = [
  {
    name: "Kwame A.",
    role: "Tesla Model 3 owner",
    text: "I was skeptical about EV charging in Ghana, but Nehemiah made it seamless. I charge at Labone every week.",
    rating: 5,
  },
  {
    name: "Esi A.",
    role: "BYD Atto 3 owner",
    text: "The app is so easy. Find station, plug in, pay with MoMo. Love the free WiFi and cold water while waiting!",
    rating: 5,
  },
  {
    name: "Kofi M.",
    role: "Hyundai Ioniq 5 owner",
    text: "Reliable chargers and great locations. The rewards program keeps me coming back.",
    rating: 4,
  },
];

const Stars = ({ count, size = 14 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= count ? "#F5A623" : "none"} stroke={i <= count ? "#F5A623" : "#444"} strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimateIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function NehemiahLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [chargeProgress, setChargeProgress] = useState(67);
  const [loyaltyCount, setLoyaltyCount] = useState(7);
  const [points, setPoints] = useState(2840);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Animate charging progress
  useEffect(() => {
    const t = setInterval(() => setChargeProgress(p => p >= 95 ? 67 : p + 1), 2500);
    return () => clearInterval(t);
  }, []);

  // Animate points counting up
  useEffect(() => {
    const t = setInterval(() => setPoints(p => p >= 3200 ? 2840 : p + Math.floor(Math.random() * 15 + 5)), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#060606", color: "#fff", fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", overflowX: "hidden" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes shimmer { 0% { transform: translateX(-200%); } 100% { transform: translateX(200%); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .nav-link { color: #888; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .cta-primary { background: linear-gradient(135deg, #4CAF50, #2E7D32); border: none; color: #fff; padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(76,175,80,0.3); }
        .cta-secondary { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
        .cta-secondary:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 0", background: "rgba(6,6,6,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logoMark} alt="Nehemiah Energy" style={{ width: 34, height: 34, borderRadius: 10 }} />
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>Nehemiah</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="nav-link" style={{ display: "none" }}>{l}</a>
            ))}
            <button className="cta-primary" style={{ padding: "10px 24px", fontSize: 13 }}>Download App</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 24px 80px" }}>
        {/* Background elements */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,80,0.05) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 2 }}>
          <AnimateIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 24, padding: "8px 20px", marginBottom: 32 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", position: "relative" }}>
                <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid #4CAF50", animation: "pulse-ring 2s infinite" }} />
              </div>
              <span style={{ fontSize: 13, color: "#4CAF50", fontWeight: 600 }}>Now live across Greater Accra</span>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h1 style={{ fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: 2, marginBottom: 24, textTransform: "uppercase", color: "#fff" }}>
              P
              <span style={{ display: "inline-block", position: "relative", width: "0.72em", textAlign: "center" }}>
                <svg viewBox="0 0 24 24" width="0.72em" height="0.72em" fill="none" stroke="#1bf561" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "baseline" }}>
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </span>
              WERING
              <br />
              <span style={{ color: "#1bf561" }}>YOUR JOURNEY</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#888", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 40px" }}>
              Accra's fastest and safest EV charge. Protect your battery with clean, stable power — 24 hours a day. Just stop. Plug. Go.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              <button className="cta-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                App Store
              </button>
              <button className="cta-secondary" style={{ fontSize: 16, padding: "16px 36px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.369 2.369 0 01-.85-1.854V3.668c0-.718.319-1.376.85-1.854zm14.659 7.181L15.2 11.6 5.5 2l12.768 6.995zM5.5 22l9.7-9.6 3.068 2.605L5.5 22zm14.36-8.418l-3.36-1.84 3.36-1.84c.72.394 1.14 1.1 1.14 1.84s-.42 1.446-1.14 1.84z" /></svg>
                Google Play
              </button>
            </div>
          </AnimateIn>

          {/* Phone mockup - White theme NehHome */}
          <AnimateIn delay={0.5}>
            <div style={{ marginTop: 60, position: "relative", display: "inline-block", animation: "float 6s ease-in-out infinite" }}>
              <div style={{
                width: 280, height: 560, borderRadius: 36, background: "#F4F5F7",
                border: "2px solid rgba(255,255,255,0.15)", position: "relative", overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(76,175,80,0.1)",
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
              }}>
                {/* Dark hero header */}
                <div style={{ background: "linear-gradient(170deg, #010F12 0%, #0a1a1e 50%, #0e2218 100%)", borderRadius: "0 0 20px 20px", padding: "14px 16px 16px" }}>
                  {/* Status bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>9:41</span>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <div style={{ width: 14, height: 8, border: "1px solid #fff", borderRadius: 2, position: "relative" }}>
                        <div style={{ position: "absolute", inset: 1.5, background: "#1bf561", borderRadius: 1 }} />
                      </div>
                    </div>
                  </div>
                  {/* Nav row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /><path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </div>
                      <div>
                        <div style={{ color: "#8A9BA0", fontSize: 8 }}>Good morning</div>
                        <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Kwame</div>
                      </div>
                    </div>
                    <div style={{ background: "rgba(27,245,97,0.06)", border: "1px solid rgba(27,245,97,0.1)", borderRadius: 6, padding: "3px 6px", display: "flex", alignItems: "center", gap: 2 }}>
                      <svg width="7" height="7" viewBox="148 148 260 300" fill="none"><polygon fill="#1bf561" points="406.16 148.62 344.47 319.38 324.56 374.46 252.37 280.73 271.26 231.17 311.14 279.16" /><polygon fill="#fff" points="265.19 342.22 189.11 446.65 240.92 310.73 265.19 342.22" /></svg>
                      <span style={{ color: "#1bf561", fontSize: 8, fontWeight: 700, transition: "all 0.3s" }}>{points.toLocaleString()}</span>
                    </div>
                  </div>
                  {/* Station info */}
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#1bf561", fontSize: 6, fontWeight: 700, letterSpacing: 1.5, marginBottom: 3 }}>NEAREST STATION</div>
                      <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5, marginBottom: 4 }}>Nehemiah<br />Gate</div>
                      <div style={{ color: "#8A9BA0", fontSize: 8, marginBottom: 5 }}>Haatso · 0.8 km</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1bf561" }} />
                        <span style={{ color: "#1bf561", fontSize: 8, fontWeight: 600 }}>Open Now</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 65 }}>
                      {[{ v: "120", u: "kW" }, { v: "2", u: "Free" }, { v: "6.50", u: "GHS" }].map((s, i) => (
                        <div key={i} style={{ background: "rgba(27,245,97,0.04)", borderRadius: 7, padding: "5px 0", textAlign: "center", border: "1px solid rgba(27,245,97,0.08)" }}>
                          <span style={{ color: "#1bf561", fontSize: 12, fontWeight: 800 }}>{s.v}</span>
                          <span style={{ color: "#8A9BA0", fontSize: 6, marginLeft: 2 }}>{s.u}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* CTA with shimmer */}
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: 10, background: "linear-gradient(135deg, #1BF561, #00AC69)", padding: "9px 0", textAlign: "center", marginTop: 12, boxShadow: "0 3px 12px rgba(27,245,97,0.25)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)", animation: "shimmer 3s linear infinite", pointerEvents: "none" }} />
                    <span style={{ color: "#010F12", fontSize: 10, fontWeight: 700, position: "relative" }}>Start Charging</span>
                  </div>
                </div>

                {/* Light body */}
                <div style={{ padding: "10px 14px" }}>
                  {/* Active charging card */}
                  <div style={{ background: "#fff", borderRadius: 12, padding: "10px 10px", marginBottom: 8, border: "1px solid #E4E7EB" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ position: "relative", width: 32, height: 32 }}>
                        <svg width="32" height="32" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="12" fill="none" stroke="#E4E7EB" strokeWidth="2" />
                          <circle cx="16" cy="16" r="12" fill="none" stroke="#1bf561" strokeWidth="2" strokeDasharray={2 * Math.PI * 12} strokeDashoffset={2 * Math.PI * 12 * (1 - chargeProgress / 100)} strokeLinecap="round" transform="rotate(-90 16 16)" style={{ transition: "stroke-dashoffset 1s" }} />
                        </svg>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "#0D9E3A", fontSize: 7, fontWeight: 800 }}>{chargeProgress}%</span>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ color: "#0B1215", fontSize: 10, fontWeight: 700 }}>Charging</span>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#1bf561", animation: "pulse-dot 2s ease-in-out infinite" }} />
                        </div>
                        <div style={{ color: "#8A9BA0", fontSize: 8, marginTop: 1 }}>Gun A · {(chargeProgress * 0.45).toFixed(1)} kWh</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                    {[
                      { label: "Charge", green: true },
                      { label: "Rewards", green: false },
                      { label: "History", green: false },
                    ].map((a, i) => (
                      <div key={i} style={{ flex: 1, background: a.green ? "#010F12" : "#fff", borderRadius: 10, padding: "8px 0", textAlign: "center", border: "1px solid " + (a.green ? "rgba(27,245,97,0.08)" : "#E4E7EB") }}>
                        <div style={{ width: 22, height: 22, borderRadius: 7, background: a.green ? "linear-gradient(135deg, #1BF561, #00AC69)" : "rgba(27,245,97,0.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 3px" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={a.green ? "#010F12" : "#0D9E3A"} strokeWidth="2" strokeLinejoin="round" /></svg>
                        </div>
                        <span style={{ color: a.green ? "#1bf561" : "#0B1215", fontSize: 8, fontWeight: 600 }}>{a.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Loyalty bar */}
                  <div style={{ background: "#fff", borderRadius: 10, padding: "8px 10px", border: "1px solid #E4E7EB", marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                      <span style={{ color: "#0D9E3A", fontSize: 7, fontWeight: 700, letterSpacing: 0.8 }}>CHARGE 10. WE DASH YOU.</span>
                      <span style={{ color: "#0D9E3A", fontSize: 10, fontWeight: 800 }}>7/10</span>
                    </div>
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < 7 ? "#1bf561" : "#E4E7EB" }} />
                      ))}
                    </div>
                  </div>

                  {/* Station card */}
                  <div style={{ background: "#fff", borderRadius: 10, padding: "8px 10px", border: "1px solid #E4E7EB" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: "#010F12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="148 148 260 300" fill="none"><polygon fill="#1bf561" points="406.16 148.62 344.47 319.38 324.56 374.46 252.37 280.73 271.26 231.17 311.14 279.16" /><polygon fill="#fff" points="265.19 342.22 189.11 446.65 240.92 310.73 265.19 342.22" /></svg>
                      </div>
                      <div>
                        <div style={{ color: "#0B1215", fontSize: 9, fontWeight: 700 }}>Nehemiah Gate - Haatso</div>
                        <div style={{ color: "#8A9BA0", fontSize: 7 }}>0.8 km · 2 guns free</div>
                      </div>
                    </div>
                    <div style={{ padding: "5px 0", borderRadius: 6, textAlign: "center", background: "#010F12" }}>
                      <span style={{ color: "#1bf561", fontSize: 8, fontWeight: 700 }}>Navigate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32, textAlign: "center" }}>
          {STATS.map((s, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div>
                <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, color: "#fff" }}>
                  {s.value}<span style={{ color: "#4CAF50", fontSize: 24 }}>{s.suffix}</span>
                </div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <AnimateIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#4CAF50", textTransform: "uppercase", marginBottom: 16 }}>How it works</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: -1 }}>Just Stop. Plug. Go.</h2>
            </div>
          </AnimateIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {STEPS.map((step, i) => (
              <AnimateIn key={i} delay={i * 0.15}>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32,
                  transition: "all 0.3s ease", cursor: "default", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: -20, right: -10, fontSize: 100, fontWeight: 900, color: "rgba(76,175,80,0.04)", lineHeight: 1, pointerEvents: "none" }}>{step.num}</div>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4CAF50", marginBottom: 20 }}>
                    {step.icon}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <AnimateIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#4CAF50", textTransform: "uppercase", marginBottom: 16 }}>Features</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: -1 }}>Why drivers choose Nehemiah</h2>
            </div>
          </AnimateIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <AnimateIn key={i} delay={i * 0.1}>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "28px 24px",
                  transition: "border-color 0.3s", cursor: "default",
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(76,175,80,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT / NEHEMIAH PROJECT */}
      <section id="impact" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimateIn>
            <div style={{
              background: "linear-gradient(170deg, #010F12 0%, #0a1a1e 35%, #0e2218 70%, #0a1518 100%)",
              borderRadius: 28, padding: "clamp(32px, 5vw, 48px)", position: "relative", overflow: "hidden",
            }}>
              {/* Glow accents */}
              <div style={{ position: "absolute", top: -40, right: -30, width: 200, height: 200, background: "radial-gradient(circle, rgba(27,245,97,0.08) 0%, transparent 60%)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 150, height: 150, background: "radial-gradient(circle, rgba(27,245,97,0.05) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />

              {/* Plant illustration */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, position: "relative" }}>
                <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
                  <path d="M60 85 L60 45" stroke="#1bf561" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M60 55 Q45 40 48 28 Q52 18 60 22 Q60 35 60 45" fill="rgba(27,245,97,0.12)" stroke="#1bf561" strokeWidth="1.5" />
                  <path d="M60 50 Q75 35 72 23 Q68 13 60 17 Q60 30 60 40" fill="rgba(27,245,97,0.08)" stroke="#1bf561" strokeWidth="1.5" />
                  <path d="M60 60 Q42 52 38 42 Q36 35 42 36 Q50 38 56 48" fill="rgba(27,245,97,0.06)" stroke="#1bf561" strokeWidth="1" />
                  <path d="M50 85 Q55 78 60 85 Q65 78 70 85" stroke="#1bf561" strokeWidth="1.5" fill="none" opacity="0.4" />
                  {[0,1,2,3,4,5].map(i => {
                    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                    const dist = 38 + (i % 2) * 6;
                    return <circle key={i} cx={60 + dist * Math.cos(angle)} cy={50 + dist * Math.sin(angle)} r="2" fill="#1bf561" opacity={0.15 + (i % 3) * 0.08} />;
                  })}
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,245,97,0.06) 0%, transparent 60%)", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
              </div>

              {/* Mission text */}
              <div style={{ textAlign: "center", marginBottom: 32, position: "relative" }}>
                <div style={{ color: "#1bf561", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 12 }}>THE NEHEMIAH PROJECT</div>
                <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.15, marginBottom: 16, color: "#fff" }}>
                  Every Charge Builds<br />a Brighter Ghana
                </h2>
                <p style={{ color: "#8A9BA0", fontSize: 14, lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
                  When you round up your charge, the extra pesewas go to the Nehemiah Project — funding renewable energy education for kids across Ghana.
                </p>
              </div>

              {/* Impact stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, position: "relative" }}>
                {[
                  { val: "GHS 4,280", label: "TOTAL RAISED", icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill="rgba(27,245,97,0.15)" stroke="#1bf561" strokeWidth="1.5" /></svg>
                  )},
                  { val: "342", label: "KIDS HELPED", icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#1bf561" strokeWidth="1.5" /><path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke="#1bf561" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  )},
                  { val: "GHS 21.65K", label: "YOUR TOTAL", icon: (
                    <svg width="18" height="18" viewBox="148 148 260 300" fill="none"><polygon fill="#1bf561" points="406.16 148.62 344.47 319.38 324.56 374.46 252.37 280.73 271.26 231.17 311.14 279.16 406.16 148.62" /><polygon fill="#fff" points="265.19 342.22 189.11 446.65 240.92 310.73 265.19 342.22" /></svg>
                  )},
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(27,245,97,0.04)", borderRadius: 16, padding: "16px 8px", textAlign: "center", border: "1px solid rgba(27,245,97,0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ color: "#1bf561", fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 800 }}>{s.val}</div>
                    <div style={{ color: "#8A9BA0", fontSize: 9, fontWeight: 600, letterSpacing: 1.5, marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <AnimateIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#4CAF50", textTransform: "uppercase", marginBottom: 16 }}>What drivers say</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, letterSpacing: -1 }}>Trusted by EV drivers across Ghana</h2>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div style={{ position: "relative", minHeight: 200 }}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: i === activeTestimonial ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    opacity: i === activeTestimonial ? 1 : 0,
                    transform: i === activeTestimonial ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.5s ease",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 20, padding: "32px 28px", textAlign: "center",
                    pointerEvents: i === activeTestimonial ? "auto" : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <Stars count={t.rating} size={18} />
                  </div>
                  <p style={{ fontSize: 17, color: "#ccc", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{t.role}</div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 24 : 8, height: 8,
                    borderRadius: 4,
                    background: i === activeTestimonial ? "#4CAF50" : "rgba(255,255,255,0.1)",
                    border: "none", cursor: "pointer", transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <AnimateIn>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: -1.5, marginBottom: 20 }}>
              Ready to go electric?
            </h2>
            <p style={{ fontSize: 16, color: "#888", marginBottom: 36, lineHeight: 1.6 }}>
              Download the Nehemiah app and find your nearest charging station in seconds.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              <button className="cta-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                App Store
              </button>
              <button className="cta-secondary" style={{ fontSize: 16, padding: "16px 36px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.369 2.369 0 01-.85-1.854V3.668c0-.718.319-1.376.85-1.854zm14.659 7.181L15.2 11.6 5.5 2l12.768 6.995zM5.5 22l9.7-9.6 3.068 2.605L5.5 22zm14.36-8.418l-3.36-1.84 3.36-1.84c.72.394 1.14 1.1 1.14 1.84s-.42 1.446-1.14 1.84z" /></svg>
                Google Play
              </button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logoMark} alt="Nehemiah Energy" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Nehemiah Energy</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["About", "Stations", "Support", "Privacy"].map((l) => (
              <a key={l} href="#" style={{ fontSize: 13, color: "#666", textDecoration: "none", transition: "color 0.2s" }}>{l}</a>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#444" }}>
            &copy; 2026 Nehemiah Energy. Accra, Ghana.
          </div>
        </div>
      </footer>
    </div>
  );
}
