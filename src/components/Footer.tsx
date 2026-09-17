import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold text-white"
            >
              Tool<span className="text-blue-500">Bangla</span>
            </Link>

            <p className="mt-4 max-w-sm leading-7 text-slate-400">
              সব দরকারি টুল এক জায়গায়। সহজ, দ্রুত এবং বিনামূল্যে
              অনলাইন টুল ব্যবহার করুন।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold text-white">দ্রুত লিংক</h3>

            <div className="flex flex-col gap-3">
              <Link href="/" className="hover:text-white">
                হোম
              </Link>

              <Link href="/tools" className="hover:text-white">
                সব টুল
              </Link>

              <Link href="/about" className="hover:text-white">
                আমাদের সম্পর্কে
              </Link>

              <Link href="/contact" className="hover:text-white">
                যোগাযোগ
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-bold text-white">গুরুত্বপূর্ণ</h3>

            <div className="flex flex-col gap-3">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>

              <Link href="/disclaimer" className="hover:text-white">
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="mb-4 font-bold text-white">জনপ্রিয় টুল</h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/tools/image-compressor"
                className="hover:text-white"
              >
                Image Compressor
              </Link>

              <Link
                href="/tools/image-to-pdf"
                className="hover:text-white"
              >
                Image to PDF
              </Link>

              <Link
                href="/tools/qr-code-generator"
                className="hover:text-white"
              >
                QR Code Generator
              </Link>

              <Link
                href="/tools/age-calculator"
                className="hover:text-white"
              >
                Age Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {year} ToolBangla. All rights reserved.
        </div>
      </div>
    </footer>
  );
}