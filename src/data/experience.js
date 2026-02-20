import blueyonderLogo from "../assets/images/blueyonder_logo.jpeg";
import infosysLogo from "../assets/images/infosys_logo.jpeg";
import uitRgpvLogo from "../assets/images/uit_rgpv.jpeg";  

export const EXPERIENCES = [
  {
    id: "blueyonder",
    company: "Blue Yonder",
    role: "Software Engineer I",
    period: "Feb 2023 – Present",
    duration: "3+ yrs",
    location: "Hyderabad",
    type: "Full-time",
    current: true,
    color: "#0D9488",        // Teal-700 (was #14B8A6)
    logo: blueyonderLogo,
    domain: "Supply Chain SaaS · Enterprise",
    highlights: [
      {
        metric: "20+",
        label: "Enterprise Screens",
        desc: "Led frontend development for the Competitive Pricing module within Merchandise Operations, delivering scalable React + Material UI interfaces."
      },
      {
        metric: "60+",
        label: "REST APIs Integrated",
        desc: "Integrated APIs with strong runtime validation using io-ts, structured error handling, and collaboration on API contract design."
      },
      {
        metric: "99.9%",
        label: "System Uptime",
        desc: "Supported production stability through incident RCA, security best-practice implementation, and resolution of 40+ production issues."
      },
      {
        metric: "15–17",
        label: "Attributes per Product",
        desc: "Designed and optimized high-traffic product workflows featuring debounced search, filtering, and pagination."
      }
    ],
    bullets: [
      "Architected scalable frontend for the Competitive Pricing module -delivering 20+ enterprise screens using React and Material UI.",
      "Improved rendering performance through memoization, controlled re-renders, and optimized table layouts.",
      "Integrated 60+ REST APIs using io-ts validation, secure frontend patterns, and resilient error handling.",
      "Mentored junior engineers via code reviews and collaborated closely with architects and UX teams.",
      "Performed RCA on 60+ production incidents contributing to 99.9% system uptime.",
      "Partnered on API contract design across backend, product, and UX teams within distributed environments."
    ],
    stack: ["React.js", "TypeScript", "Material UI", "Redux", "React Query", "io-ts", "REST APIs", "SQL"],
  },
  {
    id: "infosys",
    company: "Infosys",
    role: "System Engineer",
    period: "Jan 2021 – Feb 2023",
    duration: "2 yrs",
    location: "Pune",
    type: "Full-time",
    current: false,
    color: "#DC2626",        // Red-600 (was #EA580C)
    logo: infosysLogo,
    domain: "Banking Platform · FinTech",
    highlights: [
      {
        metric: "50K+",
        label: "Users Supported",
        desc: "Built React interfaces for a secure banking platform serving tens of thousands of users."
      },
      {
        metric: "100%",
        label: "Cross-browser Compatibility",
        desc: "Delivered responsive, reusable UI components across modern browsers and devices."
      }
    ],
    bullets: [
      "Developed and maintained React-based user interfaces for enterprise banking workflows.",
      "Focused on responsive design, reusable components, and cross-browser compatibility.",
      "Integrated REST APIs for third-party banking services supporting 50K+ users.",
      "Implemented client-side validation improving workflow reliability.",
      "Collaborated with backend and QA teams to enhance system stability."
    ],
    stack: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "REST APIs", "Git"],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Engineering (B.E)",
  field: "Computer Science",
  university: "UIT RGPV",
  location: "Bhopal, M.P",
  period: "Jul 2016 – Apr 2020",
  color: "#A78BFA",
  logo: uitRgpvLogo,
}