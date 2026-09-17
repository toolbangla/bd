import type { Metadata } from "next";

export const SITE_URL = "https://bd-delta-one.vercel.app";

export function createToolMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords: ["ToolBangla", ...keywords],
    alternates: { canonical },
    openGraph: {
      title: `${title} | ToolBangla`,
      description,
      url: canonical,
      type: "website",
      siteName: "ToolBangla",
      locale: "bn_BD",
    },
    twitter: {
      card: "summary",
      title: `${title} | ToolBangla`,
      description,
    },
  };
}
