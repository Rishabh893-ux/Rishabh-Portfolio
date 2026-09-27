export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    id: "impulseai",
    company: "ImpulseAI",
    role: "Full Stack Intern",
    period: "Jan 2026 – Present",
    duration: "9 months",
    location: "Delhi, India (Remote)",
    current: true,
    summary:
      "Working across frontend and backend with a focus on AI-powered automation — keeping a production Google Reviews pipeline reliable and making its AI output better.",
    highlights: [
      "Debugged and stabilized an automated Google Reviews workflow built on n8n, the Google Business Profile API and the OpenAI API.",
      "Fixed OAuth2 token refresh, webhook failures and broken data mapping, so reviews now sync in real time without manual restarts.",
      "Improved the AI sentiment analysis and reply drafting for more accurate, on-brand responses.",
      "Enhanced the analytics dashboard to track rating trends, sentiment, review volume and response times.",
    ],
    stack: ["n8n", "OpenAI API", "Google Business Profile API", "REST APIs", "OAuth2"],
  },
  {
    id: "edc-iitd",
    company: "eDC, IIT Delhi",
    role: "Campus Ambassador",
    period: "Dec 2025 – May 2026",
    duration: "6 months",
    location: "Remote",
    summary: "Represented the Entrepreneurship Development Cell of IIT Delhi at the campus level.",
    highlights: [
      "Ran outreach, marketing and engagement for eDC events and programs.",
      "Grew awareness of startups, innovation and eDC initiatives on campus.",
      "Coordinated remotely with the central eDC team.",
    ],
  },
  {
    id: "letsupgrade",
    company: "LetsUpgrade",
    role: "Student Ambassador",
    period: "Nov 2025 – Dec 2025",
    duration: "2 months",
    location: "Lucknow",
    summary: "Promoted learning and upskilling programs among students.",
    highlights: [
      "Spread awareness of LetsUpgrade programs and events.",
      "Built community around peer learning.",
    ],
  },
];
