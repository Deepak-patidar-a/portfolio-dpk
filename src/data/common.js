export const CONTACT_LINKS = [
  {
    label: "Email",
    value: "deepakpatidar796@gmail.com",
    href: "mailto:deepakpatidar796@gmail.com",
    icon: "✉️",
    color: "#818CF8",
    copyable: true,
  },
  {
    label: "Phone",
    value: "+91 89592 28019",
    href: "tel:+918959228019",
    icon: "📱",
    color: "#34D399",
    copyable: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/deepak-patidar-react",
    href: "https://linkedin.com/in/deepak-patidar-react",
    icon: "💼",
    color: "#0A66C2",
    copyable: false,
  },
  {
    label: "GitHub",
    value: "github.com/Deepak-patidar-a",
    href: "https://github.com/Deepak-patidar-a",
    icon: "🐙",
    color: "#A78BFA",
    copyable: false,
  },
];

export const AVAILABILITY = [
  { label: "Status", value: "Open to Opportunities", color: "#34D399" },
  { label: "Notice Period", value: "Immediate – 60 days", color: "#818CF8" },
  { label: "Preferred Locations", value: "Bangalore · Hyderabad · Pune · Noida", color: "#FFB800" },
  { label: "Work Type", value: "Full-time · On-site or Hybrid", color: "#A78BFA" },
];

export const ROLES = [
  "Frontend Developer",
  "UI Architect",
  "React Specialist",
  "Senior Frontend Engineer",
  "Full Stack Explorer",
];

export const COURSES = [
  {
    id: "namaste-react",
    title: "Namaste React",
    platform: "NamasteDev",
    instructor: "Akshay Saini",
    status: "Completed",
    color: "#818CF8",
    icon: "⚛️",
    description:
      "Deep dive into React internals — reconciliation, fiber architecture, custom hooks, performance patterns, and building production-grade component systems.",
    tags: ["React Internals", "Custom Hooks", "Performance", "Component Architecture", "State Management"],
    highlights: [
      "React Fiber & reconciliation algorithm",
      "Advanced custom hook patterns",
      "Code splitting & lazy loading",
      "Production performance optimization",
    ],
    url: "https://namastedev.com",
  },
  {
    id: "namaste-js",
    title: "Namaste JavaScript",
    platform: "NamasteDev",
    instructor: "Akshay Saini",
    status: "Completed",
    color: "#FFB800",
    icon: "🟨",
    description:
      "JavaScript the hard way — closures, prototypes, event loop, async/await internals, and the deeper mechanics that most developers never truly understand.",
    tags: ["Closures", "Event Loop", "Prototypes", "Async/Await", "Hoisting"],
    highlights: [
      "Execution context & call stack",
      "Closure & lexical scoping deep dive",
      "Event loop, micro & macro tasks",
      "Prototype chain & inheritance",
    ],
    url: "https://namastedev.com",
  },
  {
    id: "namaste-fsd",
    title: "Namaste Frontend System Design",
    platform: "NamasteDev",
    instructor: "Akshay Saini",
    status: "In Progress",
    color: "#34D399",
    icon: "🏗️",
    description:
      "Architecting frontend systems at scale — design patterns, component libraries, micro-frontends, API design, caching strategies, and performance at enterprise level.",
    tags: ["System Design", "Micro-frontends", "Design Patterns", "Scalability", "Architecture"],
    highlights: [
      "Scalable component architecture",
      "Micro-frontend design patterns",
      "API design & caching strategies",
      "Frontend performance at scale",
    ],
    url: "https://namastedev.com",
  },
];

export const BLOG_PLACEHOLDERS = [
  {
    id: 1,
    title: "How I integrated 60+ REST APIs in a React enterprise app without losing my mind",
    excerpt: "Lessons from building the Competitive Pricing Module at Blue Yonder — API contracts, io-ts validation, and error handling at scale.",
    tag: "React · Architecture",
    readTime: "8 min read",
    color: "#818CF8",
    status: "coming-soon",
  },
  {
    id: 2,
    title: "Memoization in React — when it actually helps and when it hurts",
    excerpt: "Real performance wins and surprising anti-patterns I discovered while optimising high-traffic enterprise tables with 15+ attributes per row.",
    tag: "React · Performance",
    readTime: "6 min read",
    color: "#FFB800",
    status: "coming-soon",
  },
  {
    id: 3,
    title: "Frontend RCA — how I debugged 40+ production issues and reached 99.9% uptime",
    excerpt: "A practical guide to systematic root cause analysis in frontend systems — tools, mindset, and the process that actually works.",
    tag: "Debugging · Production",
    readTime: "10 min read",
    color: "#34D399",
    status: "coming-soon",
  },
  {
    id: 4,
    title: "Building a design system for enterprise React apps — what nobody tells you",
    excerpt: "Lessons from creating reusable component libraries used across 20+ screens in a global supply chain SaaS product.",
    tag: "Design Systems · React",
    readTime: "7 min read",
    color: "#F472B6",
    status: "coming-soon",
  },
];