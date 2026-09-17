"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tools = [
  {
    icon: "🖼️",
    title: "Image Compressor",
    description: "ছবির সাইজ কমিয়ে নিন।",
    href: "/tools/image-compressor",
    category: "Image",
  },
  {
    icon: "📐",
    title: "Image Resizer",
    description: "ছবির Width ও Height পরিবর্তন করুন।",
    href: "/tools/image-resizer",
    category: "Image",
  },
  {
    icon: "🔄",
    title: "JPG to PNG",
    description: "JPG ছবি PNG-তে পরিবর্তন করুন।",
    href: "/tools/jpg-to-png",
    category: "Image",
  },
  {
    icon: "🔄",
    title: "PNG to JPG",
    description: "PNG ছবি JPG-তে পরিবর্তন করুন।",
    href: "/tools/png-to-jpg",
    category: "Image",
  },
  {
    icon: "📄",
    title: "Image to PDF",
    description: "ছবি থেকে PDF তৈরি করুন।",
    href: "/tools/image-to-pdf",
    category: "PDF",
  },
  {
    icon: "📑",
    title: "PDF to Image",
    description: "PDF পেজ Image-এ পরিবর্তন করুন।",
    href: "/tools/pdf-to-image",
    category: "PDF",
  },
  {
    icon: "📱",
    title: "QR Code Generator",
    description: "Text বা URL থেকে QR Code তৈরি করুন।",
    href: "/tools/qr-code-generator",
    category: "Other",
  },
  {
    icon: "🧮",
    title: "Percentage Calculator",
    description: "শতকরা হিসাব করুন।",
    href: "/tools/percentage-calculator",
    category: "Calculator",
  },
  {
    icon: "🎂",
    title: "Age Calculator",
    description: "জন্মতারিখ থেকে বয়স হিসাব করুন।",
    href: "/tools/age-calculator",
    category: "Calculator",
  },
  {
    icon: "⚖️",
    title: "BMI Calculator",
    description: "Height ও Weight থেকে BMI হিসাব করুন।",
    href: "/tools/bmi-calculator",
    category: "Calculator",
  },
  { icon: "✂️", title: "Image Cropper", description: "ছবির অংশ কেটে নিন।", href: "/tools/image-cropper", category: "Image" },
  { icon: "🎨", title: "Image Converter", description: "ছবির format পরিবর্তন করুন।", href: "/tools/image-converter", category: "Image" },
  { icon: "🪄", title: "Background Remover", description: "সাদা background সরান।", href: "/tools/background-remover", category: "Image" },
  { icon: "🖼️", title: "PDF to JPG", description: "PDF workflow-এর জন্য প্রস্তুত করুন।", href: "/tools/pdf-to-jpg", category: "PDF" },
  { icon: "📄", title: "JPG to PDF", description: "ছবি থেকে PDF বানান।", href: "/tools/jpg-to-pdf", category: "PDF" },
  { icon: "📦", title: "PDF Compressor", description: "PDF optimize করুন।", href: "/tools/pdf-compressor", category: "PDF" },
  { icon: "🧩", title: "PDF Merger", description: "PDF একত্র করুন।", href: "/tools/pdf-merger", category: "PDF" },
  { icon: "🔪", title: "PDF Splitter", description: "PDF page আলাদা করুন।", href: "/tools/pdf-splitter", category: "PDF" },
  { icon: "💳", title: "EMI Calculator", description: "মাসিক কিস্তি হিসাব করুন।", href: "/tools/emi-calculator", category: "Calculator" },
  { icon: "🏷️", title: "Discount Calculator", description: "ছাড়ের দাম হিসাব করুন।", href: "/tools/discount-calculator", category: "Calculator" },
  { icon: "📈", title: "Profit/Loss Calculator", description: "লাভ বা ক্ষতি হিসাব করুন।", href: "/tools/profit-loss-calculator", category: "Calculator" },
  { icon: "📏", title: "Unit Converter", description: "বিভিন্ন unit রূপান্তর করুন।", href: "/tools/unit-converter", category: "Other" },
  { icon: "📘", title: "Facebook Cover Size", description: "সঠিক cover dimension জানুন।", href: "/tools/facebook-cover-size", category: "Other" },
  { icon: "📘", title: "Facebook Post Size", description: "সঠিক post dimension জানুন।", href: "/tools/facebook-post-size", category: "Other" },
  { icon: "▶️", title: "YouTube Thumbnail Size", description: "Thumbnail dimension জানুন।", href: "/tools/youtube-thumbnail-size", category: "Other" },
  { icon: "▶️", title: "YouTube Banner Size", description: "Banner dimension জানুন।", href: "/tools/youtube-banner-size", category: "Other" },
  { icon: "📸", title: "Instagram Post Size", description: "Post dimension জানুন।", href: "/tools/instagram-post-size", category: "Other" },
  { icon: "বাংলা", title: "বাংলা → English Helper", description: "বাংলা text প্রস্তুত করুন।", href: "/tools/bangla-to-english-helper", category: "Other" },
  { icon: "🔢", title: "বাংলা Text Counter", description: "বাংলা text গণনা করুন।", href: "/tools/bangla-text-counter", category: "Other" },
  { icon: "🔤", title: "Word Counter", description: "শব্দ গণনা করুন।", href: "/tools/word-counter", category: "Other" },
  { icon: "🔠", title: "Character Counter", description: "character গণনা করুন।", href: "/tools/character-counter", category: "Other" },
];

const categories = ["All", "Image", "PDF", "Calculator", "Other"];

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const query = search.toLowerCase().trim();

    return tools.filter((tool) => {
      const categoryMatch =
        category === "All" || tool.category === category;

      const searchMatch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              ToolBangla
            </p>

            <h1 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">
              সব অনলাইন টুল
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              আপনার প্রয়োজনীয় টুল খুঁজে নিন এবং সহজেই ব্যবহার করুন।
            </p>

            <div className="mx-auto mt-8 max-w-2xl">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="টুল খুঁজুন..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-md outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={
                    category === item
                      ? "rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white"
                      : "rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }
                >
                  {item === "All" && "সব টুল"}
                  {item === "Image" && "🖼️ Image"}
                  {item === "PDF" && "📄 PDF"}
                  {item === "Calculator" && "🧮 Calculator"}
                  {item === "Other" && "⚙️ Other"}
                </button>
              ))}
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                      {tool.icon}
                    </div>

                    <h2 className="mt-5 text-lg font-extrabold text-slate-900 group-hover:text-blue-600">
                      {tool.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {tool.description}
                    </p>

                    <div className="mt-5 text-sm font-bold text-blue-600">
                      ব্যবহার করুন →
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="text-4xl">🔍</div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  কোনো টুল পাওয়া যায়নি
                </h2>

                <p className="mt-2 text-slate-600">
                  অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন।
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
                >
                  সব টুল দেখুন
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}