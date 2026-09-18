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

```
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
```

}, []);

const closeMenu = () => {
setMenuOpen(false);
setCategoriesOpen(false);
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

const categories = [
{
name: "Image Tools",
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
tools: [
{
label: "QR Code Generator",
href: "/tools/qr-code-generator",
},
],
},
{
name: "Bangla Tools",
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
tools: [
{
label: "Unit Converter",
href: "/tools/unit-converter",
},
],
},
];

const isActive = (href: string, label: string) => {
if (label === "Products") return false;

```
if (href === "/") {
  return pathname === "/";
}

if (label === "QR Code Generator") {
  return pathname === href;
}

if (href === "/tools") {
  return (
    pathname === "/tools" ||
    (pathname.startsWith("/tools/") &&
      !pathname.startsWith("/tools/qr-code-generator"))
  );
}

return pathname === href || pathname.startsWith(`${href}/`);
```

};

const categoriesActive = pathname.startsWith("/tools");

return ( <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"> <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

```
    {/* Logo */}
    <Link
      href="/"
      onClick={closeMenu}
      className="flex min-w-0 items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900"
      aria-label="ToolBangla home"
    >
      {logoUrl && (
        <img
          src={logoUrl}
          alt=""
          className="h-10 w-auto max-w-[9rem] object-contain"
        />
      )}

      <span className="whitespace-nowrap">
        Tool<span className="text-blue-600">Bangla</span>
      </span>
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden items-center gap-7 md:flex">

      {navigation.map((item) => (
        <Link
          key={`${item.href}-${item.label}`}
          href={item.href}
          aria-current={
            isActive(item.href, item.label) ? "page" : undefined
          }
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

      {/* Categories Split Button */}
      <div className="relative">

        <div className="flex items-stretch">

          {/* Main Categories Button */}
          <button
            type="button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className={`rounded-l-lg border px-3 py-2 font-medium transition ${
              categoriesActive
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-slate-200 bg-white text-slate-700 hover:text-blue-600"
            }`}
            aria-haspopup="menu"
            aria-expanded={categoriesOpen}
          >
            Categories
          </button>

          {/* Separate Dropdown Arrow */}
          <button
            type="button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className={`rounded-r-lg border-y border-r px-2.5 py-2 transition ${
              categoriesActive
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-slate-200 bg-white text-slate-700 hover:text-blue-600"
            }`}
            aria-label="Open Categories menu"
            aria-haspopup="menu"
            aria-expanded={categoriesOpen}
          >
            <span
              className={`inline-block text-xs transition-transform duration-200 ${
                categoriesOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

        </div>

        {/* Categories Dropdown */}
        {categoriesOpen && (
          <div
            className="absolute right-0 top-full z-[100] mt-2 max-h-[75vh] w-[720px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
            role="menu"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {categories.map((category) => (
                <div key={category.name}>

                  {/* Category Title */}
                  <div className="mb-2 border-b border-slate-200 pb-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {category.name}
                    </h3>
                  </div>

                  {/* Tools */}
                  <div className="space-y-1">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={closeMenu}
                        className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                          pathname === tool.href
                            ? "bg-red-50 text-red-700"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
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

    {/* Mobile Button */}
    <button
      type="button"
      onClick={() => {
        setMenuOpen(!menuOpen);
        setCategoriesOpen(false);
      }}
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
            aria-current={
              isActive(item.href, item.label) ? "page" : undefined
            }
            className={`rounded-lg border px-3 py-3 font-medium transition ${
              isActive(item.href, item.label)
                ? "border-red-500 bg-red-50 text-red-700"
                : item.label === "Premium"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-transparent text-slate-700 hover:text-blue-600"
            }`}
          >
            {item.label}
          </Link>
        ))}

        {/* Mobile Categories */}
        <div className="mt-1">

          <button
            type="button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 font-medium transition ${
              categoriesActive
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-slate-200 text-slate-700 hover:text-blue-600"
            }`}
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
            <div className="mt-2 max-h-[65vh] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3">

              {categories.map((category) => (
                <div
                  key={category.name}
                  className="mb-4 last:mb-0"
                >

                  <h3 className="mb-1 border-b border-slate-200 px-2 pb-2 text-sm font-bold text-slate-900">
                    {category.name}
                  </h3>

                  <div>
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={closeMenu}
                        className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                          pathname === tool.href
                            ? "bg-red-50 text-red-700"
                            : "text-slate-700 hover:bg-white hover:text-blue-600"
                        }`}
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </nav>

    </div>
  )}
</header>
```

);
}
