"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    void supabase
      .from("site_settings")
      .select("logo_url")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error && data?.logo_url) setLogoUrl(data.logo_url);
      });
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigation = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/tools", label: "Products" },
    { href: "/history", label: "History" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900"
          aria-label="ToolBangla home"
        >
          {logoUrl && <img src={logoUrl} alt="" className="h-10 w-auto max-w-[9rem] object-contain" />}
          <span className="whitespace-nowrap">Tool<span className="text-blue-600">Bangla</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="font-medium text-slate-700 transition hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Contact
          </Link>

          <Link
            href="/admin"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Admin Panel
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
            {navigation.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-slate-100 py-3 font-medium text-slate-700"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-3 rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white"
            >
              Contact
            </Link>

            <Link
              href="/admin"
              onClick={closeMenu}
              className="border-b border-slate-100 py-3 font-medium text-slate-700"
            >
              Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}