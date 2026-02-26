export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  bullets: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "corporate-man-senior-backend",
    role: "Senior Backend Developer",
    company: "Corporate Man SRL",
    period: "Feb 2026 - Present",
    location: "Contract",
    type: "Backend Engineering",
    bullets: [
      "Develop and maintain backend services and REST APIs for production workflows.",
      "Implement modular service architecture and secure domain logic.",
      "Design and optimize database structures and SQL performance for critical endpoints.",
      "Integrate external and internal services with reliability-focused production support.",
    ],
    tags: ["Node.js", "REST API", "PostgreSQL", "Architecture"],
  },
  {
    id: "xelack-lead-developer",
    role: "Lead Developer",
    company: "Xelack Technology",
    period: "Sep 2025 - Present",
    location: "Self-employed / Contract",
    type: "System Architecture",
    bullets: [
      "Architect scalable backend systems for client and internal applications.",
      "Define service boundaries and engineering standards for maintainable growth.",
      "Coordinate backend releases and deployment workflows across environments.",
      "Optimize database schemas and query performance for long-term scalability.",
    ],
    tags: ["Systems Design", "CI/CD", "VPS", "Scalability"],
  },
  {
    id: "instastore-lead",
    role: "Lead Developer",
    company: "Movio Solution SRL - Instastore.md",
    period: "Nov 2025 - Present",
    location: "Contract",
    type: "Product Engineering",
    bullets: [
      "Built and manage an end-to-end marketplace platform with modular architecture.",
      "Implemented role-based marketplace flows for sellers, products, and orders.",
      "Managed infrastructure across Vercel, Neon, and VPS environments.",
      "Expanded SEO architecture with programmatic landing pages and scalable content structure.",
    ],
    tags: ["Marketplace", "PostgreSQL", "Vercel", "Product"],
  },
  {
    id: "saas-project-architect",
    role: "Product Architect & Backend Developer",
    company: "SaaS Project (Confidential)",
    period: "Dec 2025 - Present",
    location: "Contract",
    type: "SaaS Architecture",
    bullets: [
      "Design scalable SaaS architecture and modular backend services.",
      "Implement database modeling for multi-tenant readiness.",
      "Plan cloud-ready deployment strategy and operational model.",
    ],
    tags: ["SaaS", "Multi-tenant", "Cloud-ready"],
  },
  {
    id: "maib-data-analyst",
    role: "Data Analyst",
    company: "maib",
    period: "Feb 2025 - Feb 2026",
    location: "Chisinau",
    type: "Data Engineering",
    bullets: [
      "Built automated data workflows (Python + SQL) for banking product analytics.",
      "Implemented validation and reconciliation checks to improve data reliability.",
      "Investigated database-level inconsistencies and collaborated with IT teams on fixes.",
      "Optimized reporting datasets and query performance for faster insight delivery.",
    ],
    tags: ["Python", "SQL", "ETL", "Banking Data"],
  },
  {
    id: "eximbank-middle-software-dev",
    role: "Middle Software Developer",
    company: "EXIMBANK - Intesa Sanpaolo",
    period: "Apr 2024 - Feb 2025",
    location: "Chisinau",
    type: "Banking Backend",
    bullets: [
      "Developed backend services and APIs for mobile and web banking channels.",
      "Contributed to MIA payment integration with secure transaction flow handling.",
      "Automated QA checks with Appium/Selenium and Python + SQL extracts.",
      "Containerized services with Docker and supported deployment stability improvements.",
    ],
    tags: ["Payments", "MIA Integration", "Docker", "QA Automation"],
  },
  {
    id: "fujikura-it-manager",
    role: "IT Manager",
    company: "Fujikura Automotive Europe",
    period: "Feb 2024 - Apr 2024",
    location: "Moldova",
    type: "Infrastructure",
    bullets: [
      "Implemented disaster recovery procedures for production-critical IT systems.",
      "Managed local servers and operational infrastructure continuity.",
    ],
    tags: ["Disaster Recovery", "Infrastructure"],
  },
  {
    id: "unifun-data-analytics-manager",
    role: "Data Analytics Manager",
    company: "Unifun International",
    period: "Mar 2023 - Dec 2023",
    location: "Chisinau",
    type: "Analytics Platform",
    bullets: [
      "Administered analytics servers and optimized ETL for real-time aggregation.",
      "Built Tableau dashboards and managed Tableau server for executive reporting.",
      "Implemented synchronization scripts in Python and maintained Grafana observability.",
      "Coordinated analytics team delivery for time-critical business reporting.",
    ],
    tags: ["Tableau", "Grafana", "Python", "Leadership"],
  },
  {
    id: "freelance-architect",
    role: "Freelance Software & Data Solutions Architect",
    company: "Independent",
    period: "Sep 2020 - Present",
    location: "Remote",
    type: "Consulting",
    bullets: [
      "Designed scalable backend and database-driven systems across client environments.",
      "Architected REST APIs and ETL workflows for ingestion, transformation, and reporting.",
      "Optimized relational databases for high-volume processing and reliability.",
      "Provided technical consulting on architecture, performance, and maintainability.",
    ],
    tags: ["Consulting", "SQL Server", "APIs", "ETL"],
  },
];
