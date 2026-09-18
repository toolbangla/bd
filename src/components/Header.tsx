"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
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
        if (!error && data?.logo_url) {
          setLogoUrl(data.logo_url);
        }
      });
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  };

  const navigation = [
    {
      href: "/",
      label: "Home",
      color: "#2563eb",
      bg: "#eff6ff",
      border: "#93c5fd",
      text: "#1d4ed8",
    },
    {
      href: "/about",
      label: "About",
      color: "#7c3aed",
      bg: "#f5f3ff",
      border: "#c4b5fd",
      text: "#6d28d9",
    },
    {
      href: "/contact",
      label: "Contact",
      color: "#0891b2",
      bg: "#ecfeff",
      border: "#67e8f9",
      text: "#0e7490",
    },
    {
      href: "/premium",
      label: "Premium",
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fcd34d",
      text: "#b45309",
    },
  ];

  const categories = [
    {
      name: "Image Tools",
      color: "#2563eb",
      bg: "#eff6ff",
      tools: [
        { label: "JPG → PNG", href: "/tools/jpg-to-png" },
        { label: "PNG → JPG", href: "/tools/png-to-jpg" },
        { label: "Image Compressor", href: "/tools/image-compressor" },
        { label: "Image Resizer", href: "/tools/image-resizer" },
        { label: "Image Cropper", href: "/tools/image-cropper" },
        { label: "Image Converter", href: "/tools/image-converter" },
        { label: "Image → PDF", href: "/tools/image-to-pdf" },
        { label: "Background Remover", href: "/tools/background-remover" },
      ],
    },
    {
      name: "PDF Tools",
      color: "#dc2626",
      bg: "#fef2f2",
      tools: [
        { label: "PDF → JPG", href: "/tools/pdf-to-jpg" },
        { label: "PDF → Image", href: "/tools/pdf-to-image" },
        { label: "JPG → PDF", href: "/tools/jpg-to-pdf" },
        { label: "PDF Compressor", href: "/tools/pdf-compressor" },
        { label: "PDF Merger", href: "/tools/pdf-merger" },
        { label: "PDF Splitter", href: "/tools/pdf-splitter" },
      ],
    },
    {
      name: "Calculator",
      color: "#16a34a",
      bg: "#f0fdf4",
      tools: [
        {
          label: "Percentage Calculator",
          href: "/tools/percentage-calculator",
        },
        { label: "Age Calculator", href: "/tools/age-calculator" },
        { label: "BMI Calculator", href: "/tools/bmi-calculator" },
        { label: "EMI Calculator", href: "/tools/emi-calculator" },
        {
          label: "Discount Calculator",
          href: "/tools/discount-calculator",
        },
        {
          label: "Profit/Loss Calculator",
          href: "/tools/profit-loss-calculator",
        },
      ],
    },
    {
      name: "Social Media Tools",
      color: "#db2777",
      bg: "#fdf2f8",
      tools: [
        {
          label: "Facebook Cover Size",
          href: "/tools/facebook-cover-size",
        },
        {
          label: "Facebook Post Size",
          href: "/tools/facebook-post-size",
        },
        {
          label: "YouTube Thumbnail Size",
          href: "/tools/youtube-thumbnail-size",
        },
        {
          label: "YouTube Banner Size",
          href: "/tools/youtube-banner-size",
        },
        {
          label: "Instagram Post Size",
          href: "/tools/instagram-post-size",
        },
      ],
    },
    {
      name: "QR Code",
      color: "#9333ea",
      bg: "#faf5ff",
      tools: [
        {
          label: "QR Code Generator",
          href: "/tools/qr-code-generator",
        },
      ],
    },
    {
      name: "Bangla Tools",
      color: "#ea580c",
      bg: "#fff7ed",
      tools: [
        {
          label: "বাংলা → English Text Helper",
          href: "/tools/bangla-to-english-helper",
        },
        {
          label: "বাংলা Text Counter",
          href: "/tools/bangla-text-counter",
        },
        {
          label: "Word Counter",
          href: "/tools/word-counter",
        },
        {
          label: "Character Counter",
          href: "/tools/character-counter",
        },
      ],
    },
    {
      name: "Unit Converter",
      color: "#0f766e",
      bg: "#f0fdfa",
      tools: [
        {
          label: "Unit Converter",
          href: "/tools/unit-converter",
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const categoriesActive = pathname.startsWith("/tools");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
          aria-label="ToolBangla home"
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt=""
              className="h-8 w-auto max-w-[76px] object-contain"
            />
          )}

          <span className="whitespace-nowrap text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Tool<span className="text-blue-600">Bangla</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          <button
            type="button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="rounded-lg border px-3 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            style={{
              color: categoriesActive ? "#ffffff" : "#0369a1",
              backgroundColor: categoriesActive ? "#0284c7" : "#f0f9ff",
              borderColor: "#7dd3fc",
            }}
            aria-haspopup="menu"
            aria-expanded={categoriesOpen}
          >
            Categories
          </button>

          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="rounded-lg border px-3 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              style={{
                color: isActive(item.href) ? "#ffffff" : item.text,
                backgroundColor: isActive(item.href) ? item.color : item.bg,
                borderColor: item.border,
              }}
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            {categoriesOpen && (
              <div
                className="absolute left-0 top-full z-[100] mt-2 w-[650px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-2xl"
                role="menu"
              >
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="overflow-hidden rounded-lg border border-slate-100"
                    >
                      <div
                        className="px-3 py-2 text-xs font-bold"
                        style={{
                          color: category.color,
                          backgroundColor: category.bg,
                        }}
                      >
                        {category.name}
                      </div>

                      <div className="space-y-0.5 p-1.5">
                        {category.tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={closeMenu}
                            className="block rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                            role="menuitem"
                          >
                            {tool.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setCategoriesOpen(false);
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xl text-slate-700 md:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1.5 px-3 py-3">
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-semibold"
              style={{
                color: categoriesActive ? "#ffffff" : "#0369a1",
                backgroundColor: categoriesActive ? "#0284c7" : "#f0f9ff",
                borderColor: "#7dd3fc",
              }}
              aria-expanded={categoriesOpen}
            >
              <span>Categories</span>
              <span
                className={`text-xs transition-transform duration-200 ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {categoriesOpen && (
              <div className="max-h-[55vh] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="mb-2 overflow-hidden rounded-lg border border-slate-200 last:mb-0"
                  >
                    <div
                      className="px-3 py-2 text-sm font-bold"
                      style={{
                        color: category.color,
                        backgroundColor: category.bg,
                      }}
                    >
                      {category.name}
                    </div>

                    <div className="grid grid-cols-1 gap-0.5 bg-white p-1">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={closeMenu}
                          className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        >
                          {tool.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="rounded-lg border px-3 py-2.5 text-sm font-semibold transition"
                style={{
                  color: isActive(item.href) ? "#ffffff" : item.text,
                  backgroundColor: isActive(item.href) ? item.color : item.bg,
                  borderColor: item.border,
                }}
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