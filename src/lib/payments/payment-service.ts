import type { PremiumPackage } from "@/lib/premium-pricing";

export type PaymentProvider = "bkash" | "nagad";
export type PaymentStatus = "pending" | "paid" | "failed" | "cancelled" | "refunded";

export type PaymentRequest = {
  toolId: string;
  packageName: PremiumPackage;
  provider: PaymentProvider;
};

export type PaymentResult =
  | { status: "pending"; paymentId: string; message: string }
  | { status: "configuration_required"; message: string };

export interface PaymentProviderAdapter {
  createPayment(request: PaymentRequest): Promise<PaymentResult>;
  verifyPayment(paymentId: string): Promise<boolean>;
}

export function getPaymentProvider(provider: PaymentProvider): PaymentProviderAdapter {
  if (provider === "bkash") return new BkashProvider();
  return new NagadProvider();
}

class BkashProvider implements PaymentProviderAdapter {
  async createPayment(): Promise<PaymentResult> {
    return { status: "configuration_required", message: "bKash payment integration pending configuration." };
  }

  async verifyPayment(): Promise<boolean> {
    return false;
  }
}

class NagadProvider implements PaymentProviderAdapter {
  async createPayment(): Promise<PaymentResult> {
    return { status: "configuration_required", message: "Nagad payment integration pending configuration." };
  }

  async verifyPayment(): Promise<boolean> {
    return false;
  }
}
