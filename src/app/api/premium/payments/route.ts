import { NextRequest, NextResponse } from "next/server";
import { getPremiumProduct, getPackagePrice, getPackageUses, type PremiumPackage } from "@/lib/premium-pricing";
import { getPaymentProvider, type PaymentProvider } from "@/lib/payments/payment-service";
import { getServerSupabaseClient } from "@/lib/payments/server-supabase";

const providers: PaymentProvider[] = ["bkash", "nagad"];
const packages: PremiumPackage[] = ["single", "five"];

export async function POST(request: NextRequest) {
  const supabase = getServerSupabaseClient(request);
  if (!supabase) return NextResponse.json({ error: "Authentication or Supabase configuration is missing." }, { status: 401 });

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return NextResponse.json({ error: "Sign in before purchasing premium usage." }, { status: 401 });

  const body = await request.json() as { toolId?: string; packageName?: PremiumPackage; provider?: PaymentProvider };
  if (!body.toolId || !body.packageName || !packages.includes(body.packageName) || !body.provider || !providers.includes(body.provider)) {
    return NextResponse.json({ error: "Invalid premium purchase request." }, { status: 400 });
  }

  const product = getPremiumProduct(body.toolId);
  const amount = product ? getPackagePrice(product, body.packageName) : null;
  if (!product || amount === null) {
    return NextResponse.json({ status: "configuration_required", message: "Premium pricing or payment integration pending configuration." }, { status: 503 });
  }

  const provider = getPaymentProvider(body.provider);
  const providerResult = await provider.createPayment({ toolId: body.toolId, packageName: body.packageName, provider: body.provider });
  if (providerResult.status !== "pending") return NextResponse.json(providerResult, { status: 503 });

  const { data: payment, error } = await supabase.from("premium_payments").insert({
    user_id: userData.user.id,
    tool_id: body.toolId,
    package_name: body.packageName,
    purchased_uses: getPackageUses(body.packageName),
    amount,
    payment_provider: body.provider,
    payment_status: "pending",
    provider_payment_id: providerResult.paymentId,
  }).select("id, payment_status").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ status: "pending", paymentId: payment.id, paymentStatus: payment.payment_status, message: "Payment integration pending configuration." }, { status: 202 });
}
