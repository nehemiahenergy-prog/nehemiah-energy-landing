import { useState, useEffect } from "react";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

const C = {
  green: "#1BF561", darkGreen: "#00AC69", olive: "#8DC63F",
  dark: "#010F12", darkBg: "#0B1215", light: "#F4F5F7",
  white: "#FFFEFF", border: "#E4E7EB", muted: "#6B7280", textBody: "#4B5563",
};

// TODO: Set to false once /api/contact endpoint is live
const IS_PREVIEW_MODE = true;
const CONTACT_ENDPOINT = "/api/contact";

const N_MAIN = "M 406.16 148.62 L 344.47 319.38 L 324.56 374.46 L 252.37 280.73 L 271.26 231.17 L 311.14 279.16 Z";
const N_ACCENT = "M 265.19 342.22 L 189.11 446.65 L 240.92 310.73 Z";
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
    chat: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" />,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth={s} fill="none" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /></>,
    link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" />,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={s} fill="none" /></>,
    clock: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth={s} fill="none" /><polyline points="12 6 12 12 16 14" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    check: <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth={s + 1} fill="none" strokeLinecap="round" />,
    minus: <path d="M5 12h14" stroke={color} strokeWidth={s + 1} fill="none" strokeLinecap="round" />,
    send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" />,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth={s + 0.5} strokeLinecap="round" /></>,
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, ...style }} aria-hidden="true">{paths[kind]}</svg>);
}

const CONTACT_METHODS = [
  { icon: "chat", label: "CUSTOMER SERVICE", title: "Need a hand?", desc: "Questions about charging, your wallet, the app, or anything else. We answer every message, day or night.", email: "support@nehemiahenergy.com" },
  { icon: "briefcase", label: "CAREERS", title: "Join the team.", desc: "Want to help build the future of clean mobility in Ghana? We are always looking for sharp, driven Ghanaians.", email: "careers@nehemiahenergy.com", href: "/careers" },
  { icon: "link", label: "PARTNERSHIPS", title: "Let\u2019s build together.", desc: "Fleet operators, schools, suppliers, corporate partners. If you want to power something with us, let us know.", email: "partnerships@nehemiahenergy.com" },
];

const FAQS = [
  { q: "Where is your charging station?", a: "Our first station is at Nehemiah Gate in Haatso, Accra. Open 24/7 and self-service. Search \u2018Nehemiah Energy Haatso\u2019 on Google Maps, or hit the Get Directions button below to open it directly. More stations are coming online across Greater Accra in 2026." },
  { q: "Is my electric vehicle compatible?", a: "Probably yes. We use the GB/T DC fast charging standard with two 120 kW guns (Gun A and Gun B), which covers most EVs sold in Ghana including BYD, MG, JAC, Geely, and Great Wall. If you drive a CCS or CHAdeMO vehicle, send us your make and model and we will let you know." },
  { q: "How much does it cost to charge?", a: "Membership is free to join through the Nehemiah Energy app. Current charging rates are shown live in the app and at every station before you start a session, so you always know what you are paying. Sign up to see pricing and start charging." },
  { q: "How do I pay?", a: "Through the Nehemiah Energy app. Top up your charging wallet with mobile money (MTN, Vodafone, AirtelTigo) or any major debit or credit card via Paystack. Wallet balances do not expire. Sessions are deducted automatically when you charge." },
  { q: "Do you offer fleet or business accounts?", a: "Yes. We offer custom rates, consolidated billing, and dedicated support for fleet operators, ride-hail companies, logistics businesses, and corporate fleets. Reach out to partnerships@nehemiahenergy.com and we will set up a call." },
  { q: "Are you hiring?", a: "Yes, always. We are growing across engineering, operations, customer experience, and the Nehemiah Project. Send your CV and a short note about what you want to build to careers@nehemiahenergy.com. We read every application." },
];

