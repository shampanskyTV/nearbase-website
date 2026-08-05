import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nearbase.de";

  const staticPages = [
    { path: "", priority: 1, lastModified: "2026-08-05" },
    { path: "/contact", priority: 0.8, lastModified: "2026-08-05" },
    { path: "/career", priority: 0.6, lastModified: "2026-08-05" },
    { path: "/company", priority: 0.6, lastModified: "2026-08-05" },
    { path: "/company/about", priority: 0.7, lastModified: "2026-08-05" },
    { path: "/company/cases", priority: 0.7, lastModified: "2026-08-05" },
    { path: "/services", priority: 0.8, lastModified: "2026-08-05" },
    { path: "/services/einstieg", priority: 0.7, lastModified: "2026-08-05" },
    { path: "/services/retainer", priority: 0.7, lastModified: "2026-08-05" },
    { path: "/services/filiale", priority: 0.7, lastModified: "2026-08-05" },
    { path: "/services/individuell", priority: 0.7, lastModified: "2026-08-05" },
  ];

  const legalPages = [
    { path: "/legal/impressum", lastModified: "2026-08-05" },
    { path: "/legal/datenschutz", lastModified: "2026-08-05" },
    { path: "/legal/agb", lastModified: "2026-08-05" },
    { path: "/legal/cookies", lastModified: "2026-08-05" },
  ];

  const caseSlugs = [
    "matratzen-concord",
    "steuerkanzlei-berlin",
    "naturfriseur",
    "verkehrsrecht-kanzlei",
    "handwerksbetrieb",
    "beauty-studio",
    "autohaus-filialen",
    "physiotherapie-standorte",
  ];

  const careerSlugs = ["vertriebspartner"];

  return [
    ...staticPages.map(({ path, priority, lastModified }) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...legalPages.map(({ path, lastModified }) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    ...caseSlugs.map((slug) => ({
      url: `${baseUrl}/cases/${slug}`,
      lastModified: "2026-08-05",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...careerSlugs.map((slug) => ({
      url: `${baseUrl}/career/${slug}`,
      lastModified: "2026-08-05",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}