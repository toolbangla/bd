import ToolLayout from "@/components/ToolLayout";
import TextToVoiceTool from "@/components/voice/TextToVoiceTool";

export const metadata = { title: "Text to Voice", description: "বাংলা ও English text browser-এর available voice দিয়ে শুনুন।" };

export default function TextToVoicePage() {
  return <ToolLayout><section className="px-5 py-14"><div className="text-center"><p className="font-semibold text-blue-600">VOICE TOOL</p><h1 className="mt-2 text-4xl font-bold md:text-5xl">Text to Voice</h1><p className="mx-auto mt-4 max-w-2xl text-slate-600">বাংলা বা English text লিখে আপনার device-এর available voice দিয়ে শুনুন।</p></div><div className="mt-10"><TextToVoiceTool /></div></section></ToolLayout>;
}
