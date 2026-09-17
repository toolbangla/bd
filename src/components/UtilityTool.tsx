"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

type UtilityToolProps = {
  title: string;
  eyebrow?: string;
  description: string;
  slug: string;
  kind: "calculator" | "unit" | "social" | "text";
};

type UnitCategory = "Length" | "Weight" | "Temperature" | "Area" | "Volume" | "Time" | "Speed" | "Data Storage";

const units: Record<UnitCategory, Record<string, number>> = {
  Length: { Meter: 1, Kilometer: 1000, Centimeter: 0.01, Foot: 0.3048, Mile: 1609.344 },
  Weight: { Kilogram: 1, Gram: 0.001, Pound: 0.45359237, Ounce: 0.0283495 },
  Area: { "Square meter": 1, "Square kilometer": 1000000, "Square foot": 0.092903, Acre: 4046.86 },
  Volume: { Liter: 1, Milliliter: 0.001, "Cubic meter": 1000, Gallon: 3.78541 },
  Time: { Second: 1, Minute: 60, Hour: 3600, Day: 86400 },
  Speed: { "Meters/second": 1, "Kilometers/hour": 0.277778, "Miles/hour": 0.44704 },
  "Data Storage": { Byte: 1, KB: 1024, MB: 1048576, GB: 1073741824 },
  Temperature: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
};

const calculators: Record<string, { labels: string[]; calculate: (values: number[]) => number }> = {
  "emi-calculator": { labels: ["Loan amount", "Annual interest (%)", "Term (months)"], calculate: ([principal, annualRate, months]) => { const rate = annualRate / 1200; return rate ? principal * rate * (1 + rate) ** months / ((1 + rate) ** months - 1) : principal / months; } },
  "discount-calculator": { labels: ["Original price", "Discount (%)"], calculate: ([price, discount]) => price - price * discount / 100 },
  "profit-loss-calculator": { labels: ["Cost price", "Selling price"], calculate: ([cost, selling]) => selling - cost },
};

const socialSizes: Record<string, string> = {
  "facebook-cover-size": "820 × 312 px",
  "facebook-post-size": "1200 × 630 px",
  "youtube-thumbnail-size": "1280 × 720 px",
  "youtube-banner-size": "2560 × 1440 px",
  "instagram-post-size": "1080 × 1080 px",
};

export default function UtilityTool({ title, eyebrow = "TOOLBANGLA TOOL", description, slug, kind }: UtilityToolProps) {
  const calculator = calculators[slug];
  const [values, setValues] = useState<string[]>(calculator?.labels.map(() => "") ?? [""]);
  const [category, setCategory] = useState<UnitCategory>("Length");
  const [fromUnit, setFromUnit] = useState("Meter");
  const [toUnit, setToUnit] = useState("Kilometer");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const setValue = (index: number, value: string) => setValues((current) => current.map((item, itemIndex) => itemIndex === index ? value : item));
  const clear = () => { setValues(calculator?.labels.map(() => "") ?? [""]); setResult(""); setMessage(""); };

  const calculate = () => {
    setMessage("");
    if (kind === "calculator" && calculator) {
      const numbers = values.map(Number);
      if (numbers.some((number) => !Number.isFinite(number)) || (slug === "emi-calculator" && numbers[2] <= 0)) { setMessage("Please enter valid numbers in every field."); return; }
      const calculated = calculator.calculate(numbers);
      setResult(calculated.toFixed(2));
      const label = slug === "profit-loss-calculator" ? (calculated >= 0 ? "Profit" : "Loss") : "Result";
      void recordToolHistory({ tool_id: slug, tool_name: title, input: values.join(", "), output: `${label}: ${calculated.toFixed(2)}` });
      return;
    }
    if (kind === "unit") {
      const number = Number(values[0]);
      if (!Number.isFinite(number)) { setMessage("Please enter a valid number."); return; }
      let converted = 0;
      if (category === "Temperature") {
        converted = fromUnit === "Celsius" && toUnit === "Fahrenheit" ? number * 9 / 5 + 32 : fromUnit === "Fahrenheit" && toUnit === "Celsius" ? (number - 32) * 5 / 9 : fromUnit === "Celsius" && toUnit === "Kelvin" ? number + 273.15 : fromUnit === "Kelvin" && toUnit === "Celsius" ? number - 273.15 : fromUnit === "Fahrenheit" && toUnit === "Kelvin" ? (number - 32) * 5 / 9 + 273.15 : fromUnit === "Kelvin" && toUnit === "Fahrenheit" ? (number - 273.15) * 9 / 5 + 32 : number;
      } else converted = number * units[category][fromUnit] / units[category][toUnit];
      setResult(converted.toFixed(4));
      void recordToolHistory({ tool_id: slug, tool_name: title, input: `${number} ${fromUnit} to ${toUnit}`, output: converted.toFixed(4) });
      return;
    }
    if (kind === "social") {
      const output = socialSizes[slug] ?? "See platform recommendations";
      setResult(output);
      void recordToolHistory({ tool_id: slug, tool_name: title, input: "Recommended size", output });
      return;
    }
    if (!values[0].trim()) { setMessage("Please enter some text."); return; }
    const text = values[0];
    const output = slug === "bangla-to-english-helper" ? `Prepared text: ${text.trim()}` : slug === "word-counter" ? `${text.trim().split(/\s+/).length} words` : `${text.length} characters`;
    setResult(output);
    void recordToolHistory({ tool_id: slug, tool_name: title, input: text, output });
  };

  const downloadResult = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${slug}-result.txt`; link.click(); URL.revokeObjectURL(link.href);
  };

  return <ToolLayout>
    <section className="px-5 py-14"><div className="mx-auto max-w-4xl">
      <div className="text-center"><p className="font-semibold text-blue-600">{eyebrow}</p><h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">{description}</p></div>
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {kind === "unit" && <div className="mb-6 grid gap-4 md:grid-cols-3"><div><label className="text-sm font-semibold">Category</label><select value={category} onChange={(event) => { const next = event.target.value as UnitCategory; setCategory(next); setFromUnit(Object.keys(units[next])[0]); setToUnit(Object.keys(units[next])[1] ?? Object.keys(units[next])[0]); }} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">{Object.keys(units).map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="text-sm font-semibold">From</label><select value={fromUnit} onChange={(event) => setFromUnit(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">{Object.keys(units[category]).map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="text-sm font-semibold">To</label><select value={toUnit} onChange={(event) => setToUnit(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">{Object.keys(units[category]).map((item) => <option key={item}>{item}</option>)}</select></div></div>}
        <div className="space-y-4">{(calculator?.labels ?? [kind === "text" ? "Text" : "Value"]).map((label, index) => <div key={label}><label className="text-sm font-semibold">{label}</label><textarea value={values[index] ?? ""} onChange={(event) => setValue(index, event.target.value)} rows={kind === "text" ? 5 : 1} className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></div>)}</div>
        {message && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
        <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={calculate} className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700">Calculate / Generate</button><button type="button" onClick={clear} className="rounded-xl border border-slate-200 px-6 py-4 font-bold text-slate-700 hover:bg-slate-50">Clear</button></div>
        {result && <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-center"><p className="text-sm font-semibold text-slate-600">Result</p><p className="mt-2 text-3xl font-bold text-blue-700">{result}</p><button type="button" onClick={downloadResult} className="mt-4 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Download Result</button></div>}
      </div>
    </div></section>
  </ToolLayout>;
}
