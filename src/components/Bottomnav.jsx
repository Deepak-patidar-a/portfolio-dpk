import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BOTTOM_NAV_ITEMS = [
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "work", label: "Work", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "contact", label: "Contact", icon: "✉️" },
];

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState("about");

  // ── Active section detection ──
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 200; // offset for better detection
      const sections = BOTTOM_NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return null;
        return {
          id: item.id,
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

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(250,250,249,0.95)",
        backdropFilter: "blur(16px) saturate(180%)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
      }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl relative"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: isActive ? "rgba(13,148,136,0.1)" : "transparent",
                border: "none",
                cursor: "pointer",
                flex: 1,
                maxWidth: 80,
                transition: "background 0.2s",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon */}
              <motion.span
                style={{
                  fontSize: 20,
                  display: "block",
                }}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.span>

              {/* Label */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#0D9488" : "#78716C",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.span
                  style={{
                    position: "absolute",
                    top: 4,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#0D9488",
                    boxShadow: "0 0 8px rgba(13,148,136,0.6)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}