import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "বাংলা Text Counter", description: "বাংলা লেখার অক্ষর ও শব্দ দ্রুত গণনা করুন।", path: "/tools/bangla-text-counter", keywords: ["বাংলা text counter", "বাংলা অক্ষর গণনা", "বাংলা শব্দ গণনা"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
