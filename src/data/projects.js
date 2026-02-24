export const PROJECTS = [
  {
    id: "fasal-mitra",
    number: "01",
    title: "Fasal Mitra",
    tagline: "Multilingual agriculture platform for Indian farmers",
    description:
      "A full-stack agriculture platform serving Indian farmers with AI-powered crop disease identification, live mandi price tracking, real-time expert consultation, and secure e-commerce for fertilizers and pesticides. Built with bilingual support (English/Hindi) to maximize accessibility across rural India.",
    highlights: [
      "AI-powered plant disease diagnosis using Hugging Face inference API with TensorFlow",
      "Real-time expert consultation system via Socket.io with crop-specific chat rooms and live typing indicators",
      "Secure JWT authentication with access/refresh token rotation using HTTP-only cookies",
      "Integrated Razorpay payment gateway with server-side signature verification for e-commerce",
      "Live mandi prices and location-based irrigation alerts via OpenWeatherMap and Data.gov.in APIs",
      "Multilingual interface (English/Hindi) for rural farmer accessibility",
    ],
    stack: ["React", "Node.js", "TypeScript", "MongoDB", "Socket.io", "TensorFlow", "Hugging Face API", "Razorpay"],
    color: "#059669",              
    accentColor: "#059669",
    gradient: "linear-gradient(135deg, #ECFDF5 0%, #FAFAF9 60%)", 
    liveUrl: "https://fasal-mitra-kappa.vercel.app",  
    githubUrl: "https://github.com/Deepak-patidar-a/fasal-mitra", 
    status: "Live", 
    featured: true, 
    icon: "🌾",
    mockupBg: "linear-gradient(135deg, #ECFDF5, #D1FAE5, #FAFAF9)", 
  },
  {
    id: "netflix-gpt",
    number: "02",
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
    id: "trade-forge",
    number: "03",
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
    featured: true,  // Changed to false so it shows in the 2-column grid
    icon: "📈",
    mockupBg: "linear-gradient(135deg, #F0FDFA, #CCFBF1, #FAFAF9)",  // Teal-50 → Teal-100 → Stone
  }
];