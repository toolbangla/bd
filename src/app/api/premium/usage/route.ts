import { NextRequest, NextResponse } from "next/server";
import { getServerSupabaseClient } from "@/lib/payments/server-supabase";

export async function POST(request: NextRequest) {
  const supabase = getServerSupabaseClient(request);
  if (!supabase) return NextResponse.json({ error: "Authentication or Supabase configuration is missing." }, { status: 401 });

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return NextResponse.json({ error: "Sign in before using premium tools." }, { status: 401 });

  const body = await request.json() as { toolId?: string };
  if (!body.toolId) return NextResponse.json({ error: "toolId is required." }, { status: 400 });

  const { data, error } = await supabase.rpc("consume_premium_usage", { requested_tool_id: body.toolId });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const result = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ remainingUses: result?.remaining_uses ?? 0, consumed: true });
}
