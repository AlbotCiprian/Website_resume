export const projectCategories = ["All", "Banking", "SaaS", "Data", "Infra"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectSeo = {
  title: string;
  description: string;
  keywords: string[];
};

export type ProjectItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  implementation: string[];
  impact: string[];
  status?: string;
  category: Exclude<ProjectCategory, "All">;
  tags: string[];
  image: string;
  featured: boolean;
  seo: ProjectSeo;
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
};

export const projects: ProjectItem[] = [
  {
    slug: "xelak-tech-company-website",
    title: "Xelak Tech Company Website",
    subtitle: "Premium Technical Services Presentation Platform",
    description:
      "Modern company website for Xelak Tech, built to present services clearly, capture leads, and communicate technical expertise with a premium UI.",
    overview:
      "Corporate website crafted to communicate service capabilities with a clean trust-first UX and conversion-focused content architecture.",
    implementation: [
      "Structured service pages with lead-first CTA hierarchy",
      "Responsive React UI with smooth interactions and motion-driven storytelling",
      "Backend contact workflow with NestJS and Nodemailer integration",
      "Performance-focused frontend delivery with reusable component architecture",
    ],
    impact: [
      "Improved conversion readiness for inbound leads",
      "Clearer communication of technical value proposition",
      "Better brand credibility through consistent enterprise-grade UI",
    ],
    category: "SaaS",
    tags: ["React", "TailwindCSS", "NestJS", "Nodemailer", "GSAP", "Framer Motion"],
    image: "/images/projects/xelaktech-real.webp",
    featured: true,
    seo: {
      title: "Xelak Tech Company Website | React + NestJS Corporate Platform",
      description:
        "Modern corporate website for Xelak Tech with conversion-focused UX, backend contact automation, and premium frontend delivery.",
      keywords: ["React", "NestJS", "Corporate Website", "Lead Generation", "TailwindCSS", "Framer Motion"],
    },
    links: {
      demo: "https://xelaktech.com/",
      github: "https://github.com/AlbotCiprian",
    },
  },
  {
    slug: "instastore-marketplace",
    title: "Instastore.md Marketplace",
    subtitle: "Modular Marketplace Core For Multi-Seller Operations",
    description:
      "Independent full-stack marketplace platform with modular backend architecture, scalable catalog flows, and SEO-oriented landing system.",
    overview:
      "Marketplace delivery focused on modular commerce flows, scalable catalog management, and operational flexibility for independent sellers.",
    implementation: [
      "Modular backend boundaries for catalog, orders, and seller operations",
      "SEO-oriented landing architecture to support organic acquisition",
      "Structured PostgreSQL data model aligned with marketplace workflows",
      "Cloud deployment strategy with Vercel and Neon integration",
    ],
    impact: [
      "Faster rollout of marketplace features",
      "Scalable architecture for catalog and seller growth",
      "Lower operational complexity through clear modular ownership",
    ],
    category: "SaaS",
    tags: ["Node.js", "PostgreSQL", "Vercel", "Neon", "Architecture"],
    image: "/images/projects/instastore-real.webp",
    featured: true,
    seo: {
      title: "Instastore.md Marketplace | Modular Full-Stack SaaS",
      description:
        "Independent full-stack marketplace with modular architecture, scalable catalog flows, and SEO-driven landing strategy.",
      keywords: ["Marketplace", "Node.js", "PostgreSQL", "Vercel", "Neon", "SEO Architecture"],
    },
    links: {
      demo: "https://www.instastore.md/home",
      github: "https://github.com/AlbotCiprian",
    },
  },
  {
    slug: "masivcorp-website-platform",
    title: "MasivCorp Website Platform",
    subtitle: "Industrial Corporate Platform With Multilingual Navigation",
    description:
      "Corporate web platform for product presentation, multilingual structure, and lead-focused navigation in an industrial business domain.",
    overview:
      "Product presentation platform designed for industrial audiences, with multilingual structure and conversion-oriented information hierarchy.",
    implementation: [
      "Next.js based architecture with performance-first rendering strategy",
      "Multilingual content structure for regional market coverage",
      "Lead-focused UX flow from product pages to contact conversion",
      "SEO and performance optimization for discoverability and speed",
    ],
    impact: [
      "Higher clarity in product communication for enterprise buyers",
      "Improved navigation for multilingual audiences",
      "Stronger lead capture across core business pages",
    ],
    category: "SaaS",
    tags: ["Next.js", "UX Architecture", "Multilingual", "Performance", "SEO"],
    image: "/images/projects/masivcorp-real.webp",
    featured: true,
    seo: {
      title: "MasivCorp Website Platform | Multilingual Industrial Web System",
      description:
        "Corporate platform for product presentation, multilingual structure, and lead-focused navigation in an industrial business domain.",
      keywords: ["Next.js", "Industrial Website", "Multilingual", "Performance", "SEO", "UX Architecture"],
    },
    links: {
      demo: "https://masivcorp.md/en/",
      github: "https://github.com/AlbotCiprian",
    },
  },
  {
    slug: "enterprise-banking-intranet-dr-eximbank",
    title: "Enterprise Banking Intranet & DR Architecture - Eximbank",
    subtitle: "Internal Digital Platform & Disaster Recovery Implementation",
    description:
      "Enterprise intranet delivery and reliability architecture for internal banking operations, training workflows, and protected operational documentation.",
    overview:
      "Contributed to the development and administration of Eximbank's internal digital platform used for communication, training delivery, and operational document management.",
    implementation: [
      "Modular backend architecture with Node.js and PostgreSQL",
      "eLearning module for courses, assessments, and user progress tracking",
      "Docker-based environment separation across dev, staging, and production",
      "Query optimization and performance tuning for core data workloads",
      "Internal document storage with role-aware access controls",
      "Infrastructure migration strategy executed with zero data loss goals",
      "Disaster Recovery Plan with incremental and full backups",
      "Database replication with documented restore procedures",
      "RTO and RPO definitions validated through controlled testing",
      "Linux hardening, monitoring, and centralized logging setup",
    ],
    impact: [
      "Reduced operational downtime risk",
      "Accelerated internal process digitalization",
      "Improved infrastructure resilience and security posture",
    ],
    category: "Banking",
    tags: ["Node.js", "PostgreSQL", "Docker", "Linux", "DR Planning", "Infrastructure Migration"],
    image: "/images/projects/eximbank-enterprise.webp",
    featured: true,
    seo: {
      title: "Enterprise Banking Intranet & DR Architecture - Eximbank",
      description:
        "Internal banking platform architecture with disaster recovery planning, infrastructure migration, and resilient operations delivery.",
      keywords: [
        "Banking Intranet",
        "Node.js",
        "PostgreSQL",
        "Disaster Recovery",
        "Docker",
        "Infrastructure Migration",
      ],
    },
    links: {
      demo: "https://eximbank.md/ro",
    },
  },
  {
    slug: "unified-insurance-loans-aggregator",
    title: "Unified Insurance & Loans Aggregator - Banking Analytics Engine",
    subtitle: "Insurance & Credit Portfolio Aggregation System",
    description:
      "Analytics engine for insurance and loan portfolios that standardizes KPI logic and automates reporting layers across CPI, RCA, GreenCard, and credit datasets.",
    overview:
      "Aggregation system built to normalize and correlate insurance and lending products for consistent banking analytics and reliable business reporting.",
    implementation: [
      "Complex SQL Server aggregations for multi-product reconciliation",
      "CTE-based modular query design for maintainable data transformations",
      "Parameterized daily and monthly rollups for reusable reporting",
      "Business logic for first policy detection per contract",
      "Cancellation month index tracking across product lifecycles",
      "KPI framework for CPI versus total loans monitoring",
      "Power BI integration through a performance-optimized dataset model",
    ],
    impact: [
      "Unified KPI interpretation across insurance and loan products",
      "Faster reporting cycles with reduced manual intervention",
      "Higher confidence in portfolio-level analytical outputs",
    ],
    category: "Data",
    tags: ["SQL Server", "CTE Queries", "KPI Modeling", "Power BI", "Banking Analytics"],
    image: "/images/projects/maib-insurance-aggregator.webp",
    featured: true,
    seo: {
      title: "Unified Insurance & Loans Aggregator | Banking Analytics Engine",
      description:
        "Insurance and loan analytics engine with SQL Server aggregations, KPI standardization, and Power BI-ready dataset architecture.",
      keywords: ["SQL Server", "Insurance Analytics", "Loan Analytics", "Power BI", "KPI Standardization"],
    },
    links: {
      demo: "https://www.maib.md/ro/asigurari",
    },
  },
  {
    slug: "insurance-data-pipeline-statistical-aggregation",
    title: "Data Pipeline & Statistical Aggregation - Insurance",
    subtitle: "Insurance Data Pipeline & Statistical Processing",
    description:
      "Statistical processing pipeline for insurance datasets designed to automate transformations, stabilize reporting metrics, and improve analytical repeatability.",
    overview:
      "Pipeline architecture responsible for ingestion, validation, normalization, and cohort-driven statistical aggregation across insurance lines.",
    implementation: [
      "Data ingestion from CPI, RCA, and GreenCard source streams",
      "Normalization and validation logic for cross-source consistency",
      "Automated pipeline for statistical aggregation and trend building",
      "Cohort analysis setup for policy behavior monitoring",
      "Cancellation rate tracking across configurable time windows",
      "Automated KPI calculation for BI and reporting consumption",
      "Dataset tuning for high-performance dashboard queries",
    ],
    impact: [
      "Metric standardization across insurance products",
      "Reporting automation with lower manual overhead",
      "Improved analytical accuracy for business stakeholders",
    ],
    category: "Data",
    tags: ["SQL Server", "Data Modeling", "BI Integration", "Statistical Aggregation"],
    image: "/images/projects/maib-insurance-pipeline.webp",
    featured: true,
    seo: {
      title: "Insurance Data Pipeline & Statistical Aggregation",
      description:
        "Insurance data pipeline with normalization, cohort analysis, cancellation tracking, and BI-ready statistical aggregation.",
      keywords: [
        "Insurance Data Pipeline",
        "Statistical Aggregation",
        "Cohort Analysis",
        "BI Integration",
        "SQL Server",
      ],
    },
    links: {
      demo: "https://www.maib.md/ro/asigurari",
    },
  },
  {
    slug: "product-analytics-infrastructure-amplitude",
    title: "Product Analytics Infrastructure - Amplitude Implementation",
    subtitle: "User Behavior Tracking & Funnel Optimization",
    description:
      "Amplitude implementation for MAIBank app with event architecture governance, funnel analysis, and product KPI visibility across critical digital journeys.",
    category: "Data",
    overview:
      "Tracking infrastructure implemented to standardize user behavior analytics and provide a shared product data layer for decision-making.",
    implementation: [
      "Event taxonomy design and event schema modeling",
      "Environment separation across dev, staging, and production",
      "Tracking for onboarding, credit funnel, insurance activation, and payment flows",
      "Funnel creation and drop-off analysis for key user journeys",
      "KPI monitoring layer aligned with product performance goals",
      "Data anonymization and PII filtering safeguards",
      "Event validation process and analytics governance controls",
    ],
    impact: [
      "End-to-end visibility across critical funnels",
      "Better conversion optimization based on real user behavior",
      "Stronger alignment between product and engineering teams",
    ],
    tags: ["Amplitude", "Event Architecture", "Product Analytics", "Funnel Optimization"],
    image: "/images/projects/maibank-amplitude.webp",
    featured: true,
    seo: {
      title: "Product Analytics Infrastructure - Amplitude Implementation",
      description:
        "Product analytics architecture for MAIBank app with event taxonomy, funnel optimization, KPI monitoring, and governance controls.",
      keywords: ["Amplitude", "Product Analytics", "Event Tracking", "Funnel Optimization", "PII Filtering"],
    },
    links: {
      demo: "https://maibank.maib.md/",
    },
  },
  {
    slug: "instastore-full-custom-ecommerce-architecture",
    title: "Instastore - Full Custom E-Commerce Architecture",
    subtitle: "Scalable Marketplace Platform",
    description:
      "Full custom e-commerce architecture built to control marketplace logic, optimize operational flows, and scale product, seller, and order lifecycles.",
    overview:
      "Custom full-stack marketplace engineered for flexible growth without SaaS platform constraints, including admin workflows and SEO expansion.",
    implementation: [
      "Next.js App Router setup for scalable storefront navigation",
      "PostgreSQL on Neon for structured and resilient data operations",
      "Custom admin panel for seller and catalog governance",
      "Product lifecycle management with controlled state transitions",
      "SEO dynamic landing pages for discoverability growth",
      "Seller architecture and order state management flows",
      "Image management pipeline and admin UX optimizations",
    ],
    impact: [
      "Scalable foundation for marketplace expansion",
      "Full control over business logic and feature roadmap",
      "Lower operating costs versus off-the-shelf SaaS alternatives",
    ],
    category: "SaaS",
    tags: ["Next.js", "PostgreSQL", "Node.js", "SEO Architecture", "Marketplace Logic"],
    image: "/images/projects/instastore-enterprise.webp",
    featured: true,
    seo: {
      title: "Instastore Full Custom E-Commerce Architecture",
      description:
        "Scalable custom marketplace built with Next.js, PostgreSQL, and custom admin workflows for full business logic control.",
      keywords: ["Next.js", "E-Commerce", "Marketplace", "PostgreSQL", "Node.js", "SEO Architecture"],
    },
    links: {
      demo: "https://www.instastore.md/home",
    },
  },
  {
    slug: "enterprise-workflow-status-engine",
    title: "Enterprise Workflow & Status Engine",
    subtitle: "Business Lifecycle Automation System (In Progress)",
    description:
      "Enterprise workflow automation initiative focused on dynamic statuses, condition-based transition logic, and audit-ready lifecycle controls.",
    overview:
      "Architecture-phase system designed to orchestrate complex business lifecycle states with traceability and controlled state progression.",
    implementation: [
      "Dynamic status machine design",
      "Sub-step architecture for granular lifecycle control",
      "Conditional transition strategy for rule-based flows",
      "Business validation layer for gatekeeping critical states",
      "Audit-ready structure for enterprise compliance paths",
    ],
    impact: [
      "Clear foundation for future workflow standardization",
      "Reduced risk of process inconsistency across business operations",
      "Improved readiness for auditable enterprise process automation",
    ],
    status: "In Progress - Architecture Phase",
    category: "Infra",
    tags: ["Workflow Engine", "Status Architecture", "Business Automation", "Audit Readiness"],
    image: "/images/projects/workflow-on-hold.webp",
    featured: true,
    seo: {
      title: "Enterprise Workflow & Status Engine (In Progress)",
      description:
        "Architecture-phase enterprise workflow engine with dynamic statuses, conditional transitions, and audit-ready lifecycle structure.",
      keywords: ["Workflow Engine", "Business Automation", "Status Machine", "Architecture Phase", "Audit Ready"],
    },
    links: {},
  },
];
