"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tools = [
  {
    icon: "🖼️",
    title: "Image Compressor",
    description: "ছবির সাইজ কমিয়ে নিন।",
    href: "/tools/image-compressor",
    category: "Image",
  },
  {
    icon: "📐",
    title: "Image Resizer",
    description: "ছবির Width ও Height পরিবর্তন করুন।",
    href: "/tools/image-resizer",
    category: "Image",
  },
  {
    icon: "🔄",
    title: "JPG to PNG",
    description: "JPG ছবি PNG-তে পরিবর্তন করুন।",
    href: "/tools/jpg-to-png",
    category: "Image",
  },
  {
    icon: "🔄",
    title: "PNG to JPG",
    description: "PNG ছবি JPG-তে পরিবর্তন করুন।",
    href: "/tools/png-to-jpg",
    category: "Image",
  },
  {
    icon: "📄",
    title: "Image to PDF",
    description: "ছবি থেকে PDF তৈরি করুন।",
    href: "/tools/image-to-pdf",
    category: "PDF",
  },
  {
    icon: "📑",
    title: "PDF to Image",
    description: "PDF পেজ Image-এ পরিবর্তন করুন।",
    href: "/tools/pdf-to-image",
    category: "PDF",
  },
  {
    icon: "🧮",
    title: "Percentage Calculator",
    description: "শতকরা হিসাব করুন।",
    href: "/tools/percentage-calculator",
    category: "Calculator",
  },
  {
    icon: "🎂",
    title: "Age Calculator",
    description: "জন্মতারিখ থেকে বয়স হিসাব করুন।",
    href: "/tools/age-calculator",
    category: "Calculator",
  },
  {
    icon: "⚖️",
    title: "BMI Calculator",
    description: "BMI হিসাব করুন।",
    href: "/tools/bmi-calculator",
    category: "Calculator",
  },
  {
    icon: "📱",
    title: "QR Code Generator",
    description: "Text বা URL থেকে QR Code তৈরি করুন।",
    href: "/tools/qr-code-generator",
    category: "Other",
  },
  {
    icon: "✂️",
    title: "Background Remover",
    description: "ছবির background remove করে transparent PNG তৈরি করুন।",
    href: "/tools/background-remover",
    category: "Image",
  },
];

const categories = ["All", "Image", "PDF", "Calculator", "Other"];

const dailyPosts = [
  {
    title: "আজকের শুভেচ্ছা 🌟",
    message: "আজকের দিনটি হোক নতুন কিছু শেখা ও করার দিন।",
  },
  {
    title: "ToolBangla-তে স্বাগতম 🚀",
    message: "আপনার প্রয়োজনীয় কাজ সহজেই করুন এবং সময় বাঁচান।",
  },
  {
    title: "আজ একটু এগিয়ে যাই ⚡",
    message: "ছোট ছোট কাজ সহজ করেই বড় সময় বাঁচানো যায়।",
  },
  {
    title: "আজকের অনুপ্রেরণা 💙",
    message: "নতুন কিছু তৈরি করুন, সহজে কাজ করুন, এগিয়ে যান।",
  },
  {
    title: "শুভ দিন ✨",
    message: "আপনার প্রতিদিনের digital কাজ আরও সহজ হোক।",
  },
  {
    title: "আজকের লক্ষ্য 🎯",
    message:
      "আজকের কাজগুলো দ্রুত শেষ করে নিজের জন্য একটু সময় রাখুন।",
  },
  {
    title: "Productive Day 🌿",
    message:
      "ToolBangla-এর সাথে আজকের দিনটাও হোক productive।",
  },
  {
    title: "সময় বাঁচান 💡",
    message:
      "আপনার প্রয়োজনীয় online tools এক জায়গায় ব্যবহার করুন।",
  },
  {
    title: "শুভ সকাল ☀️",
    message: "আজ যা করার, সহজভাবে শুরু করুন। শুভ দিন!",
  },
  {
    title: "আজকের বার্তা 🛠️",
    message:
      "আপনার প্রয়োজনীয় tools এক জায়গায় — ToolBangla-তে স্বাগতম।",
  },
  {
    title: "সুন্দর একটি দিন ❤️",
    message:
      "আজকের দিনটি হোক সুন্দর, সহজ এবং সফল।",
  },
  {
    title: "Keep Going 🚀",
    message:
      "কাজের ঝামেলা কমান, সময় বাঁচান, এগিয়ে যান।",
  },
];

