import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "PDF to Image", description: "PDF-এর প্রতিটি page PNG image হিসেবে browser-এ বের করুন।", path: "/tools/pdf-to-image", keywords: ["PDF to image", "PDF থেকে ছবি", "PDF page PNG"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
