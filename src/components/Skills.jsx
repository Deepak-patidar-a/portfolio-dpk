import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_CATEGORIES } from "../data/skills";



// Proficiency bar label
function proficiencyLabel(level) {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 60) return "Proficient";
  return "Familiar";
}

// ─── Components ──────────────────────────────────────────────────────────────

function RevealOnScroll({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Individual skill row inside a category card
function SkillRow({ skill, color, index, isVisible }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -16 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 16 }}>{skill.icon}</span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: skill.highlight ? "#1C1917" : "#57534E",
              fontWeight: skill.highlight ? 600 : 400,
            }}
          >
            {skill.name}
          </span>
          {skill.highlight && (
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color,
                border: `1px solid ${color}40`,
                borderRadius: 4,
                padding: "1px 6px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Primary
            </span>
          )}
        </div>
        <span style={{ fontSize: 11, color: "#A8A29E", fontFamily: "'DM Sans', sans-serif" }}>
          {proficiencyLabel(skill.level)}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 4,
          borderRadius: 999,
          background: "rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${color}CC, ${color}66)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: index * 0.07 + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </motion.div>
  );
}

// Category card
function CategoryCard({ category, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl p-7 flex flex-col gap-6"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: `1px solid ${hovered ? category.color + "30" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color 0.3s",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Hover glow top */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${category.color}80, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card header */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: category.color,
            boxShadow: `0 0 10px ${category.color}`,
            flexShrink: 0,
          }}
        />
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#1C1917",
            letterSpacing: "0.02em",
          }}
        >
          {category.label}
        </h3>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: category.color,
            fontFamily: "'DM Sans', sans-serif",
            opacity: 0.8,
          }}
        >
          {category.skills.length} skills
        </span>
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-5">
        {category.skills.map((skill, i) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            color={category.color}
            index={i}
            isVisible={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Floating marquee of skill tags at the bottom
function SkillMarquee() {
  const allSkills = SKILL_CATEGORIES.flatMap((c) =>
    c.skills.map((s) => ({ name: s.name, color: c.color }))
  );
  const doubled = [...allSkills, ...allSkills];

  return (
    <div className="relative overflow-hidden py-4" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
            style={{
              background: `${skill.color}10`,
              border: `1px solid ${skill.color}25`,
              fontSize: 13,
              color: "#78716C",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: skill.color,
                opacity: 0.7,
              }}
            />
            {skill.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .shimmer-skills {
          background: linear-gradient(90deg, #0D9488 0%, #DC2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        id="skills"
        style={{ background: "#FAFAF9", fontFamily: "'DM Sans', sans-serif" }}
        className="relative py-20 overflow-hidden"
      >
        {/* Background blobs */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(20,184,166,0.03) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* ── Heading ── */}
          <RevealOnScroll>
            <div className="mb-6">
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
                What I bring{" "}
                <span className="shimmer-skills">to the table</span>
              </h2>
              <div
                className="mt-5 h-px w-32"
                style={{ background: "linear-gradient(to right, rgba(20,184,166,0.5), transparent)" }}
              />
            </div>
          </RevealOnScroll>

          {/* Subheading */}
          <RevealOnScroll delay={0.1}>
            <p
              style={{
                color: "#A8A29E",
                fontSize: 16,
                lineHeight: 1.75,
                maxWidth: 560,
                marginBottom: 56,
              }}
            >
              5+ years of hands-on experience across the full frontend stack -
              from pixel-perfect UI to scalable architecture and reliable testing.
            </p>
          </RevealOnScroll>

          {/* ── Skill Cards Grid ── */}
          {/* Row 1 -3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {SKILL_CATEGORIES.slice(0, 3).map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} delay={i * 0.1} />
            ))}
          </div>

          {/* Row 2 -3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {SKILL_CATEGORIES.slice(3).map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} delay={i * 0.1} />
            ))}
          </div>

          {/* ── Divider ── */}
          <div
            className="w-full h-px mb-10"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }}
          />

          {/* ── Marquee ── */}
          <RevealOnScroll delay={0.1}>
            <p
              style={{
                color: "#A8A29E",
                fontSize: 15,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Full stack at a glance
            </p>
          </RevealOnScroll>
          <SkillMarquee />

          {/* ── Bottom stat strip ── */}
          <RevealOnScroll delay={0.15}>
            <div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
              }}
            >
              {[
                { value: "5+", label: "Years Experience", color: "#14B8A6" },
                { value: "20+", label: "Projects Shipped", color: "#EA580C" },
                { value: "2", label: "Frameworks Expert", color: "#A78BFA" },
                { value: "8+", label: "Tools Mastered", color: "#34D399" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-8 px-4 text-center"
                  style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 36,
                      color: stat.color,
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: "#A8A29E",
                      fontSize: 12,
                      letterSpacing: "0.05em",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
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