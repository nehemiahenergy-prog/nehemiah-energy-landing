import { useEffect } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

const C = {
  green: "#1BF561",
  darkGreen: "#00AC69",
  dark: "#010F12",
  darkBg: "#0B1215",
  light: "#F4F5F7",
  white: "#FFFEFF",
  border: "#E4E7EB",
  muted: "#6B7280",
  textBody: "#4B5563",
  warning: "#F59E0B",
  warningBg: "rgba(245, 158, 11, 0.12)",
  warningText: "#92400E",
};

const N_MAIN = "M 406.16 148.62 L 344.47 319.38 L 324.56 374.46 L 252.37 280.73 L 271.26 231.17 L 311.14 279.16 Z";
const N_ACCENT = "M 265.19 342.22 L 189.11 446.65 L 240.92 310.73 Z";
const PAT_M = "M 62.36 -5.65 L 40.92 53.68 L 34 72.82 L 8.92 40.25 L 15.48 23.03 L 29.34 39.71 Z";
const PAT_A = "M 13.37 61.62 L -13.06 97.91 L 4.94 50.68 Z";

function NMark({ size = 32 }) {
  return (<svg width={size} height={size} viewBox="140 100 320 400" aria-hidden="true"><path d={N_MAIN} fill={C.green} /><path d={N_ACCENT} fill={C.white} /></svg>);
}

function Pattern({ color = "#1BF561", opacity = 0.04, rows = 8, cols = 10 }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${cols * 80} ${rows * 100}`} preserveAspectRatio="xMidYMid slice">
        {[...Array(rows)].map((_, r) => [...Array(cols)].map((_, c) => (
          <g key={`${r}${c}`} transform={`translate(${c * 80}, ${r * 100})`}>
            <path d={PAT_M} fill="none" stroke={color} strokeWidth="0.75" />
            <path d={PAT_A} fill="none" stroke={color} strokeWidth="0.75" />
          </g>
        )))}
      </svg>
    </div>
  );
}

function Icon({ kind, size = 24, color = "#010F12", strokeWidth = 2 }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={strokeWidth + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    info: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" /><line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /><line x1="12" y1="8" x2="12.01" y2="8" stroke={color} strokeWidth={strokeWidth + 0.5} strokeLinecap="round" /></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /><line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth={strokeWidth + 0.5} strokeLinecap="round" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke={color} strokeWidth={strokeWidth} fill="none" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" /></>,
    twitter: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />,
    facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />,
    linkedin: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth={strokeWidth} fill="none" /><circle cx="4" cy="4" r="2" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">{paths[kind]}</svg>);
}

export default function LegalLayout({ title, subtitle, lastUpdated, navActive, sections }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: C.white, fontFamily: "'Space Grotesk', sans-serif", color: C.dark, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        .container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
        .legal-narrow { max-width: 820px; margin: 0 auto; padding: 0 24px; }
        .nav-link { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.7); padding: 10px 16px; border-radius: 8px; transition: all 0.15s ease; text-decoration: none; }
        .nav-link:hover { color: ${C.white}; background: rgba(255,255,255,0.05); }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; border-radius: 12px; font-size: 14px; font-weight: 700; font-family: inherit; border: none; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.2s ease; white-space: nowrap; text-decoration: none; }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, ${C.green}, ${C.darkGreen}); color: ${C.dark}; box-shadow: 0 6px 20px rgba(27,245,97,0.25); }
        .btn-primary:hover { box-shadow: 0 10px 30px rgba(27,245,97,0.35); }
        .label-pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: 24px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; }
        .grid { display: grid; gap: 24px; }
        .grid-footer { grid-template-columns: 1fr; }
        .desktop-only { display: none; }
        @media (min-width: 700px) { .grid-footer { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; } }
        @media (min-width: 900px) { .desktop-only { display: flex; } }
        .toc-link { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; font-size: 14px; font-weight: 500; color: ${C.textBody}; transition: all 0.15s ease; text-decoration: none; }
        .toc-link:hover { background: #fff; color: ${C.dark}; }
        .toc-link .num { font-size: 11px; font-weight: 700; color: ${C.darkGreen}; width: 22px; flex-shrink: 0; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      <SiteNav />

      <main>
        {/* HERO */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, position: "relative", overflow: "hidden", paddingTop: "clamp(140px,14vw,180px)", paddingBottom: "clamp(60px,8vw,100px)" }}>
          <Pattern color={C.green} opacity={0.04} rows={10} cols={14} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(800px,90vw)", height: "min(800px,90vw)", borderRadius: "50%", background: `radial-gradient(circle, ${C.green}14 0%, ${C.green}05 35%, transparent 65%)`, pointerEvents: "none" }} />
          <div className="legal-narrow" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24 }}>LEGAL · NEHEMIAH ENERGY</div>
            <h1 style={{ fontSize: "clamp(40px,6vw,76px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.025em", color: C.white, marginBottom: 24 }}>{title}</h1>
            <p style={{ fontSize: "clamp(17px,1.4vw,20px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 640, margin: "0 auto 36px" }}>{subtitle}</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
              <Icon kind="info" size={14} color="rgba(255,255,255,0.7)" />Last Updated: {lastUpdated}
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section style={{ background: C.white, padding: "clamp(60px,8vw,100px) 0 clamp(80px,10vw,120px)" }}>
          <div className="legal-narrow">
            {/* TOC */}
            <div style={{ background: C.light, border: `1px solid ${C.border}`, borderRadius: 16, padding: "clamp(20px,2vw,28px)", marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.darkGreen, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, paddingLeft: 14 }}>On This Page</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {sections.map((s, i) => (
                  <a key={s.id} href={`#${s.id}`} className="toc-link">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title.replace(/^\d+\.\s*/, "")}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* SECTIONS */}
            {sections.map(s => (
              <section key={s.id} id={s.id} style={{ marginBottom: 56, scrollMarginTop: 100 }}>
                <h2 style={{ fontSize: "clamp(22px,2.4vw,30px)", fontWeight: 800, color: C.dark, letterSpacing: -0.5, marginBottom: 20, paddingBottom: 16, borderBottom: `2px solid ${C.green}`, display: "inline-block" }}>{s.title}</h2>
                <div>{s.body}</div>
              </section>
            ))}

            {/* CONTACT CARD */}
            <section id="contact" style={{ marginTop: 80, background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkBg} 100%)`, borderRadius: 24, padding: "clamp(32px,4vw,48px)", position: "relative", overflow: "hidden", scrollMarginTop: 100 }}>
              <Pattern color={C.green} opacity={0.05} rows={6} cols={10} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 18 }}>Need Help?</div>
                <h3 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: C.white, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>Talk to us.</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 28, maxWidth: 540 }}>If you have questions about this policy or anything else, our team is here. We answer every message.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, maxWidth: 540 }}>
                  {[
                    { icon: "mail", label: "Email", value: "support@nehemiahenergy.com", href: "mailto:support@nehemiahenergy.com" },
                    { icon: "phone", label: "Phone", value: "+233 24 594 7843", href: "tel:+233245947843" },
                    { icon: "pin", label: "Address", value: "Nehemiah Gate, Haatso, Accra, Ghana" },
                  ].map((item, i) => {
                    const inner = (
                      <>
                        <Icon kind={item.icon} size={20} color={C.green} />
                        <div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 15, color: C.white, fontWeight: 600 }}>{item.value}</div>
                        </div>
                      </>
                    );
                    const style = { display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, textDecoration: "none" };
                    return item.href ? <a key={i} href={item.href} style={style}>{inner}</a> : <div key={i} style={style}>{inner}</div>;
                  })}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
