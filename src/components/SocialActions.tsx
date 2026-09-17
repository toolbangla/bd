"use client";

import { useState } from "react";
import { FACEBOOK_URL } from "@/lib/site-config";

export default function SocialActions() {
  const [message, setMessage] = useState("");

  const sharePage = async () => {
    const pageUrl = window.location.href;
    const shareData = { title: document.title, url: pageUrl };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessage("Page shared successfully.");
        return;
      }

      await navigator.clipboard.writeText(pageUrl);
      setMessage("Link copied successfully.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      try {
        const fallbackInput = document.createElement("input");
        fallbackInput.value = pageUrl;
        document.body.appendChild(fallbackInput);
        fallbackInput.select();
        const copied = document.execCommand("copy");
        fallbackInput.remove();
        setMessage(copied ? "Link copied successfully." : "Unable to share this page.");
      } catch {
        setMessage("Unable to share this page.");
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noreferrer"
        className="rounded-xl bg-[#1877f2] px-5 py-3 font-semibold text-white transition hover:bg-[#166fe5]"
      >
        Facebook
      </a>
      <button
        type="button"
        onClick={() => void sharePage()}
        className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
      >
        Share
      </button>
      {message && <span role="status" className="basis-full text-center text-sm text-slate-600">{message}</span>}
    </div>
  );
}
