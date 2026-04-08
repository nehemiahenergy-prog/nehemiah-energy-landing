import { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

const C = {
  green: "#1BF561", darkGreen: "#00AC69", olive: "#8DC63F",
  dark: "#010F12", darkBg: "#0B1215", light: "#F4F5F7",
  white: "#FFFEFF", border: "#E4E7EB", muted: "#6B7280", textBody: "#4B5563",
};

const CAREERS_EMAIL = "eunice@nehemiahenergy.com";

const PAT_M = "M 62.36 -5.65 L 40.92 53.68 L 34 72.82 L 8.92 40.25 L 15.48 23.03 L 29.34 39.71 Z";
const PAT_A = "M 13.37 61.62 L -13.06 97.91 L 4.94 50.68 Z";

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

function Icon({ kind, size = 24, color = "#010F12", strokeWidth = 2, style = {} }) {
  const s = strokeWidth;
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    check: <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" />,
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} />,
    person: <><circle cx="12" cy="8" r="4" stroke={color} strokeWidth={s} fill="none" /><path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke={color} strokeWidth={s + 0.3} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth={s} fill="none" /><line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" /></>,
    sun: <><circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth={s} fill="none" /><line x1="12" y1="1.5" x2="12" y2="4" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="12" y1="20" x2="12" y2="22.5" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="4.2" y1="4.2" x2="6" y2="6" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="18" y1="18" x2="19.8" y2="19.8" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="1.5" y1="12" x2="4" y2="12" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="20" y1="12" x2="22.5" y2="12" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="4.2" y1="19.8" x2="6" y2="18" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="18" y1="6" x2="19.8" y2="4.2" stroke={color} strokeWidth={s} strokeLinecap="round" /></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={s} fill="none" /></>,
    clock: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth={s} fill="none" /><polyline points="12 6 12 12 16 14" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth={s} fill="none" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, ...style }} aria-hidden="true">{paths[kind]}</svg>);
}

const OPEN_ROLES = [
  { id: "security", icon: "shield", title: "Security Officer", type: "Full-time", schedule: "Day or night shift", summary: "Keep our station and the people in it safe.", responsibilities: ["Greet drivers as they arrive and depart","Watch the chargers, the cars, and the lounge area","Walk the perimeter regularly","Handle small issues calmly. Call us for the big ones.","Keep a clear log of anything unusual"], requirements: ["Trustworthy and calm under pressure","Comfortable working day or night shifts","Physically fit, able to be on your feet for long periods","Prior security experience is helpful but not required","Friendly with the public \u2014 you are the first face people see"] },
  { id: "momo-attendant", icon: "smartphone", title: "Mobile Money Attendant", type: "Full-time", schedule: "Shift work", summary: "Help drivers top up their charging wallet and handle on-site transactions.", responsibilities: ["Help drivers top up their Nehemiah Energy charging wallet via MoMo","Handle small cash transactions accurately and honestly","Walk new customers through their first charging session","Keep the lounge tidy and welcoming","Report any payment issues to the team"], requirements: ["Friendly, patient, and honest with money","Comfortable with MTN MoMo, Vodafone Cash, and AirtelTigo Money","Basic English and Twi (more languages a plus)","Customer service vibes \u2014 you make people feel taken care of","Reliable. You show up on time, every time."] },
  { id: "day-attendant", icon: "sun", title: "Day Attendant", type: "Full-time", schedule: "Day shift, 6 days a week", summary: "Be the face of Nehemiah Gate during the day.", responsibilities: ["Greet every driver and help them plug in","Answer questions about the app, charging, and our services","Keep the lounge clean, stocked with water, AC running","Report any issues with the chargers to the team immediately","Make every visitor feel like they want to come back"], requirements: ["Outgoing and comfortable talking to strangers","Curious about EVs \u2014 or willing to learn fast","Reliable. On time, every time.","Basic English and Twi","Pride in keeping a space clean and welcoming"] },
];

const VALUES = [
  { icon: "bolt", title: "Real work, real impact", desc: "You are not selling ads or pushing paper. You are on the front line of clean energy in Ghana. What you do every day matters to real drivers and real families." },
  { icon: "person", title: "Built by Ghanaians", desc: "This is a Ghanaian company top to bottom. Founded here, built here, run here. We build for our people because they are our people." },
  { icon: "heart", title: "We dey for our team", desc: "We pay fairly, we listen, and we look out for each other. Day or night. Whatever you need, we got you. That is the assignment." },
];

