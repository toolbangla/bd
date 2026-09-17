"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function BMICalculatorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("দয়া করে Height এবং Weight দুটিই দিন।");
      return;
    }

    const heightCm = Number(height);
    const weightKg = Number(weight);

    if (
      !Number.isFinite(heightCm) ||
      !Number.isFinite(weightKg) ||
      heightCm <= 0 ||
      weightKg <= 0
    ) {
      alert("দয়া করে সঠিক Height এবং Weight দিন।");
      return;
    }

    const heightMeter = heightCm / 100;
    const bmi = weightKg / (heightMeter * heightMeter);

    setResult(Number(bmi.toFixed(1)));

    if (bmi < 18.5) {
      setCategory("Underweight — কম ওজন");
    } else if (bmi < 25) {
      setCategory("Normal — স্বাভাবিক ওজন");
    } else if (bmi < 30) {
      setCategory("Overweight — অতিরিক্ত ওজন");
    } else {
      setCategory("Obesity — স্থূলতা");
    }
  };

  const clearAll = () => {
    setHeight("");
    setWeight("");
    setResult(null);
    setCategory("");
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              BMI CALCULATOR
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              BMI Calculator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              আপনার Height ও Weight থেকে BMI হিসাব করুন।
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
                  Height (সেন্টিমিটার)
                </label>

                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="যেমন: 170"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Weight (কেজি)
                </label>

                <input
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="যেমন: 65"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={calculateBMI}
                className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700"
              >
                BMI হিসাব করুন →
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
                  আপনার BMI
                </p>

                <p className="mt-2 text-5xl font-bold text-blue-600">
                  {result}
                </p>

                <p className="mt-3 text-lg font-semibold text-slate-700">
                  {category}
                </p>
              </div>
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">BMI কী?</h2>

            <p className="mt-3 leading-7 text-slate-600">
              BMI বা Body Mass Index হলো Height এবং Weight ব্যবহার করে
              শরীরের ওজনের একটি সাধারণ পরিমাপ।
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-2 bg-slate-50 px-4 py-3 font-semibold">
                <span>BMI</span>
                <span>সাধারণ শ্রেণি</span>
              </div>

              <div className="grid grid-cols-2 border-t border-slate-200 px-4 py-3">
                <span>18.5-এর কম</span>
                <span>কম ওজন</span>
              </div>

              <div className="grid grid-cols-2 border-t border-slate-200 px-4 py-3">
                <span>18.5 – 24.9</span>
                <span>স্বাভাবিক</span>
              </div>

              <div className="grid grid-cols-2 border-t border-slate-200 px-4 py-3">
                <span>25 – 29.9</span>
                <span>অতিরিক্ত ওজন</span>
              </div>

              <div className="grid grid-cols-2 border-t border-slate-200 px-4 py-3">
                <span>30 বা তার বেশি</span>
                <span>স্থূলতা</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              নোট: BMI একটি সাধারণ হিসাব। এটি কোনো চিকিৎসা নির্ণয় নয়।
              স্বাস্থ্য সংক্রান্ত সিদ্ধান্তের জন্য চিকিৎসকের পরামর্শ নিন।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}