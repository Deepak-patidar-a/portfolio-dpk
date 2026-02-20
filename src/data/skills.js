export const SKILL_CATEGORIES = [
  {
    id: "core",
    label: "Frontend Core",
    color: "#0D9488",        // Teal-700 (deeper, more visible on light bg)
    glow: "rgba(13,148,136,0.12)",
    skills: [
      { name: "React.js", level: 95, icon: "⚛️", highlight: true },
      { name: "JavaScript ES6+", level: 95, icon: "🟨", highlight: true },
      { name: "TypeScript", level: 88, icon: "🔷", highlight: false },
      { name: "HTML5", level: 95, icon: "🌐", highlight: false },
      { name: "CSS3", level: 90, icon: "🎨", highlight: false },
      { name: "Responsive Design", level: 92, icon: "📱", highlight: false },
    ],
  },
  {
    id: "libs",
    label: "Libraries & UI",
    color: "#DC2626",        // Red-600 (warm, strong accent)
    glow: "rgba(220,38,38,0.10)",
    skills: [
      { name: "Redux", level: 88, icon: "🗃️", highlight: true },
      { name: "React Query", level: 85, icon: "🔁", highlight: true },
      { name: "Material UI", level: 90, icon: "🧩", highlight: false },
      { name: "Tailwind CSS", level: 88, icon: "💨", highlight: false },
      { name: "React-Virtualization", level: 80, icon: "⚡", highlight: false },
      { name: "Custom Hooks", level: 90, icon: "🪝", highlight: false },
    ],
  },
  {
    id: "arch",
    label: "Architecture & Design",
    color: "#7C3AED",        // Violet-600 (sophisticated purple)
    glow: "rgba(124,58,237,0.10)",
    skills: [
      { name: "Frontend System Design", level: 88, icon: "🏗️", highlight: true },
      { name: "Component Architecture", level: 92, icon: "🧱", highlight: false },
      { name: "Scalable UI Architecture", level: 85, icon: "📐", highlight: false },
      { name: "API Contract Design", level: 80, icon: "📋", highlight: false },
      { name: "Performance Optimization", level: 88, icon: "🚀", highlight: false },
      { name: "DOM Manipulation", level: 85, icon: "🌳", highlight: false },
    ],
  },
  {
    id: "tools",
    label: "Tools & Practices",
    color: "#059669",        // Emerald-600 (deeper green)
    glow: "rgba(5,150,105,0.10)",
    skills: [
      { name: "Git & GitHub", level: 92, icon: "🐙", highlight: false },
      { name: "Webpack", level: 82, icon: "📦", highlight: false },
      { name: "CI/CD (Jenkins)", level: 75, icon: "⚙️", highlight: false },
      { name: "Agile / Scrum", level: 88, icon: "🔄", highlight: false },
      { name: "Debugging & RCA", level: 90, icon: "🔍", highlight: false },
      { name: "DSA", level: 75, icon: "🧠", highlight: false },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    color: "#DB2777",        // Pink-600 (rich pink, visible on light)
    glow: "rgba(219,39,119,0.10)",
    skills: [
      { name: "Jest", level: 85, icon: "🃏", highlight: true },
      { name: "React Testing Library", level: 82, icon: "🧪", highlight: true },
      { name: "Unit Testing", level: 85, icon: "✅", highlight: false },
    ],
  },
  {
    id: "backend",
    label: "Backend (Supporting)",
    color: "#EA580C",        // Orange-600 (warm, earthy)
    glow: "rgba(234,88,12,0.10)",
    skills: [
      { name: "Node.js", level: 65, icon: "🟢", highlight: false },
      { name: "Express.js", level: 62, icon: "🚂", highlight: false },
      { name: "REST APIs & GraphQL", level: 88, icon: "🔗", highlight: false },
      { name: "SQL / Oracle / PL-SQL", level: 65, icon: "🗄️", highlight: false },
      { name: "TypeORM", level: 60, icon: "🔌", highlight: false },
    ],
  },
];