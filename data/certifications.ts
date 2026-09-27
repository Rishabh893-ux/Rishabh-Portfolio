export type Certification = {
  name: string;
  issuer: string;
  link?: string;
};

// Add verification links as they become available.
export const certifications: Certification[] = [
  { name: "5-Day AI Agents Intensive Course", issuer: "Google" },
  { name: "Build with AI Solution Challenge 2026 — Participation", issuer: "Hack2skill (H2S)" },
  { name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle" },
  { name: "Gen AI Academy 2.0", issuer: "Google" },
  { name: "Azure AI Essentials", issuer: "Microsoft" },
  { name: "Software Engineering Job Simulation", issuer: "JPMorgan Chase (via Forage)" },
  { name: "Python 101 for Data Science", issuer: "IBM Cognitive Class" },
  { name: "Generative AI Virtual Internship (FSP)", issuer: "IBM SkillsBuild / FSP" },
  { name: "Code Java: A Complete Beginner's Guide", issuer: "Udemy" },
  { name: "Digital Application Fundamentals (STEM)", issuer: "NASSCOM FutureSkills Prime" },
  { name: "National Road Safety Hackathon 2025 — Participation", issuer: "Unstop" },
  { name: "Full-Stack Development Training", issuer: "Grasstech" },
  { name: "Kaggle Certification / Capstone", issuer: "Kaggle" },
];
