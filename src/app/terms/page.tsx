import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <section className="px-5 py-16">
          <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <p className="font-semibold text-blue-600">
              TERMS & CONDITIONS
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Terms & Conditions
            </h1>

            <h2 className="mt-10 text-2xl font-bold">
              ওয়েবসাইট ব্যবহার
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              ToolBangla ব্যবহার করার মাধ্যমে আপনি এই শর্তগুলো মেনে
              ওয়েবসাইট ব্যবহার করতে সম্মত হচ্ছেন।
            </p>

            <h2 className="mt-10 text-2xl font-bold">
              Tool-এর ব্যবহার
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              ToolBangla-এর বিভিন্ন tool সাধারণ অনলাইন utility হিসেবে
              প্রদান করা হয়। গুরুত্বপূর্ণ সিদ্ধান্তের ক্ষেত্রে tool-এর
              ফলাফল যাচাই করে নেওয়া উচিত।
            </p>

            <h2 className="mt-10 text-2xl font-bold">
              সেবা পরিবর্তন
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              ToolBangla ভবিষ্যতে যেকোনো tool, feature বা website section
              পরিবর্তন, যোগ অথবা বন্ধ করার অধিকার রাখে।
            </p>

            <h2 className="mt-10 text-2xl font-bold">
              দায়বদ্ধতা
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              ToolBangla-এর tool-এর ফলাফল ব্যবহার করে নেওয়া কোনো সিদ্ধান্তের
              জন্য ব্যবহারকারীকে নিজস্ব যাচাই করতে হবে।
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}