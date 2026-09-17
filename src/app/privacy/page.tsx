import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <section className="px-5 py-16">
          <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <p className="font-semibold text-blue-600">
              PRIVACY POLICY
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Privacy Policy
            </h1>

            <p className="mt-5 leading-8 text-slate-600">
              ToolBangla ব্যবহারকারীদের গোপনীয়তা সম্মান করে। এই পেজে
              আমাদের ওয়েবসাইট ব্যবহারের ক্ষেত্রে তথ্য সম্পর্কিত সাধারণ
              নীতিগুলো তুলে ধরা হয়েছে।
            </p>

            <h2 className="mt-10 text-2xl font-bold">
              তথ্য সংগ্রহ
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              ToolBangla-এর অনেক টুল সরাসরি আপনার ব্রাউজারে কাজ করার জন্য
              তৈরি করা হয়েছে। কোনো নির্দিষ্ট টুলে ফাইল আপলোডের প্রয়োজন
              হলে সেই টুলের পেজে সংশ্লিষ্ট তথ্য জানানো হবে।
            </p>

            <h2 className="mt-10 text-2xl font-bold">
              Cookies
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              ভবিষ্যতে ওয়েবসাইটের কার্যকারিতা, বিশ্লেষণ বা বিজ্ঞাপনের জন্য
              cookies বা অনুরূপ প্রযুক্তি ব্যবহার করা হতে পারে।
            </p>

            <h2 className="mt-10 text-2xl font-bold">
              Third-party services
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              প্রয়োজন অনুযায়ী ToolBangla কিছু third-party service ব্যবহার
              করতে পারে। এসব service-এর নিজস্ব privacy policy থাকতে পারে।
            </p>

            <h2 className="mt-10 text-2xl font-bold">
              নীতির পরিবর্তন
            </h2>

            <p className="mt-3 leading-8 text-slate-600">
              প্রয়োজন অনুযায়ী এই Privacy Policy ভবিষ্যতে পরিবর্তন করা হতে পারে।
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}