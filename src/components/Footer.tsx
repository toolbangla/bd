import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-slate-900"
            >
              Tool<span className="text-blue-600">Bangla</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              সহজ, দ্রুত ও বিনামূল্যে প্রয়োজনীয় অনলাইন টুল এক জায়গায়।
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">দরকারি লিংক</h3>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                href="/tools"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Tools
              </Link>

              <Link
                href="/about"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">গুরুত্বপূর্ণ</h3>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/disclaimer"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Disclaimer
              </Link>

              <Link
                href="/admin"
                className="text-sm font-medium text-slate-600 transition hover:text-red-600"
              >
                Admin Panel
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">ToolBangla</h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              আপনার প্রয়োজনীয় অনলাইন টুলগুলো সহজে ব্যবহার করুন।
            </p>

            <Link
              href="/premium"
              className="mt-4 inline-flex rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
            >
              Premium
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-5 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ToolBangla. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}