import { NextRequest, NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { getServerSupabaseClient } from "@/lib/payments/server-supabase";

async function getAdminClient(request: NextRequest) {
  const supabase = getServerSupabaseClient(request);
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return isAdminEmail(data.user?.email) ? supabase : null;
}

export async function GET(request: NextRequest) {
  const supabase = await getAdminClient(request);
  if (!supabase) return NextResponse.json({ error: "Admin authentication required." }, { status: 403 });
  const { data, error } = await supabase.from("premium_pricing").select("single_use_price, five_use_price, updated_at").eq("id", 1).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = await getAdminClient(request);
  if (!supabase) return NextResponse.json({ error: "Admin authentication required." }, { status: 403 });
  const { data: user } = await supabase.auth.getUser();
  const body = await request.json() as { singleUsePrice?: number | null; fiveUsePrice?: number | null };
  const prices = [body.singleUsePrice, body.fiveUsePrice];
  if (prices.some((price) => price !== null && (typeof price !== "number" || !Number.isFinite(price) || price < 0))) {
    return NextResponse.json({ error: "Prices must be empty or non-negative numbers." }, { status: 400 });
  }

  const { data, error } = await supabase.from("premium_pricing").update({ single_use_price: body.singleUsePrice ?? null, five_use_price: body.fiveUsePrice ?? null, updated_at: new Date().toISOString(), updated_by: user.user?.id ?? null }).eq("id", 1).select("single_use_price, five_use_price, updated_at").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
