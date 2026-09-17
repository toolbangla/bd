import { NextRequest, NextResponse } from "next/server";
import { getServerSupabaseClient } from "@/lib/payments/server-supabase";

export async function GET(request: NextRequest) {
  const supabase = getServerSupabaseClient(request);
  if (!supabase) return NextResponse.json({ error: "Sign in before viewing premium pricing." }, { status: 401 });

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return NextResponse.json({ error: "Sign in before viewing premium pricing." }, { status: 401 });

  const { data, error } = await supabase.from("premium_pricing").select("single_use_price, five_use_price, updated_at").eq("id", 1).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 503 });
  return NextResponse.json(data);
}
