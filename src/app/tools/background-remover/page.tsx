import FileUtilityTool from "@/components/FileUtilityTool";

export const metadata = {
  title: "Background Remover",
  description:
    "ছবির ব্যাকগ্রাউন্ড সরিয়ে স্বচ্ছ PNG তৈরি করুন।",
};

export default function BackgroundRemoverPage() {
  return (
    <FileUtilityTool
      title="Background Remover"
      slug="background-remover"
      mode="remove-bg"
      description="ছবির ব্যাকগ্রাউন্ড সরিয়ে স্বচ্ছ PNG তৈরি করুন।"
    />
  );
}