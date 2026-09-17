import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "Character Counter", description: "বাংলা বা English লেখায় মোট কতটি character আছে তা গণনা করুন।", path: "/tools/character-counter", keywords: ["character counter", "অক্ষর গণনা", "text character count"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
