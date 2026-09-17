export type PremiumPackage = "single" | "five";

export type PremiumProduct = {
  toolId: string;
  toolName: string;
};

export const PREMIUM_PRODUCTS: PremiumProduct[] = [
  { toolId: "image-compressor", toolName: "Premium Image Compressor" },
  { toolId: "pdf-compressor", toolName: "Premium PDF Compressor" },
  { toolId: "background-remover", toolName: "Premium Background Remover" },
];

export function getPremiumProduct(toolId: string) {
  return PREMIUM_PRODUCTS.find((product) => product.toolId === toolId);
}

export function getPackageUses(packageName: PremiumPackage) {
  return packageName === "five" ? 5 : 1;
}

