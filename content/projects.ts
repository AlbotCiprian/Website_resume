export const projectCategories = ["All", "Banking", "SaaS", "Data", "Infra"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "All">;
  tags: string[];
  image: string;
  featured: boolean;
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
};

export const projects: ProjectItem[] = [
  {
    slug: "instastore-marketplace",
    title: "Instastore.md Marketplace",
    description:
      "Independent full-stack marketplace platform with modular backend architecture, scalable catalog flows, and SEO-oriented landing system.",
    category: "SaaS",
    tags: ["Node.js", "PostgreSQL", "Vercel", "Neon", "Architecture"],
    image: "/images/projects/instastore.svg",
    featured: true,
    links: {
      demo: "https://instastore.md",
      github: "https://github.com/AlbotCiprian",
    },
  },
  {
    slug: "banking-api-suite",
    title: "Banking API Suite",
    description:
      "Backend services for mobile and web banking with payment integration, secure transaction flows, and production-grade reliability controls.",
    category: "Banking",
    tags: ["REST APIs", "Payments", "Insurance", "Docker", "Secure Logic"],
    image: "/images/projects/banking-api.svg",
    featured: true,
    links: {
      caseStudy: "#",
    },
  },
  {
    slug: "saas-core-platform",
    title: "SaaS Core Platform",
    description:
      "Cloud-ready modular backend for a confidential SaaS product, including multi-tenant-ready modeling and service-oriented boundaries.",
    category: "SaaS",
    tags: ["Multi-tenant", "Modular Services", "PostgreSQL", "Cloud-ready"],
    image: "/images/projects/saas-core.svg",
    featured: true,
    links: {
      caseStudy: "#",
    },
  },
  {
    slug: "banking-analytics-pipeline",
    title: "Banking Analytics Pipeline",
    description:
      "Automated Python + SQL workflows for banking analytics, with reconciliation checks and integrity validation over high-volume datasets.",
    category: "Data",
    tags: ["Python", "SQL", "ETL", "Validation", "Reporting"],
    image: "/images/projects/data-pipeline.svg",
    featured: true,
    links: {
      caseStudy: "#",
    },
  },
  {
    slug: "platform-observability",
    title: "Platform Observability Baseline",
    description:
      "Monitoring and operational visibility setup combining dashboards, server metrics, and alert-friendly telemetry for VPS-hosted systems.",
    category: "Infra",
    tags: ["Grafana", "Linux", "VPS", "Monitoring", "Reliability"],
    image: "/images/projects/platform-observability.svg",
    featured: false,
    links: {
      caseStudy: "#",
    },
  },
  {
    slug: "freelance-data-suite",
    title: "Freelance Data & API Suite",
    description:
      "Consulting delivery across API architecture, SQL optimization, and ETL/reporting automation for enterprise and SME clients.",
    category: "Data",
    tags: ["SQL Server", "ASP.NET", "ETL", "BI", "Consulting"],
    image: "/images/projects/freelance-suite.svg",
    featured: false,
    links: {
      github: "https://github.com/AlbotCiprian",
    },
  },
];
