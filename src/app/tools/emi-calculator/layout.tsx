import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "EMI Calculator", description: "ঋণের amount, interest এবং term দিয়ে মাসিক EMI কিস্তি হিসাব করুন।", path: "/tools/emi-calculator", keywords: ["EMI calculator", "ঋণের কিস্তি", "monthly EMI হিসাব"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
