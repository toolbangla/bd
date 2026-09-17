import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "Discount Calculator", description: "মূল্য ও discount percentage দিয়ে ছাড়ের পর চূড়ান্ত দাম হিসাব করুন।", path: "/tools/discount-calculator", keywords: ["discount calculator", "ছাড়ের হিসাব", "discount price calculator"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
