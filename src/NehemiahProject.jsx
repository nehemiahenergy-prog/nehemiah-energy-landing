import { useState, useEffect } from "react";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

const C = {
  green: "#1BF561", darkGreen: "#00AC69", olive: "#8DC63F",
  dark: "#010F12", darkBg: "#0B1215", light: "#F4F5F7",
  white: "#FFFEFF", border: "#E4E7EB", muted: "#6B7280", textBody: "#4B5563",
};

// TODO: Replace with real Paystack public key before launch
const PAYSTACK_PUBLIC_KEY = "pk_test_REPLACE_WITH_YOUR_REAL_PAYSTACK_PUBLIC_KEY";

const SOLAR_KIT_IMG = "/images/nehemiah-solar-kit.jpg";
const SCHOOL_IMG = "/images/marcoff-orphanage.jpg";

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

function Icon({ kind, size = 24, color = "#010F12", strokeWidth = 2, style = {} }) {
  const s = strokeWidth;
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" />,
    check: <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} />,
    plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth={s + 1} fill="none" strokeLinecap="round" />,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={s} fill="none" /></>,
    person: <><circle cx="12" cy="8" r="4" stroke={color} strokeWidth={s} fill="none" /><path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" /></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth={s} fill="none" /><line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" /></>,
    sapling: <><path d="M12 22 L12 13" stroke={color} strokeWidth={s * 0.9} fill="none" strokeLinecap="round" /><path d="M12 13 Q 8 9 10 4 Q 14 6 14 11 Q 13.5 12.5 12 13 Z" stroke={color} strokeWidth={s * 0.9} fill="none" strokeLinejoin="round" /><path d="M12 17 Q 7 16 5.5 18.5" stroke={color} strokeWidth={s * 0.9} fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="10" r="0.6" fill={color} /><circle cx="18" cy="8" r="0.6" fill={color} /><circle cx="17" cy="14" r="0.6" fill={color} /><circle cx="5" cy="14" r="0.6" fill={color} /></>,
    book: <><path d="M4 4.5A2.5 2.5 0 016.5 2H20v15H6.5a2.5 2.5 0 000 5H20v2H6.5A4.5 4.5 0 014 19.5v-15z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><line x1="8" y1="7" x2="16" y2="7" stroke={color} strokeWidth={s - 0.3} strokeLinecap="round" /><line x1="8" y1="11" x2="16" y2="11" stroke={color} strokeWidth={s - 0.3} strokeLinecap="round" /></>,
    sun: <><circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth={s} fill="none" /><line x1="12" y1="1.5" x2="12" y2="4" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="12" y1="20" x2="12" y2="22.5" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="4.2" y1="4.2" x2="6" y2="6" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="18" y1="18" x2="19.8" y2="19.8" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="1.5" y1="12" x2="4" y2="12" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="20" y1="12" x2="22.5" y2="12" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="4.2" y1="19.8" x2="6" y2="18" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="18" y1="6" x2="19.8" y2="4.2" stroke={color} strokeWidth={s} strokeLinecap="round" /></>,
    gradCap: <><path d="M22 10L12 5L2 10l10 5l10-5z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><path d="M6 12v5a6 3 0 0012 0v-5" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><line x1="22" y1="10" x2="22" y2="16" stroke={color} strokeWidth={s} strokeLinecap="round" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, ...style }} aria-hidden="true">{paths[kind]}</svg>);
}

const PARTNERSHIPS = [
  { name: "Marcoff Orphanage and School", location: "Nsutam, Akuapem", status: "Active", description: "Curriculum, solar kit building, and a full course on renewable energy. First cohort complete.", partner: "AJ Hope Foundation \u00d7 Nehemiah Energy", image: SCHOOL_IMG },
  { name: "Abundance Grace Academy", location: "Ningo", status: "Active", description: "Curriculum, solar kit building, and a full course on renewable energy.", partner: "AJ Hope Foundation \u00d7 Nehemiah Energy", image: null },
  { name: "Partner School 3", location: "To be announced", status: "Coming Soon", description: "Cohort launching 2026. Curriculum, solar kit building, and a full course on renewable energy.", partner: "Nehemiah Energy", image: null },
];

