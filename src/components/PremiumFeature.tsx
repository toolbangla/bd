import type { PremiumFeature as PremiumFeatureDefinition } from "@/lib/premium";
import { hasPremiumAccess } from "@/lib/premium";

type PremiumFeatureProps = {
  feature: PremiumFeatureDefinition;
  children?: React.ReactNode;
};

export function FreeFeature({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function PremiumOnlyFeature({ feature, children }: PremiumFeatureProps) {
  if (hasPremiumAccess()) return <>{children}</>;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-amber-700">Premium</p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
      <p className="mt-4 font-semibold text-amber-800">Premium feature - Coming Soon</p>
    </div>
  );
}
