import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import { PremiumOnlyFeature } from "@/components/PremiumFeature";
import { getCurrentAccessMode, PREMIUM_FEATURES } from "@/lib/premium";
import PremiumToolAccess from "@/components/PremiumToolAccess";

export const metadata = {
  title: "Premium Mode",
  description: "Explore upcoming ToolBangla premium features.",
};

export default function PremiumPage() {
  const mode = getCurrentAccessMode();

  return (
    <ToolLayout>
      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-semibold text-amber-600">PREMIUM MODE</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Premium Features</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              ToolBangla Free Mode remains fully available. Premium capabilities will be released here as they are implemented.
            </p>
            <div className="mt-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              Current mode: {mode === "premium" ? "Premium" : "Free"}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PREMIUM_FEATURES.map((feature) => (
              <PremiumOnlyFeature key={feature.id} feature={feature} />
            ))}
          </div>

          <div className="mt-8 space-y-5">
            <h2 className="text-2xl font-bold">Premium Tool Usage</h2>
            <p className="text-slate-600">Usage credits are per tool and are not lifetime access. Payment activation remains pending provider configuration.</p>
            <PremiumToolAccess toolId="image-compressor" />
            <PremiumToolAccess toolId="pdf-compressor" />
            <PremiumToolAccess toolId="background-remover" />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-bold">Use ToolBangla Free Mode</h2>
            <p className="mt-2 text-slate-600">All current tools, downloads, and temporary session history remain available without payment.</p>
            <Link href="/tools" className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Explore Free Tools
            </Link>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
