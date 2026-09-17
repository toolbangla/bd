"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolHistory from "@/components/ToolHistory";

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
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main>
        {children}
        {toolSlug && toolNames[toolSlug] && <ToolHistory toolName={toolNames[toolSlug]} />}
      </main>

      <Footer />
    </div>
  );
}