export default function NehemiahCareers() {
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
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; border-radius: 12px; font-size: 14px; font-weight: 700; font-family: inherit; border: none; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.2s ease; white-space: nowrap; text-decoration: none; }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, ${C.green}, ${C.darkGreen}); color: ${C.dark}; box-shadow: 0 6px 20px rgba(27,245,97,0.25); }
        .btn-primary:hover { box-shadow: 0 10px 30px rgba(27,245,97,0.35); }
        .btn-ghost { background: transparent; color: ${C.white}; border: 1px solid rgba(255,255,255,0.2); }
        .btn-ghost:hover { background: rgba(255,255,255,0.05); }
        .label-pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: 24px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; }
        .h-display { font-size: clamp(40px,6.5vw,84px); font-weight: 800; line-height: 0.98; letter-spacing: -0.025em; }
        .h1 { font-size: clamp(32px,4.5vw,56px); font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; }
        .h3 { font-size: clamp(19px,1.5vw,22px); font-weight: 800; line-height: 1.25; letter-spacing: -0.01em; }
        .body { font-size: clamp(15px,1.1vw,17px); line-height: 1.7; color: ${C.textBody}; }
        .body-lg { font-size: clamp(17px,1.4vw,20px); line-height: 1.6; color: ${C.textBody}; }
        .grid { display: grid; gap: 24px; }
        .grid-3 { grid-template-columns: 1fr; }
        .grid-roles { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .card { background: ${C.white}; border: 1px solid ${C.border}; border-radius: 24px; padding: clamp(28px,2.6vw,36px); transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 24px 48px rgba(1,15,18,0.07); border-color: ${C.green}40; }
        @media (min-width: 900px) { .grid-3 { grid-template-columns: repeat(3,1fr); } .grid-roles { grid-template-columns: repeat(3,1fr); gap: 24px; } }
        .role-card { display: flex; flex-direction: column; background: ${C.white}; border: 1px solid ${C.border}; border-radius: 24px; padding: clamp(28px,2.6vw,36px); transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; height: 100%; }
        .role-card:hover { transform: translateY(-3px); box-shadow: 0 24px 48px rgba(1,15,18,0.07); border-color: ${C.green}50; }
        .role-meta { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background: ${C.light}; border-radius: 100px; font-size: 11px; font-weight: 700; color: ${C.dark}; letter-spacing: 0.3px; }
        .role-section-label { font-size: 11px; font-weight: 700; color: ${C.darkGreen}; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 12px; }
        .role-list { list-style: none; padding: 0; margin: 0 0 24px 0; }
        .role-list li { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 13.5px; line-height: 1.55; color: ${C.textBody}; }
        .role-list li:last-child { margin-bottom: 0; }
        .role-list svg { margin-top: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      <SiteNav />

      <main>
        {/* HERO */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, position: "relative", overflow: "hidden", paddingTop: "clamp(140px,14vw,180px)", paddingBottom: "clamp(70px,9vw,120px)" }}>
          <Pattern color={C.green} opacity={0.04} rows={12} cols={16} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(900px,90vw)", height: "min(900px,90vw)", borderRadius: "50%", background: `radial-gradient(circle, ${C.green}1A 0%, ${C.green}06 35%, transparent 65%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div className="fade-up label-pill" style={{ background: "rgba(27,245,97,0.08)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 28 }}><Icon kind="briefcase" size={12} color={C.green} /> WE DEY HIRE</div>
            <h1 className="h-display fade-up" style={{ color: C.white, marginBottom: 28, animationDelay: "0.1s" }}>Build with <span style={{ color: C.green }}>us.</span></h1>
            <p className="fade-up" style={{ fontSize: "clamp(17px,1.5vw,22px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 680, margin: "0 auto 36px", animationDelay: "0.2s" }}>
              {OPEN_ROLES.length > 0 ? `${OPEN_ROLES.length === 1 ? "One open role" : OPEN_ROLES.length + " open roles"} right now. All on-site at Nehemiah Gate, Haatso. If you want to be at the front line of clean energy in Ghana, this is the place.` : "We are not actively hiring right now, but we read every CV. If you want to be part of building Ghana\u2019s clean energy future, we want to hear from you."}
            </p>
            <div className="fade-up" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animationDelay: "0.3s" }}>
              {OPEN_ROLES.length > 0 && <a href="#open-roles" className="btn btn-primary">See Open Roles <Icon kind="arrow" size={14} color={C.dark} /></a>}
              <a href={`mailto:${CAREERS_EMAIL}`} className="btn btn-ghost">Send Your CV</a>
            </div>
          </div>
        </section>

        {/* WHY NEHEMIAH */}
        <section style={{ background: C.light, padding: "clamp(80px,10vw,120px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>WHY NEHEMIAH</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>This is not<br />just a job.</h2>
              <p className="body-lg" style={{ maxWidth: 580, margin: "0 auto" }}>It is a chance to be part of something that has not existed in Ghana before. We are small. We move fast. We treat each other right.</p>
            </div>
            <div className="grid grid-3">
              {VALUES.map((v, i) => (
                <div key={i} className="card">
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Icon kind={v.icon} size={28} color={C.darkGreen} /></div>
                  <h3 className="h3" style={{ color: C.dark, marginBottom: 12 }}>{v.title}</h3>
                  <p className="body" style={{ maxWidth: 320 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section id="open-roles" style={{ background: C.white, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>OPEN ROLES</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>{OPEN_ROLES.length > 0 ? (OPEN_ROLES.length === 1 ? "One role open." : `${OPEN_ROLES.length} roles open.`) : "No open roles right now."}</h2>
              <p className="body-lg" style={{ maxWidth: 580, margin: "0 auto" }}>{OPEN_ROLES.length > 0 ? "All positions are full-time and on-site at Nehemiah Gate in Haatso, Accra. Apply by email and we will get back to you within a week." : "We are not actively hiring, but we always read CVs from people who want to help build Ghana\u2019s clean energy future. Send yours and we will reach out when a role opens."}</p>
            </div>
            {OPEN_ROLES.length > 0 ? (
              <div className="grid-roles">
                {OPEN_ROLES.map((role) => (
                  <div key={role.id} className="role-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon kind={role.icon} size={26} color={C.darkGreen} /></div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: C.dark, letterSpacing: -0.3, lineHeight: 1.2 }}>{role.title}</h3>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                      <span className="role-meta"><Icon kind="briefcase" size={11} color={C.dark} />{role.type}</span>
                      <span className="role-meta"><Icon kind="pin" size={11} color={C.dark} />Haatso</span>
                      <span className="role-meta"><Icon kind="clock" size={11} color={C.dark} />{role.schedule}</span>
                    </div>
                    <p style={{ fontSize: 14.5, color: C.textBody, lineHeight: 1.6, marginBottom: 24, fontWeight: 500 }}>{role.summary}</p>
                    <div className="role-section-label">What you'll do</div>
                    <ul className="role-list">{role.responsibilities.map((r, i) => <li key={i}><Icon kind="check" size={14} color={C.darkGreen} /><span>{r}</span></li>)}</ul>
                    <div className="role-section-label">What we are looking for</div>
                    <ul className="role-list">{role.requirements.map((r, i) => <li key={i}><Icon kind="check" size={14} color={C.darkGreen} /><span>{r}</span></li>)}</ul>
                    <a href={`mailto:${CAREERS_EMAIL}?subject=Application: ${encodeURIComponent(role.title)}`} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}>Apply for this role <Icon kind="arrow" size={14} color={C.dark} /></a>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", padding: "48px 32px", background: C.light, border: `1px dashed ${C.border}`, borderRadius: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Icon kind="mail" size={32} color={C.darkGreen} /></div>
                <h3 className="h3" style={{ color: C.dark, marginBottom: 12 }}>Send us your CV anyway.</h3>
                <p className="body" style={{ marginBottom: 24 }}>Email {CAREERS_EMAIL} with a short note about what you want to build. We read every application.</p>
                <a href={`mailto:${CAREERS_EMAIL}`} className="btn btn-primary">Email Us <Icon kind="arrow" size={14} color={C.dark} /></a>
              </div>
            )}
          </div>
        </section>

        {/* HOW TO APPLY */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden" }}>
          <Pattern color={C.green} opacity={0.04} rows={8} cols={12} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}13 0%, transparent 60%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24 }}>HOW TO APPLY</div>
            <h2 className="h-display" style={{ color: C.white, maxWidth: 900, margin: "0 auto 24px" }}>Two ways<br />to reach us.</h2>
            <p className="body-lg" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 620, margin: "0 auto 56px" }}>Pick whichever is easier for you. Either way, include a short note about which role you want and why you want to join.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, maxWidth: 760, margin: "0 auto" }}>
              <a href={`mailto:${CAREERS_EMAIL}`} style={{ display: "flex", alignItems: "center", gap: 18, padding: "24px 28px", background: "rgba(27,245,97,0.06)", border: "1px solid rgba(27,245,97,0.25)", borderRadius: 16, textAlign: "left", transition: "transform 0.2s ease" }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(27,245,97,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon kind="mail" size={24} color={C.green} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>Email Us Directly</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 4 }}>{CAREERS_EMAIL}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Attach your CV. Tell us which role and why you want it.</div>
                </div>
                <Icon kind="arrow" size={16} color={C.green} style={{ flexShrink: 0 }} />
              </a>
              <Link to="/contact" style={{ display: "flex", alignItems: "center", gap: 18, padding: "24px 28px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, textAlign: "left", transition: "transform 0.2s ease" }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon kind="briefcase" size={24} color={C.white} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>Use the Contact Form</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 4 }}>nehemiahenergy.com/contact</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Pick {"\u201C"}Careers / Job Application{"\u201D"} as the topic.</div>
                </div>
                <Icon kind="arrow" size={16} color="rgba(255,255,255,0.6)" style={{ flexShrink: 0 }} />
              </Link>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 540, margin: "32px auto 0", fontStyle: "italic" }}>We read every application and we get back to everyone within a week. No ghosting. That is a promise.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
