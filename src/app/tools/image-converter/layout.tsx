import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "Image Converter", description: "ছবি PNG, JPG বা WEBP format-এ browser-এর মধ্যেই রূপান্তর করুন।", path: "/tools/image-converter", keywords: ["image converter", "ছবি format পরিবর্তন", "PNG JPG converter"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
