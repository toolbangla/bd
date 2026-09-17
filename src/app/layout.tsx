import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ToolBangla — সব দরকারি টুল এক জায়গায়",
    template: "%s | ToolBangla",
  },
  description:
    "ToolBangla-তে Image, PDF, QR Code, Calculator এবং অন্যান্য দরকারি অনলাইন টুল সহজে ব্যবহার করুন।",
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
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "ToolBangla — সব দরকারি টুল এক জায়গায়",
    description: "সহজ, দ্রুত এবং বিনামূল্যে অনলাইন টুল।",
    type: "website",
    siteName: "ToolBangla",
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
      <body>{children}</body>
    </html>
  );
}