import { createToolMetadata } from "@/lib/seo";
export const metadata = createToolMetadata({ title: "BMI Calculator", description: "Height ও weight দিয়ে BMI হিসাব করুন এবং সাধারণ BMI category দেখুন।", path: "/tools/bmi-calculator", keywords: ["BMI calculator", "BMI হিসাব", "ওজন ক্যালকুলেটর"] });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
