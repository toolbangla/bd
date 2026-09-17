"use client";

import AdSense from "@/components/ads/AdSense";

type AdPlacementProps = {
  slot?: string;
};

function Placement({ slot, label }: AdPlacementProps & { label: string }) {
  if (!slot) return null;

  return (
    <div className="mx-auto my-8 w-full max-w-5xl px-5" aria-label={label}>
      <div className="rounded-xl border border-slate-100 bg-white/70 p-2">
        <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-slate-400">Advertisement</p>
        <AdSense slot={slot} />
      </div>
    </div>
  );
}

export function TopAd({ slot = process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT }: AdPlacementProps) {
  return <Placement slot={slot} label="Top advertisement" />;
}

export function InContentAd({ slot = process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_SLOT }: AdPlacementProps) {
  return <Placement slot={slot} label="In-content advertisement" />;
}

export function BottomAd({ slot = process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT }: AdPlacementProps) {
  return <Placement slot={slot} label="Bottom advertisement" />;
}
