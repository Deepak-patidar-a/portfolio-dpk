import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CONTACT_LINKS, AVAILABILITY } from "../data/common";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";

function RevealOnScroll({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 36 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactCard({ item, index }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const handleCopy = (e) => {
    if (!item.copyable) return;
    e.preventDefault();
    navigator.clipboard.writeText(item.value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.copyable ? "_self" : "_blank"}
      rel="noopener noreferrer"
      onClick={item.copyable ? handleCopy : undefined}
      className="group relative flex items-center gap-5 p-5 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: `1px solid rgba(255,255,255,0.06)`,
        textDecoration: "none",
        cursor: item.copyable ? "copy" : "pointer",
      }}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{
        borderColor: item.color + "35",
        background: `linear-gradient(135deg, ${item.color}06, rgba(255,255,255,0.01))`,
        x: 4,
      }}
    >
      {/* Icon box */}
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{
          width: 48,
          height: 48,
          background: `linear-gradient(135deg, ${item.color}18, ${item.color}06)`,
          border: `1px solid ${item.color}25`,
          fontSize: 22,
        }}
      >
        {item.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "#A8A29E",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 3,
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#57534E",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.value}
        </div>
      </div>

      {/* Action indicator */}
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              fontSize: 11,
              color: "#34D399",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.1em",
              flexShrink: 0,
            }}
          >
            ✓ Copied!
          </motion.span>
        ) : (
          <motion.span
            key="action"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: 16,
              color: item.color,
              opacity: 0,
              flexShrink: 0,
              transition: "opacity 0.2s",
            }}
            className="group-hover:opacity-100"
          >
            {item.copyable ? "⎘" : "↗"}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Left colour accent */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: item.color }}
      />
    </motion.a>
  );
}

