import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

const C = {
  green: "#1BF561", darkGreen: "#00AC69", dark: "#010F12", darkBg: "#0B1215",
  light: "#F4F5F7", white: "#FFFEFF", border: "#E4E7EB", muted: "#6B7280", textBody: "#4B5563",
};

const IS_PREVIEW_MODE = true;
const APPLY_ENDPOINT = "/api/careers/apply";
const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
const CAREERS_EMAIL = "eunice@nehemiahenergy.com";

const PAT_M = "M 62.36 -5.65 L 40.92 53.68 L 34 72.82 L 8.92 40.25 L 15.48 23.03 L 29.34 39.71 Z";
const PAT_A = "M 13.37 61.62 L -13.06 97.91 L 4.94 50.68 Z";

function Pattern({ color = "#1BF561", opacity = 0.04, rows = 8, cols = 10 }) {
  return (<div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none", overflow: "hidden" }}><svg width="100%" height="100%" viewBox={`0 0 ${cols * 80} ${rows * 100}`} preserveAspectRatio="xMidYMid slice">{[...Array(rows)].map((_, r) => [...Array(cols)].map((_, c) => (<g key={`${r}${c}`} transform={`translate(${c * 80}, ${r * 100})`}><path d={PAT_M} fill="none" stroke={color} strokeWidth="0.75" /><path d={PAT_A} fill="none" stroke={color} strokeWidth="0.75" /></g>)))}</svg></div>);
}

function Icon({ kind, size = 24, color = "#010F12", strokeWidth = 2, style = {} }) {
  const s = strokeWidth;
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    check: <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    checkCircle: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth={s} fill="none" /><path d="M9 12l2 2 4-4" stroke={color} strokeWidth={s + 0.3} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    upload: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /><polyline points="17 8 12 3 7 8" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /><line x1="12" y1="3" x2="12" y2="15" stroke={color} strokeWidth={s} strokeLinecap="round" /></>,
    file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><polyline points="14 2 14 8 20 8" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    x: <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={s + 0.5} fill="none" strokeLinecap="round" />,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke={color} strokeWidth={s + 0.3} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth={s} fill="none" /><line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="3" strokeLinecap="round" /></>,
    sun: <><circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth={s} fill="none" /><line x1="12" y1="1.5" x2="12" y2="4" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="12" y1="20" x2="12" y2="22.5" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="4.2" y1="4.2" x2="6" y2="6" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="18" y1="18" x2="19.8" y2="19.8" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="1.5" y1="12" x2="4" y2="12" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="20" y1="12" x2="22.5" y2="12" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="4.2" y1="19.8" x2="6" y2="18" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="18" y1="6" x2="19.8" y2="4.2" stroke={color} strokeWidth={s} strokeLinecap="round" /></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={s} fill="none" /></>,
    clock: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth={s} fill="none" /><polyline points="12 6 12 12 16 14" stroke={color} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth={s} fill="none" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth={s} fill="none" strokeLinejoin="round" /><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth={s} strokeLinecap="round" /><line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth={s + 0.5} strokeLinecap="round" /></>,
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, ...style }} aria-hidden="true">{paths[kind]}</svg>);
}

const ROLES = {
  "security": { icon: "shield", title: "Security Officer", schedule: "Day or night shift", pitch: "You\u2019ll be the first face every driver sees and the last one too. Calm, watchful, and ready for anything." },
  "momo-attendant": { icon: "smartphone", title: "Mobile Money Attendant", schedule: "Shift work", pitch: "You\u2019ll handle wallet top-ups, walk new customers through their first charge, and keep the lounge running smoothly." },
  "day-attendant": { icon: "sun", title: "Day Attendant", schedule: "Day shift, 6 days a week", pitch: "You\u2019ll be the heart of Nehemiah Gate during the day. Greeting drivers, answering questions, keeping the space welcoming." },
};

const EXPERIENCE_OPTIONS = [
  { value: "", label: "Select your experience level..." },
  { value: "none", label: "No prior experience \u2014 willing to learn" },
  { value: "less-than-1", label: "Less than 1 year" },
  { value: "1-3", label: "1 to 3 years" },
  { value: "3-5", label: "3 to 5 years" },
  { value: "5-plus", label: "5+ years" },
];