export default function NehemiahProject() {
  const [donationAmount, setDonationAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector('script[src*="js.paystack.co"]')) return;
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const quickAmounts = [20, 50, 100, 200, 500];
  const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;

  const handleDonate = () => {
    if (!email || !email.includes("@") || !email.includes(".")) { alert("Please enter a valid email address so we can send your donation receipt."); return; }
    if (!finalAmount || isNaN(finalAmount) || finalAmount < 1) { alert("Please choose a donation amount of at least GHS 1."); return; }
    if (PAYSTACK_PUBLIC_KEY.includes("REPLACE_WITH")) { alert("PREVIEW MODE\n\nIn production, this opens the Paystack popup with:\n\n  Email: " + email + "\n  Amount: GHS " + finalAmount.toFixed(2) + "\n\nTo enable real payments, replace PAYSTACK_PUBLIC_KEY with your real key."); return; }
    if (typeof window === "undefined" || !window.PaystackPop) { alert("Payment system is still loading. Please try again in a moment."); return; }
    setIsProcessing(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY, email, amount: Math.round(finalAmount * 100), currency: "GHS",
      ref: `nehemiah-project-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      metadata: { custom_fields: [{ display_name: "Donation Type", variable_name: "donation_type", value: "Nehemiah Project \u2014 Direct Donation" }, { display_name: "Source Page", variable_name: "source_page", value: "/project" }] },
      callback: function(response) { setIsProcessing(false); alert("Thank you for your donation!\n\nAmount: GHS " + finalAmount.toFixed(2) + "\nReference: " + response.reference + "\n\nA receipt will be sent to " + email + "."); },
      onClose: function() { setIsProcessing(false); },
    });
    handler.openIframe();
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: C.white, fontFamily: "'Space Grotesk', sans-serif", color: C.dark, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        input { font-family: inherit; }
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
        .grid-4 { grid-template-columns: 1fr; }
        .grid-cta { grid-template-columns: 1fr; }
        .kit-layout { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        .card { background: ${C.white}; border: 1px solid ${C.border}; border-radius: 24px; padding: clamp(28px,2.6vw,40px); transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 24px 48px rgba(1,15,18,0.07); border-color: ${C.green}40; }
        @media (min-width: 700px) { .grid-4 { grid-template-columns: repeat(2,1fr); gap: 20px; } }
        @media (min-width: 900px) { .grid-3 { grid-template-columns: repeat(3,1fr); } .grid-4 { grid-template-columns: repeat(4,1fr); } .grid-cta { grid-template-columns: 1fr 1fr; gap: 24px; } .kit-layout { grid-template-columns: 1fr 1fr; gap: 64px; } }
        .amount-btn { padding: 14px 18px; border-radius: 12px; font-size: 15px; font-weight: 700; font-family: inherit; cursor: pointer; border: 1.5px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: ${C.white}; transition: all 0.15s ease; }
        .amount-btn:hover { border-color: ${C.green}60; }
        .amount-btn.active { background: ${C.green}; color: ${C.dark}; border-color: ${C.green}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-2deg); } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      <SiteNav />

      <main>
        {/* HERO */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, position: "relative", overflow: "hidden", paddingTop: "clamp(140px,14vw,180px)", paddingBottom: "clamp(80px,10vw,140px)" }}>
          <Pattern color={C.green} opacity={0.04} rows={14} cols={16} />
          <div aria-hidden="true" style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", width: "min(1100px,95vw)", height: "min(1100px,95vw)", borderRadius: "50%", background: `radial-gradient(circle, ${C.green}1F 0%, ${C.green}08 35%, transparent 65%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
              <div style={{ animation: "floatSlow 6s ease-in-out infinite" }}><Icon kind="sapling" size={120} color={C.green} strokeWidth={1.4} /></div>
            </div>
            <div className="fade-up label-pill" style={{ background: "rgba(27,245,97,0.08)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 28, animationDelay: "0.1s" }}>
              <Icon kind="heart" size={12} color={C.green} /> THE NEHEMIAH PROJECT
            </div>
            <h1 className="h-display fade-up" style={{ color: C.white, marginBottom: 28, maxWidth: 1000, margin: "0 auto 28px", animationDelay: "0.2s" }}>Every Charge Builds<br />a <span style={{ color: C.green }}>Brighter Ghana</span></h1>
            <p className="fade-up" style={{ fontSize: "clamp(17px,1.5vw,22px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 680, margin: "0 auto 44px", animationDelay: "0.3s" }}>A portion of every Nehemiah Energy charge funds renewable energy education for kids across Ghana. Built by Ghanaians, for the next generation of Ghanaians.</p>
            <div className="fade-up" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animationDelay: "0.4s" }}>
              <a href="#donate" className="btn btn-primary">Donate Now <Icon kind="heart" size={14} color={C.dark} /></a>
              <a href="#how-it-works" className="btn btn-ghost">How It Works</a>
            </div>
          </div>
        </section>

        {/* THE WHY */}
        <section style={{ background: C.white, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 24, padding: "6px 14px" }}>THE WHY</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 32 }}>We were called to rebuild.</h2>
              <div style={{ fontSize: "clamp(17px,1.3vw,20px)", lineHeight: 1.75, color: C.textBody }}>
                <p style={{ marginBottom: 20 }}>But rebuilding is not just about stations and bikes. It is about the kids who will inherit this country {"\u2014"} and the energy that will power their future.</p>
                <p style={{ marginBottom: 20 }}>Every Ghanaian child deserves to understand how clean energy works, where it comes from, and how they can shape it. Solar, wind, storage, the grid. The tools of the future belong to the next generation, but only if they learn them now.</p>
                <p style={{ marginBottom: 0, color: C.dark, fontWeight: 600 }}>That is why the Nehemiah Project exists. Because every charge builds a brighter Ghana. Literally.</p>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden" }}>
          <Pattern color={C.green} opacity={0.04} rows={8} cols={12} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}13 0%, transparent 60%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24 }}>OUR IMPACT SO FAR</div>
            <h2 className="h-display" style={{ color: C.white, maxWidth: 900, margin: "0 auto 24px" }}>Small numbers.<br /><span style={{ color: C.green }}>Real futures.</span></h2>
            <p className="body-lg" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 620, margin: "0 auto 64px" }}>We are just getting started. Every cedi raised, every kid reached, every classroom lit {"\u2014"} these numbers grow with every charge.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }}>
              {[{ icon: "heart", value: "GHS 4,280", label: "Total Raised" },{ icon: "person", value: "342", label: "Kids Helped" },{ icon: "check", value: "100%", label: "To the Cause" }].map((stat, i) => (
                <div key={i} style={{ background: "rgba(27,245,97,0.04)", border: "1px solid rgba(27,245,97,0.18)", borderRadius: 20, padding: "clamp(24px,3vw,36px) clamp(12px,2vw,24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <Icon kind={stat.icon} size={28} color={C.green} />
                  <div style={{ fontSize: "clamp(24px,3.6vw,44px)", fontWeight: 800, color: C.green, lineHeight: 1, letterSpacing: -0.5, fontVariantNumeric: "tabular-nums" }}>{stat.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 0.8, textTransform: "uppercase", textAlign: "center" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ background: C.light, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>HOW IT WORKS</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>Three ways to give.</h2>
              <p className="body-lg" style={{ maxWidth: 580, margin: "0 auto" }}>The Project is funded by every driver who charges with Nehemiah Energy, every pesewa rounded up, and every direct donor who believes in the mission.</p>
            </div>
            <div className="grid grid-3">
              {[{ num: "01", title: "Round Up Every Charge", icon: "plus", desc: "Turn on round-up in the app. When your charge costs GHS 38.40, you pay GHS 39. That 60 pesewas goes straight to the Nehemiah Project. Small on your side, big for the cause." },{ num: "02", title: "A Portion of Every Charge", icon: "bolt", desc: "Nehemiah Energy contributes a fixed portion of every kWh sold at our stations to the Project. Every driver who charges with us is already giving back, whether they round up or not." },{ num: "03", title: "Direct Donations", icon: "heart", desc: "Prefer to give directly? One-off or recurring donations through the app via Paystack \u2014 mobile money or card. 100% of direct donations go to the cause." }].map((step, i) => (
                <div key={i} className="card" style={{ position: "relative" }}>
                  <div aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontSize: 64, fontWeight: 800, color: C.border, lineHeight: 1, letterSpacing: -2 }}>{step.num}</div>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Icon kind={step.icon} size={28} color={C.darkGreen} /></div>
                  <h3 className="h3" style={{ color: C.dark, marginBottom: 12 }}>{step.title}</h3>
                  <p className="body" style={{ maxWidth: 300 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHERE THE MONEY GOES */}
        <section style={{ background: C.white, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>WHERE THE MONEY GOES</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>Every cedi has a job.</h2>
              <p className="body-lg" style={{ maxWidth: 620, margin: "0 auto" }}>We do not hold back a management fee. Every cedi raised goes directly into classrooms, kits, field trips, and scholarships for Ghanaian kids.</p>
            </div>
            <div className="grid grid-4">
              {[{ icon: "book", color: C.green, title: "Energy Literacy Curriculum", desc: "Workbooks, teacher training, and age-appropriate lesson plans about solar, wind, storage, and the clean energy future." },{ icon: "sun", color: C.darkGreen, title: "Hands-On Solar Kits", desc: "Each student gets a Nehemiah solar kit to build, test, and take home. See the next section." },{ icon: "pin", color: C.olive, title: "Field Trips to Nehemiah Gate", desc: "Students visit our charging station, meet engineers, see an EV up close, and ask every question they have about the future." },{ icon: "gradCap", color: C.green, title: "Scholarships", desc: "We fund secondary school tuition for promising students who show strong interest in renewable energy careers." }].map((item, i) => (
                <div key={i} className="card">
                  <div style={{ width: 52, height: 52, borderRadius: 13, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Icon kind={item.icon} size={26} color={item.color} /></div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginBottom: 10, letterSpacing: -0.2, lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: 13.5, color: C.textBody, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MEET THE SOLAR KIT */}
        <section style={{ background: C.light, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div className="kit-layout">
              <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", background: `linear-gradient(135deg, ${C.white} 0%, ${C.border} 100%)`, aspectRatio: "5 / 4", boxShadow: "0 30px 80px rgba(1,15,18,0.08)" }}>
                <img src={SOLAR_KIT_IMG} alt="The Nehemiah 2 solar car — a wooden classroom kit with solar panel, motor, and wheels that students build themselves" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(1,15,18,0.85)", backdropFilter: "blur(10px)", border: "1px solid rgba(27,245,97,0.25)", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <NMark size={22} />
                  <div><div style={{ fontSize: 9, fontWeight: 700, color: C.green, letterSpacing: 0.8 }}>MEET</div><div style={{ fontSize: 14, fontWeight: 800, color: C.white, letterSpacing: -0.2 }}>NEHEMIAH 2</div></div>
                </div>
              </div>
              <div>
                <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>THE KIT THEY BUILD</div>
                <h2 className="h1" style={{ color: C.dark, marginBottom: 20 }}>The Nehemiah 2<br />Solar Car.</h2>
                <p className="body" style={{ marginBottom: 20 }}>Every partner student gets a hands-on solar kit to build, test, and take home. This is it {"\u2014"} a wooden solar-powered car they assemble from scratch. Chassis, wheels, motor, gearing, and a working solar panel.</p>
                <p className="body" style={{ marginBottom: 28 }}>When they finish, they take it outside and run it under the Ghanaian sun. They watch clean energy turn into motion with their own hands. That moment {"\u2014"} that is the Project.</p>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>What{"\u2019"}s Inside</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Wooden chassis","Solar panel","DC motor","Gearbox","Rubber wheels","Assembly guide"].map(part => (
                    <span key={part} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 13px", background: C.white, border: `1px solid ${C.border}`, borderRadius: 100, fontSize: 12, fontWeight: 600, color: C.dark }}><Icon kind="check" size={12} color={C.darkGreen} />{part}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERSHIPS */}
        <section style={{ background: C.white, padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>PARTNERSHIPS</div>
              <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>Where we are working.</h2>
              <p className="body-lg" style={{ maxWidth: 640, margin: "0 auto" }}>Our current partner schools. Made possible through our partnership with the AJ Hope Foundation and every driver who charges with Nehemiah Energy.</p>
            </div>
            <div className="grid grid-3">
              {PARTNERSHIPS.map((p, i) => (
                <div key={i} style={{ background: C.white, border: `1px solid ${p.status === "Coming Soon" ? C.border : C.green + "30"}`, borderStyle: p.status === "Coming Soon" ? "dashed" : "solid", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ aspectRatio: "16 / 10", background: p.image ? `url(${p.image}) center/cover no-repeat` : p.status === "Active" ? `linear-gradient(135deg, ${C.olive} 0%, ${C.darkGreen} 60%, ${C.dark} 140%)` : `linear-gradient(135deg, ${C.dark} 0%, ${C.darkBg} 100%)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {!p.image && p.status === "Active" && (<><Pattern color={C.white} opacity={0.14} rows={5} cols={7} /><div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}><Icon kind="sun" size={76} color={C.white} strokeWidth={1.8} /><div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: 1.6, textTransform: "uppercase" }}>Energy Education</div></div></>)}
                    {!p.image && p.status === "Coming Soon" && (<><Pattern color={C.green} opacity={0.08} rows={5} cols={7} /><div style={{ position: "relative", zIndex: 2 }}><Icon kind="sapling" size={48} color={C.green} strokeWidth={1.4} /></div></>)}
                    <div style={{ position: "absolute", top: 14, left: 14, padding: "5px 10px", background: p.status === "Active" ? C.green : "rgba(255,255,255,0.9)", color: p.status === "Active" ? C.dark : C.muted, fontSize: 10, fontWeight: 800, borderRadius: 6, letterSpacing: 0.6, textTransform: "uppercase" }}>
                      {p.status === "Active" && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: C.dark, marginRight: 6, verticalAlign: "middle" }} />}{p.status}
                    </div>
                  </div>
                  <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.darkGreen, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 }}>{p.partner}</div>
                    <h3 style={{ fontSize: 19, fontWeight: 800, color: C.dark, marginBottom: 6, letterSpacing: -0.3, lineHeight: 1.25 }}>{p.name}</h3>
                    <div style={{ fontSize: 13, color: C.muted, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}><Icon kind="pin" size={12} color={C.muted} />{p.location}</div>
                    <p style={{ fontSize: 13.5, color: C.textBody, lineHeight: 1.6, flex: 1 }}>{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 48, fontSize: 14, color: C.muted }}>Know a school that would benefit? <a href="/contact" style={{ color: C.darkGreen, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>Tell us about them {"\u2192"}</a></div>
          </div>
        </section>

        {/* DONATE */}
        <section id="donate" style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden" }}>
          <Pattern color={C.green} opacity={0.05} rows={10} cols={14} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1000, height: 1000, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}15 0%, transparent 60%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24 }}>GET INVOLVED</div>
              <h2 className="h-display" style={{ color: C.white, maxWidth: 900, margin: "0 auto 24px" }}>Join the<br /><span style={{ color: C.green }}>rebuild.</span></h2>
              <p className="body-lg" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 580, margin: "0 auto" }}>Give directly, or turn on round-up in the app and let your charges do the giving for you.</p>
            </div>
            <div className="grid grid-cta" style={{ maxWidth: 1040, margin: "0 auto" }}>
              {/* Give Directly */}
              <div style={{ background: "rgba(27,245,97,0.04)", border: "1px solid rgba(27,245,97,0.2)", borderRadius: 24, padding: "clamp(32px,3.5vw,44px)" }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(27,245,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Icon kind="heart" size={26} color={C.green} /></div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1.2, marginBottom: 8, textTransform: "uppercase" }}>Give Directly</div>
                <h3 style={{ fontSize: "clamp(22px,2.2vw,28px)", fontWeight: 800, color: C.white, letterSpacing: -0.3, marginBottom: 14, lineHeight: 1.2 }}>Pick an amount.<br />Fund a future.</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 24 }}>One-off donation, processed through Paystack. Mobile money or card. 100% goes to the cause.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
                  {quickAmounts.slice(0,3).map(amt => (<button key={amt} className={`amount-btn ${!customAmount && donationAmount === amt ? "active" : ""}`} onClick={() => { setDonationAmount(amt); setCustomAmount(""); }}>GHS {amt}</button>))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {quickAmounts.slice(3).map(amt => (<button key={amt} className={`amount-btn ${!customAmount && donationAmount === amt ? "active" : ""}`} onClick={() => { setDonationAmount(amt); setCustomAmount(""); }}>GHS {amt}</button>))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>GHS</span>
                  <input type="number" placeholder="Custom amount" value={customAmount} onChange={e => setCustomAmount(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.white, fontSize: 15, fontWeight: 600, fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
                  <Icon kind="mail" size={16} color="rgba(255,255,255,0.5)" />
                  <input type="email" placeholder="Your email (for receipt)" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.white, fontSize: 15, fontWeight: 600, fontFamily: "inherit" }} />
                </div>
                <button className="btn btn-primary" onClick={handleDonate} disabled={isProcessing} style={{ width: "100%", justifyContent: "center", padding: "16px 22px", fontSize: 15, opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? "wait" : "pointer" }}>
                  {isProcessing ? "Processing..." : <>Donate GHS {finalAmount || 0} <Icon kind="arrow" size={14} color={C.dark} /></>}
                </button>
              </div>
              {/* Round Up */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(32px,3.5vw,44px)", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(27,245,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Icon kind="plus" size={26} color={C.green} /></div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1.2, marginBottom: 8, textTransform: "uppercase" }}>Round Up</div>
                <h3 style={{ fontSize: "clamp(22px,2.2vw,28px)", fontWeight: 800, color: C.white, letterSpacing: -0.3, marginBottom: 14, lineHeight: 1.2 }}>Let your charges<br />do the giving.</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 24 }}>Turn on round-up in the Nehemiah Energy app. Every charge you pay gets rounded up to the next cedi. The extra pesewas go straight to the Project.</p>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "18px 20px", marginBottom: 24, flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Example</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Your charge</span><span style={{ fontSize: 15, fontWeight: 700, color: C.white }}>GHS 38.40</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Rounded up to</span><span style={{ fontSize: 15, fontWeight: 700, color: C.white }}>GHS 39.00</span></div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "10px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>To the Project</span><span style={{ fontSize: 17, fontWeight: 800, color: C.green }}>+ GHS 0.60</span></div>
                </div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px 22px", fontSize: 15 }}>Get the App <Icon kind="smartphone" size={14} color={C.dark} /></button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
