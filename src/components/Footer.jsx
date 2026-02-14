import { motion} from "framer-motion";

const Footer = () => {
  const NAV_LINKS = ["About", "Skills", "Work", "Projects", "Learnings", "Contact"];

  return (
    <footer
      style={{
        background: "#060608",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "#fff",
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#818CF8" }}>&lt;</span>
              DP
              <span style={{ color: "#818CF8" }}>/&gt;</span>
            </div>
            <div style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6, maxWidth: 260 }}>
              Senior Frontend Engineer · React Specialist ·
              Open to new opportunities in India.
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: "#6B7280",
                  fontSize: 13,
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                }}
                whileHover={{ color: "#818CF8", y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: "💼", href: "https://www.linkedin.com/in/deepak-patidar-react/", label: "LinkedIn" },
              { icon: "🐙", href: "https://github.com/Deepak-patidar-a", label: "GitHub" },
              { icon: "✉️", href: "mailto:deepakpatidar796@gmail.com", label: "Email" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 18,
                  textDecoration: "none",
                }}
                whileHover={{
                  scale: 1.12,
                  background: "rgba(129,140,248,0.08)",
                  borderColor: "rgba(129,140,248,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)", marginBottom: 24 }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div style={{ color: "#4B5563", fontSize: 12 }}>
            © {new Date().getFullYear()} Deepak Patidar · Designed & Built with ❤️ using React + Tailwind + Framer Motion
          </div>
          <div style={{ color: "#4B5563", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <motion.span
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Available for opportunities
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer