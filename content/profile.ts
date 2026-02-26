export type SocialLink = {
  label: string;
  href: string;
};

export type SkillGroup = {
  group: string;
  skills: string[];
};

export type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
  outcome: string;
};

export const profile = {
  name: "Albot Ciprian",
  title: "Senior Backend Engineer & Systems Architect",
  location: "Chisinau, Moldova",
  email: "albotciprian05@gmail.com",
  phone: "+373 68968633",
  heroIntro:
    "I build banking-grade backend systems and cloud-ready platforms with a focus on reliability, clean architecture, and sustainable scale.",
  heroKeywords: [
    "Scalable APIs",
    "Banking-grade Systems",
    "Microservices",
    "Data Platforms",
    "Cloud-ready Deployments",
  ],
  shortAbout:
    "Software engineer with 4+ years across data analytics, database engineering, and backend development in banking and enterprise environments.",
  about: [
    "My engineering path started in analytics-heavy environments where SQL optimization, ETL automation, and validation workflows were mission-critical. That foundation gave me a practical perspective on data correctness and system behavior under load.",
    "I later transitioned into backend development for banking products, contributing to payment integrations, transaction logic, insurance workflows, and production APIs used by internal and customer-facing systems.",
    "Today I lead architecture and backend execution for contract and product work, owning system design, modular service boundaries, database performance, deployment strategy, and long-term maintainability.",
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/AlbotCiprian",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/albot-ciprian",
    },
    {
      label: "Email",
      href: "mailto:albotciprian05@gmail.com",
    },
  ] satisfies SocialLink[],
  skills: [
    {
      group: "Backend",
      skills: [
        "Node.js",
        "REST APIs",
        "Service Integration",
        "Authentication & Authorization",
        "Secure Business Logic",
        "Error Handling",
        "Logging",
      ],
    },
    {
      group: "Databases",
      skills: [
        "PostgreSQL",
        "SQL Server",
        "Oracle",
        "MongoDB",
        "T-SQL / PL-SQL",
        "Query Optimization",
        "Performance Tuning",
      ],
    },
    {
      group: "Data & Automation",
      skills: [
        "Python (Pandas, SQLAlchemy)",
        "ETL Pipelines",
        "Data Reconciliation",
        "API to DB Ingestion",
        "Automation Scripting",
        "Reporting Logic",
      ],
    },
    {
      group: "Infrastructure",
      skills: [
        "Docker",
        "Linux Environments",
        "VPS Management",
        "CI/CD Concepts",
        "Deployment Pipelines",
        "Monitoring Basics",
      ],
    },
    {
      group: "Testing & Quality",
      skills: [
        "Postman",
        "API Testing",
        "Selenium",
        "Appium",
        "Automated QA Workflows",
      ],
    },
  ] satisfies SkillGroup[],
  whyChooseMe: [
    {
      id: "reliability",
      title: "Reliability and correctness first",
      description:
        "I build business logic with explicit validation and failure handling, shaped by banking-domain constraints.",
      outcome:
        "Predictable transaction behavior and fewer production incidents.",
    },
    {
      id: "performance",
      title: "Performance from schema to API",
      description:
        "I optimize query paths, indexing strategy, and service boundaries together instead of patching bottlenecks in isolation.",
      outcome: "Lower latency and better throughput under real production workloads.",
    },
    {
      id: "architecture",
      title: "Modular architecture for growth",
      description:
        "I design clear service contracts and maintainable code organization to keep teams fast as complexity grows.",
      outcome: "Faster feature delivery without sacrificing maintainability.",
    },
    {
      id: "ownership",
      title: "Production ownership",
      description:
        "From backend and database modeling to CI/CD and VPS environments, I treat deployment and observability as core engineering work.",
      outcome: "Stable releases and systems that can scale sustainably.",
    },
  ] satisfies WhyChooseItem[],
  languages: [
    "Romanian (Native)",
    "English (C1)",
    "Russian (C1)",
    "French (B1)",
  ],
  resumePath: "/resume/Albot-Ciprian-CV.pdf",
  avatar: "/images/avatar.svg",
  architectureCard: "/images/architecture-card.svg",
};

export type Profile = typeof profile;
