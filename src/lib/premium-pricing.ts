export type PremiumPackage = "single" | "five";

export type PremiumProduct = {
  toolId: string;
  toolName: string;
  singleUsePrice: number | null;
  fiveUsePrice: number | null;
};

export const PREMIUM_PRODUCTS: PremiumProduct[] = [
  { toolId: "image-compressor", toolName: "Premium Image Compressor", singleUsePrice: null, fiveUsePrice: null },
  { toolId: "pdf-compressor", toolName: "Premium PDF Compressor", singleUsePrice: null, fiveUsePrice: null },
  { toolId: "background-remover", toolName: "Premium Background Remover", singleUsePrice: null, fiveUsePrice: null },
];

export function getPremiumProduct(toolId: string) {
  return PREMIUM_PRODUCTS.find((product) => product.toolId === toolId);
}

export function getPackageUses(packageName: PremiumPackage) {
  return packageName === "five" ? 5 : 1;
}

export function getPackagePrice(product: PremiumProduct, packageName: PremiumPackage) {
  return packageName === "five" ? product.fiveUsePrice : product.singleUsePrice;
}
