import type { Metadata } from "next";

import type { ProjectItem } from "@/content/projects";

import { absoluteUrl } from "@/lib/utils";

export const siteConfig = {
  name: "Albot Ciprian",
  title: "Albot Ciprian | Senior Backend Engineer & Systems Architect",
  description:
    "Premium backend engineering portfolio focused on scalable APIs, banking-grade systems, and architecture leadership.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/images/projects/saas-core.svg",
  creator: "Albot Ciprian",
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function buildMetadata({ title, description, path = "/", image }: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? siteConfig.ogImage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@AlbotCiprian",
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Albot Ciprian",
    jobTitle: "Senior Backend Engineer & Systems Architect",
    url: siteConfig.url,
    email: "mailto:albotciprian05@gmail.com",
    sameAs: [
      "https://github.com/AlbotCiprian",
      "https://www.linkedin.com/in/albot-ciprian-a04024208/",
    ],
    knowsAbout: [
      "Node.js",
      "Backend Architecture",
      "PostgreSQL",
      "Microservices",
      "Banking Systems",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Albot Ciprian Portfolio",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  image?: string;
};

export function articleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  image,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Person",
      name: "Albot Ciprian",
    },
    image: absoluteUrl(image ?? siteConfig.ogImage),
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    publisher: {
      "@type": "Person",
      name: "Albot Ciprian",
    },
  };
}

export function projectsJsonLd(items: ProjectItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected engineering projects by Albot Ciprian",
    itemListElement: items.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.seo.title,
        headline: project.title,
        alternativeHeadline: project.subtitle,
        description: project.seo.description,
        image: absoluteUrl(project.image),
        url: absoluteUrl(`/projects#${project.slug}`),
        sameAs: project.links.demo,
        keywords: project.seo.keywords.join(", "),
        genre: project.category,
        creator: {
          "@type": "Person",
          name: "Albot Ciprian",
        },
        inLanguage: "en",
      },
    })),
  };
}
