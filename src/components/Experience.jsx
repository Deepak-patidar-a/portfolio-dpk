import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { EXPERIENCES, EDUCATION } from "../data/experience";

function RevealOnScroll({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MetricCard({ metric, label, desc, color, index, isVisible }) {
  return (
    <motion.div
      className="relative rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: `linear-gradient(135deg, ${color}08, ${color}03)`,
        border: `1px solid ${color}20`,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: 0.3 + index * 0.08 }}
      whileHover={{ scale: 1.03, borderColor: color + "40" }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color,
          lineHeight: 1,
        }}
      >
        {metric}
      </div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          fontSize: 12,
          color: "#57534E",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
      <div style={{ color: "#A8A29E", fontSize: 12, lineHeight: 1.6 }}>
        {desc}
      </div>
    </motion.div>
  );
}

function StackTag({ name, color }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontFamily: "'DM Sans', sans-serif",
        color: color + "CC",
        background: color + "12",
        border: `1px solid ${color}25`,
        borderRadius: 6,
        padding: "3px 10px",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
}

function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(index === 0); // first card open by default

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">

      {/* ── Timeline spine ── */}
      <div className="hidden md:flex flex-col items-center" style={{ minWidth: 56 }}>
        {/* Logo circle */}
        <motion.div
          className="relative flex items-center justify-center rounded-2xl z-10 flex-shrink-0"
          style={{
            width: 56,
            height: 56,
            background: `linear-gradient(135deg, ${exp.color}20, ${exp.color}08)`,
            border: `2px solid ${exp.color}40`,
            boxShadow: inView ? `0 0 20px ${exp.color}20` : "none",
          }}
          initial={{ scale: 0, rotate: -10 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src={exp.logo}
            alt={exp.company}
            style={{
                width: 36,
                height: 36,
                objectFit: "contain",
                borderRadius: 6,
                filter: "brightness(1.1) invert(0)",
                mixBlendMode: "screen",
            }}
            />
          {/* Current indicator pulse */}
          {exp.current && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ background: "#34D399" }}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Vertical line */}
        {index < EXPERIENCES.length  -1 && (
          <motion.div
            className="flex-1 w-px mt-3"
            style={{ background: `linear-gradient(to bottom, ${exp.color}30, rgba(255,255,255,0.04))` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        className="flex-1 rounded-2xl mb-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          border: `1px solid ${inView ? exp.color + "20" : "rgba(255,255,255,0.06)"}`,
          transition: "border-color 0.5s",
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Top colour bar */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(to right, ${exp.color}, ${exp.color}40, transparent)`,
          }}
        />

        <div className="p-6 md:p-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              {/* Mobile logo */}
              <div className="flex items-center gap-3 mb-3 md:hidden">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 42,
                    height: 42,
                    background: `linear-gradient(135deg, ${exp.color}20, ${exp.color}08)`,
                    border: `1px solid ${exp.color}30`,
                  }}
                >
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    style={{
                        width: 32,
                        height: 32,
                        objectFit: "contain",
                        borderRadius: 6,
                        mixBlendMode: "screen",
                    }}
                    />
                </div>
                {exp.current && (
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#34D399",
                      background: "rgba(52,211,153,0.1)",
                      border: "1px solid rgba(52,211,153,0.2)",
                      borderRadius: 20,
                      padding: "3px 10px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Current
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    color: "#1C1917",
                    lineHeight: 1.1,
                  }}
                >
                  {exp.company}
                </h3>
                {exp.current && (
                  <span
                    className="hidden md:inline-flex items-center gap-1"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#34D399",
                      background: "rgba(52,211,153,0.1)",
                      border: "1px solid rgba(52,211,153,0.2)",
                      borderRadius: 20,
                      padding: "3px 10px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: "#34D399" }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Current
                  </span>
                )}
              </div>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: exp.color,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                {exp.role}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "#A8A29E",
                  marginTop: 4,
                }}
              >
                {exp.domain}
              </div>
            </div>

            {/* Right meta */}
            <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#78716C",
                  whiteSpace: "nowrap",
                }}
              >
                {exp.period}
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 14, color: "#A8A29E", fontFamily: "'DM Sans', sans-serif" }}>
                  📍 {exp.location}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    color: exp.color,
                    background: exp.color + "15",
                    border: `1px solid ${exp.color}25`,
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.06em",
                  }}
                >
                  {exp.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Impact metrics */}
          {exp.highlights && (
            <div
              className={`grid gap-3 mb-6 ${
                exp.highlights.length === 4
                  ? "grid-cols-2 md:grid-cols-4"
                  : "grid-cols-2"
              }`}
            >
              {exp.highlights.map((h, i) => (
                <MetricCard
                  key={h.label}
                  {...h}
                  color={exp.color}
                  index={i}
                  isVisible={inView}
                />
              ))}
            </div>
          )}

          {/* Expandable bullets */}
          <div>
            <button
              onClick={() => setExpanded((p) => !p)}
              className="flex items-center gap-2 mb-4 group"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: exp.color,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                {expanded ? "Hide Details" : "Show Details"}
              </span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: exp.color, fontSize: 14, display: "inline-block" }}
              >
                ↓
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ overflow: "hidden" }}
            >
              <ul className="flex flex-col gap-3 mb-6">
                {exp.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={expanded ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: exp.color,
                        marginTop: 6,
                        flexShrink: 0,
                        boxShadow: `0 0 6px ${exp.color}60`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "#78716C",
                        lineHeight: 1.75,
                      }}
                    >
                      {bullet}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Tech stack */}
          <div
            className="pt-5 flex flex-wrap gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {exp.stack.map((tech) => (
              <StackTag key={tech} name={tech} color={exp.color} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function EducationCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center" style={{ minWidth: 56 }}>
        <motion.div
          className="flex items-center justify-center rounded-2xl z-10 flex-shrink-0"
          style={{
            width: 56,
            height: 56,
            background: `linear-gradient(135deg, ${EDUCATION.color}20, ${EDUCATION.color}08)`,
            border: `2px solid ${EDUCATION.color}40`,
          }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src={EDUCATION.logo}
            alt={EDUCATION.university}
            style={{
                width: 32,
                height: 32,
                objectFit: "contain",
                borderRadius: 6,
                mixBlendMode: "screen",
            }}
            />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 rounded-2xl mb-4 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
          border: `1px solid ${EDUCATION.color}18`,
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div style={{ height: 2, background: `linear-gradient(to right, ${EDUCATION.color}, ${EDUCATION.color}30, transparent)` }} />
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-3 md:hidden">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${EDUCATION.color}20, ${EDUCATION.color}08)`, border: `1px solid ${EDUCATION.color}30` }}
              >
                <img
                src={EDUCATION.logo}
                alt={EDUCATION.university}
                style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                    borderRadius: 6,
                    mixBlendMode: "screen",
                }}
                />
              </div>
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#1C1917" }}>
              {EDUCATION.degree}
            </h3>
            <div style={{ color: EDUCATION.color, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginTop: 4 }}>
              {EDUCATION.field} -{EDUCATION.university}
            </div>
            <div style={{ color: "#A8A29E", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              📍 {EDUCATION.location}
            </div>
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#78716C", flexShrink: 0 }}>
            {EDUCATION.period}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .shimmer-exp {
          background: linear-gradient(90deg, #0D9488 0%, #DC2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        id="work"
        style={{ background: "#FAFAF9", fontFamily: "'DM Sans', sans-serif" }}
        className="relative py-20 overflow-hidden"
      >
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.03) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.03) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* ── Heading ── */}
          <RevealOnScroll>
            <div className="mb-20">
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                  color: "#1C1917",
                  marginTop: 12,
                  lineHeight: 1.1,
                }}
              >
                Where I've{" "}
                <span className="shimmer-exp">made an impact</span>
              </h2>
              <div className="mt-5 h-px w-32"
                style={{ background: "linear-gradient(to right, rgba(20,184,166,0.5), transparent)" }} />
              <p style={{ color: "#A8A29E", fontSize: 16, lineHeight: 1.75, maxWidth: 520, marginTop: 16 }}>
                5+ years across enterprise SaaS and FinTech -building products
                that serve real users at scale.
              </p>
            </div>
          </RevealOnScroll>

          {/* ── Work Timeline ── */}
          <div className="mb-6">
            <RevealOnScroll>
              <p style={{ color: "#D6D3D7", fontSize: 15, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 32 }}>
                Work History
              </p>
            </RevealOnScroll>

            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-12"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />

          {/* ── Education ── */}
          <RevealOnScroll>
            <p style={{ color: "#78716C", fontSize: 15, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 32 }}>
              Education
            </p>
          </RevealOnScroll>

          <EducationCard />

          {/* ── Summary strip ── */}
          <RevealOnScroll delay={0.1}>
            <div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
              }}
            >
              {[
                { value: "5+", label: "Years Total", color: "#14B8A6" },
                { value: "2", label: "Companies", color: "#EA580C" },
                { value: "60+", label: "APIs Integrated", color: "#A78BFA" },
                { value: "99.9%", label: "System Uptime", color: "#34D399" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-8 px-4 text-center"
                  style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 32,
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "#A8A29E", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

        </div>
      </section>
    </>
  );
}