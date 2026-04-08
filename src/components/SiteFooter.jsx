import { Link } from "react-router-dom";

const C = {
  green: "#1BF561",
  darkGreen: "#00AC69",
  dark: "#010F12",
  white: "#FFFEFF",
};

const N_MAIN = "M 406.16 148.62 L 344.47 319.38 L 324.56 374.46 L 252.37 280.73 L 271.26 231.17 L 311.14 279.16 Z";
const N_ACCENT = "M 265.19 342.22 L 189.11 446.65 L 240.92 310.73 Z";
const PAT_M = "M 62.36 -5.65 L 40.92 53.68 L 34 72.82 L 8.92 40.25 L 15.48 23.03 L 29.34 39.71 Z";
const PAT_A = "M 13.37 61.62 L -13.06 97.91 L 4.94 50.68 Z";

function NMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="140 100 320 400" aria-hidden="true">
      <path d={N_MAIN} fill={C.green} />
      <path d={N_ACCENT} fill={C.white} />
    </svg>
  );
}

function Pattern({ color = "#1BF561", opacity = 0.04, rows = 8, cols = 10 }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${cols * 80} ${rows * 100}`} preserveAspectRatio="xMidYMid slice">
        {[...Array(rows)].map((_, r) =>
          [...Array(cols)].map((_, c) => (
            <g key={`${r}${c}`} transform={`translate(${c * 80}, ${r * 100})`}>
              <path d={PAT_M} fill="none" stroke={color} strokeWidth="0.75" />
              <path d={PAT_A} fill="none" stroke={color} strokeWidth="0.75" />
            </g>
          ))
        )}
      </svg>
    </div>
  );
}

function SocialIcon({ kind, size = 18, color }) {
  const paths = {
    instagram: (<><rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="2" fill="none" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke={color} strokeWidth="2" fill="none" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" /></>),
    twitter: (<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />),
    facebook: (<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />),
    linkedin: (<><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" /><rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth="2" fill="none" /><circle cx="4" cy="4" r="2" stroke={color} strokeWidth="2" fill="none" /></>),
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>{paths[kind]}</svg>);
}

const FOOTER_COLUMNS = [
  {
    title: "PRODUCT",
    links: [
      { text: "Find Stations", href: "#stations" },
      { text: "Get the App", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { text: "About Us", href: "/about", isRouter: true },
      { text: "The Project", href: "/project", isRouter: true },
      { text: "Contact", href: "/contact", isRouter: true },
      { text: "Careers", href: "/careers", isRouter: true },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { text: "Terms of Use", href: "/terms", isRouter: true },
      { text: "Privacy Policy", href: "/privacy", isRouter: true },
      { text: "Refund Policy", href: "/refund", isRouter: true },
    ],
  },
];

const SOCIALS = ["instagram", "twitter", "facebook", "linkedin"];

const linkStyle = { fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" };

export default function SiteFooter() {
  return (
    <footer style={{ background: C.dark, padding: "80px 0 32px", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Pattern color={C.green} opacity={0.025} rows={8} cols={12} />
      <style>{`
        .site-footer-grid { display: grid; gap: 40px; grid-template-columns: 1fr; }
        @media (min-width: 700px) { .site-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; } }
      `}</style>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div className="site-footer-grid" style={{ marginBottom: 64 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <NMark size={36} />
              <span style={{ fontSize: 15, fontWeight: 800, color: C.white, letterSpacing: 1.2 }}>NEHEMIAH ENERGY</span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 24, maxWidth: 320 }}>
              Powering Your Journey. Built by Ghanaians, for Ghanaians. EV charging, charging wallet top-ups, and Power Bikes for the everyday Ghanaian driver.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIALS.map((s) => (
                <a key={s} href="#" aria-label={`Nehemiah Energy on ${s}`} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}>
                  <SocialIcon kind={s} size={18} color="rgba(255,255,255,0.7)" />
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLUMNS.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1.2, marginBottom: 18 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link) =>
                  link.isRouter ? (
                    <Link key={link.text} to={link.href} style={linkStyle}>{link.text}</Link>
                  ) : (
                    <a key={link.text} href={link.href} style={linkStyle}>{link.text}</a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 32 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>&copy; 2026 Nehemiah Energy Ltd. All rights reserved. Accra, Ghana.</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.darkGreen, letterSpacing: 0.8 }}>BUILT BY GHANAIANS. FOR GHANAIANS.</div>
        </div>
      </div>
    </footer>
  );
}
