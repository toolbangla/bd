import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "Word Counter", description: "বাংলা বা English লেখার মোট শব্দ দ্রুত গণনা করুন।", path: "/tools/word-counter", keywords: ["word counter", "শব্দ গণনা", "Bangla word count"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