export default function NehemiahCareersApply() {
  const { role: roleId } = useParams();
  const role = ROLES[roleId];

  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", location: "", experience: "", whyThisRole: "", relevantExperience: "", startDate: "" });
  const [cvFile, setCvFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [roleId]);

  if (!role) return <Navigate to="/careers" replace />;

  const handleChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); if (submitStatus) setSubmitStatus(null); };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; setFileError(null);
    if (!file) { setCvFile(null); return; }
    if (file.size > MAX_CV_SIZE_BYTES) { setFileError("File is too large. Maximum size is 5MB."); setCvFile(null); return; }
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) { setFileError("Please upload a PDF or Word document."); setCvFile(null); return; }
    setCvFile(file);
  };

  const removeFile = () => { setCvFile(null); setFileError(null); const input = document.getElementById("cv-upload"); if (input) input.value = ""; };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) { alert("Please enter your full name."); return; }
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 9) { alert("Please enter a valid phone number."); return; }
    if (!formData.email.includes("@") || !formData.email.includes(".")) { alert("Please enter a valid email address."); return; }
    if (!formData.location.trim()) { alert("Please tell us where you live."); return; }
    if (!formData.experience) { alert("Please select your experience level."); return; }
    if (!formData.whyThisRole.trim() || formData.whyThisRole.trim().length < 30) { alert("Please write at least 30 characters about why you want this role."); return; }

    if (IS_PREVIEW_MODE) {
      alert("PREVIEW MODE\n\nIn production, this submits to " + APPLY_ENDPOINT + " as multipart/form-data:\n\n  Role: " + role.title + " (" + roleId + ")\n  Name: " + formData.fullName + "\n  Phone: " + formData.phone + "\n  Email: " + formData.email + "\n  Location: " + formData.location + "\n  Experience: " + formData.experience + "\n  CV: " + (cvFile ? cvFile.name + " (" + formatFileSize(cvFile.size) + ")" : "(none)") + "\n  Start: " + (formData.startDate || "(not specified)") + "\n\nBackend routes the application to " + CAREERS_EMAIL + ".\n\nSet IS_PREVIEW_MODE to false to enable real submissions.");
      return;
    }

    setIsSubmitting(true); setSubmitStatus(null);
    try {
      const payload = new FormData();
      payload.append("roleId", roleId); payload.append("roleTitle", role.title);
      Object.keys(formData).forEach(key => payload.append(key, formData[key]));
      if (cvFile) payload.append("cv", cvFile);
      const res = await fetch(APPLY_ENDPOINT, { method: "POST", body: payload });
      if (res.ok) { setSubmitStatus("success"); window.scrollTo({ top: 0, behavior: "smooth" }); } else { setSubmitStatus("error"); }
    } catch { setSubmitStatus("error"); } finally { setIsSubmitting(false); }
  };

  const metaPill = (icon, text) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: 0.2 }}>
      <Icon kind={icon} size={12} color={C.green} />{text}
    </span>
  );

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
        .body { font-size: clamp(15px,1.1vw,17px); line-height: 1.7; color: ${C.textBody}; }
        .grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 700px) { .grid-2 { grid-template-columns: 1fr 1fr; } }
        .input { width: 100%; padding: 14px 16px; background: ${C.light}; border: 1.5px solid transparent; border-radius: 12px; font-size: 15px; font-weight: 500; color: ${C.dark}; font-family: inherit; outline: none; transition: all 0.15s ease; }
        .input:focus { border-color: ${C.green}; background: ${C.white}; box-shadow: 0 0 0 4px rgba(27,245,97,0.1); }
        .input::placeholder { color: ${C.muted}; font-weight: 500; }
        textarea.input { resize: vertical; min-height: 120px; line-height: 1.6; }
        select.input { appearance: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>"); background-repeat: no-repeat; background-position: right 16px center; background-size: 16px; padding-right: 44px; }
        .input-label { display: block; font-size: 12px; font-weight: 700; color: ${C.dark}; margin-bottom: 8px; letter-spacing: 0.2px; }
        .input-hint { font-size: 12px; color: ${C.muted}; margin-top: 6px; line-height: 1.5; }
        .field-group { margin-bottom: 20px; }
        .file-upload-area { padding: 24px; background: ${C.light}; border: 1.5px dashed ${C.border}; border-radius: 14px; text-align: center; cursor: pointer; transition: all 0.15s ease; }
        .file-upload-area:hover { border-color: ${C.green}; background: rgba(27,245,97,0.04); }
        .file-selected { display: flex; align-items: center; gap: 14px; padding: 16px 20px; background: rgba(27,245,97,0.06); border: 1.5px solid ${C.green}40; border-radius: 14px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      <SiteNav />

      <main>
        {/* HERO */}
        <section style={{ background: `linear-gradient(175deg, ${C.dark} 0%, ${C.darkBg} 100%)`, position: "relative", overflow: "hidden", paddingTop: "clamp(140px,14vw,180px)", paddingBottom: "clamp(60px,8vw,100px)" }}>
          <Pattern color={C.green} opacity={0.04} rows={10} cols={14} />
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(800px,90vw)", height: "min(800px,90vw)", borderRadius: "50%", background: `radial-gradient(circle, ${C.green}1A 0%, ${C.green}06 35%, transparent 65%)`, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 820 }}>
            <Link to="/careers" className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 32, transition: "color 0.15s ease" }}>
              <Icon kind="arrowLeft" size={14} color="rgba(255,255,255,0.55)" />Back to all open roles
            </Link>
            <div className="fade-up label-pill" style={{ background: "rgba(27,245,97,0.08)", border: "1px solid rgba(27,245,97,0.25)", color: C.green, marginBottom: 24, animationDelay: "0.05s" }}><Icon kind={role.icon} size={12} color={C.green} /> APPLYING FOR</div>
            <h1 className="fade-up" style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.025em", color: C.white, marginBottom: 24, animationDelay: "0.1s" }}>{role.title}</h1>
            <div className="fade-up" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 24, animationDelay: "0.15s" }}>
              {metaPill("briefcase", "Full-time")}{metaPill("clock", role.schedule)}{metaPill("pin", "Haatso, Accra")}
            </div>
            <p className="fade-up" style={{ fontSize: "clamp(16px,1.4vw,19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 640, margin: "0 auto", animationDelay: "0.2s" }}>{role.pitch}</p>
          </div>
        </section>

        {/* FORM */}
        <section style={{ background: C.light, padding: "clamp(60px,8vw,100px) 0 clamp(80px,10vw,140px)" }}>
          <div className="container">
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              {submitStatus === "success" ? (
                <div style={{ background: C.white, border: `1px solid ${C.green}40`, borderRadius: 24, padding: "clamp(40px,5vw,64px) clamp(28px,3vw,48px)", textAlign: "center", boxShadow: "0 30px 80px rgba(1,15,18,0.06)" }}>
                  <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(27,245,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><Icon kind="checkCircle" size={44} color={C.darkGreen} /></div>
                  <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, color: C.dark, marginBottom: 16 }}>Application sent.</h2>
                  <p className="body" style={{ maxWidth: 480, margin: "0 auto 32px" }}>Thank you, {formData.fullName.split(" ")[0] || "friend"}. We received your application for <strong style={{ color: C.dark }}>{role.title}</strong>. Our team will review it and get back to you within a week.</p>
                  <p className="body" style={{ fontSize: 14, color: C.muted, maxWidth: 480, margin: "0 auto 32px" }}>A confirmation has been sent to <strong style={{ color: C.dark }}>{formData.email}</strong>. Check your spam folder if you don{"\u2019"}t see it.</p>
                  <Link to="/careers" className="btn btn-primary"><Icon kind="arrowLeft" size={14} color={C.dark} />Back to Careers</Link>
                </div>
              ) : (
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 24, padding: "clamp(28px,3vw,44px)", boxShadow: "0 20px 60px rgba(1,15,18,0.04)" }}>
                  <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.darkGreen, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Application Form</div>
                    <h2 style={{ fontSize: "clamp(22px,2.4vw,28px)", fontWeight: 800, color: C.dark, letterSpacing: -0.3, marginBottom: 8 }}>Tell us about yourself</h2>
                    <p style={{ fontSize: 14, color: C.muted }}>Fields marked <span style={{ color: C.darkGreen, fontWeight: 700 }}>*</span> are required. Take your time.</p>
                  </div>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="field-group"><label className="input-label" htmlFor="fullName">Full name <span style={{ color: C.darkGreen, fontWeight: 700 }}>*</span></label><input id="fullName" className="input" type="text" placeholder="Kwame Asante" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} required /></div>
                    <div className="grid-2">
                      <div className="field-group"><label className="input-label" htmlFor="phone">Phone number <span style={{ color: C.darkGreen, fontWeight: 700 }}>*</span></label><input id="phone" className="input" type="tel" placeholder="+233 24 123 4567" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} required /></div>
                      <div className="field-group"><label className="input-label" htmlFor="email">Email address <span style={{ color: C.darkGreen, fontWeight: 700 }}>*</span></label><input id="email" className="input" type="email" placeholder="you@example.com" value={formData.email} onChange={e => handleChange("email", e.target.value)} required /></div>
                    </div>
                    <div className="field-group"><label className="input-label" htmlFor="location">Where do you live? <span style={{ color: C.darkGreen, fontWeight: 700 }}>*</span></label><input id="location" className="input" type="text" placeholder="e.g. Madina, Adenta, Haatso, East Legon" value={formData.location} onChange={e => handleChange("location", e.target.value)} required /><div className="input-hint">Knowing where you live helps us understand your daily commute to Nehemiah Gate.</div></div>
                    <div className="field-group"><label className="input-label" htmlFor="experience">Years of relevant experience <span style={{ color: C.darkGreen, fontWeight: 700 }}>*</span></label><select id="experience" className="input" value={formData.experience} onChange={e => handleChange("experience", e.target.value)} required>{EXPERIENCE_OPTIONS.map(opt => <option key={opt.value} value={opt.value} disabled={opt.value === ""}>{opt.label}</option>)}</select></div>
                    <div className="field-group"><label className="input-label" htmlFor="whyThisRole">Why do you want this role? <span style={{ color: C.darkGreen, fontWeight: 700 }}>*</span></label><textarea id="whyThisRole" className="input" placeholder="Tell us in your own words why you want to join Nehemiah Energy and this role specifically..." value={formData.whyThisRole} onChange={e => handleChange("whyThisRole", e.target.value)} required rows={5} /><div className="input-hint">At least 30 characters. Be honest and direct. We are not looking for fancy English.</div></div>
                    <div className="field-group"><label className="input-label" htmlFor="relevantExperience">Tell us about your relevant experience</label><textarea id="relevantExperience" className="input" placeholder="What have you done before that prepares you for this role?" value={formData.relevantExperience} onChange={e => handleChange("relevantExperience", e.target.value)} rows={4} /><div className="input-hint">Optional, but helpful. If you have a CV to attach below, you can keep this short.</div></div>
                    <div className="field-group"><label className="input-label" htmlFor="startDate">When can you start?</label><input id="startDate" className="input" type="date" value={formData.startDate} onChange={e => handleChange("startDate", e.target.value)} /><div className="input-hint">Optional. Leave blank if you are not sure yet.</div></div>
                    <div className="field-group">
                      <label className="input-label">Upload your CV</label>
                      {!cvFile ? (
                        <label htmlFor="cv-upload" className="file-upload-area"><input id="cv-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ display: "none" }} /><div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(27,245,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Icon kind="upload" size={24} color={C.darkGreen} /></div><div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Click to upload your CV</div><div style={{ fontSize: 12, color: C.muted }}>PDF or Word document, up to 5MB</div></label>
                      ) : (
                        <div className="file-selected">
                          <div style={{ width: 44, height: 44, borderRadius: 11, background: "rgba(27,245,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon kind="file" size={22} color={C.darkGreen} /></div>
                          <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 700, color: C.dark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cvFile.name}</div><div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{formatFileSize(cvFile.size)}</div></div>
                          <button type="button" onClick={removeFile} aria-label="Remove file" style={{ width: 36, height: 36, borderRadius: 10, background: C.white, border: `1px solid ${C.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon kind="x" size={16} color={C.muted} /></button>
                        </div>
                      )}
                      {fileError && <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, fontSize: 13, color: "#92400E" }}><Icon kind="warning" size={14} color="#92400E" />{fileError}</div>}
                      <div className="input-hint">Optional. If you don{"\u2019"}t have a CV, no problem {"\u2014"} your message above tells us what we need to know.</div>
                    </div>
                    {submitStatus === "error" && (<div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "rgba(245,158,11,0.1)", border: "1px solid #F59E0B40", borderRadius: 12, marginBottom: 18 }}><Icon kind="warning" size={18} color="#92400E" /><span style={{ fontSize: 14, fontWeight: 600, color: "#92400E" }}>Something went wrong sending your application. Please try again or email {CAREERS_EMAIL} directly.</span></div>)}
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: "100%", justifyContent: "center", padding: "18px 22px", fontSize: 16, marginTop: 8, opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "wait" : "pointer" }}>{isSubmitting ? "Sending your application..." : <>Send Application <Icon kind="arrow" size={14} color={C.dark} /></>}</button>
                    <p style={{ fontSize: 12, color: C.muted, textAlign: "center", marginTop: 18, lineHeight: 1.6 }}>By submitting this form, you agree to our <Link to="/privacy" style={{ color: C.darkGreen, fontWeight: 600 }}>Privacy Policy</Link>. We{"\u2019"}ll only use your information for this application.</p>
                  </form>
                </div>
              )}
              {submitStatus !== "success" && (
                <div style={{ marginTop: 40, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.darkGreen, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>What happens next</div>
                  <p style={{ fontSize: 14, color: C.textBody, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>We read every application personally. You{"\u2019"}ll hear back from us within a week with next steps. No ghosting. That is a promise.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
