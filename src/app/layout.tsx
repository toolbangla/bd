import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";
import VoiceAssistant from "@/components/voice/VoiceAssistant";

export const metadata: Metadata = {
  title: {
    default: "ToolBangla — সব দরকারি টুল এক জায়গায়",
    template: "%s | ToolBangla",
  },
  description:
    "ToolBangla-তে ছবি, PDF, QR Code, Calculator এবং অন্যান্য দরকারি অনলাইন টুল সহজে ব্যবহার করুন।",
  keywords: [
    "ToolBangla",
    "online tools",
    "Bangla tools",
    "image compressor",
    "image resizer",
    "JPG to PNG",
    "PNG to JPG",
    "image to PDF",
    "PDF to image",
    "QR code generator",
    "percentage calculator",
    "age calculator",
    "BMI calculator",
  ],
  authors: [{ name: "ToolBangla" }],
  creator: "ToolBangla",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "ToolBangla — সব দরকারি টুল এক জায়গায়",
    description: "সহজ, দ্রুত এবং বিনামূল্যে বাংলা-কেন্দ্রিক অনলাইন টুল।",
    url: SITE_URL,
    type: "website",
    siteName: "ToolBangla",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary",
    title: "ToolBangla — সব দরকারি টুল এক জায়গায়",
    description: "সহজ, দ্রুত এবং বিনামূল্যে বাংলা-কেন্দ্রিক অনলাইন টুল।",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>{children}<VoiceAssistant /></body>
    </html>
  );
}