const weatherCities = [
  {
    name: "Dhaka",
    label: "ঢাকা",
    latitude: 23.8103,
    longitude: 90.4125,
  },
  {
    name: "Khulna",
    label: "খুলনা",
    latitude: 22.8456,
    longitude: 89.5403,
  },
  {
    name: "Chattogram",
    label: "চট্টগ্রাম",
    latitude: 22.3569,
    longitude: 91.7832,
  },
  {
    name: "Rajshahi",
    label: "রাজশাহী",
    latitude: 24.3745,
    longitude: 88.6042,
  },
  {
    name: "Sylhet",
    label: "সিলেট",
    latitude: 24.8949,
    longitude: 91.8687,
  },
  {
    name: "Barishal",
    label: "বরিশাল",
    latitude: 22.701,
    longitude: 90.3535,
  },
];

function getWeatherEmoji(code: number) {
  if (code === 0) return "☀️";

  if (code === 1 || code === 2) {
    return "🌤️";
  }

  if (code === 3) {
    return "☁️";
  }

  if (
    code === 45 ||
    code === 48
  ) {
    return "🌫️";
  }

  if (
    code === 51 ||
    code === 53 ||
    code === 55 ||
    code === 56 ||
    code === 57
  ) {
    return "🌦️";
  }

  if (
    code === 61 ||
    code === 63 ||
    code === 65 ||
    code === 66 ||
    code === 67
  ) {
    return "🌧️";
  }

  if (
    code === 71 ||
    code === 73 ||
    code === 75 ||
    code === 77
  ) {
    return "❄️";
  }

  if (
    code === 80 ||
    code === 81 ||
    code === 82
  ) {
    return "🌦️";
  }

  if (
    code === 95 ||
    code === 96 ||
    code === 99
  ) {
    return "⛈️";
  }

  return "🌤️";
}

function getBanglaDay(day: number) {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  return days[day];
}

function getBanglaMonth(month: number) {
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  return months[month];
}

