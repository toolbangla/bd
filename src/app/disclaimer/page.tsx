import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <section className="px-5 py-16">
          <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <p className="font-semibold text-blue-600">
              DISCLAIMER
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Disclaimer
            </h1>

            <p className="mt-6 leading-8 text-slate-600">
              ToolBangla-এর বিভিন্ন online tool সাধারণ utility এবং
              informational purpose-এর জন্য তৈরি করা হয়েছে।
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              ToolBangla কোনো tool-এর ফলাফলকে professional, legal, medical,
              financial বা অন্য কোনো বিশেষজ্ঞ পরামর্শ হিসেবে উপস্থাপন করে না।
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              বিশেষ করে BMI Calculator-এর মতো স্বাস্থ্য সম্পর্কিত tool-এর
              ফলাফল কোনো চিকিৎসা নির্ণয়ের বিকল্প নয়।
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              গুরুত্বপূর্ণ কোনো সিদ্ধান্ত নেওয়ার আগে প্রয়োজন অনুযায়ী
              সংশ্লিষ্ট qualified professional-এর পরামর্শ নেওয়া উচিত।
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}