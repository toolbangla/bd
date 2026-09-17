"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-extrabold tracking-tight text-slate-900"
        >
          Tool<span className="text-blue-600">Bangla</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            হোম
          </Link>

          <Link
            href="/tools"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            সব টুল
          </Link>

          <Link
            href="/tools"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Image Tools
          </Link>

          <Link
            href="/tools"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Calculators
          </Link>

          <Link
            href="/about"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            আমাদের সম্পর্কে
          </Link>

          <Link
            href="/contact"
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            যোগাযোগ
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xl md:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="border-b border-slate-100 py-3 font-medium text-slate-700"
            >
              হোম
            </Link>

            <Link
              href="/tools"
              onClick={closeMenu}
              className="border-b border-slate-100 py-3 font-medium text-slate-700"
            >
              সব টুল
            </Link>

            <Link
              href="/tools"
              onClick={closeMenu}
              className="border-b border-slate-100 py-3 font-medium text-slate-700"
            >
              Image Tools
            </Link>

            <Link
              href="/tools"
              onClick={closeMenu}
              className="border-b border-slate-100 py-3 font-medium text-slate-700"
            >
              Calculators
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="border-b border-slate-100 py-3 font-medium text-slate-700"
            >
              আমাদের সম্পর্কে
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-3 rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white"
            >
              যোগাযোগ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}