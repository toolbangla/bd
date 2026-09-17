import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export async function consumePremiumUsage(toolId: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, message: "Supabase is not configured." };

  const { data } = await supabase.auth.getSession();
  if (!data.session) return { ok: false, message: "Sign in before using premium tools." };

  const response = await fetch("/api/premium/usage", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.session.access_token}` },
    body: JSON.stringify({ toolId }),
  });
  const result = await response.json() as { remainingUses?: number; error?: string };
  if (!response.ok) return { ok: false, message: result.error ?? "No verified premium usage remains for this tool." };
  return { ok: true, remainingUses: result.remainingUses ?? 0 };
}
