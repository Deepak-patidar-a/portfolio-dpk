export const PROJECTS = [
  {
    id: "netflix-gpt",
    number: "01",
    title: "Netflix-GPT",
    tagline: "AI-powered movie discovery platform",
    description:
      "Designed and built a scalable React frontend for an AI-powered movie discovery platform. Integrated GPT-4o-mini enabling natural-language search based on user intent, genre, mood, and preferences  -improving content discovery experience (~30% higher interaction during testing).",
    highlights: [
      "LLM-powered natural language movie search using OpenAI GPT-4o-mini.",
      "Scalable component architecture with Redux state management.",
      "Designed frontend-to-LLM data flow and prompt strategy for consistent responses.",
      "Enhanced content discovery experience and interaction during user testing.",
      "Implemented debounced queries, caching, and loading/error states for smooth UX.",
    ],
    stack: ["React", "Redux", "Tailwind CSS", "OpenAI API", "JavaScript"],
    color: "#DC2626",              // Red-600 (instead of Netflix red)
    accentColor: "#DC2626",
    gradient: "linear-gradient(135deg, #FEF2F2 0%, #FAFAF9 60%)",  // Red-50 to stone
    liveUrl: "https://netflixgpt-c225e.web.app",
    githubUrl: "https://github.com/Deepak-patidar-a/netflix-gpt",
    status: "Live",
    featured: true,
    icon: "🎬",
    mockupBg: "linear-gradient(135deg, #FEF2F2, #FEE2E2, #FAFAF9)",  // Red-50 → Red-100 → Stone
  },
  {
    id: "project-2",
    number: "02",
    title: "TradeForge",
    tagline: "Real-time stock trading platform, built from first principles",
    description:
      "A full-stack trading platform inspired by Zerodha  -featuring live candlestick charts rendered on Canvas at 60fps, a real-time order book powered by WebSockets, and an AI trade signal engine using the Claude API. Designed to demonstrate senior-level frontend architecture: off-thread computation via Web Workers, normalized Redux state for surgical re-renders, and a natural language query interface. Fully documented with an interactive architecture plan and a 4-lesson learning path covering every core concept before a single line was written.",
    highlights: [
      "Canvas-based chart renderer at 60fps  -zero DOM nodes, no chart library, pure pixel drawing",
      "WebSocket pipeline with exponential backoff, message queuing, and topic-based subscriptions",
      "Web Workers offload EMA/VWAP calculations off the main thread  -eliminates UI jank entirely",
      "AI trade signals via Claude API with streaming responses, Redis caching, and graceful fallback",
    ],
    stack: ["React 18", "Canvas API", "WebSockets", "Web Workers", "Redux Toolkit", "Node.js", "Finnhub API", "Claude API"],
    color: "#0D9488",              // Teal-700
    accentColor: "#0D9488",
    gradient: "linear-gradient(135deg, #F0FDFA 0%, #FAFAF9 60%)",  // Teal-50 to stone
    liveUrl: "https://tradeforge-hucn3mu5g-deepak-patidars-projects.vercel.app/",
    githubUrl: "https://github.com/Deepak-patidar-a/trade_forge_showcase",
    status: "In Progress 🚧",
    featured: false,  // Changed to false so it shows in the 2-column grid
    icon: "📈",
    mockupBg: "linear-gradient(135deg, #F0FDFA, #CCFBF1, #FAFAF9)",  // Teal-50 → Teal-100 → Stone
  },
  {
    id: "project-3",
    number: "03",
    title: "Another Project",
    tagline: "Add your third project here",
    description:
      "This could be a component library, a dashboard, a design system, or anything you've built that shows your frontend depth. Quality over quantity  -3 strong projects beat 10 mediocre ones.",
    highlights: [
      "Add your key feature or achievement here",
      "Think: performance win, clever architecture, UI challenge",
      "Open source contributions also count here",
      "Link to GitHub repo or live demo",
    ],
    stack: ["React", "Material UI", "Redux", "REST APIs"],
    color: "#EA580C",              // Orange-600
    accentColor: "#EA580C",
    gradient: "linear-gradient(135deg, #FFF7ED 0%, #FAFAF9 60%)",  // Orange-50 to stone
    liveUrl: "#",
    githubUrl: "#",
    status: "Add Link",
    featured: false,
    icon: "⚡",
    mockupBg: "linear-gradient(135deg, #FFF7ED, #FFEDD5, #FAFAF9)",  // Orange-50 → Orange-100 → Stone
  },
];