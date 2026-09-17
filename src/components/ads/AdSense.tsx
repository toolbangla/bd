"use client";

import Script from "next/script";
import { useEffect } from "react";

type AdSenseProps = {
  slot: string;
  format?: string;
  responsive?: boolean;
};

function getClientId() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  return clientId?.startsWith("ca-pub-") ? clientId : null;
}

export default function AdSense({ slot, format = "auto", responsive = true }: AdSenseProps) {
  const clientId = getClientId();
  const adSlot = slot.trim();

  useEffect(() => {
    if (!clientId || !adSlot) return;

    try {
      const adsWindow = window as Window & { adsbygoogle?: unknown[] };
      (adsWindow.adsbygoogle ??= []).push({});
    } catch {
    }
  }, [adSlot, clientId]);

  if (!clientId || !adSlot) return null;

  return (
    <>
      <Script
        id="google-adsense"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle block min-h-[90px] w-full overflow-hidden"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </>
  );
}
