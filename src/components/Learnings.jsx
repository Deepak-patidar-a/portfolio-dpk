import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COURSES , BLOG_PLACEHOLDERS } from "../data/common";

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

function CourseCard({ course, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
        border: `1px solid ${course.color}20`,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -5, borderColor: course.color + "40" }}
    >
      {/* Top colour bar */}
      <div style={{ height: 3, background: `linear-gradient(to right, ${course.color}, ${course.color}50, transparent)` }} />

      <div className="p-7 flex flex-col gap-5 flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{
                width: 48,
                height: 48,
                background: `linear-gradient(135deg, ${course.color}20, ${course.color}08)`,
                border: `1px solid ${course.color}30`,
                fontSize: 24,
              }}
            >
              {course.icon}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#fff", lineHeight: 1.2 }}>
                {course.title}
              </h3>
              <div style={{ color: "#6B7280", fontSize: 12, marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>
                by {course.instructor} · {course.platform}
              </div>
            </div>
          </div>

          {/* Status badge */}
          <span
            className="flex-shrink-0 flex items-center gap-1.5"
            style={{
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: course.status === "Completed" ? "#34D399" : course.color,
              background: course.status === "Completed" ? "rgba(52,211,153,0.1)" : `${course.color}12`,
              border: `1px solid ${course.status === "Completed" ? "rgba(52,211,153,0.25)" : course.color + "30"}`,
              borderRadius: 20,
              padding: "4px 10px",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {course.status === "Completed" ? (
              <motion.span
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }}
              />
            ) : (
              <motion.span
                style={{ width: 6, height: 6, borderRadius: "50%", background: course.color, display: "inline-block" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            {course.status}
          </span>
        </div>

        {/* Description */}
        <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
          {course.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-col gap-2">
          {course.highlights.map((h, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: index * 0.12 + i * 0.07 }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: course.color,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${course.color}60`,
                }}
              />
              <span style={{ color: "#6B7280", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                {h}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {course.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                color: course.color + "CC",
                background: course.color + "10",
                border: `1px solid ${course.color}20`,
                borderRadius: 6,
                padding: "3px 10px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BlogCard({ post, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.07)",
        cursor: "default",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -4, borderColor: post.color + "30" }}
    >
      {/* Coming soon overlay badge */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: post.color,
            background: post.color + "12",
            border: `1px solid ${post.color}25`,
            borderRadius: 20,
            padding: "3px 10px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {post.tag}
        </span>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#4B5563",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✍ Coming Soon
        </span>
      </div>

      {/* Title */}
      <h4
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: "#E5E7EB",
          lineHeight: 1.5,
        }}
      >
        {post.title}
      </h4>

      {/* Excerpt */}
      <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        {post.excerpt}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span style={{ color: "#4B5563", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
          {post.readTime}
        </span>
        <span
          style={{
            fontSize: 11,
            color: "#4B5563",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          Medium →
        </span>
      </div>

      {/* Left accent on hover */}
      <div
        className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: post.color }}
      />
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Learnings() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .shimmer-growth {
          background: linear-gradient(90deg, #818CF8 0%, #FFB800 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        id="learnings"
        style={{ background: "#0A0A0F", fontFamily: "'DM Sans', sans-serif" }}
        className="relative py-20 overflow-hidden"
      >
        {/* Background blobs — indigo toned */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,184,0,0.03) 0%, transparent 70%)" }}
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
                  color: "#fff",
                  marginTop: 12,
                  lineHeight: 1.1,
                }}
              >
                Never stop{" "}
                <span className="shimmer-growth">learning</span>
              </h2>
              <div className="mt-5 h-px w-32"
                style={{ background: "linear-gradient(to right, rgba(129,140,248,0.5), transparent)" }} />
              <p style={{ color: "#6B7280", fontSize: 16, lineHeight: 1.75, maxWidth: 540, marginTop: 16 }}>
                5+ years in industry and still deepening the fundamentals.
                Great engineers never stop going back to first principles.
              </p>
            </div>
          </RevealOnScroll>

          {/* ── NamasteDev Courses ── */}
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <p style={{ color: "#4B5563", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>
                Structured Learning · NamasteDev
              </p>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <motion.a
                href="https://namastedev.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 11,
                  color: "#818CF8",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  opacity: 0.8,
                }}
                whileHover={{ opacity: 1 }}
              >
                namastedev.com ↗
              </motion.a>
            </div>
          </RevealOnScroll>

          {/* Course cards — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {COURSES.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-16"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />

          {/* ── Blog Section ── */}
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <p style={{ color: "#4B5563", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>
                Writing · Coming to Medium
              </p>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span
                style={{
                  fontSize: 10,
                  color: "#FFB800",
                  background: "rgba(255,184,0,0.1)",
                  border: "1px solid rgba(255,184,0,0.2)",
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                In Progress
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.75, maxWidth: 560, marginBottom: 32 }}>
              Real war stories from enterprise frontend development —
              not tutorials, but lessons learned the hard way building
              production systems at scale.
            </p>
          </RevealOnScroll>

          {/* Blog cards — 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {BLOG_PLACEHOLDERS.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* ── Bottom CTA strip ── */}
          <RevealOnScroll delay={0.1}>
            <div
              className="rounded-2xl p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              style={{
                background: "linear-gradient(135deg, rgba(129,140,248,0.06), rgba(255,184,0,0.03))",
                border: "1px solid rgba(129,140,248,0.15)",
              }}
            >
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 6 }}>
                  Learning never stops 🧠
                </div>
                <div style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, maxWidth: 420 }}>
                  Currently deepening expertise in Frontend System Design —
                  the architecture layer that separates good engineers
                  from great ones.
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.a
                  href="https://namastedev.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "12px 24px",
                    borderRadius: 10,
                    color: "#0A0A0F",
                    background: "linear-gradient(135deg, #818CF8, #6366F1)",
                    boxShadow: "0 0 24px rgba(129,140,248,0.25)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(129,140,248,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  NamasteDev ↗
                </motion.a>
                <motion.a
                  href="https://medium.com/@deepakpatidar"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "12px 24px",
                    borderRadius: 10,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(129,140,248,0.4)", background: "rgba(129,140,248,0.06)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Follow on Medium →
                </motion.a>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </section>
    </>
  );
}