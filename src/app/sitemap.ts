import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes = [
  "/", "/tools", "/history", "/about", "/contact", "/privacy", "/terms", "/disclaimer", "/premium",
  "/tools/age-calculator", "/tools/background-remover", "/tools/bangla-text-counter", "/tools/bangla-to-english-helper", "/tools/bmi-calculator", "/tools/character-counter", "/tools/discount-calculator", "/tools/emi-calculator", "/tools/facebook-cover-size", "/tools/facebook-post-size", "/tools/image-compressor", "/tools/image-converter", "/tools/image-cropper", "/tools/image-resizer", "/tools/image-to-pdf", "/tools/instagram-post-size", "/tools/jpg-to-pdf", "/tools/jpg-to-png", "/tools/pdf-compressor", "/tools/pdf-merger", "/tools/pdf-splitter", "/tools/pdf-to-image", "/tools/pdf-to-jpg", "/tools/percentage-calculator", "/tools/png-to-jpg", "/tools/profit-loss-calculator", "/tools/qr-code-generator", "/tools/text-to-voice", "/tools/unit-converter", "/tools/word-counter", "/tools/youtube-banner-size", "/tools/youtube-thumbnail-size",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/tools" ? 0.9 : 0.7,
  }));
}
