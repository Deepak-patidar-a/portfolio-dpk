import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../data/projects";

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

// Browser mockup for project visual
function BrowserMockup({ project, isVisible }) {
  return (
    <motion.div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: project.mockupBg,
        border: `1px solid ${project.color}25`,
        boxShadow: `0 24px 80px ${project.color}15, 0 0 0 1px ${project.color}10`,
        aspectRatio: "16/10",
      }}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      whileHover={{ scale: 1.02, boxShadow: `0 32px 100px ${project.color}25` }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.4)",
          borderBottom: `1px solid ${project.color}15`,
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        </div>
        {/* URL bar */}
        <div
          className="flex-1 mx-4 px-3 py-1 rounded-md flex items-center gap-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: project.color, opacity: 0.6 }} />
          <span style={{ fontSize: 10, color: "#A8A29E", fontFamily: "'DM Sans', sans-serif" }}>
            {project.liveUrl.replace("https://", "")}
          </span>
        </div>
      </div>

      {/* Mockup content */}
      <div
        className="relative flex flex-col items-center justify-center"
        style={{ minHeight: 180, padding: "32px 24px" }}
      >
        {/* Decorative animated grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, ${project.color} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Glow orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Project icon */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: 72,
              height: 72,
              background: `linear-gradient(135deg, ${project.color}25, ${project.color}08)`,
              border: `2px solid ${project.color}35`,
              fontSize: 36,
            }}
          >
            {project.icon}
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#1C1917",
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </div>
            <div style={{ color: project.color, fontSize: 12, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>
              {project.tagline}
            </div>
          </div>
        </motion.div>

        {/* Stack pill strip */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: 10,
                color: project.color + "AA",
                background: project.color + "10",
                border: `1px solid ${project.color}20`,
                borderRadius: 20,
                padding: "2px 10px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Featured large project card
function FeaturedCard({ project }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-3xl overflow-hidden mb-6"
      style={{
        background: project.gradient,
        border: `1px solid ${project.color}20`,
        boxShadow: hovered ? `0 0 80px ${project.color}15` : "none",
        transition: "box-shadow 0.4s",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top colour line */}
      <div style={{ height: 3, background: `linear-gradient(to right, ${project.color}, ${project.color}50, transparent)` }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left — content */}
        <div className="p-8 md:p-12 flex flex-col justify-between gap-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: project.color,
                  opacity: 0.7,
                }}
              >
                {project.number}
              </span>
              <div style={{ flex: 1, height: 1, background: `${project.color}25` }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: project.status === "Live" ? "#34D399" : "#A8A29E",
                  background: project.status === "Live" ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${project.status === "Live" ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 20,
                  padding: "3px 12px",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {project.status === "Live" && (
                  <motion.span
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }}
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                {project.status}
              </span>
            </div>

            <motion.h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#1C1917",
                lineHeight: 1.05,
                marginBottom: 12,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              style={{
                color: "#78716C",
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.description}
            </motion.p>

            {/* Highlights */}
            <ul className="flex flex-col gap-3 mb-6">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: project.color,
                      marginTop: 7,
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${project.color}80`,
                    }}
                  />
                  <span style={{ color: "#78716C", fontSize: 14, lineHeight: 1.7 }}>{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Stack + CTAs */}
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: 12,
                    color: project.color + "CC",
                    background: project.color + "12",
                    border: `1px solid ${project.color}25`,
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "12px 28px",
                  borderRadius: 10,
                  color: "#FAFAF9",
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}BB)`,
                  boxShadow: `0 0 24px ${project.color}30`,
                  display: "inline-block",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${project.color}50` }}
                whileTap={{ scale: 0.97 }}
              >
                Live Demo ↗
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "12px 28px",
                  borderRadius: 10,
                  color: "#1C1917",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  display: "inline-block",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.05, borderColor: project.color + "50", background: project.color + "08" }}
                whileTap={{ scale: 0.97 }}
              >
                GitHub →
              </motion.a>
            </div>
          </div>
        </div>

        {/* Right — Mockup */}
        <div className="p-8 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <BrowserMockup project={project} isVisible={inView} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Smaller project card
function SmallCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: project.gradient,
        border: `1px solid ${hovered ? project.color + "35" : project.color + "15"}`,
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? `0 0 40px ${project.color}10` : "none",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Top colour line */}
      <div style={{ height: 2, background: `linear-gradient(to right, ${project.color}, ${project.color}40, transparent)` }} />

      {/* Mini mockup */}
      <div className="px-6 pt-6">
        <BrowserMockup project={project} isVisible={inView} />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: project.color,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              opacity: 0.7,
            }}
          >
            {project.number}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "#A8A29E",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: "2px 10px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {project.status}
          </span>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#1C1917",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            {project.title}
          </h3>
          <p style={{ color: "#A8A29E", fontSize: 14, lineHeight: 1.7 }}>
            {project.description.slice(0, 120)}...
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: 11,
                color: project.color + "BB",
                background: project.color + "10",
                border: `1px solid ${project.color}20`,
                borderRadius: 6,
                padding: "3px 10px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-auto pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 0",
              borderRadius: 8,
              color: "#FAFAF9",
              background: `linear-gradient(135deg, ${project.color}, ${project.color}BB)`,
              textDecoration: "none",
              display: "block",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Live ↗
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 0",
              borderRadius: 8,
              color: "#1C1917",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
              textDecoration: "none",
              display: "block",
            }}
            whileHover={{ scale: 1.04, borderColor: project.color + "40" }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub →
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .shimmer-projects {
          background: linear-gradient(90deg, #14B8A6 0%, #EA580C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        id="projects"
        style={{ background: "#FAFAF9", fontFamily: "'DM Sans', sans-serif" }}
        className="relative py-20 overflow-hidden"
      >
        {/* Background blobs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229,9,20,0.03) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.03) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* ── Heading ── */}
          <RevealOnScroll>
            <div className="mb-16">
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
                Things I've{" "}
                <span className="shimmer-projects">built & shipped</span>
              </h2>
              <div
                className="mt-5 h-px w-32"
                style={{ background: "linear-gradient(to right, rgba(20,184,166,0.5), transparent)" }}
              />
              <p style={{ color: "#A8A29E", fontSize: 16, lineHeight: 1.75, maxWidth: 520, marginTop: 16 }}>
                From AI-powered platforms to enterprise UI systems — projects
                that solve real problems and push the frontend craft.
              </p>
            </div>
          </RevealOnScroll>

          {/* ── Featured Project ── */}
          <RevealOnScroll delay={0.05}>
            <p style={{ color: "#D6D3D1", fontSize: 15, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 20 }}>
              Featured Project
            </p>
          </RevealOnScroll>

          {featured.map((project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}

          {/* ── Other Projects ── */}
          <RevealOnScroll delay={0.05}>
            <p style={{ color: "#D6D3D1", fontSize: 15, letterSpacing: "0.35em", textTransform: "uppercase", marginTop: 48, marginBottom: 24 }}>
              More Projects
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((project, i) => (
              <SmallCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* ── GitHub CTA ── */}
          <RevealOnScroll delay={0.1}>
            <div
              className="mt-16 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    color: "#1C1917",
                    marginBottom: 8,
                  }}
                >
                  Want to see more?
                </div>
                <div style={{ color: "#A8A29E", fontSize: 15, lineHeight: 1.6 }}>
                  Check out my GitHub for experiments, open source contributions,<br className="hidden md:block" />
                  and other things I build when exploring new ideas.
                </div>
              </div>
              <motion.a
                href="https://github.com/Deepak-patidar-a?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "14px 32px",
                  borderRadius: 10,
                  color: "#1C1917",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                  display: "inline-block",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(20,184,166,0.4)",
                  background: "rgba(20,184,166,0.06)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                View GitHub Profile →
              </motion.a>
            </div>
          </RevealOnScroll>

        </div>
      </section>
    </>
  );
}