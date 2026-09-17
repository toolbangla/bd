"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type Pricing = { single_use_price: number | null; five_use_price: number | null };

export default function AdminPremiumPricing() {
  const [pricing, setPricing] = useState<Pricing>({ single_use_price: null, five_use_price: null });
  const [single, setSingle] = useState("");
  const [five, setFive] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const supabase = getSupabaseBrowserClient();
    const session = await supabase?.auth.getSession();
    const token = session?.data.session?.access_token;
    if (!token) return;
    const response = await fetch("/api/admin/premium-pricing", { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) return;
    const value = await response.json() as Pricing;
    setPricing(value); setSingle(value.single_use_price == null ? "" : String(value.single_use_price)); setFive(value.five_use_price == null ? "" : String(value.five_use_price));
  };

  useEffect(() => { void Promise.resolve().then(load); }, []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setMessage("");
    const supabase = getSupabaseBrowserClient();
    const session = await supabase?.auth.getSession();
    const token = session?.data.session?.access_token;
    if (!token) { setSaving(false); setMessage("Admin authentication required."); return; }
    const response = await fetch("/api/admin/premium-pricing", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ singleUsePrice: single === "" ? null : Number(single), fiveUsePrice: five === "" ? null : Number(five) }) });
    const result = await response.json() as Pricing & { error?: string };
    setSaving(false);
    if (!response.ok) { setMessage(result.error ?? "Could not save pricing."); return; }
    setPricing(result); setMessage("Global premium pricing saved.");
  };

  return <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8"><h2 className="text-2xl font-bold">Premium Pricing</h2><p className="mt-2 text-sm text-slate-600">One global price applies to every premium tool. New payment records snapshot the price at payment start.</p><form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={save}><label className="text-sm font-semibold">Single Use Price<input type="number" min="0" step="0.01" value={single} onChange={(event) => setSingle(event.target.value)} placeholder="৳" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3" /></label><label className="text-sm font-semibold">5 Uses Price<input type="number" min="0" step="0.01" value={five} onChange={(event) => setFive(event.target.value)} placeholder="৳" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3" /></label><button type="submit" disabled={saving} className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-60 sm:col-span-2">{saving ? "Saving..." : "Save Pricing"}</button></form><div className="mt-5 grid gap-2 text-sm text-slate-700"><p>Current Single Use Price: <strong>{pricing.single_use_price == null ? "Not configured" : `৳${pricing.single_use_price}`}</strong></p><p>Current 5 Uses Price: <strong>{pricing.five_use_price == null ? "Not configured" : `৳${pricing.five_use_price}`}</strong></p></div>{message && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-700">{message}</p>}</div>;
}