function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({}) 
  const [errorMsg, setErrorMsg] = useState("") 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim())
            newErrors.name = "Name is required";

        if (!form.email.trim())
            newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Please enter a valid email address";

        if (!form.message.trim())
            newErrors.message = "Message is required";
        else if (form.message.trim().length < 10)
            newErrors.message = "Message must be at least 10 characters";

        return newErrors;
        };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    setErrors({});
    setStatus("sending");


    emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    { name: form.name, email: form.email, subject: form.subject, message: form.message },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(async ()  => {
        await new Promise((res) => setTimeout(res, 1500));
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
    })
    .catch(async (err) => {
        await new Promise((res) => setTimeout(res, 1500));
        if (err.status === 429) {
        setErrorMsg("Too many requests. Please try again in a few minutes.");
        } else if (err.status === 400) {
        setErrorMsg("Invalid request. Please check your details and try again.");
        } else {
        setErrorMsg("Failed to send. Please email me directly at deepakpatidar796@gmail.com");
        }
        setStatus("error");
    });
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.5)",           
    border: "1px solid rgba(0,0,0,0.12)",         
    borderRadius: 12,
    padding: "14px 18px",
    color: "#1C1917",                              
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
    };

  const labelStyle = {
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "#A8A29E",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <motion.div
        ref={ref}
        className="rounded-2xl p-7 md:p-9"
        style={{
            background: "rgba(255,255,255,0.4)",           
            border: "1px solid rgba(0,0,0,0.08)",          
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",      
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
        {/* Top bar */}
        <div style={{ 
            height: 2, 
            background: "linear-gradient(to right, #0D9488, #DC2626, transparent)", 
            borderRadius: 999, 
            marginBottom: 28 
        }} />

        <h3
            style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#1C1917",
            marginBottom: 6,
            }}
        >
            Send me a message
        </h3>
        <p style={{ color: "#78716C", fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
            I typically respond within 24 hours. Let's talk!
        </p>

        <AnimatePresence mode="wait">
            {status === "success" ? (
            <motion.div
                key="success"
                className="flex flex-col items-center justify-center gap-4 py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
            >
                <div
                className="flex items-center justify-center rounded-full"
                style={{ 
                    width: 64, 
                    height: 64, 
                    background: "rgba(5,150,105,0.12)", 
                    border: "2px solid rgba(5,150,105,0.3)", 
                    fontSize: 28 
                }}
                >
                ✓
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#059669" }}>
                Message Sent!
                </div>
                <div style={{ color: "#78716C", fontSize: 14, textAlign: "center" }}>
                Thanks for reaching out. I'll get back to you soon.
                </div>
            </motion.div>
            ) : (
            <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label style={labelStyle}>Your Name</label>
                    <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                placeholder="Deepak Patidar"
                    style={{
                        ...inputStyle,
                        borderColor: errors.name ? "#EF4444" : "rgba(0,0,0,0.12)",
                    }}
                    onFocus={(e) => {
                        if (!errors.name) e.target.style.borderColor = "rgba(13,148,136,0.4)";
                        e.target.style.background = "rgba(13,148,136,0.04)";
                    }}
                    onBlur={(e) => {
                        if (!errors.name) e.target.style.borderColor = "rgba(0,0,0,0.12)";
                        e.target.style.background = "rgba(255,255,255,0.5)";
                    }}
                    />
                    {errors.name && (
                    <p style={{ color: "#EF4444", fontSize: 12, marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>
                        ⚠ {errors.name}
                    </p>
                    )}
                </div>
                <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  placeholder="you@company.com"
                    required
                    style={{
                        ...inputStyle,
                        borderColor: errors.email ? "#EF4444" : "rgba(0,0,0,0.12)",
                    }}
                    onFocus={(e) => {
                        if (!errors.email) e.target.style.borderColor = "rgba(13,148,136,0.4)";
                        e.target.style.background = "rgba(13,148,136,0.04)";
                    }}
                    onBlur={(e) => {
                        if (!errors.email) e.target.style.borderColor = "rgba(0,0,0,0.12)";
                        e.target.style.background = "rgba(255,255,255,0.5)";
                    }}
                    />
                    {errors.email && (
                    <p style={{ color: "#EF4444", fontSize: 12, marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>
                        ⚠ {errors.email}
                    </p>
                    )}
                </div>
                </div>

                {/* Subject */}
                <div>
                <label style={labelStyle}>Subject</label>
                <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Opportunity at your company"
                    style={{
                    ...inputStyle,
                    borderColor: errors.subject ? "#EF4444" : "rgba(0,0,0,0.12)",
                    }}
                    onFocus={(e) => {
                    if (!errors.subject) e.target.style.borderColor = "rgba(13,148,136,0.4)";
                    e.target.style.background = "rgba(13,148,136,0.04)";
                    }}
                    onBlur={(e) => {
                    if (!errors.subject) e.target.style.borderColor = "rgba(0,0,0,0.12)";
                    e.target.style.background = "rgba(255,255,255,0.5)";
                    }}
                />
                {errors.subject && (
                    <p style={{ color: "#EF4444", fontSize: 12, marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>
                    ⚠ {errors.subject}
                    </p>
                )}
                </div>

                {/* Message */}
                <div>
                <label style={labelStyle}>Message</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                placeholder="Tell me about the opportunity, team, or just say hi..."
                    required
                    rows={5}
                    style={{ 
                    ...inputStyle, 
                    resize: "vertical", 
                    minHeight: 120,
                    borderColor: errors.message ? "#EF4444" : "rgba(0,0,0,0.12)",
                    }}
                    onFocus={(e) => {
                    if (!errors.message) e.target.style.borderColor = "rgba(13,148,136,0.4)";
                    e.target.style.background = "rgba(13,148,136,0.04)";
                    }}
                    onBlur={(e) => {
                    if (!errors.message) e.target.style.borderColor = "rgba(0,0,0,0.12)";
                    e.target.style.background = "rgba(255,255,255,0.5)";
                    }}
                />
                {errors.message && (
                    <p style={{ color: "#EF4444", fontSize: 12, marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>
                    ⚠ {errors.message}
                    </p>
                )}
                </div>

                {/* Submit */}
                <motion.button
                type="submit"
                disabled={status === "sending"}
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "15px 32px",
                    borderRadius: 12,
                    color: "#FAFAF9",
                    background: status === "sending"
                    ? "rgba(13,148,136,0.5)"
                    : "linear-gradient(135deg, #0D9488, #059669)",
                    boxShadow: "0 4px 24px rgba(13,148,136,0.25)",
                    border: "none",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                }}
                whileHover={status !== "sending" ? { scale: 1.02, boxShadow: "0 8px 40px rgba(13,148,136,0.35)" } : {}}
                whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                >
                {status === "sending" ? (
                    <>
                    <motion.span
                        style={{ 
                        display: "inline-block", 
                        width: 16, 
                        height: 16, 
                        border: "2px solid rgba(255,255,255,0.3)", 
                        borderTopColor: "#FAFAF9", 
                        borderRadius: "50%" 
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                    </>
                ) : (
                    "Send Message →"
                )}
                </motion.button>

                {status === "error" && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-4 flex flex-col gap-3"
                    style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    }}
                >
                    <p style={{ color: "#DC2626", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                    ⚠ {errorMsg}
                    </p>
                    <button
                    onClick={() => setStatus("idle")}
                    style={{
                        background: "none",
                        border: "1px solid rgba(239,68,68,0.3)",
                        color: "#DC2626",
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        alignSelf: "flex-start",
                    }}
                    >
                    Try Again
                    </button>
                </motion.div>
                )}
            </motion.form>
            )}
        </AnimatePresence>
</motion.div>
  );
}

export default function Contacts() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .shimmer-contact {
          background: linear-gradient(90deg, #0D9488 0%, #DC2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        input::placeholder, textarea::placeholder {
          color: #D6D3D1; 
          opacity: 1;
        }
      `}</style>

      <section
        id="contact"
        style={{ background: "#FAFAF9", fontFamily: "'DM Sans', sans-serif" }}
        className="relative py-20 overflow-hidden"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.04) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.03) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* ── Heading ── */}
          <RevealOnScroll>
            <div className="mb-16 text-center">
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  color: "#1C1917",
                  marginTop: 12,
                  lineHeight: 1.05,
                }}
              >
                Let's build something{" "}
                <span className="shimmer-contact">great together</span>
              </h2>
              <p
                style={{
                  color: "#A8A29E",
                  fontSize: 16,
                  lineHeight: 1.75,
                  maxWidth: 480,
                  margin: "16px auto 0",
                }}
              >
                I'm actively looking for new frontend opportunities. Whether you
                have a role, a project, or just want to connect - my inbox is
                always open.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

  
            <div className="flex flex-col gap-6">

              {/* Availability strip */}
              <RevealOnScroll direction="right">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(52,211,153,0.06), rgba(20,184,166,0.03))",
                    border: "1px solid rgba(52,211,153,0.15)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <motion.span
                      style={{ width: 10, height: 10, borderRadius: "50%", background: "#34D399", display: "inline-block", boxShadow: "0 0 10px #34D399" }}
                      animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#34D399" }}>
                      Currently Available
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {AVAILABILITY.map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-4">
                        <span style={{ color: "#A8A29E", fontSize: 13, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
                          {item.label}
                        </span>
                        <span style={{ color: item.color, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textAlign: "right" }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <div className="flex flex-col gap-3">
                {CONTACT_LINKS.map((item, i) => (
                  <RevealOnScroll key={item.label} delay={i * 0.08} direction="right">
                    <ContactCard item={item} index={i} />
                  </RevealOnScroll>
                ))}
              </div>

              <RevealOnScroll delay={0.3} direction="right">
                <div
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>⚡</span>
                  <p style={{ color: "#A8A29E", fontSize: 13, lineHeight: 1.7 }}>
                    <span style={{ color: "#57534E", fontWeight: 600 }}>Quick responder</span> -I
                    typically reply within 24 hours on weekdays. For urgent
                    matters, reach out on LinkedIn or WhatsApp directly.
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            <ContactForm />
          </div>

          <div
            className="w-full h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer/>
    </>
  );
}