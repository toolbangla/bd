"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function PercentageCalculatorPage() {
  const [number, setNumber] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (number === "" || percentage === "") {
      alert("দয়া করে দুটি ঘরই পূরণ করুন।");
      return;
    }

    const value = Number(number);
    const percent = Number(percentage);

    if (!Number.isFinite(value) || !Number.isFinite(percent)) {
      alert("দয়া করে সঠিক সংখ্যা লিখুন।");
      return;
    }

    setResult((value * percent) / 100);
  };

  const clearAll = () => {
    setNumber("");
    setPercentage("");
    setResult(null);
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              PERCENTAGE CALCULATOR
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Percentage Calculator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              যেকোনো সংখ্যার শতকরা হিসাব দ্রুত এবং সহজে করুন।
            </p>

            <div className="mt-5">
              <a
                href="/tools"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                ← সব টুল
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  সংখ্যা
                </label>

                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="যেমন: 500"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  শতকরা হার (%)
                </label>

                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="যেমন: 20"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={calculate}
                className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700"
              >
                হিসাব করুন →
              </button>

              <button
                onClick={clearAll}
                className="rounded-xl border border-slate-200 px-6 py-4 font-bold text-slate-700 hover:bg-slate-50"
              >
                পরিষ্কার করুন
              </button>
            </div>

            {result !== null && (
              <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-center">
                <p className="text-sm font-medium text-slate-600">
                  ফলাফল
                </p>

                <p className="mt-2 text-4xl font-bold text-blue-600">
                  {result}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {percentage}% of {number} = {result}
                </p>
              </div>
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              Percentage Calculator কীভাবে কাজ করে?
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              কোনো সংখ্যার নির্দিষ্ট শতাংশ বের করতে এই সূত্র ব্যবহার করা হয়:
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center font-semibold">
              (সংখ্যা × শতাংশ) ÷ 100
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              উদাহরণ: 500-এর 20% = (500 × 20) ÷ 100 = 100
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}