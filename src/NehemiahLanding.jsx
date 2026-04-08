import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  textBody: "#4B5563",
};

const N_MAIN = "M 406.16 148.62 L 344.47 319.38 L 324.56 374.46 L 252.37 280.73 L 271.26 231.17 L 311.14 279.16 Z";
const N_ACCENT = "M 265.19 342.22 L 189.11 446.65 L 240.92 310.73 Z";
const PAT_M = "M 62.36 -5.65 L 40.92 53.68 L 34 72.82 L 8.92 40.25 L 15.48 23.03 L 29.34 39.71 Z";
const PAT_A = "M 13.37 61.62 L -13.06 97.91 L 4.94 50.68 Z";

const FAQS = [
  { q: "Where can I charge my electric vehicle in Accra?", a: "You can charge your EV at Nehemiah Gate, our flagship 120 kW DC fast charging station in Haatso, Accra. The station is open 24 hours a day, 7 days a week, with two charging guns supporting GBT connectors. We are expanding to six more locations across Greater Accra and beyond throughout 2026 and 2027." },

  { q: "What types of electric vehicles can charge at Nehemiah stations?", a: "Our 120 kW DC fast chargers use GBT connectors, which work with most Chinese-made EVs popular in Ghana including BYD, Geely, Chery, Dongfeng, JAC, and many others. We are evaluating CCS2 and CHAdeMO support for future stations to serve Tesla, Nissan, Hyundai, and Kia drivers as the EV market in Ghana grows." },
  { q: "How long does it take to fast charge an EV at Nehemiah Gate?", a: "Most drivers go from a low battery to roughly 80 percent in about 30 minutes on our 120 kW DC fast chargers. The exact time depends on your car\u2019s battery size, current state of charge, and the maximum charging speed your vehicle supports. While you wait, relax in the Neh Lounge with AC, free Wi-Fi, cold water, and seating." },
  { q: "Are Nehemiah Energy charging stations open 24/7?", a: "Yes. Nehemiah Gate in Haatso is open 24 hours a day, 365 days a year. Whether you finish your last delivery at midnight or start your shift before sunrise, the station is ready. The chargers are fully self-service through the Nehemiah Energy app, so you do not need an attendant to plug in. Day or night, we dey." },
  { q: "How do I pay for charging at Nehemiah Energy?", a: "We accept all major mobile money providers in Ghana \u2014 MTN MoMo, AirtelTigo Money, and Vodafone Cash \u2014 as well as debit and credit cards through Paystack. You can top up your charging wallet in the Nehemiah Energy app and tap to pay at the station, or pay per session as a guest. No cash needed." },
  { q: "Do I need an account or the app to charge my EV?", a: "No account is required to charge \u2014 guests can pay per session at the station. But becoming a member saves you 2 cedis per kWh on every charge, gives you loyalty stamps, lets you top up your wallet in advance, and unlocks the referral bonus. Most drivers join up after their first or second charge." },
  { q: "Is Nehemiah Energy good for Bolt and delivery drivers?", a: "Yes. Nehemiah Energy was built specifically for Ghana\u2019s hardworking drivers \u2014 Bolt drivers, Yango drivers, delivery riders, and EV owners. Lower member rates, 30-minute fast charging, mobile money payment, a comfortable air-conditioned lounge, and 24/7 availability mean less downtime and more earnings for the people who keep this country moving." },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://nehemiahenergy.com/#organization", name: "Nehemiah Energy", alternateName: "Nehemiah Energy Ltd", url: "https://nehemiahenergy.com", logo: { "@type": "ImageObject", url: "https://nehemiahenergy.com/logo.png", width: 512, height: 512 }, description: "A fully Ghanaian renewable energy company providing EV charging, charging wallet top-ups, and Neh Power Bikes for the everyday Ghanaian.", foundingDate: "2026", founder: { "@type": "Person", name: "Eunice K. Asemnor", jobTitle: "Founder & CEO" }, areaServed: { "@type": "Country", name: "Ghana" }, contactPoint: { "@type": "ContactPoint", telephone: "+233-24-594-7843", contactType: "customer service", email: "support@nehemiahenergy.com", areaServed: "GH", availableLanguage: ["English"] }, sameAs: ["https://instagram.com/nehemiahenergy","https://twitter.com/nehemiahenergy","https://facebook.com/nehemiahenergy","https://linkedin.com/company/nehemiah-energy"] },
    { "@type": "EVChargingStation", "@id": "https://nehemiahenergy.com/#ne-01-haatso", name: "Nehemiah Gate \u2014 Haatso", alternateName: "Nehemiah Energy Charging Station Haatso", url: "https://nehemiahenergy.com/stations/nehemiah-gate-haatso", telephone: "+233-24-594-7843", email: "support@nehemiahenergy.com", currenciesAccepted: "GHS",paymentAccepted: "Mobile Money, Credit Card, Debit Card, MTN MoMo, AirtelTigo Money, Vodafone Cash", address: { "@type": "PostalAddress", streetAddress: "Haatso", addressLocality: "Accra", addressRegion: "Greater Accra", postalCode: "00233", addressCountry: "GH" }, geo: { "@type": "GeoCoordinates", latitude: 5.6893, longitude: -0.1819 }, openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" }, amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "120 kW DC Fast Charging", value: true },{ "@type": "LocationFeatureSpecification", name: "GBT Connector (Gun A)", value: true },{ "@type": "LocationFeatureSpecification", name: "GBT Connector (Gun B)", value: true },{ "@type": "LocationFeatureSpecification", name: "Air Conditioned Lounge", value: true },{ "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },{ "@type": "LocationFeatureSpecification", name: "Cold Water", value: true },{ "@type": "LocationFeatureSpecification", name: "Mobile Money Payments", value: true },{ "@type": "LocationFeatureSpecification", name: "Phone Charging", value: true },{ "@type": "LocationFeatureSpecification", name: "Seating", value: true },{ "@type": "LocationFeatureSpecification", name: "Television", value: true },{ "@type": "LocationFeatureSpecification", name: "24/7 Self-Service", value: true }], parentOrganization: { "@id": "https://nehemiahenergy.com/#organization" } },
    { "@type": "WebSite", "@id": "https://nehemiahenergy.com/#website", url: "https://nehemiahenergy.com", name: "Nehemiah Energy", description: "Powering Your Journey \u2014 EV charging in Accra, Ghana", publisher: { "@id": "https://nehemiahenergy.com/#organization" }, inLanguage: "en-GH" },
    { "@type": "FAQPage", "@id": "https://nehemiahenergy.com/#faq", mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@type": "BreadcrumbList", "@id": "https://nehemiahenergy.com/#breadcrumbs", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://nehemiahenergy.com" }] },
    { "@type": "MobileApplication", name: "Nehemiah Energy", operatingSystem: "iOS", applicationCategory: "TravelApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, downloadUrl: "https://apps.apple.com/app/nehemiah-energy/" },
    { "@type": "MobileApplication", name: "Nehemiah Energy", operatingSystem: "Android", applicationCategory: "TravelApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, downloadUrl: "https://play.google.com/store/apps/details?id=com.nehemiahenergy.app" },
  ],
};

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
  const paths = {
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} />,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={strokeWidth + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><line x1="4" y1="22" x2="4" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} />,
    check: <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={strokeWidth + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    clock: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M12 6v6l4 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
    plug: <><path d="M9 2v6M15 2v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /><path d="M6 8h12v3a6 6 0 01-6 6 6 6 0 01-6-6V8z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><path d="M12 17v5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
    route: <><circle cx="6" cy="19" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" /><circle cx="18" cy="5" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M6 16V8a4 4 0 014-4h4M18 8v8a4 4 0 01-4 4h-4" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /></>,
    money: <><rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth={strokeWidth} fill="none" /><circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
    gift: <><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth={strokeWidth} fill="none" /><line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" /></>,
    shieldCheck: <><path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    chevron: <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={strokeWidth + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    sapling: <><path d="M12 22 L12 13" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" /><path d="M12 13 Q 8 9 10 4 Q 14 6 14 11 Q 13.5 12.5 12 13 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" /><path d="M12 17 Q 7 16 5.5 18.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="10" r="0.6" fill={color} /><circle cx="18" cy="8" r="0.6" fill={color} /><circle cx="17" cy="14" r="0.6" fill={color} /><circle cx="5" cy="14" r="0.6" fill={color} /></>,
    person: <><circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" /></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke={color} strokeWidth={strokeWidth} fill="none" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" /></>,
    twitter: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />,
    facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />,
    linkedin: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" /><rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth={strokeWidth} fill="none" /><circle cx="4" cy="4" r="2" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, ...style }} aria-hidden="true">{paths[kind]}</svg>);
}

function AppBadge({ store }) {
  const isApple = store === "apple";
  return (
    <a href={isApple ? "https://apps.apple.com/app/nehemiah-energy/" : "https://play.google.com/store/apps/details?id=com.nehemiahenergy.app"} aria-label={isApple ? "Download Nehemiah Energy on the App Store" : "Get Nehemiah Energy on Google Play"} style={{ display: "inline-flex", alignItems: "center", gap: 12, background: C.dark, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 18px", textDecoration: "none", transition: "transform 0.15s ease, border-color 0.15s ease", minWidth: 160 }}>
      {isApple ? (<svg width="26" height="26" viewBox="0 0 24 24" fill={C.white} aria-hidden="true"><path d="M17.05 12.04c-.03-3.03 2.47-4.49 2.59-4.56-1.41-2.07-3.62-2.35-4.4-2.38-1.87-.19-3.65 1.1-4.6 1.1-.95 0-2.41-1.07-3.97-1.04-2.04.03-3.93 1.19-4.98 3.02-2.13 3.69-.54 9.14 1.52 12.13 1.01 1.46 2.21 3.1 3.79 3.04 1.52-.06 2.1-.98 3.94-.98s2.36.98 3.97.95c1.64-.03 2.68-1.49 3.68-2.96 1.16-1.7 1.64-3.34 1.66-3.43-.04-.02-3.18-1.22-3.21-4.84zM14.04 3.13c.84-1.02 1.41-2.43 1.25-3.84-1.21.05-2.67.81-3.54 1.82-.78.9-1.46 2.34-1.28 3.72 1.35.1 2.73-.69 3.57-1.7z"/></svg>) : (<svg width="24" height="26" viewBox="0 0 24 26" fill="none" aria-hidden="true"><path d="M3.18 1.5c-.37.4-.58.95-.58 1.66v20.18c0 .71.21 1.27.58 1.66l.07.07L14.7 13.5v-.21L3.25 1.43l-.07.07z" fill="#00C2FF"/><path d="M18.7 17.5l-4-4v-.21l4-4 .09.05 4.74 2.7c1.35.77 1.35 2.02 0 2.79l-4.74 2.7-.09.06z" fill="#FFD400"/><path d="M18.79 17.44l-4.09-4.09L3.18 24.92c.45.47 1.18.53 2.01.06l13.6-7.54" fill="#FF3946"/><path d="M18.79 9.16L5.19 1.62c-.83-.47-1.56-.41-2.01.06l11.52 11.57 4.09-4.09z" fill="#00F076"/></svg>)}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: 0.3, lineHeight: 1.1 }}>{isApple ? "Download on the" : "GET IT ON"}</span>
        <span style={{ fontSize: 16, color: C.white, fontWeight: 700, letterSpacing: -0.2, lineHeight: 1.2 }}>{isApple ? "App Store" : "Google Play"}</span>
      </div>
    </a>
  );
}

function PhoneMockup() {
  return (
    <div role="img" aria-label="Preview of the Nehemiah Energy app showing the Nehemiah Gate Haatso charging station with an active charging session" style={{ position: "relative", width: "100%", maxWidth: 320, margin: "0 auto" }}>
      <div style={{ width: "100%", aspectRatio: "9 / 18", background: "#1a2229", borderRadius: 44, padding: 8, boxShadow: "0 0 0 2px rgba(255,255,255,0.04), 0 30px 80px rgba(0,0,0,0.5), 0 0 100px rgba(27, 245, 97, 0.15)", position: "relative" }}>
        <div style={{ width: "100%", height: "100%", background: `linear-gradient(180deg, ${C.dark} 0%, ${C.darkBg} 100%)`, borderRadius: 36, overflow: "hidden", position: "relative" }}>
          <Pattern color={C.green} opacity={0.05} rows={8} cols={4} />
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 80, height: 22, background: "#000", borderRadius: 14, zIndex: 5 }} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px 0", color: C.white, fontSize: 11, fontWeight: 600 }}>
            <span>9:41</span>
            <span style={{ display: "flex", gap: 4, fontSize: 9 }}><span>{"\u25CF\u25CF\u25CF"}</span><span>5G</span><span>{"\u25AE"}</span></span>
          </div>
          <div style={{ position: "relative", zIndex: 2, padding: "30px 22px 12px" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>Good morning</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.white, letterSpacing: -0.3 }}>Kwame</div>
          </div>
          <div style={{ position: "relative", zIndex: 2, margin: "0 18px", background: "linear-gradient(135deg, rgba(27,245,97,0.12) 0%, rgba(0,172,105,0.06) 100%)", border: "1px solid rgba(27,245,97,0.25)", borderRadius: 18, padding: "16px 18px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.green, letterSpacing: 1, marginBottom: 4 }}>NEHEMIAH GATE</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.white, letterSpacing: -0.5, marginBottom: 8 }}>Haatso</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", background: C.green, color: C.dark, fontSize: 9, fontWeight: 800, borderRadius: 10, letterSpacing: 0.4 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: C.dark }} />OPEN</span>
              <span style={{ padding: "3px 8px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontSize: 9, fontWeight: 700, borderRadius: 10, letterSpacing: 0.3 }}>2/2 FREE</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>2.4 km · 120 kW DC fast</div>
          </div>
          <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, padding: "12px 18px" }}>
            {[{ icon: "bolt", label: "Start" },{ icon: "pin", label: "Find" },{ icon: "money", label: "Wallet" },{ icon: "gift", label: "Rewards" }].map((q, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Icon kind={q.icon} size={14} color={C.green} /><span style={{ fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{q.label}</span>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", zIndex: 2, margin: "8px 18px 0", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: C.green, letterSpacing: 0.6 }}>ACTIVE SESSION</span>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)" }}>Gun A</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.white }}>GHS 118.30</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>18:42</span>
            </div>
            <div style={{ marginTop: 8, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: "62%", height: "100%", background: C.green, borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a, isOpen, onToggle, idx }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${isOpen ? C.green + "40" : C.border}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s ease, box-shadow 0.2s ease", boxShadow: isOpen ? "0 12px 32px rgba(1,15,18,0.06)" : "none" }}>
      <button onClick={onToggle} aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`} style={{ width: "100%", background: "transparent", border: "none", padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, cursor: "pointer", textAlign: "left", fontFamily: "inherit", color: C.dark }}>
        <span style={{ fontSize: "clamp(15px, 1.2vw, 17px)", fontWeight: 700, letterSpacing: -0.2, lineHeight: 1.4 }}>{q}</span>
        <Icon kind="chevron" size={20} color={isOpen ? C.darkGreen : C.muted} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
      </button>
      <div id={`faq-answer-${idx}`} style={{ maxHeight: isOpen ? 600 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <p style={{ padding: "0 24px 24px", fontSize: 15, color: C.textBody, lineHeight: 1.7 }}>{a}</p>
      </div>
    </div>
  );
}

export default function NehemiahLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: C.white, fontFamily: "'Space Grotesk', sans-serif", color: C.dark, overflowX: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        .container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
        .nav-link { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.7); padding: 10px 16px; border-radius: 8px; transition: all 0.15s ease; text-decoration: none; }
        .nav-link:hover { color: ${C.white}; background: rgba(255,255,255,0.05); }
        .nav-link.active { color: ${C.green}; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; border-radius: 12px; font-size: 14px; font-weight: 700; font-family: inherit; border: none; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.2s ease; white-space: nowrap; text-decoration: none; }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, ${C.green}, ${C.darkGreen}); color: ${C.dark}; box-shadow: 0 6px 20px rgba(27,245,97,0.25); }
        .btn-primary:hover { box-shadow: 0 10px 30px rgba(27,245,97,0.35); }
        .btn-ghost { background: transparent; color: ${C.white}; border: 1px solid rgba(255,255,255,0.2); }
        .btn-ghost:hover { background: rgba(255,255,255,0.05); }
        .btn-light { background: ${C.light}; color: ${C.dark}; border: 1px solid ${C.border}; }
        .btn-light:hover { background: ${C.white}; }
        .label-pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: 24px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; }
        .h-display { font-size: clamp(44px,7vw,96px); font-weight: 800; line-height: 0.95; letter-spacing: -0.025em; }
        .h1 { font-size: clamp(32px,4.5vw,60px); font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; }
        .h3 { font-size: clamp(20px,1.6vw,24px); font-weight: 800; line-height: 1.25; letter-spacing: -0.01em; }
        .body { font-size: clamp(15px,1.1vw,17px); line-height: 1.7; color: ${C.textBody}; }
        .body-lg { font-size: clamp(17px,1.4vw,20px); line-height: 1.6; color: ${C.textBody}; }
        .grid { display: grid; gap: 24px; }
        .grid-3 { grid-template-columns: 1fr; }
        .grid-4-stats { grid-template-columns: repeat(2,1fr); gap: 16px; }
        .grid-features { grid-template-columns: 1fr; }
        .grid-footer { grid-template-columns: 1fr; }
        .hero-layout { display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center; }
        @media (min-width: 700px) { .grid-4-stats { grid-template-columns: repeat(4,1fr); gap: 20px; } .grid-footer { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; } }
        @media (min-width: 800px) { .grid-3 { grid-template-columns: repeat(3,1fr); } .grid-features { grid-template-columns: repeat(2,1fr); } .hero-layout { grid-template-columns: 1.1fr 0.9fr; gap: 64px; } }
        @media (min-width: 1100px) { .grid-features { grid-template-columns: repeat(3,1fr); } }
        .card { background: ${C.white}; border: 1px solid ${C.border}; border-radius: 24px; padding: clamp(28px,2.6vw,40px); transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 24px 48px rgba(1,15,18,0.07); border-color: ${C.green}40; }
        .desktop-only { display: none; }
        @media (min-width: 900px) { .desktop-only { display: flex; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "14px 0" : "20px 0", background: scrolled ? "rgba(1,15,18,0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", transition: "all 0.3s ease" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <NMark size={34} /><span style={{ fontSize: 14, fontWeight: 800, color: C.white, letterSpacing: 1.2 }}>NEHEMIAH ENERGY</span>
          </Link>
          <div className="desktop-only" style={{ alignItems: "center", gap: 4 }}>
            <Link className="nav-link active" to="/">Home</Link>
            <a className="nav-link" href="#stations">Stations</a>
            <Link className="nav-link" to="/about">About</Link>
            <a className="nav-link" href="#">Project</a>
            <a className="nav-link" href="#faq">FAQ</a>
          </div>
          <a className="btn btn-primary" href="#">Get the App <Icon kind="arrow" size={14} color={C.dark} /></a>
        </div>
      </nav>

      <main>
      {/* HERO */}
      <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, position: "relative", overflow: "hidden", paddingTop: "clamp(140px,14vw,180px)", paddingBottom: "clamp(80px,10vw,140px)" }}>
        <Pattern color={C.green} opacity={0.04} rows={14} cols={16} />
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "60%", transform: "translate(-50%,-50%)", width: "min(900px,90vw)", height: "min(900px,90vw)", borderRadius: "50%", background: `radial-gradient(circle, ${C.green}1A 0%, ${C.green}06 35%, transparent 65%)`, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-layout">
            <div>
              <div className="fade-up label-pill" style={{ background: "rgba(27,245,97,0.08)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 28 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulseDot 1.6s ease-in-out infinite" }} />LIVE IN ACCRA · OPEN NOW
              </div>
              <h1 className="h-display fade-up" style={{ color: C.white, marginBottom: 24, animationDelay: "0.1s" }}>Powering<br />Your <span style={{ color: C.green }}>Journey</span>.</h1>
              <p className="fade-up" style={{ fontSize: "clamp(17px,1.5vw,22px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 36, maxWidth: 540, animationDelay: "0.2s" }}>Ghana's fully Ghanaian EV charging network. Fast 120 kW DC charging in Accra, open 24/7 at Nehemiah Gate, Haatso. Pay with mobile money or card. Built for the drivers who keep this city moving.</p>
              <div className="fade-up" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, animationDelay: "0.3s" }}><AppBadge store="apple" /><AppBadge store="google" /></div>
              <a href="#stations" className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.6)", animationDelay: "0.4s" }}><Icon kind="pin" size={14} color="rgba(255,255,255,0.6)" />Or visit Nehemiah Gate, Haatso<Icon kind="arrow" size={14} color="rgba(255,255,255,0.6)" /></a>
            </div>
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", animationDelay: "0.4s" }}>
              <div style={{ animation: "floatY 6s ease-in-out infinite" }}><PhoneMockup /></div>
            </div>
          </div>
        </div>
      </section>

      {/* HERITAGE STRIP */}
      <section style={{ background: C.white, padding: "clamp(40px,5vw,64px) 0", borderBottom: `1px solid ${C.border}` }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px,4vw,48px)", flexWrap: "wrap", textAlign: "center" }}>
          {["Rebuilt", "Recharged", "Renewed"].map((word, i, arr) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(16px,4vw,48px)" }}>
              <span style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>{word}.</span>
              {i < arr.length - 1 && <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, flexShrink: 0 }} />}
            </span>
          ))}
        </div>
      </section>

      {/* DRIVE. CHARGE. EARN. */}
      <section style={{ background: C.light, padding: "clamp(80px,10vw,140px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>HOW IT WORKS</div>
            <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>Drive. Charge. Earn.</h2>
            <p className="body-lg" style={{ maxWidth: 560, margin: "0 auto" }}>Three steps. No drama. Get powered up in 30 minutes and back on the road.</p>
          </div>
          <div className="grid grid-3">
            {[{ num: "01", title: "Drive", icon: "route", desc: "Find your nearest Nehemiah charging station in the app. Real-time availability for every charging gun, no guessing games." },{ num: "02", title: "Charge", icon: "plug", desc: "Plug in. Tap to start. Watch the kWh roll in. Fast 120 kW DC charging \u2014 full charge in about 30 minutes for most EVs." },{ num: "03", title: "Earn", icon: "gift", desc: "Stack stamps with every charge. Every 11th charge is free. Members save 2 cedis per kWh. Refer a paddy, both of you earn." }].map((step, i) => (
              <div key={i} className="card" style={{ position: "relative" }}>
                <div aria-hidden="true" style={{ position: "absolute", top: 24, right: 28, fontSize: 64, fontWeight: 800, color: C.border, lineHeight: 1, letterSpacing: -2 }}>{step.num}</div>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Icon kind={step.icon} size={28} color={C.darkGreen} /></div>
                <h3 className="h3" style={{ color: C.dark, marginBottom: 12 }}>{step.title}</h3>
                <p className="body" style={{ maxWidth: 280 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAY OR NIGHT */}
      <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden" }}>
        <Pattern color={C.green} opacity={0.04} rows={8} cols={12} />
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}12 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24 }}><Icon kind="clock" size={12} color={C.green} />ALWAYS OPEN · ALWAYS ON</div>
          <h2 className="h-display" style={{ color: C.white, maxWidth: 900, margin: "0 auto 24px" }}>Day or Night,<br /><span style={{ color: C.green }}>We Dey.</span></h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 580, margin: "0 auto 56px" }}>Real charging for real drivers. Whether you finish your last trip at midnight or start before sunrise, our Accra charging stations are open and ready.</p>
          <div className="grid grid-4-stats" style={{ maxWidth: 920, margin: "0 auto" }}>
            {[{ value: "24/7", label: "Hours Open" },{ value: "365", label: "Days a Year" },{ value: "120", suffix: "kW", label: "DC Fast Charging" },{ value: "30", suffix: "min", label: "To Full Charge" }].map((stat, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 20px", backdropFilter: "blur(10px)" }}>
                <div style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, color: C.green, letterSpacing: "-0.025em", lineHeight: 1, fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>{stat.value}{stat.suffix && <span style={{ fontSize: "clamp(14px,1.4vw,18px)", fontWeight: 700, color: "rgba(27,245,97,0.6)" }}>{stat.suffix}</span>}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginTop: 8, letterSpacing: 0.4, textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATIONS */}
      <section id="stations" itemScope itemType="https://schema.org/EVChargingStation" style={{ background: C.light, padding: "clamp(80px,10vw,140px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>FIND US IN ACCRA</div>
            <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>EV charging in Haatso, Accra.</h2>
            <p className="body-lg" style={{ maxWidth: 640, margin: "0 auto" }}>Nehemiah Gate is our flagship 120 kW DC fast charging station, open 24 hours a day in Haatso, Greater Accra. Drop in any time, plug in, and we will have you back on the road in about 30 minutes.</p>
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 28, padding: "clamp(28px,4vw,48px)", maxWidth: 760, margin: "0 auto" }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.darkGreen, marginBottom: 18, padding: "6px 12px" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: C.darkGreen, animation: "pulseDot 1.6s ease-in-out infinite" }} />OPEN NOW</div>
            <h3 itemProp="name" style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, color: C.dark, letterSpacing: -0.5, marginBottom: 8, lineHeight: 1.1 }}>Nehemiah Gate</h3>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.darkGreen, letterSpacing: 0.5, marginBottom: 24, textTransform: "uppercase" }}>Station NE-01 · Flagship</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
              {[{ icon: "pin", label: "Address", value: <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="streetAddress">Haatso</span>, <span itemProp="addressLocality">Accra</span>, <span itemProp="addressRegion">Greater Accra</span>, <span itemProp="addressCountry">Ghana</span></span> },{ icon: "clock", label: "Hours", value: "Open 24 hours · 7 days a week · 365 days a year" },{ icon: "bolt", label: "Charging Power", value: "120 kW DC Fast · 2 GBT connectors (Gun A & Gun B)" },{ icon: "smartphone", label: "Contact", value: <a href="tel:+233245947843" itemProp="telephone" style={{ color: C.dark }}>+233 24 594 7843</a> }].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon kind={row.icon} size={18} color={C.darkGreen} /></div>
                  <div><div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 2 }}>{row.label}</div><div style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>{row.value}</div></div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 14 }}>Neh Lounge Amenities</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Air Conditioning","Free Wi-Fi","Cold Water","Mobile Money","Phone Charging","Comfortable Seating","Television","24/7 Self-Service"].map(a => (
                  <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.light, border: `1px solid ${C.border}`, borderRadius: 100, fontSize: 12, fontWeight: 600, color: C.dark }}><Icon kind="check" size={12} color={C.darkGreen} />{a}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://www.google.com/maps/search/?api=1&query=Nehemiah+Gate+Haatso+Accra" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Directions <Icon kind="arrow" size={14} color={C.dark} /></a>
              <a href="tel:+233245947843" className="btn btn-light">Call the Station</a>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 56, padding: "32px 24px", background: "rgba(27,245,97,0.04)", border: `1px dashed ${C.green}40`, borderRadius: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.darkGreen, letterSpacing: 1.2, marginBottom: 10, textTransform: "uppercase" }}>Coming Soon</div>
            <div style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, color: C.dark, marginBottom: 8, letterSpacing: -0.3 }}>6 more EV charging stations across Greater Accra</div>
            <div style={{ fontSize: 14, color: C.textBody, maxWidth: 520, margin: "0 auto" }}>We are expanding the Nehemiah Energy charging network across Accra, Tema, Kumasi, and beyond throughout 2026 and 2027. Want a station near your area? Tell us where.</div>
          </div>
        </div>
      </section>

      {/* BUILT FOR THE DRIVER */}
      <section style={{ background: C.white, padding: "clamp(80px,10vw,140px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>WHY NEHEMIAH</div>
            <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>Built for the Driver.</h2>
            <p className="body-lg" style={{ maxWidth: 580, margin: "0 auto" }}>We built every part of this with the everyday Ghanaian driver in mind. From the price to the payment to the place itself.</p>
          </div>
          <div className="grid grid-features">
            {[{ title: "Fast Charge with Care", icon: "shieldCheck", color: C.green, desc: "Fast doesn\u2019t mean reckless. Our 120 kW DC chargers deliver power quick enough to get you back on the road in about 30 minutes \u2014 and stable enough to protect your battery for the long run." },{ title: "Mobile Money Ready", icon: "smartphone", color: C.green, desc: "Pay with MTN MoMo, AirtelTigo Money, Vodafone Cash, or card. Whatever works for you, works for us." },{ title: "Loyalty Rewards", icon: "gift", color: C.darkGreen, desc: "Stack stamps with every charge. Every 11th charge free. Refer a paddy, both of you earn." },{ title: "24/7 Self-Service", icon: "clock", color: C.green, desc: "Tap, charge, go. No attendants needed. Anytime you need power, the station is ready." },{ title: "Built in Ghana", icon: "flag", color: C.olive, desc: "Fully Ghanaian. Built by Ghanaians, for Ghanaians. From Accra, with the rest of the country coming next." }].map((item, i) => (
              <div key={i} className="card">
                <div style={{ width: 52, height: 52, borderRadius: 13, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Icon kind={item.icon} size={26} color={item.color} /></div>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: C.dark, marginBottom: 10, letterSpacing: -0.2 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: C.textBody, lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEHEMIAH PROJECT */}
      <section style={{ background: C.light, padding: "clamp(80px,10vw,140px) 0" }}>
        <div className="container">
          <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkBg} 100%)`, borderRadius: 32, padding: "clamp(48px,7vw,88px) clamp(32px,5vw,72px)", position: "relative", overflow: "hidden" }}>
            <Pattern color={C.green} opacity={0.05} rows={8} cols={12} />
            <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}13 0%, transparent 60%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><Icon kind="sapling" size={88} color={C.green} strokeWidth={1.5} /></div>
              <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", border: "1px solid rgba(27,245,97,0.2)", color: C.green, marginBottom: 24 }}>THE NEHEMIAH PROJECT</div>
              <h2 className="h-display" style={{ color: C.white, marginBottom: 24 }}>Every Charge Builds<br />a <span style={{ color: C.green }}>Brighter Ghana</span></h2>
              <p className="body-lg" style={{ color: "rgba(255,255,255,0.7)", maxWidth: 620, margin: "0 auto 48px" }}>When you round up your charge, the extra pesewas go to the Nehemiah Project {"\u2014"} funding renewable energy education for kids across Ghana.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 720, margin: "0 auto 40px" }}>
                {[{ icon: "heart", value: "GHS 4,280", label: "Total Raised" },{ icon: "person", value: "342", label: "Kids Helped" },{ icon: "check", value: "100%", label: "To the Cause" }].map((stat, i) => (
                  <div key={i} style={{ background: "rgba(27,245,97,0.04)", border: "1px solid rgba(27,245,97,0.18)", borderRadius: 18, padding: "clamp(20px,2.5vw,28px) clamp(12px,1.5vw,20px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <Icon kind={stat.icon} size={22} color={C.green} />
                    <div style={{ fontSize: "clamp(18px,2.4vw,28px)", fontWeight: 800, color: C.green, lineHeight: 1, letterSpacing: -0.5, fontVariantNumeric: "tabular-nums" }}>{stat.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 0.8, textTransform: "uppercase", textAlign: "center" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <a className="btn btn-primary" href="#">Learn About the Project <Icon kind="arrow" size={14} color={C.dark} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* TODO: Replace placeholder testimonials with real driver quotes (with consent) before launch */}
      <section style={{ background: C.white, padding: "clamp(80px,10vw,140px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>DRIVER STORIES</div>
            <h2 className="h1" style={{ color: C.dark }}>Trusted by Ghana's drivers.</h2>
          </div>
          <div className="grid grid-3">
            {[{ quote: "I save 2 cedis on every kWh as a member. Over a month that\u2019s real money in my pocket. The app makes it easy.", name: "Kwame A.", role: "Bolt Driver, Accra" },{ quote: "Used to wait an hour at other stations. At Nehemiah Gate I\u2019m in and out in 30 minutes. The lounge has AC and Wi-Fi too.", name: "Ama O.", role: "Delivery Rider" },{ quote: "Reliable, clean, professional. You can tell they actually care about getting it right. Built proper for Ghana.", name: "David M.", role: "EV Owner" }].map((t, i) => (
              <div key={i} className="card">
                <div aria-label="5 out of 5 stars" style={{ display: "flex", gap: 4, marginBottom: 18 }}>{[...Array(5)].map((_, j) => <Icon key={j} kind="star" size={18} color={C.green} />)}</div>
                <p style={{ fontSize: 15, color: C.dark, lineHeight: 1.6, marginBottom: 24, fontWeight: 500 }}>{"\u201C"}{t.quote}{"\u201D"}</p>
                <div style={{ paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: C.light, padding: "clamp(80px,10vw,140px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="label-pill" style={{ background: "rgba(27,245,97,0.08)", color: C.darkGreen, marginBottom: 20, padding: "6px 14px" }}>FREQUENTLY ASKED</div>
            <h2 className="h1" style={{ color: C.dark, marginBottom: 16 }}>EV charging in Ghana, answered.</h2>
            <p className="body-lg" style={{ maxWidth: 600, margin: "0 auto" }}>Everything you want to know about charging your electric vehicle at Nehemiah Energy. Still have questions? <a href="/contact" style={{ color: C.darkGreen, fontWeight: 700 }}>Talk to us</a>.</p>
          </div>
          <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => <FAQItem key={i} idx={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden" }}>
        <Pattern color={C.green} opacity={0.05} rows={8} cols={12} />
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}15 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="label-pill" style={{ background: "rgba(27,245,97,0.1)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24 }}>READY WHEN YOU ARE</div>
          <h2 className="h-display" style={{ color: C.white, maxWidth: 900, margin: "0 auto 24px" }}>Ready to power<br />your <span style={{ color: C.green }}>journey?</span></h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 540, margin: "0 auto 44px" }}>Download the Nehemiah Energy app. Find your nearest charging station. Charge in about 30 minutes. Built for the driver. Built in Ghana.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}><AppBadge store="apple" /><AppBadge store="google" /></div>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: C.dark, padding: "80px 0 32px", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Pattern color={C.green} opacity={0.025} rows={8} cols={12} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid grid-footer" style={{ marginBottom: 64 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><NMark size={36} /><span style={{ fontSize: 15, fontWeight: 800, color: C.white, letterSpacing: 1.2 }}>NEHEMIAH ENERGY</span></div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 24, maxWidth: 320 }}>Powering Your Journey. Built by Ghanaians, for Ghanaians. EV charging, charging wallet top-ups, and Power Bikes for the everyday Ghanaian driver.</p>
              <div style={{ display: "flex", gap: 10 }}>
                {["instagram","twitter","facebook","linkedin"].map(s => (<a key={s} href="#" aria-label={`Nehemiah Energy on ${s}`} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}><Icon kind={s} size={18} color="rgba(255,255,255,0.7)" /></a>))}
              </div>
            </div>
            {[
              { title: "PRODUCT", links: [{ text: "Find Stations", href: "#stations" },{ text: "Get the App", href: "#" },{ text: "Power Bikes", href: "#" },{ text: "For Fleets", href: "#" }] },
              { title: "COMPANY", links: [{ text: "About Us", href: "/about", isRouter: true },{ text: "The Project", href: "#" },{ text: "Contact", href: "#" },{ text: "Careers", href: "#" }] },
              { title: "LEGAL", links: [{ text: "Terms of Use", href: "#" },{ text: "Privacy Policy", href: "#" },{ text: "Refund Policy", href: "#" },{ text: "Shipping Policy", href: "#" }] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1.2, marginBottom: 18 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map(link => link.isRouter ? (<Link key={link.text} to={link.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{link.text}</Link>) : (<a key={link.text} href={link.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{link.text}</a>))}
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
    </div>
  );
}
