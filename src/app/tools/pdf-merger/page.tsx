import PdfUtilityTool from "@/components/PdfUtilityTool";
export const metadata = { title: "PDF Merger" };
export default function Page() { return <PdfUtilityTool title="PDF Merger" slug="pdf-merger" action="merge" description="একাধিক PDF একত্র করে একটি ফাইল তৈরি করুন।" />; }
