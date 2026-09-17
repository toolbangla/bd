import ToolLayout from "@/components/ToolLayout";

export default function ContactPage() {
  return (
    <ToolLayout>
      <section className="px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">CONTACT</p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              যোগাযোগ
            </h1>

            <p className="mt-4 text-slate-600">
              ToolBangla সম্পর্কে কোনো প্রশ্ন, পরামর্শ বা সমস্যা জানাতে পারেন।
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold"
                >
                  আপনার নাম
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold"
                >
                  আপনার বার্তা
                </label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="আপনার বার্তা লিখুন..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700"
              >
                বার্তা পাঠান →
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-500">
              Contact form submission সুবিধা পরবর্তী ধাপে সংযুক্ত করা হবে।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}