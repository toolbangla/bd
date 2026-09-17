import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getPaymentProvider, type PaymentProvider } from "@/lib/payments/payment-service";

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.PREMIUM_WEBHOOK_SECRET;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const suppliedSecret = request.headers.get("x-premium-webhook-secret");
  if (!configuredSecret || !serviceRoleKey || suppliedSecret !== configuredSecret) {
    return NextResponse.json({ error: "Payment webhook is not configured." }, { status: 503 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return NextResponse.json({ error: "Supabase URL is not configured." }, { status: 503 });

  const body = await request.json() as { paymentId?: string; provider?: PaymentProvider };
  if (!body.paymentId || !body.provider) return NextResponse.json({ error: "paymentId and provider are required." }, { status: 400 });

  const verified = await getPaymentProvider(body.provider).verifyPayment(body.paymentId);
  if (!verified) return NextResponse.json({ status: "pending", message: "Provider verification did not confirm payment." }, { status: 202 });

  const adminClient = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error: paymentError } = await adminClient.from("premium_payments").update({ payment_status: "paid", verified_at: new Date().toISOString() }).eq("id", body.paymentId).eq("payment_status", "pending");
  if (paymentError) return NextResponse.json({ error: paymentError.message }, { status: 500 });

  const { error: grantError } = await adminClient.rpc("grant_verified_premium_payment", { payment_uuid: body.paymentId });
  if (grantError) return NextResponse.json({ error: grantError.message }, { status: 500 });
  return NextResponse.json({ status: "paid" });
}
