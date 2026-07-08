import type { MarqueeLogo } from "@/components/system/CompanyLogosMarquee";

/**
 * Companies, institutions & products Ciprian has delivered systems for —
 * rendered in the "worked with" logo band under the hero (dark chips).
 *
 * SINGLE SOURCE OF TRUTH. Edit here, never hardcode in components.
 * Only brands with a real logo live here; text-only employers stay in the
 * Experience timeline (`content/experience.ts`). Assets are normalised into
 * /public/images/clients/ (no-space filenames, optimised with sharp).
 */
export const clients: MarqueeLogo[] = [
  {
    name: "maib",
    tag: "banking",
    logo: "/images/clients/maib.svg",
    url: "https://www.maib.md/",
  },
  {
    name: "Ministry of Agriculture",
    tag: "government",
    logo: "/images/clients/ministry-agriculture.png",
  },
  {
    name: "MegHome",
    tag: "e-commerce",
    logo: "/images/clients/meghome.png",
    url: "https://www.meghome.md/",
  },
  {
    name: "CrisRent",
    tag: "rental ops",
    logo: "/images/clients/crisrent.png",
    url: "https://www.crisrent.md/",
  },
  {
    name: "Claroche",
    tag: "retail",
    logo: "/images/clients/claroche.png",
  },
  {
    name: "JBI Smile Design",
    tag: "healthtech",
    logo: "/images/clients/jbi-smile.jpg",
    url: "https://jbi-smile-design.vercel.app/",
  },
  {
    name: "Sky With Class",
    tag: "aviation",
    logo: "/images/clients/sky-with-class.svg",
  },
  {
    name: "Smart Group",
    tag: "services",
    logo: "/images/clients/smart-group.png",
  },
  {
    name: "Den Van Logistic",
    tag: "logistics",
    logo: "/images/clients/den-van-logistic.png",
  },
];
