"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      alert("দয়া করে জন্মতারিখ নির্বাচন করুন।");
      return;
    }

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    if (birth > today) {
      alert("জন্মতারিখ ভবিষ্যতের তারিখ হতে পারে না।");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;

      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
    });

    void recordToolHistory({
      tool_id: "age-calculator",
      tool_name: "Age Calculator",
      input: `Birth date: ${birthDate}`,
      output: `${years} years, ${months} months, ${days} days`,
    });
  };

  const clearAll = () => {
    setBirthDate("");
    setResult(null);
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              AGE CALCULATOR
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Age Calculator
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              আপনার জন্মতারিখ থেকে সঠিক বয়স বছর, মাস ও দিন হিসেবে হিসাব করুন।
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
            <label className="text-sm font-semibold text-slate-700">
              আপনার জন্মতারিখ
            </label>

            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={calculateAge}
                className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700"
              >
                বয়স হিসাব করুন →
              </button>

              <button
                onClick={clearAll}
                className="rounded-xl border border-slate-200 px-6 py-4 font-bold text-slate-700 hover:bg-slate-50"
              >
                পরিষ্কার করুন
              </button>
            </div>

            {result && (
              <div className="mt-8 rounded-2xl bg-blue-50 p-6">
                <p className="text-center text-sm font-medium text-slate-600">
                  আপনার বর্তমান বয়স
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-3xl font-bold text-blue-600">
                      {result.years}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      বছর
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-3xl font-bold text-blue-600">
                      {result.months}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      মাস
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-3xl font-bold text-blue-600">
                      {result.days}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      দিন
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              Age Calculator কী?
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              জন্মতারিখ দেওয়ার মাধ্যমে আপনার বর্তমান বয়স কত বছর,
              কত মাস এবং কত দিন হয়েছে তা এই টুল দিয়ে সহজেই জানা যায়।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}