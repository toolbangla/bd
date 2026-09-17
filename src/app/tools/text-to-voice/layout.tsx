import { createToolMetadata } from "@/lib/seo";

export const metadata = createToolMetadata({
  title: "Text to Voice",
  description: "বাংলা ও English text browser-এর available voice দিয়ে শুনুন।",
  path: "/tools/text-to-voice",
  keywords: ["text to voice", "বাংলা text to speech", "browser voice", "speech synthesis"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
