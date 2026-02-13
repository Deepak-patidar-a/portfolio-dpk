import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function RevealOnScroll({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PhotoCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-72 h-72 md:w-96 md:h-96"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="absolute -inset-3 rounded-3xl opacity-40"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.3), transparent 50%, rgba(255,184,0,0.2))",
          filter: "blur(12px)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main photo area */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10"
        style={{ background: "linear-gradient(145deg, #0D1B2A, #0A0A0F)" }}
      >
        {/* Replace this block with your actual photo:
            <img src="/your-photo.jpg" alt="Deepak Patidar" className="w-full h-full object-cover" />
        */}
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div
            className="w-24 h-24 rounded-full border-2 border-cyan-400/40 flex items-center justify-center"
            style={{ background: "rgba(0,212,255,0.05)" }}
          >
            <span className="font-display font-bold text-3xl text-cyan-400">DP</span>
          </div>
          <span className="text-gray-600 text-sm font-body tracking-wider">Replace with your photo</span>
        </div>

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #00D4FF, transparent)" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Corner brackets */}
      <div className="absolute -top-1 -left-1 w-6 h-6">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400" />
        <div className="absolute top-0 left-0 w-[2px] h-full bg-cyan-400" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-yellow-400/70" />
        <div className="absolute bottom-0 right-0 w-[2px] h-full bg-yellow-400/70" />
      </div>

      {/* Badge — experience */}
      <motion.div
        className="absolute -bottom-6 -right-6 px-5 py-4 rounded-2xl border border-cyan-400/30 backdrop-blur-sm"
        style={{ background: "rgba(13,27,42,0.95)", boxShadow: "0 0 25px rgba(0,212,255,0.12)" }}
        initial={{ opacity: 0, scale: 0, rotate: -10 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="font-display font-extrabold text-3xl text-cyan-400 leading-none">5+</div>
        <div className="text-[11px] text-gray-400 tracking-widest uppercase mt-1 font-body">Years Exp.</div>
      </motion.div>

      {/* Badge — stack */}
      <motion.div
        className="absolute -top-6 -right-6 px-5 py-4 rounded-2xl border border-yellow-400/20 backdrop-blur-sm"
        style={{ background: "rgba(13,27,42,0.95)", boxShadow: "0 0 25px rgba(255,184,0,0.06)" }}
        initial={{ opacity: 0, scale: 0, rotate: 10 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="font-display font-bold text-xl text-yellow-400/90 leading-none">React</div>
        <div className="text-[11px] text-gray-400 tracking-widest uppercase mt-1 font-body">+ Node</div>
      </motion.div>
    </motion.div>
  );
}

function TraitCard({ icon, title, desc, delay, accent = "cyan" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const accentColor =
    accent === "cyan"
      ? { border: "rgba(0,212,255,0.15)", glow: "rgba(0,212,255,0.06)", line: "#00D4FF" }
      : { border: "rgba(255,184,0,0.15)", glow: "rgba(255,184,0,0.06)", line: "#FFB800" };

  return (
    <motion.div
      ref={ref}
      className="group relative p-7 rounded-2xl border transition-all duration-300 cursor-default overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -6, borderColor: accentColor.border, background: "rgba(255,255,255,0.04)" }}
    >
      {/* Icon box */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{ background: accentColor.glow, border: `1px solid ${accentColor.border}` }}
      >
        {icon}
      </div>

      <h3 className="font-display font-bold text-white text-xl mb-3">{title}</h3>
      <p className="font-body text-gray-400 text-sm leading-relaxed">{desc}</p>

      {/* Hover bottom line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor.line}, transparent)` }}
      />
    </motion.div>
  );
}

const TRAITS = [
  {
    icon: "⚡",
    title: "Performance First",
    desc: "I obsess over bundle sizes, render cycles, lazy loading, and Core Web Vitals. Speed is a feature, not an afterthought.",
    accent: "cyan",
  },
  {
    icon: "🎨",
    title: "Design Sensibility",
    desc: "I care deeply about pixels, spacing, motion, and the emotional feel of every UI I ship to production.",
    accent: "yellow",
  },
  {
    icon: "🔧",
    title: "Full-Stack Aware",
    desc: "Backend exposure at Blue Yonder means I understand APIs, data flow, and how to build smarter frontends.",
    accent: "cyan",
  },
  {
    icon: "📐",
    title: "System Thinker",
    desc: "I architect components, design systems, and scalable patterns not just one-off screens.",
    accent: "yellow",
  },
];

const INFO_ITEMS = [
  { icon: "📍", title: "Based in India", sub: "Open to Bangalore · Hyderabad · Pune · Noida" },
  { icon: "🏢", title: "Blue Yonder", sub: "Global Supply Chain SaaS · Frontend Dev" },
  { icon: "🟢", title: "Notice Period", sub: "Immediate to 60 days" },
  { icon: "💬", title: "Languages", sub: "English · Hindi" },
];

export default function About() {
  return (
    <>
      <style>{`
        .about-shimmer {
          background: linear-gradient(90deg, #00D4FF, #FFB800);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        id="about"
        className="font-body relative bg-[#0A0A0F] py-25 overflow-hidden"
      >
        {/* Background blobs */}
        <div
          className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.035) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,184,0,0.03) 0%, transparent 65%)" }}
        />

        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Section header */}
          <RevealOnScroll>
            <div className="mb-20">
              <h2 className="font-display font-extrabold text-5xl md:text-6xl text-white leading-tight">
                The person behind{" "}
                <span className="about-shimmer">the code</span>
              </h2>
              <div className="mt-5 h-px w-32 bg-gradient-to-r from-cyan-400/60 to-transparent" />
            </div>
          </RevealOnScroll>

          {/* Two column: photo + story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-28">

            {/* Photo */}
            <RevealOnScroll direction="right">
              <div className="flex justify-center lg:justify-start lg:pl-8">
                <PhotoCard />
              </div>
            </RevealOnScroll>

            {/* Story */}
            <div className="flex flex-col gap-6">
              <RevealOnScroll delay={0.1}>
                <p className="text-gray-200 text-xl leading-relaxed">
                  Hey, I'm{" "}
                  <span className="text-white font-semibold font-display">Deepak Patidar</span>{" "}
                  - a Frontend Developer with{" "}
                  <span className="text-cyan-400 font-medium">5+ years of experience</span>{" "}
                  building fast, polished, and scalable web applications.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p className="text-gray-400 text-base leading-relaxed">
                  Currently at{" "}
                  <span className="text-white font-medium">Blue Yonder</span>, a global supply
                  chain SaaS company, where I architect complex UI systems used by enterprises
                  worldwide. My stack spans React, TypeScript, Javascript, Redux, REST API's, Tailwind CSS - and I also handle basic
                  backend integrations, giving me a complete picture of how products are built
                  end to end.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p className="text-gray-400 text-base leading-relaxed">
                  I believe great frontend is equal parts{" "}
                  <span className="text-white font-medium">engineering discipline</span> and{" "}
                  <span className="text-white font-medium">design sensibility</span>. I don't
                  just make things work - I make them feel right too.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <p className="text-gray-400 text-base leading-relaxed">
                  Outside of work I explore UI patterns, build side projects, and stay sharp on
                  emerging frontend tooling. I'm currently{" "}
                  <span className="text-emerald-400 font-medium">open to new opportunities</span>{" "}
                  across Bangalore, Hyderabad, Pune, and Noida.
                </p>
              </RevealOnScroll>

              {/* CTAs */}
              <RevealOnScroll delay={0.5}>
                <div className="flex flex-wrap gap-4 pt-3">
                  <motion.a
                    href="#contact"
                    className="font-display font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-xl text-[#0A0A0F]"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #0099BB)",
                      boxShadow: "0 0 24px rgba(0,212,255,0.25)",
                    }}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(0,212,255,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Hire Me
                  </motion.a>
                  <motion.a
                    href="/resume.pdf"
                    download
                    className="font-display font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-xl text-white border border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Download CV ↓
                  </motion.a>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-20" />

          {/* Trait cards */}
          <RevealOnScroll>
            <p className="text-lg tracking-[0.35em] uppercase text-gray-500 font-body mb-8 text-center">
              What defines my work
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {TRAITS.map((trait, i) => (
              <TraitCard key={trait.title} {...trait} delay={i * 0.1} />
            ))}
          </div>

          {/* Info strip */}
          <RevealOnScroll delay={0.1}>
            <div
              className="rounded-2xl border border-white/6 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {INFO_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: "rgba(0,212,255,0.06)",
                      border: "1px solid rgba(0,212,255,0.12)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white text-base">{item.title}</div>
                    <div className="font-body text-gray-500 text-sm mt-1 leading-relaxed">{item.sub}</div>
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