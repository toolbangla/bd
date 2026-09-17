"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolHistory from "@/components/ToolHistory";
import { BottomAd, TopAd } from "@/components/ads/AdPlacements";
import { SITE_URL } from "@/lib/seo";

type ToolLayoutProps = {
  children: React.ReactNode;
};

export default function ToolLayout({ children }: ToolLayoutProps) {
  const pathname = usePathname();
  const toolSlug = pathname.startsWith("/tools/") ? pathname.split("/")[2] : "";
  const toolNames: Record<string, string> = {
    "age-calculator": "Age Calculator",
    "bmi-calculator": "BMI Calculator",
    "image-compressor": "Image Compressor",
    "image-resizer": "Image Resizer",
    "image-to-pdf": "Image to PDF",
    "jpg-to-png": "JPG to PNG",
    "pdf-to-image": "PDF to Image",
    "percentage-calculator": "Percentage Calculator",
    "png-to-jpg": "PNG to JPG",
    "qr-code-generator": "QR Code Generator",
    "image-cropper": "Image Cropper",
    "image-converter": "Image Converter",
    "background-remover": "Background Remover",
    "pdf-to-jpg": "PDF to JPG",
    "jpg-to-pdf": "JPG to PDF",
    "pdf-compressor": "PDF Compressor",
    "pdf-merger": "PDF Merger",
    "pdf-splitter": "PDF Splitter",
    "emi-calculator": "EMI Calculator",
    "discount-calculator": "Discount Calculator",
    "profit-loss-calculator": "Profit/Loss Calculator",
    "unit-converter": "Unit Converter",
    "facebook-cover-size": "Facebook Cover Size",
    "facebook-post-size": "Facebook Post Size",
    "youtube-thumbnail-size": "YouTube Thumbnail Size",
    "youtube-banner-size": "YouTube Banner Size",
    "instagram-post-size": "Instagram Post Size",
    "bangla-to-english-helper": "বাংলা → English Text Helper",
    "bangla-text-counter": "বাংলা Text Counter",
    "word-counter": "Word Counter",
    "character-counter": "Character Counter",
    "text-to-voice": "Text to Voice",
  };
  const relatedTools: Record<string, { href: string; label: string }[]> = {
    "jpg-to-png": [{ href: "/tools/png-to-jpg", label: "PNG to JPG" }, { href: "/tools/image-compressor", label: "Image Compressor" }, { href: "/tools/image-converter", label: "Image Converter" }],
    "png-to-jpg": [{ href: "/tools/jpg-to-png", label: "JPG to PNG" }, { href: "/tools/image-compressor", label: "Image Compressor" }, { href: "/tools/image-converter", label: "Image Converter" }],
    "image-compressor": [{ href: "/tools/image-resizer", label: "Image Resizer" }, { href: "/tools/image-cropper", label: "Image Cropper" }, { href: "/tools/image-converter", label: "Image Converter" }],
    "image-converter": [{ href: "/tools/jpg-to-png", label: "JPG to PNG" }, { href: "/tools/png-to-jpg", label: "PNG to JPG" }, { href: "/tools/image-compressor", label: "Image Compressor" }],
    "image-to-pdf": [{ href: "/tools/jpg-to-pdf", label: "JPG to PDF" }, { href: "/tools/pdf-merger", label: "PDF Merger" }, { href: "/tools/pdf-compressor", label: "PDF Compressor" }],
    "jpg-to-pdf": [{ href: "/tools/image-to-pdf", label: "Image to PDF" }, { href: "/tools/pdf-merger", label: "PDF Merger" }, { href: "/tools/pdf-splitter", label: "PDF Splitter" }],
    "pdf-merger": [{ href: "/tools/pdf-splitter", label: "PDF Splitter" }, { href: "/tools/pdf-compressor", label: "PDF Compressor" }, { href: "/tools/pdf-to-image", label: "PDF to Image" }],
    "pdf-splitter": [{ href: "/tools/pdf-merger", label: "PDF Merger" }, { href: "/tools/pdf-to-jpg", label: "PDF to JPG" }, { href: "/tools/pdf-compressor", label: "PDF Compressor" }],
    "pdf-to-image": [{ href: "/tools/pdf-to-jpg", label: "PDF to JPG" }, { href: "/tools/pdf-merger", label: "PDF Merger" }, { href: "/tools/pdf-splitter", label: "PDF Splitter" }],
    "pdf-to-jpg": [{ href: "/tools/pdf-to-image", label: "PDF to Image" }, { href: "/tools/jpg-to-pdf", label: "JPG to PDF" }, { href: "/tools/pdf-compressor", label: "PDF Compressor" }],
    "percentage-calculator": [{ href: "/tools/age-calculator", label: "Age Calculator" }, { href: "/tools/bmi-calculator", label: "BMI Calculator" }, { href: "/tools/discount-calculator", label: "Discount Calculator" }],
    "emi-calculator": [{ href: "/tools/discount-calculator", label: "Discount Calculator" }, { href: "/tools/profit-loss-calculator", label: "Profit/Loss Calculator" }, { href: "/tools/percentage-calculator", label: "Percentage Calculator" }],
  };
  const currentToolName = toolSlug ? toolNames[toolSlug] : "";
  const schema = currentToolName ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: currentToolName,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/tools/${toolSlug}`,
    description: `Use the ${currentToolName} tool online with ToolBangla.`,
  } : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <TopAd />

      <main>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
        {children}
        {toolSlug && toolNames[toolSlug] && <ToolHistory toolName={toolNames[toolSlug]} />}
        {toolSlug && relatedTools[toolSlug] && <nav aria-label="Related tools" className="mx-auto max-w-4xl px-5 pb-8"><div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-bold">Related Tools</h2><div className="mt-4 flex flex-wrap gap-3">{relatedTools[toolSlug].map((tool) => <Link key={tool.href} href={tool.href} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-blue-600 hover:border-blue-300">{tool.label}</Link>)}</div></div></nav>}
      </main>

      <BottomAd />

      <Footer />
    </div>
  );
}