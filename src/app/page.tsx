"use client";

import Link from "next/link";
import { useState } from "react";
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
    description: "BMI হিসাব করুন।",
    href: "/tools/bmi-calculator",
    category: "Calculator",
  },
  {
    icon: "📱",
    title: "QR Code Generator",
    description: "Text বা URL থেকে QR Code তৈরি করুন।",
    href: "/tools/qr-code-generator",
    category: "Other",
  },
];

const categories = ["All", "Image", "PDF", "Calculator", "Other"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      category === "All" || tool.category === category;

    const matchesSearch =
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-5 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
                সহজ • দ্রুত • বিনামূল্যে
              </div>

              <h1 className="text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl">
                সব দরকারি টুল
                <span className="block text-blue-600">
                  এক জায়গায়
                </span>
              </h1>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Image, PDF, QR Code এবং Calculator-এর দরকারি
                অনলাইন টুল সহজেই ব্যবহার করুন।
              </p>

              <div className="mx-auto mt-8 max-w-2xl">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="কোন টুলটি খুঁজছেন?"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="mt-7">
                <Link
                  href="/tools"
                  className="inline-block rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white hover:bg-blue-700"
                >
                  সব টুল দেখুন →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-slate-900">
                জনপ্রিয় অনলাইন টুল
              </h2>

              <p className="mt-3 text-slate-600">
                আপনার প্রয়োজন অনুযায়ী টুল নির্বাচন করুন।
              </p>
            </div>

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

                    <h3 className="mt-5 text-lg font-extrabold text-slate-900 group-hover:text-blue-600">
                      {tool.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {tool.description}
                    </p>

                    <div className="mt-5 text-sm font-bold text-blue-600">
                      টুল ব্যবহার করুন →
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="text-4xl">🔍</div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  কোনো টুল পাওয়া যায়নি
                </h3>

                <p className="mt-2 text-slate-600">
                  অন্য কোনো নাম দিয়ে খুঁজে দেখুন।
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-slate-900">
                কেন ToolBangla?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center">
                <div className="text-4xl">⚡</div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  দ্রুত
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  সহজ interface-এর মাধ্যমে দ্রুত কাজ করুন।
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center">
                <div className="text-4xl">🔒</div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  নিরাপদ
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  ব্রাউজারে কাজ করা টুলগুলো সরাসরি ব্যবহার করুন।
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center">
                <div className="text-4xl">🆓</div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  বিনামূল্যে
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  দরকারি অনলাইন টুল সহজেই বিনামূল্যে ব্যবহার করুন।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-blue-600 px-6 py-12 text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                আপনার প্রয়োজনীয় টুল খুঁজে নিন
              </h2>

              <p className="mt-4 text-blue-100">
                সব দরকারি টুল এখন এক জায়গায়।
              </p>

              <Link
                href="/tools"
                className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-blue-600 hover:bg-slate-100"
              >
                সব টুল দেখুন
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}