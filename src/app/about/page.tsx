import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <section className="px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="font-semibold text-blue-600">TOOLBANGLA</p>

              <h1 className="mt-2 text-4xl font-bold md:text-5xl">
                আমাদের সম্পর্কে
              </h1>

              <p className="mt-4 text-slate-600">
                সব দরকারি টুল এক জায়গায়।
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-bold">
                  ToolBangla কী?
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  ToolBangla হলো একটি বাংলা-কেন্দ্রিক অনলাইন টুল প্ল্যাটফর্ম,
                  যেখানে দৈনন্দিন প্রয়োজনীয় বিভিন্ন টুল সহজভাবে ব্যবহার করা যায়।
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-bold">
                  আমাদের লক্ষ্য
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  জটিল সফটওয়্যার বা অতিরিক্ত প্রযুক্তিগত জ্ঞান ছাড়াই
                  সাধারণ ব্যবহারকারীরা যেন অনলাইনে প্রয়োজনীয় কাজ করতে পারেন,
                  সেটিই ToolBangla-এর অন্যতম লক্ষ্য।
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-bold">
                  আমাদের টুল
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  Image, PDF, QR Code এবং বিভিন্ন Calculator-এর পাশাপাশি
                  ভবিষ্যতে আরও অনেক দরকারি অনলাইন টুল যুক্ত করা হবে।
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}