export default function HomePage() {
  const [now, setNow] = useState(new Date());

  const [selectedCity, setSelectedCity] = useState(
    weatherCities[0]
  );

  const [temperature, setTemperature] = useState<number | null>(
    null
  );

  const [weatherCode, setWeatherCode] = useState<number | null>(
    null
  );

  const [weatherLoading, setWeatherLoading] = useState(true);

  const [weatherError, setWeatherError] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadWeather() {
      try {
        setWeatherLoading(true);
        setWeatherError(false);

        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${selectedCity.latitude}` +
          `&longitude=${selectedCity.longitude}` +
          `&current=temperature_2m,weather_code` +
          `&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = await response.json();

        setTemperature(
          typeof data?.current?.temperature_2m === "number"
            ? data.current.temperature_2m
            : null
        );

        setWeatherCode(
          typeof data?.current?.weather_code === "number"
            ? data.current.weather_code
            : null
        );
      } catch (error) {
        console.error("Weather error:", error);

        setTemperature(null);
        setWeatherCode(null);
        setWeatherError(true);
      } finally {
        setWeatherLoading(false);
      }
    }

    loadWeather();

    const weatherTimer = setInterval(
      loadWeather,
      10 * 60 * 1000
    );

    return () => clearInterval(weatherTimer);
  }, [selectedCity]);

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();

  const dailyPost =
    dailyPosts[
      (currentYear * 12 + currentMonth + today) %
        dailyPosts.length
    ];

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        category === "All" ||
        tool.category === category;

      const matchesSearch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const calendar = useMemo(() => {
    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();

    const daysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const cells: Array<number | null> = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }

    return cells;
  }, [currentYear, currentMonth]);

  const formattedTime = now.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  );

  const formattedDate = `${today} ${getBanglaMonth(
    currentMonth
  )} ${currentYear}`;

  const banglaDay = getBanglaDay(now.getDay());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      {/* =========================
          DASHBOARD
      ========================== */}
      <section className="bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-sm font-semibold text-blue-300">
              ToolBangla Dashboard
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              আজকের Dashboard
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              সময়, তারিখ, আবহাওয়া ও আজকের বিশেষ বার্তা এক জায়গায়
              দেখুন।
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* DATE */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    আজকের তারিখ
                  </p>

                  <p className="mt-3 text-3xl font-black">
                    {today}
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {getBanglaMonth(currentMonth)}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {currentYear} · {banglaDay}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-500/10 px-4 py-3 text-3xl">
                  📅
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-500">
                  Full Date
                </p>

                <p className="mt-1 text-sm font-bold text-slate-200">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* LIVE TIME */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    Live Time
                  </p>

                  <p className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                    {formattedTime}
                  </p>

                  <p className="mt-3 text-sm text-green-400">
                    ● Live clock
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-3xl">
                  🕐
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-500">
                  আপনার বর্তমান local time
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  {banglaDay}, {today} {getBanglaMonth(currentMonth)}
                </p>
              </div>
            </div>

            {/* WEATHER */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    Live Weather
                  </p>

                  {weatherLoading ? (
                    <p className="mt-4 text-3xl font-black">
                      Loading...
                    </p>
                  ) : weatherError ? (
                    <p className="mt-4 text-lg font-bold text-red-300">
                      Weather unavailable
                    </p>
                  ) : (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-4xl">
                        {weatherCode !== null
                          ? getWeatherEmoji(weatherCode)
                          : "🌤️"}
                      </span>

                      <span className="text-4xl font-black">
                        {temperature !== null
                          ? `${Math.round(temperature)}°C`
                          : "--"}
                      </span>
                    </div>
                  )}

                  <p className="mt-2 text-sm text-slate-400">
                    {selectedCity.label}
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-500/10 px-4 py-3 text-3xl">
                  🌤️
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="weather-city"
                  className="mb-2 block text-xs font-semibold text-slate-500"
                >
                  City নির্বাচন করুন
                </label>

                <select
                  id="weather-city"
                  value={selectedCity.name}
                  onChange={(event) => {
                    const city = weatherCities.find(
                      (item) =>
                        item.name === event.target.value
                    );

                    if (city) {
                      setSelectedCity(city);
                    }
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-blue-500"
                >
                  {weatherCities.map((city) => (
                    <option
                      key={city.name}
                      value={city.name}
                    >
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* CALENDAR + DAILY MESSAGE */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* CALENDAR */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                    Monthly Calendar
                  </p>

                  <h3 className="mt-1 text-xl font-black">
                    {getBanglaMonth(currentMonth)} {currentYear}
                  </h3>
                </div>

                <div className="rounded-2xl bg-white/10 px-4 py-3 text-2xl">
                  🗓️
                </div>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-2">
                {[
                  "রবি",
                  "সোম",
                  "মঙ্গল",
                  "বুধ",
                  "বৃহ",
                  "শুক্র",
                  "শনি",
                ].map((day) => (
                  <div
                    key={day}
                    className="py-2 text-center text-xs font-bold text-slate-500"
                  >
                    {day}
                  </div>
                ))}

                {calendar.map((day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className={`flex aspect-square items-center justify-center rounded-xl text-sm font-bold transition ${
                      day === null
                        ? "text-transparent"
                        : day === today
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {day ?? ""}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                আজকের দিন
              </div>
            </div>

            {/* DAILY POST */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-6 shadow-xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                      Daily Welcome
                    </p>

                    <h3 className="mt-3 text-2xl font-black text-white">
                      {dailyPost.title}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-white/10 px-4 py-3 text-3xl">
                    💙
                  </div>
                </div>

                <p className="mt-5 text-base font-semibold leading-8 text-slate-200">
                  {dailyPost.message}
                </p>

                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    আজকের দিন
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-200">
                    {banglaDay}, {today}{" "}
                    {getBanglaMonth(currentMonth)} {currentYear}
                  </p>
                </div>

                <Link
                  href="#tools"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50"
                >
                  আজকের Tools ব্যবহার করুন →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden bg-slate-950 px-4 pb-20 pt-16 text-white">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Free Online Tools
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            আপনার প্রয়োজনীয়
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              সব Online Tools
            </span>
            এক জায়গায়
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Image, PDF, Calculator এবং আরও অনেক দরকারি tools
            দ্রুত, সহজে ও নিরাপদে ব্যবহার করুন।
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <a
              href="#tools"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Explore Tools →
            </a>

            <Link
              href="/tools/background-remover"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
            >
              ✂️ Background Remover
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          TOOLS
      ========================== */}
      <section
        id="tools"
        className="scroll-mt-20 bg-white px-4 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black text-blue-600">
                TOOLBANGLA TOOLS
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                প্রয়োজনীয় Tool খুঁজে নিন
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                আপনার কাজ অনুযায়ী tool নির্বাচন করুন এবং কয়েক
                সেকেন্ডেই কাজ শেষ করুন।
              </p>
            </div>

            <div className="w-full lg:max-w-sm">
              <label
                htmlFor="tool-search"
                className="sr-only"
              >
                Search tools
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔎
                </span>

                <input
                  id="tool-search"
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Tool search করুন..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  category === item
                    ? "bg-slate-950 text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* TOOL GRID */}
          {filteredTools.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl transition group-hover:bg-blue-50">
                      {tool.icon}
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-900">
                    {tool.title}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {tool.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold text-slate-400">
                      Open Tool
                    </span>

                    <span className="text-lg font-black text-blue-600 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
              <div className="text-5xl">🔎</div>

              <h3 className="mt-4 text-xl font-black">
                কোনো Tool পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                অন্য keyword দিয়ে আবার search করুন।
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          WHY TOOLBANGLA
      ========================== */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black text-blue-600">
              WHY TOOLBANGLA
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              কাজ সহজ করার জন্য তৈরি
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              ToolBangla-এর লক্ষ্য হলো প্রতিদিনের প্রয়োজনীয়
              ছোট-বড় online কাজগুলোকে সহজ ও দ্রুত করা।
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">⚡</div>

              <h3 className="mt-5 text-lg font-black">
                Fast
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                প্রয়োজনীয় কাজ দ্রুত সম্পন্ন করার জন্য সহজ
                interface।
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">🎯</div>

              <h3 className="mt-5 text-lg font-black">
                Simple
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                জটিল setup ছাড়াই প্রয়োজনীয় tool ব্যবহার করুন।
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">🔒</div>

              <h3 className="mt-5 text-lg font-black">
                Secure
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                আপনার কাজকে সহজ ও নিরাপদ রাখার দিকে গুরুত্ব
                দেওয়া হয়েছে।
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">📱</div>

              <h3 className="mt-5 text-lg font-black">
                Responsive
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Desktop, tablet এবং mobile—সব device-এ ব্যবহার
                করা যায়।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FEATURED BACKGROUND REMOVER
      ========================== */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-10 lg:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-black text-blue-300">
                  AI IMAGE TOOL
                </span>

                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  ছবির Background remove করুন
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  AI-powered Background Remover দিয়ে ছবির
                  background remove করে transparent PNG তৈরি
                  করুন।
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/tools/background-remover"
                    className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
                  >
                    Try Background Remover →
                  </Link>

                  <a
                    href="#tools"
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Browse All Tools
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-800 p-4">
                      <div className="flex aspect-square items-center justify-center rounded-2xl bg-slate-700 text-6xl">
                        🧑
                      </div>

                      <p className="mt-3 text-center text-xs font-bold text-slate-400">
                        Original
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <div
                        className="flex aspect-square items-center justify-center rounded-2xl text-6xl"
                        style={{
                          backgroundImage:
                            "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)",
                          backgroundSize: "20px 20px",
                          backgroundPosition:
                            "0 0, 0 10px, 10px -10px, -10px 0px",
                        }}
                      >
                        🧑
                      </div>

                      <p className="mt-3 text-center text-xs font-bold text-slate-500">
                        Transparent PNG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================== */}
      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/20">
            🛠️
          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-5xl">
            আজকের কাজটা সহজ করে ফেলুন
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            ToolBangla-তে প্রয়োজনীয় online tools এক জায়গায়
            ব্যবহার করুন এবং আপনার valuable সময় বাঁচান।
          </p>

          <a
            href="#tools"
            className="mt-8 inline-flex rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
          >
            Explore All Tools →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}