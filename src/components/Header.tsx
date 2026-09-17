"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const pathname = usePathname();

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
    { href: "/tools/qr-code-generator", label: "QR Code Generator" },
    { href: "/tools/text-to-voice", label: "Text to Voice" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/admin", label: "Admin Panel" },
    { href: "/premium", label: "Premium" },
  ];

  const isActive = (href: string, label: string) => {
    if (label === "Products") return false;
    if (href === "/") return pathname === "/";
    if (label === "QR Code Generator") return pathname === href;
    if (href === "/tools") {
      return pathname === "/tools" || (pathname.startsWith("/tools/") && !pathname.startsWith("/tools/qr-code-generator"));
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
              aria-current={isActive(item.href, item.label) ? "page" : undefined}
              className={`rounded-lg border px-3 py-2 font-medium transition ${
                isActive(item.href, item.label)
                  ? "border-red-500 bg-red-50 text-red-700"
                  : item.label === "Premium"
                    ? "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300"
                    : "border-transparent text-slate-700 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
                aria-current={isActive(item.href, item.label) ? "page" : undefined}
                className={`rounded-lg border px-3 py-3 font-medium transition ${
                  isActive(item.href, item.label)
                    ? "border-red-500 bg-red-50 text-red-700"
                    : item.label === "Premium"
                      ? "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300"
                      : "border-transparent text-slate-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}