export default function NehemiahContact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", topic: "general", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); if (submitStatus) setSubmitStatus(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { alert("Please enter your name."); return; }
    if (!formData.email.includes("@") || !formData.email.includes(".")) { alert("Please enter a valid email address."); return; }
    if (!formData.message.trim() || formData.message.trim().length < 10) { alert("Please write a message of at least 10 characters."); return; }

    if (IS_PREVIEW_MODE) {
      const inboxMap = { general: "support@nehemiahenergy.com", support: "support@nehemiahenergy.com", careers: "careers@nehemiahenergy.com", partnerships: "partnerships@nehemiahenergy.com" };
      alert("PREVIEW MODE\n\nIn production, this submits to " + CONTACT_ENDPOINT + " and routes to:\n\n  " + inboxMap[formData.topic] + "\n\nFrom: " + formData.name + " <" + formData.email + ">\nTopic: " + formData.topic + "\nMessage: " + formData.message.substring(0, 100) + (formData.message.length > 100 ? "..." : "") + "\n\nSet IS_PREVIEW_MODE to false to enable real submissions.");
      return;
    }

    setIsSubmitting(true); setSubmitStatus(null);
    try {
      const res = await fetch(CONTACT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { setSubmitStatus("success"); setFormData({ name: "", email: "", topic: "general", message: "" }); } else { setSubmitStatus("error"); }
    } catch { setSubmitStatus("error"); } finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: C.white, fontFamily: "'Space Grotesk', sans-serif", color: C.dark, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        input, select, textarea { font-family: inherit; }
        .container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; border-radius: 12px; font-size: 14px; font-weight: 700; font-family: inherit; border: none; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.2s ease; white-space: nowrap; text-decoration: none; }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, ${C.green}, ${C.darkGreen}); color: ${C.dark}; box-shadow: 0 6px 20px rgba(27,245,97,0.25); }
        .btn-primary:hover { box-shadow: 0 10px 30px rgba(27,245,97,0.35); }
        .label-pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: 24px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; }
        .h-display { font-size: clamp(40px,6.5vw,84px); font-weight: 800; line-height: 0.98; letter-spacing: -0.025em; }
        .h1 { font-size: clamp(32px,4.5vw,56px); font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; }
        .h3 { font-size: clamp(19px,1.5vw,22px); font-weight: 800; line-height: 1.25; letter-spacing: -0.01em; }
        .body { font-size: clamp(15px,1.1vw,17px); line-height: 1.7; color: ${C.textBody}; }
        .body-lg { font-size: clamp(17px,1.4vw,20px); line-height: 1.6; color: ${C.textBody}; }
        .grid { display: grid; gap: 24px; }
        .grid-3 { grid-template-columns: 1fr; }
        .grid-form { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .grid-3 { grid-template-columns: repeat(3,1fr); } .grid-form { grid-template-columns: 1fr 1.4fr; gap: 56px; align-items: start; } }
        .card { background: ${C.white}; border: 1px solid ${C.border}; border-radius: 24px; padding: clamp(28px,2.6vw,36px); transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 24px 48px rgba(1,15,18,0.07); border-color: ${C.green}40; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .input { width: 100%; padding: 14px 16px; background: ${C.light}; border: 1.5px solid transparent; border-radius: 12px; font-size: 15px; font-weight: 500; color: ${C.dark}; font-family: inherit; outline: none; transition: all 0.15s ease; }
        .input:focus { border-color: ${C.green}; background: ${C.white}; box-shadow: 0 0 0 4px rgba(27,245,97,0.1); }
        .input::placeholder { color: ${C.muted}; font-weight: 500; }
        textarea.input { resize: vertical; min-height: 140px; line-height: 1.6; }
        select.input { appearance: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>"); background-repeat: no-repeat; background-position: right 16px center; background-size: 16px; padding-right: 44px; }
        .input-label { display: block; font-size: 12px; font-weight: 700; color: ${C.dark}; margin-bottom: 8px; letter-spacing: 0.2px; }
        .faq-item { border-bottom: 1px solid ${C.border}; }
        .faq-button { width: 100%; padding: 24px 0; background: transparent; border: none; display: flex; justify-content: space-between; align-items: center; gap: 24px; cursor: pointer; text-align: left; transition: color 0.15s ease; font-family: inherit; }
        .faq-button:hover { color: ${C.darkGreen}; }
        .faq-question { font-size: clamp(16px,1.3vw,19px); font-weight: 700; color: ${C.dark}; letter-spacing: -0.2px; flex: 1; }
        .faq-icon-wrap { width: 36px; height: 36px; border-radius: 10px; background: ${C.light}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s ease; }
        .faq-button:hover .faq-icon-wrap { background: ${C.green}; }
        .faq-answer { padding: 0 0 24px 0; font-size: clamp(14px,1.05vw,16px); line-height: 1.7; color: ${C.textBody}; max-width: 720px; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      <SiteNav />

      <main>
        {/* HERO */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, position: "relative", overflow: "hidden", paddingTop: "clamp(140px,14vw,180px)", paddingBottom: "clamp(70px,9vw,120px)" }}>
          <Pattern color={C.green} opacity={0.04} rows={12} cols={16} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(900px,90vw)", height: "min(900px,90vw)", borderRadius: "50%", background: `radial-gradient(circle, ${C.green}1A 0%, ${C.green}06 35%, transparent 65%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div className="fade-up label-pill" style={{ background: "rgba(27,245,97,0.08)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 28 }}><Icon kind="chat" size={12} color={C.green} /> WE DEY FOR YOU</div>
            <h1 className="h-display fade-up" style={{ color: C.white, marginBottom: 28, animationDelay: "0.1s" }}>Let{"\u2019"}s <span style={{ color: C.green }}>talk.</span></h1>
            <p className="fade-up" style={{ fontSize: "clamp(17px,1.5vw,22px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 680, margin: "0 auto", animationDelay: "0.2s" }}>Whether you are a driver, a partner, a future hire, or just curious {"\u2014"} we want to hear from you. We read every message and answer fast.</p>
          </div>
        </section>

        {/* CONTACT METHODS */}
        <section style={{ background: C.light, padding: "clamp(80px,10vw,120px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>THREE WAYS TO REACH US</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>Pick your inbox.</h2>
              <p className="body-lg" style={{ maxWidth: 580, margin: "0 auto" }}>We split our inboxes by topic so the right person on our team gets your message faster.</p>
            </div>
            <div className="grid grid-3">
              {CONTACT_METHODS.map((m, i) => (
                <a key={i} href={m.href || `mailto:${m.email}`} className="card" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Icon kind={m.icon} size={28} color={C.darkGreen} /></div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.darkGreen, letterSpacing: 1.2, marginBottom: 8 }}>{m.label}</div>
                  <h3 className="h3" style={{ color: C.dark, marginBottom: 12 }}>{m.title}</h3>
                  <p className="body" style={{ marginBottom: 24, flex: 1 }}>{m.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                    <Icon kind="mail" size={16} color={C.darkGreen} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, wordBreak: "break-all" }}>{m.email}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section style={{ background: C.white, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div className="grid-form" style={{ display: "grid" }}>
              <div>
                <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>DROP US A LINE</div>
                <h2 className="h1" style={{ color: C.dark, marginBottom: 24 }}>Send us a<br />message.</h2>
                <p className="body-lg" style={{ marginBottom: 32, maxWidth: 440 }}>Fill out the form and we will get back to you within 24 hours during the work week. Faster on weekdays, slower on Sundays.</p>
                <div style={{ background: C.light, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 22px", maxWidth: 440 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.darkGreen, letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Where it goes</div>
                  <div style={{ fontSize: 13.5, color: C.textBody, lineHeight: 1.7 }}>Pick a topic and we route your message to the right inbox automatically. No more lost emails between teams.</div>
                </div>
              </div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 24, padding: "clamp(28px,3vw,40px)", boxShadow: "0 20px 60px rgba(1,15,18,0.04)" }}>
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ marginBottom: 18 }}><label className="input-label" htmlFor="contact-name">Your name</label><input id="contact-name" className="input" type="text" placeholder="Kwame Asante" value={formData.name} onChange={e => handleChange("name", e.target.value)} required /></div>
                  <div style={{ marginBottom: 18 }}><label className="input-label" htmlFor="contact-email">Your email</label><input id="contact-email" className="input" type="email" placeholder="you@example.com" value={formData.email} onChange={e => handleChange("email", e.target.value)} required /></div>
                  <div style={{ marginBottom: 18 }}><label className="input-label" htmlFor="contact-topic">What is this about?</label><select id="contact-topic" className="input" value={formData.topic} onChange={e => handleChange("topic", e.target.value)}><option value="general">General Inquiry</option><option value="support">Customer Support</option><option value="careers">Careers / Job Application</option><option value="partnerships">Partnerships</option></select></div>
                  <div style={{ marginBottom: 24 }}><label className="input-label" htmlFor="contact-message">Your message</label><textarea id="contact-message" className="input" placeholder="Tell us what is on your mind..." value={formData.message} onChange={e => handleChange("message", e.target.value)} required rows={6} /></div>
                  {submitStatus === "success" && (<div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "rgba(27,245,97,0.1)", border: `1px solid ${C.green}40`, borderRadius: 12, marginBottom: 18 }}><Icon kind="check" size={18} color={C.darkGreen} /><span style={{ fontSize: 14, fontWeight: 600, color: C.darkGreen }}>Message sent. We will reply soon.</span></div>)}
                  {submitStatus === "error" && (<div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "rgba(245,158,11,0.1)", border: "1px solid #F59E0B40", borderRadius: 12, marginBottom: 18 }}><Icon kind="warning" size={18} color="#92400E" /><span style={{ fontSize: 14, fontWeight: 600, color: "#92400E" }}>Something went wrong. Please try again or email us directly.</span></div>)}
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: "100%", justifyContent: "center", padding: "16px 22px", fontSize: 15, opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "wait" : "pointer" }}>
                    {isSubmitting ? "Sending..." : <>Send Message <Icon kind="send" size={14} color={C.dark} /></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* VISIT US */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden" }}>
          <Pattern color={C.green} opacity={0.04} rows={8} cols={12} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}13 0%, transparent 60%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24 }}>VISIT NEHEMIAH GATE</div>
            <h2 className="h-display" style={{ color: C.white, maxWidth: 900, margin: "0 auto 24px" }}>Come find us.</h2>
            <p className="body-lg" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 620, margin: "0 auto 56px" }}>Drop by Nehemiah Gate in Haatso. Plug in, top up at the lounge, and meet the team building this thing.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, maxWidth: 720, margin: "0 auto 40px" }}>
              {[{ icon: "pin", label: "Address", value: "Nehemiah Gate, Haatso, Accra, Ghana" },{ icon: "phone", label: "Phone", value: "+233 24 594 7843", href: "tel:+233245947843" },{ icon: "clock", label: "Hours", value: "Open 24/7 \u2014 self-service charging, day or night" }].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, textAlign: "left" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: "rgba(27,245,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon kind={item.icon} size={20} color={C.green} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                    {item.href ? <a href={item.href} style={{ fontSize: 16, color: C.white, fontWeight: 600 }}>{item.value}</a> : <div style={{ fontSize: 16, color: C.white, fontWeight: 600 }}>{item.value}</div>}
                  </div>
                </div>
              ))}
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=Nehemiah+Energy+Haatso+Accra" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Directions <Icon kind="arrow" size={14} color={C.dark} /></a>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: C.light, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>FREQUENTLY ASKED</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>Got questions?</h2>
              <p className="body-lg" style={{ maxWidth: 580, margin: "0 auto" }}>The most common things drivers and partners ask us. Don{"\u2019"}t see your question? Send us a message above.</p>
            </div>
            <div style={{ maxWidth: 820, margin: "0 auto", background: C.white, border: `1px solid ${C.border}`, borderRadius: 24, padding: "clamp(8px,1vw,16px) clamp(24px,3vw,40px)" }}>
              {FAQS.map((faq, i) => (
                <div key={i} className="faq-item" style={{ borderBottom: i === FAQS.length - 1 ? "none" : `1px solid ${C.border}` }}>
                  <button className="faq-button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                    <span className="faq-question">{faq.q}</span>
                    <span className="faq-icon-wrap"><Icon kind={openFaq === i ? "minus" : "plus"} size={16} color={openFaq === i ? C.dark : C.darkGreen} /></span>
                  </button>
                  {openFaq === i && <div className="faq-answer">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
