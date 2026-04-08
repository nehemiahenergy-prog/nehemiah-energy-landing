const C = { textBody: "#4B5563", dark: "#010F12", warningBg: "rgba(245, 158, 11, 0.12)", warningText: "#92400E" };

export function P({ children }) {
  return <p style={{ fontSize: "clamp(15px, 1.05vw, 17px)", lineHeight: 1.75, color: C.textBody, marginBottom: 18 }}>{children}</p>;
}

export function Sub({ children }) {
  return <h3 style={{ fontSize: "clamp(17px, 1.3vw, 19px)", fontWeight: 800, color: C.dark, letterSpacing: -0.2, marginTop: 28, marginBottom: 12 }}>{children}</h3>;
}

export function UL({ children }) {
  return <ul style={{ paddingLeft: 22, marginBottom: 18, fontSize: "clamp(15px, 1.05vw, 17px)", lineHeight: 1.75, color: C.textBody }}>{children}</ul>;
}

export function LI({ children }) {
  return <li style={{ marginBottom: 8, paddingLeft: 4 }}>{children}</li>;
}

export function PH({ children }) {
  return <span style={{ background: C.warningBg, color: C.warningText, padding: "1px 8px", borderRadius: 4, fontWeight: 700, fontSize: "0.92em", whiteSpace: "nowrap" }}>[{children}]</span>;
}
