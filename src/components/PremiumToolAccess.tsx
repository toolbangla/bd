"use client";

import { useEffect, useState } from "react";
import { getPremiumProduct, getPackagePrice, type PremiumPackage } from "@/lib/premium-pricing";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { PaymentProvider } from "@/lib/payments/payment-service";

type PremiumToolAccessProps = { toolId: string };

type Entitlement = { remaining_uses: number };

export default function PremiumToolAccess({ toolId }: PremiumToolAccessProps) {
  const product = getPremiumProduct(toolId);
  const [packageName, setPackageName] = useState<PremiumPackage>("single");
  const [provider, setProvider] = useState<PaymentProvider>("bkash");
  const [remainingUses, setRemainingUses] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;
      const { data } = await supabase.from("premium_entitlements").select("remaining_uses").eq("tool_id", toolId).eq("payment_status", "paid");
      setRemainingUses((data ?? []).reduce((total: number, row: Entitlement) => total + row.remaining_uses, 0));
    };
    void load();
  }, [toolId]);

  if (!product) return null;

  const requestPayment = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setMessage("Payment integration pending configuration."); return; }
    const { data } = await supabase.auth.getSession();
    if (!data.session) { setMessage("Sign in before purchasing premium usage."); return; }

    setLoading(true); setMessage("");
    const response = await fetch("/api/premium/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.session.access_token}` },
      body: JSON.stringify({ toolId, packageName, provider }),
    });
    const result = await response.json() as { message?: string; error?: string };
    setLoading(false);
    setMessage(result.message ?? result.error ?? "Payment integration pending configuration.");
  };

  return <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6"><p className="text-sm font-bold uppercase tracking-wide text-amber-700">Premium Access</p><h2 className="mt-2 text-2xl font-bold">{product.toolName}</h2><p className="mt-3 font-semibold text-slate-800">Premium Uses Remaining: {remainingUses ?? "Sign in to check"}</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setPackageName("single")} className={packageName === "single" ? "rounded-xl border-2 border-amber-600 bg-white p-4 text-left" : "rounded-xl border border-amber-200 bg-white p-4 text-left"}><strong>1 Use</strong><span className="mt-1 block text-sm text-slate-600">{getPackagePrice(product, "single") === null ? "Price pending" : `৳ ${getPackagePrice(product, "single")}`}</span></button><button type="button" onClick={() => setPackageName("five")} className={packageName === "five" ? "rounded-xl border-2 border-amber-600 bg-white p-4 text-left" : "rounded-xl border border-amber-200 bg-white p-4 text-left"}><strong>5 Uses</strong><span className="mt-1 block text-sm text-slate-600">{getPackagePrice(product, "five") === null ? "Price pending" : `৳ ${getPackagePrice(product, "five")}`}</span></button></div><fieldset className="mt-5"><legend className="font-semibold">Payment Method</legend><label className="mr-5 mt-2 inline-flex items-center gap-2"><input type="radio" checked={provider === "bkash"} onChange={() => setProvider("bkash")} /> bKash</label><label className="mt-2 inline-flex items-center gap-2"><input type="radio" checked={provider === "nagad"} onChange={() => setProvider("nagad")} /> Nagad</label></fieldset><button type="button" onClick={() => void requestPayment()} disabled={loading} className="mt-5 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-60">{loading ? "Checking payment configuration..." : "Continue Payment"}</button>{message && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-700">{message}</p>}</section>;
}
