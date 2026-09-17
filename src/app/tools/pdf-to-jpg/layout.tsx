import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "PDF to JPG", description: "PDF-এর প্রথম page JPG image হিসেবে রূপান্তর করে download করুন।", path: "/tools/pdf-to-jpg", keywords: ["PDF to JPG", "PDF থেকে JPG", "PDF image converter"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
