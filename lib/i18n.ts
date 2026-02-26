export const locales = ["en", "ro"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ro";
}

export const dictionaries = {
  en: {
    localeLabel: "English",
    common: {
      home: "Home",
      projects: "Projects",
      resume: "Resume",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      allPages: "All Pages",
      navigate: "Navigate",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      viewAllProjects: "View all projects",
      viewAllPosts: "View all posts",
      scrollToExplore: "Scroll to explore",
      directChannels: "Direct channels",
      visitWebsite: "Visit website",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      caseStudy: "Case Study",
      previousPost: "Previous post",
      nextPost: "Next post",
      noPreviousPost: "No previous post",
      noNextPost: "No newer post",
    },
    hero: {
      eyebrow: "Senior Backend Engineer & Systems Architect",
      intro:
        "I build banking-grade backend systems and cloud-ready platforms with a focus on reliability, clean architecture, and sustainable scale.",
      keywords: [
        "Scalable APIs",
        "Banking-grade Systems",
        "Microservices Architecture",
        "Data Platforms",
      ],
    },
    home: {
      why: {
        eyebrow: "Why choose me",
        title: "Architecture clarity with production discipline.",
        description:
          "I focus on systems that stay understandable under pressure and continue scaling without rewriting the core every quarter.",
      },
      blueprintTitle: "System blueprint mindset",
      blueprintDescription:
        "Reliable APIs, predictable data layers, and deployment practices that keep systems stable while the product evolves.",
      experience: {
        eyebrow: "Experience",
        title: "Progression from data depth to backend leadership.",
        description:
          "Hands-on delivery across banking, enterprise analytics, and product engineering with strong ownership of production outcomes.",
      },
      featured: {
        eyebrow: "Featured projects",
        title: "Selected systems and product builds",
        description:
          "A mix of banking workloads, SaaS architecture, and high-ownership delivery across API, data, and infrastructure layers.",
      },
      tech: {
        eyebrow: "Tech stack",
        title: "Backend, data and infrastructure toolkit",
        description:
          "Grouped by the way I build systems in production rather than by trend-driven checklists.",
      },
      github: {
        eyebrow: "GitHub activity",
        title: "Recent engineering activity",
        description:
          "Latest public events fetched through an API route with caching and normalized event output.",
      },
      blog: {
        eyebrow: "Blog",
        title: "Latest writing",
        description:
          "Notes on architecture decisions, backend reliability, SQL performance and deployment strategy.",
      },
      contact: {
        eyebrow: "Contact",
        title: "Let us build your next backend platform.",
        description:
          "Share your project scope, current technical constraints, or hiring context and I will respond with concrete next steps.",
      },
    },
    whyChoose: {
      reliability: {
        title: "Reliability and correctness first",
        description:
          "I build business logic with explicit validation and failure handling, shaped by banking-domain constraints.",
        outcome: "Predictable transaction behavior and fewer production incidents.",
      },
      performance: {
        title: "Performance from schema to API",
        description:
          "I optimize query paths, indexing strategy, and service boundaries together instead of patching bottlenecks in isolation.",
        outcome: "Lower latency and better throughput under real production workloads.",
      },
      architecture: {
        title: "Modular architecture for growth",
        description:
          "I design clear service contracts and maintainable code organization to keep teams fast as complexity grows.",
        outcome: "Faster feature delivery without sacrificing maintainability.",
      },
      ownership: {
        title: "Production ownership",
        description:
          "From backend and database modeling to CI/CD and VPS environments, I treat deployment and observability as core engineering work.",
        outcome: "Stable releases and systems that can scale sustainably.",
      },
    },
    filters: {
      All: "All",
      Banking: "Banking",
      SaaS: "SaaS",
      Data: "Data",
      Infra: "Infra",
    },
    github: {
      loading: "Loading recent GitHub events...",
      failed: "GitHub activity is temporarily unavailable.",
      noEvents: "No recent public GitHub events found.",
      timeout: "Request timed out after 5 seconds.",
    },
    blogExplorer: {
      searchPlaceholder: "Search by title, description or tag",
      noResults: "No posts matched your search.",
    },
    contactForm: {
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Tell me about your project or role",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully.",
      failed: "Could not send your message.",
    },
    footer: {
      eyebrow: "Backend Systems",
      title: "Designing reliable systems for product growth.",
      description:
        "Open for backend architecture, platform modernization, and production-critical API engineering.",
      pages: "Pages",
      social: "Social",
      contact: "Contact",
      newsletterTitle: "Technical Notes",
      newsletterDescription:
        "Newsletter module placeholder for architecture insights and backend engineering updates.",
      newsletterPlaceholder: "newsletter@soon.dev",
      copyright: "All rights reserved.",
      builtWith: "Built with Next.js, TypeScript, Tailwind and Framer Motion.",
    },
    projectsPage: {
      eyebrow: "Project archive",
      title: "All projects",
      description:
        "Filter by domain to explore banking integrations, SaaS systems, data workflows and infrastructure-focused delivery.",
    },
    resumePage: {
      eyebrow: "Resume",
      title: "Senior Backend Engineer & Systems Architect",
      description: "From data-centric foundations to production backend architecture and platform ownership.",
      downloadPdf: "Download CV (PDF)",
      viewProjects: "View Projects",
      careerEyebrow: "Career timeline",
      careerTitle: "Experience",
      careerDescription: "Roles across banking, enterprise analytics, consulting, and product architecture.",
      strengthsEyebrow: "Technical strengths",
      strengthsTitle: "Core capabilities",
      strengthsDescription: "Practical skill groups used in production delivery and architecture decisions.",
      eduEyebrow: "Education & languages",
      eduTitle: "Academic path",
      eduDescription:
        "CEITI graduate with database administration specialization and ongoing Applied Information Science studies at USM.",
      education: "Education",
      languages: "Languages",
    },
    blogPage: {
      eyebrow: "Engineering notes",
      title: "Blog",
      description: "Search by keyword and filter by tags to find architecture, backend, data and infrastructure content.",
      backToBlog: "Back to blog",
    },
    notFound: {
      title: "Page not found",
      description: "The page you requested does not exist or was moved.",
      cta: "Go back home",
    },
  },
  ro: {
    localeLabel: "Romana",
    common: {
      home: "Acasa",
      projects: "Proiecte",
      resume: "CV",
      blog: "Blog",
      about: "Despre",
      contact: "Contact",
      allPages: "Toate paginile",
      navigate: "Navigare",
      viewProjects: "Vezi proiectele",
      downloadCv: "Descarca CV",
      viewAllProjects: "Vezi toate proiectele",
      viewAllPosts: "Vezi toate articolele",
      scrollToExplore: "Deruleaza pentru explorare",
      directChannels: "Canale directe",
      visitWebsite: "Viziteaza website",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      caseStudy: "Studiu de caz",
      previousPost: "Articol anterior",
      nextPost: "Articol urmator",
      noPreviousPost: "Nu exista articol anterior",
      noNextPost: "Nu exista articol mai nou",
    },
    hero: {
      eyebrow: "Senior Backend Engineer & Systems Architect",
      intro:
        "Construiesc sisteme backend de nivel bancar si platforme cloud-ready, cu focus pe fiabilitate, arhitectura curata si scalare sustenabila.",
      keywords: [
        "API-uri scalabile",
        "Sisteme bancare robuste",
        "Arhitectura microservicii",
        "Platforme de date",
      ],
    },
    home: {
      why: {
        eyebrow: "De ce sa lucrezi cu mine",
        title: "Claritate arhitecturala cu disciplina de productie.",
        description:
          "Construiesc sisteme usor de inteles sub presiune si capabile sa scaleze fara rescrieri frecvente.",
      },
      blueprintTitle: "Mentalitate de blueprint arhitectural",
      blueprintDescription:
        "API-uri fiabile, straturi de date predictibile si practici de deployment care mentin platforma stabila pe masura ce produsul evolueaza.",
      experience: {
        eyebrow: "Experienta",
        title: "Evolutie de la data engineering la leadership backend.",
        description:
          "Livrare practica in banking, analytics enterprise si product engineering, cu ownership complet pe productie.",
      },
      featured: {
        eyebrow: "Proiecte selectate",
        title: "Sisteme si produse reprezentative",
        description:
          "Combinatie de workload-uri bancare, arhitectura SaaS si livrare end-to-end pe API, date si infrastructura.",
      },
      tech: {
        eyebrow: "Stack tehnic",
        title: "Backend, date si infrastructura",
        description:
          "Grupari pe baza modului real de lucru in productie, nu pe buzzwords.",
      },
      github: {
        eyebrow: "Activitate GitHub",
        title: "Activitate tehnica recenta",
        description:
          "Evenimente publice obtinute prin API route cu cache si normalizare pentru UI.",
      },
      blog: {
        eyebrow: "Blog",
        title: "Articole recente",
        description:
          "Note despre decizii arhitecturale, fiabilitate backend, performanta SQL si strategie de deployment.",
      },
      contact: {
        eyebrow: "Contact",
        title: "Hai sa construim urmatoarea ta platforma backend.",
        description:
          "Trimite contextul proiectului, constrangerile tehnice sau rolul disponibil si revin cu urmatorii pasi concreti.",
      },
    },
    whyChoose: {
      reliability: {
        title: "Fiabilitate si corectitudine pe primul loc",
        description:
          "Construiesc logica de business cu validari explicite si tratare clara a erorilor, inspirata din standarde banking.",
        outcome: "Comportament predictibil al tranzactiilor si mai putine incidente in productie.",
      },
      performance: {
        title: "Performanta de la schema la API",
        description:
          "Optimizez impreuna query-urile, indexarea si granita dintre servicii, nu doar simptome izolate.",
        outcome: "Latenta mai mica si throughput mai bun in workload-uri reale.",
      },
      architecture: {
        title: "Arhitectura modulara pentru crestere",
        description:
          "Defin contracte clare intre servicii si structura de cod mentenabila pe termen lung.",
        outcome: "Livrare mai rapida de functionalitati fara datorie tehnica excesiva.",
      },
      ownership: {
        title: "Ownership pe productie",
        description:
          "De la backend si modelare baze de date pana la CI/CD si VPS, tratez operarea ca parte esentiala a ingineriei.",
        outcome: "Release-uri stabile si sisteme pregatite pentru scalare sustenabila.",
      },
    },
    filters: {
      All: "Toate",
      Banking: "Banking",
      SaaS: "SaaS",
      Data: "Date",
      Infra: "Infra",
    },
    github: {
      loading: "Se incarca evenimentele GitHub...",
      failed: "Activitatea GitHub este momentan indisponibila.",
      noEvents: "Nu exista evenimente publice recente.",
      timeout: "Cererea a expirat dupa 5 secunde.",
    },
    blogExplorer: {
      searchPlaceholder: "Cauta dupa titlu, descriere sau tag",
      noResults: "Nu exista articole care sa corespunda cautarii.",
    },
    contactForm: {
      namePlaceholder: "Numele tau",
      emailPlaceholder: "Emailul tau",
      messagePlaceholder: "Spune-mi despre proiectul sau rolul tau",
      send: "Trimite mesaj",
      sending: "Se trimite...",
      success: "Mesaj trimis cu succes.",
      failed: "Mesajul nu a putut fi trimis.",
    },
    footer: {
      eyebrow: "Sisteme Backend",
      title: "Proiectez sisteme fiabile pentru cresterea produsului.",
      description:
        "Disponibil pentru arhitectura backend, modernizare platforme si inginerie API critica pentru productie.",
      pages: "Pagini",
      social: "Social",
      contact: "Contact",
      newsletterTitle: "Note tehnice",
      newsletterDescription:
        "Bloc placeholder pentru newsletter cu insight-uri de arhitectura si backend engineering.",
      newsletterPlaceholder: "newsletter@curand.dev",
      copyright: "Toate drepturile rezervate.",
      builtWith: "Construit cu Next.js, TypeScript, Tailwind si Framer Motion.",
    },
    projectsPage: {
      eyebrow: "Arhiva proiecte",
      title: "Toate proiectele",
      description:
        "Filtreaza pe domenii pentru a explora integrari banking, sisteme SaaS, fluxuri de date si infrastructura.",
    },
    resumePage: {
      eyebrow: "CV",
      title: "Senior Backend Engineer & Systems Architect",
      description: "De la fundatie data-centric la arhitectura backend de productie si ownership complet.",
      downloadPdf: "Descarca CV (PDF)",
      viewProjects: "Vezi proiectele",
      careerEyebrow: "Timeline cariera",
      careerTitle: "Experienta",
      careerDescription: "Roluri in banking, analytics enterprise, consultanta si arhitectura de produs.",
      strengthsEyebrow: "Puncte forte tehnice",
      strengthsTitle: "Capabilitati de baza",
      strengthsDescription: "Grupari practice folosite in livrarea si deciziile tehnice din productie.",
      eduEyebrow: "Educatie si limbi",
      eduTitle: "Parcurs academic",
      eduDescription:
        "Absolvent CEITI cu specializare in administrare baze de date si student USM la Informatica Aplicata.",
      education: "Educatie",
      languages: "Limbi",
    },
    blogPage: {
      eyebrow: "Note de inginerie",
      title: "Blog",
      description: "Cauta dupa cuvinte cheie si filtreaza dupa tag-uri pentru arhitectura, backend, date si infrastructura.",
      backToBlog: "Inapoi la blog",
    },
    notFound: {
      title: "Pagina nu a fost gasita",
      description: "Pagina solicitata nu exista sau a fost mutata.",
      cta: "Inapoi acasa",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
