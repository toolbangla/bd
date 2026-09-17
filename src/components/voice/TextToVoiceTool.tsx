"use client";

import { useEffect, useState } from "react";
import { PremiumOnlyFeature } from "@/components/PremiumFeature";

export default function TextToVoiceTool() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [language, setLanguage] = useState("all");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis?.getVoices() ?? []);
    load();
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  const filteredVoices = voices.filter((voice) => language === "all" || voice.lang.toLowerCase().startsWith(language));
  const selectedVoice = filteredVoices[voiceIndex];

  const speak = () => {
    if (!text.trim() || !window.speechSynthesis) { setMessage("Enter text and use a browser with speech synthesis support."); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice ?? null; utterance.rate = rate; utterance.pitch = pitch; utterance.volume = volume;
    window.speechSynthesis.speak(utterance); setMessage("Speaking...");
  };

  return <div className="mx-auto max-w-4xl"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><label htmlFor="tts-text" className="text-sm font-semibold">Text</label><textarea id="tts-text" rows={8} value={text} onChange={(event) => setText(event.target.value)} placeholder="বাংলা বা English text লিখুন" className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /><p className="mt-2 text-right text-xs text-slate-500">{text.length} characters</p><div className="mt-6 grid gap-5 md:grid-cols-2"><div><label className="text-sm font-semibold">Language</label><select value={language} onChange={(event) => { setLanguage(event.target.value); setVoiceIndex(0); }} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"><option value="all">All available languages</option><option value="bn">বাংলা</option><option value="en">English</option></select></div><div><label className="text-sm font-semibold">Voice</label><select value={voiceIndex} onChange={(event) => setVoiceIndex(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">{filteredVoices.length ? filteredVoices.map((voice) => <option key={`${voice.name}-${voice.lang}`} value={filteredVoices.indexOf(voice)}>{voice.name} · {voice.lang}</option>) : <option>No available system voice</option>}</select></div></div><div className="mt-6 grid gap-4 md:grid-cols-3"><label className="text-sm font-semibold">Rate: {rate.toFixed(1)}<input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} className="mt-2 w-full" /></label><label className="text-sm font-semibold">Pitch: {pitch.toFixed(1)}<input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} className="mt-2 w-full" /></label><label className="text-sm font-semibold">Volume: {volume.toFixed(1)}<input type="range" min="0" max="1" step="0.1" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="mt-2 w-full" /></label></div><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5"><button type="button" onClick={speak} className="rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white">Speak</button><button type="button" onClick={() => window.speechSynthesis.pause()} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold">Pause</button><button type="button" onClick={() => window.speechSynthesis.resume()} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold">Resume</button><button type="button" onClick={() => window.speechSynthesis.cancel()} className="rounded-xl border border-red-200 px-3 py-3 text-sm font-semibold text-red-600">Stop</button><button type="button" onClick={() => { window.speechSynthesis.cancel(); setText(""); setMessage(""); }} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold">Clear</button></div>{message && <p role="status" className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">{message}</p>}<div className="mt-8"><PremiumOnlyFeature feature={{ id: "ai-tts", title: "AI voice models and audio export", description: "Natural Bengali AI voices, expressive voices, long-text processing, and audio export are planned for a future release." }} /></div></div></div>;
}
