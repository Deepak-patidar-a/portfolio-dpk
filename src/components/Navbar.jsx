import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["About", "Work", "Projects", "Skills", "Learnings", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll detection — navbar background ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section detection (optimized) ──
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 100;
      const sections = NAV_LINKS.map((link) => {
        const el = document.getElementById(link.toLowerCase());
        if (!el) return null;
        return {
          id: link.toLowerCase(),
          top: el.offsetTop,
        };
      }).filter(Boolean);

      const current = [...sections].reverse().find((section) => scrollY >= section.top);
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on resize ──
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (item) => {
    setMobileOpen(false);
    const el = document.getElementById(item.toLowerCase());
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      {/* ── Main Navbar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(250,250,249,0.92)" : "rgba(250,250,249,0.0)",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#1C1917",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span style={{ color: "#0D9488" }}>&lt;</span>
            DP
            <span style={{ color: "#0D9488" }}>/&gt;</span>
          </motion.a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#0D9488" : "#78716C",
                    textDecoration: "none",
                    letterSpacing: "0.06em",
                    position: "relative",
                    paddingBottom: 2,
                    transition: "color 0.2s",
                  }}
                  whileHover={{ color: "#0D9488", y: -1 }}
                >
                  {item}
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 1.5,
                      borderRadius: 999,
                      background: "#0D9488",
                      boxShadow: "0 0 6px rgba(13,148,136,0.6)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop Resume button */}
          <motion.a
            href="/Deepak_Patidar_Resume.pdf"
            download
            className="hidden md:flex items-center gap-2"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0D9488",
              border: "1px solid rgba(13,148,136,0.3)",
              borderRadius: 8,
              padding: "9px 18px",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(13,148,136,0.08)",
              borderColor: "rgba(13,148,136,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Resume ↓
          </motion.a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg"
            onClick={() => setMobileOpen((p) => !p)}
            style={{
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.08)",
              cursor: "pointer",
              width: 40,
              height: 40,
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#1C1917",
                borderRadius: 999,
                transformOrigin: "center",
              }}
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              style={{ display: "block", width: 18, height: 1.5, background: "#1C1917", borderRadius: 999 }}
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#1C1917",
                borderRadius: 999,
                transformOrigin: "center",
              }}
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel — FIXED: Now light theme */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
              style={{
                width: "min(320px, 85vw)",
                background: "#FAFAF9",
                borderLeft: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "-8px 0 24px rgba(0,0,0,0.08)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
              >
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#1C1917" }}>
                  <span style={{ color: "#0D9488" }}>&lt;</span>DP
                  <span style={{ color: "#0D9488" }}>/&gt;</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: "rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    color: "#57534E",
                    borderRadius: 8,
                    width: 36,
                    height: 36,
                    cursor: "pointer",
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-6 py-8 gap-2 flex-1">
                {NAV_LINKS.map((item, i) => {
                  const isActive = activeSection === item.toLowerCase();
                  return (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item);
                      }}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: isActive ? "#0D9488" : "#1C1917",
                        textDecoration: "none",
                        background: isActive ? "rgba(13,148,136,0.08)" : "transparent",
                        border: `1px solid ${isActive ? "rgba(13,148,136,0.2)" : "transparent"}`,
                        transition: "all 0.2s",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{
                        color: "#0D9488",
                        background: "rgba(13,148,136,0.06)",
                        x: 4,
                      }}
                    >
                      <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#0D9488", opacity: 0.6 }}>
                        0{i + 1}
                      </span>
                      {item}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom CTA */}
              <div className="px-6 pb-8">
                <motion.a
                  href="/Deepak_Patidar_Resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#FAFAF9",
                    background: "linear-gradient(135deg, #0D9488, #059669)",
                    boxShadow: "0 4px 24px rgba(13,148,136,0.25)",
                    textDecoration: "none",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download Resume ↓
                </motion.a>
                <div className="flex items-center justify-center gap-2 mt-6">
                  {[
                    { icon: "💼", href: "https://linkedin.com/in/deepakpatidar" },
                    { icon: "🐙", href: "https://github.com/deepakpatidar" },
                    { icon: "✉️", href: "mailto:deepakpatidar796@gmail.com" },
                  ].map((s) => (
                    <motion.a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: 44,
                        height: 44,
                        background: "rgba(0,0,0,0.04)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        fontSize: 20,
                        textDecoration: "none",
                      }}
                      whileHover={{ scale: 1.1, borderColor: "rgba(13,148,136,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}