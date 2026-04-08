import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const C = {
  green: "#1BF561",
  darkGreen: "#00AC69",
  dark: "#010F12",
  white: "#FFFEFF",
};

const N_MAIN = "M 406.16 148.62 L 344.47 319.38 L 324.56 374.46 L 252.37 280.73 L 271.26 231.17 L 311.14 279.16 Z";
const N_ACCENT = "M 265.19 342.22 L 189.11 446.65 L 240.92 310.73 Z";

function NMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="140 100 320 400" aria-hidden="true">
      <path d={N_MAIN} fill={C.green} />
      <path d={N_ACCENT} fill={C.white} />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Home", to: "/", isRouter: true },
  { label: "Stations", to: "#stations", isRouter: false },
  { label: "About", to: "/about", isRouter: true },
  { label: "Project", to: "/project", isRouter: true },
  { label: "Contact", to: "#", isRouter: false },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (link) => {
    if (link.to === "/" && location.pathname === "/") return true;
    if (link.to !== "/" && location.pathname.startsWith(link.to)) return true;
    return false;
  };

  const navLinkStyle = (active) => ({
    fontSize: 14,
    fontWeight: 500,
    color: active ? C.green : "rgba(255,255,255,0.7)",
    padding: "10px 16px",
    borderRadius: 8,
    transition: "all 0.15s ease",
    textDecoration: "none",
    display: "inline-block",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "14px 0" : "20px 0",
        background: scrolled ? "rgba(1,15,18,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          <NMark size={34} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: C.white,
              letterSpacing: 1.2,
            }}
          >
            NEHEMIAH ENERGY
          </span>
        </Link>

        {/* Desktop nav — hidden below 900px via inline media query workaround */}
        <div
          className="site-nav-desktop-links"
          style={{ alignItems: "center", gap: 4 }}
        >
          {NAV_LINKS.map((link) =>
            link.isRouter ? (
              <Link
                key={link.label}
                to={link.to}
                style={navLinkStyle(isActive(link))}
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.to} style={navLinkStyle(false)}>
                {link.label}
              </a>
            )
          )}
        </div>

        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 22px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${C.green}, ${C.darkGreen})`,
            color: C.dark,
            boxShadow: "0 6px 20px rgba(27,245,97,0.25)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "transform 0.15s ease, box-shadow 0.2s ease",
          }}
        >
          Get the App
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke={C.dark}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <style>{`
        .site-nav-desktop-links { display: none; }
        @media (min-width: 900px) { .site-nav-desktop-links { display: flex; } }
      `}</style>
    </nav>
  );
}
