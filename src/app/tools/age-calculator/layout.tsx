import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "Age Calculator", description: "জন্মতারিখ থেকে বছর, মাস ও দিন হিসেবে আপনার বয়স হিসাব করুন।", path: "/tools/age-calculator", keywords: ["বয়স ক্যালকুলেটর", "জন্মতারিখ থেকে বয়স", "age calculator"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
