export type AccessMode = "free" | "premium";

export type PremiumFeature = {
  id: string;
  title: string;
  description: string;
};

export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: "higher-limits",
    title: "Higher file-size limits",
    description: "Process larger files when premium limits are released.",
  },
  {
    id: "batch-processing",
    title: "Batch processing",
    description: "Process multiple files in one operation.",
  },
  {
    id: "advanced-processing",
    title: "Advanced image and PDF processing",
    description: "Unlock deeper processing options in a future release.",
  },
  {
    id: "advanced-qr",
    title: "Advanced QR customization",
    description: "Add richer styling and export options later.",
  },
];

export function hasPremiumAccess(): boolean {
  // Payment and entitlement verification will be connected here later.
  return false;
}

export function getCurrentAccessMode(): AccessMode {
  return hasPremiumAccess() ? "premium" : "free";
}

export function isPremiumFeatureAvailable(): false {
  return false;
}
