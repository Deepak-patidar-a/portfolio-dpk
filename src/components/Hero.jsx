import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ROLES = [
  "Frontend Developer",
  "UI Architect",
  "React Specialist",
  "Senior Frontend Engineer",
  "Full Stack Explorer",
];

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-150 h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.04) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#00D4FF"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />
    </div>
  );
}

// Floating particles
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Custom cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    const enterLink = () => setIsHovering(true);
    const leaveLink = () => setIsHovering(false);

    window.addEventListener("mousemove", move);
    document
      .querySelectorAll("a, button")
      .forEach((el) => el.addEventListener("mouseenter", enterLink));
    document
      .querySelectorAll("a, button")
      .forEach((el) => el.addEventListener("mouseleave", leaveLink));

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          width: isHovering ? 32 : 12,
          height: isHovering ? 32 : 12,
          background: "rgba(0,212,255,0.9)",
          boxShadow: "0 0 12px rgba(0,212,255,0.8)",
          transition: "width 0.2s, height 0.2s",
          marginLeft: isHovering ? -10 : 0,
          marginTop: isHovering ? -10 : 0,
        }}
      />
    </>
  );
}

// Typewriter role component
function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;
    const current = ROLES[roleIndex];

    if (!deleting && displayed === current) {
      setTimeout(() => setPause(false) || setDeleting(true), 2000);
      setPause(true);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayed((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, pause]);

  return (
    <span className="text-cyan-400">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 align-middle"
      />
    </span>
  );
}

// Stat counter
function StatCounter({ value, label, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const step = () => {
        start += 1;
        setCount(start);
        if (start < value) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 + 1.5 }}
    >
      <div className="text-3xl font-bold text-white font-display">
        {count}
        <span className="text-cyan-400">+</span>
      </div>
      <div className="text-xs text-gray-500 mt-1 tracking-widest uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { cursor: none !important; }
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .text-shimmer {
          background: linear-gradient(90deg, #ffffff 0%, #00D4FF 40%, #ffffff 60%, #FFB800 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        .btn-primary {
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        .btn-primary:hover::before { left: 100%; }
      `}</style>

      <CustomCursor />

      <section
        className="font-body relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
        style={{ background: "#0A0A0F" }}
      >
        <GridBackground />
        <Particles />

        {/* Navbar */}
        <motion.nav
          className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-50 border-b border-white/5 backdrop-blur-md"
          style={{ background: "rgba(10,10,15,0.85)" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-display font-bold text-white text-xl tracking-tight">
            <span className="text-cyan-400">&lt;</span>
            YN
            <span className="text-cyan-400">/&gt;</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-body">
            {["About", "Skills", "Work", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-cyan-400 transition-colors duration-200 tracking-wide"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <motion.a
            href="/resume.pdf"
            download
            className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 px-4 py-2 rounded hover:bg-cyan-400/10 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
          >
            Resume ↓
          </motion.a>
        </motion.nav>

        {/* Main content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 md:pt-0">

          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 mt-4 mb-8 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-gray-400 tracking-widest uppercase font-body">
              Open to Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="font-display font-extrabold leading-none mb-2">
              <span
                className="text-shimmer"
                style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
              >
                Deepak Patidar
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            className="font-display text-2xl md:text-3xl font-semibold mb-6 h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TypewriterRole />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="font-body text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            I build{" "}
            <span className="text-white font-medium">fast, scalable</span> and{" "}
            <span className="text-white font-medium">beautiful</span> web
            products - currently crafting supply chain interfaces at{" "}
            <span className="text-cyan-400 font-medium">Blue Yonder</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.a
              href="#projects"
              className="btn-primary font-display font-semibold tracking-wider uppercase text-sm px-8 py-4 rounded-lg text-[#0A0A0F]"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #0099BB)",
                boxShadow: "0 0 30px rgba(0,212,255,0.3)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(0,212,255,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work →
            </motion.a>

            <motion.a
              href="#contact"
              className="font-display font-semibold tracking-wider uppercase text-sm px-8 py-4 rounded-lg text-white border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Talk
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex items-center justify-center gap-12 md:gap-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <StatCounter value={5} label="Years Exp." delay={200} />
            <div className="w-px h-10 bg-white/10" />
            <StatCounter value={20} label="Projects" delay={400} />
            <div className="w-px h-10 bg-white/10" />
            <StatCounter value={8} label="Tech Stack" delay={600} />
            <div className="w-px h-10 bg-white/10" />
            <StatCounter value={2} label="Companies" delay={800} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs text-gray-600 tracking-widest uppercase font-body">
            Scroll
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-cyan-400/60 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-30">
          <div className="absolute top-6 left-6 w-8 h-px bg-cyan-400" />
          <div className="absolute top-6 left-6 w-px h-8 bg-cyan-400" />
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-30">
          <div className="absolute bottom-6 right-6 w-8 h-px bg-cyan-400" />
          <div className="absolute bottom-6 right-6 w-px h-8 bg-cyan-400" />
        </div>
      </section>
    </>
  );
}