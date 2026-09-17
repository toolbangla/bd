"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { matchVoiceCommand } from "@/lib/voice-commands";
import { PremiumOnlyFeature } from "@/components/PremiumFeature";

interface SpeechRecognitionResultEventLike extends Event {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type VoiceWindow = Window & typeof globalThis & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type VoiceTab = "command" | "speech";

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<VoiceTab>("command");
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis?.getVoices() ?? []);
    loadVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const startListening = () => {
    const voiceWindow = window as VoiceWindow;
    const Recognition = voiceWindow.SpeechRecognition ?? voiceWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setMessage("Voice commands are not supported in this browser. Try Chrome or Edge.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const recognized = event.results[0]?.[0]?.transcript ?? "";
      setTranscript(recognized);
      setProcessing(true);
      const command = matchVoiceCommand(recognized);
      window.setTimeout(() => {
        setProcessing(false);
        if (!command) {
          setMessage("Command not recognized. Try saying a tool or page name.");
          return;
        }
        setMessage(`Opening ${command.label}`);
        window.location.assign(command.route);
      }, 250);
    };
    recognition.onerror = (event) => {
      setListening(false);
      setMessage(event.error === "not-allowed" ? "Microphone permission was denied." : `Voice error: ${event.error}`);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setTranscript("");
    setMessage("Listening...");
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setMessage("Voice listening stopped.");
  };

  const speak = () => {
    if (!text.trim() || !window.speechSynthesis) {
      setMessage("Enter text first, or use a browser with speech synthesis support.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voiceIndex] ?? null;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
    setMessage("Speaking...");
  };

  const selectedVoice = voices[voiceIndex];

  return (
    <>
      <button type="button" onClick={() => setOpen((current) => !current)} aria-label="Open voice assistant" className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition hover:bg-blue-700 md:bottom-7 md:right-7">
        {listening ? "■" : "🎙"}
      </button>
      {open && (
        <aside className="fixed bottom-24 right-4 z-[60] w-[min(92vw,24rem)] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:bottom-24 md:right-7" aria-label="Voice assistant">
          <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-blue-600">ToolBangla Voice</p><h2 className="text-lg font-bold">Voice Assistant</h2></div><button type="button" onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100" aria-label="Close voice assistant">×</button></div>
          <div className="mt-4 grid grid-cols-2 rounded-xl bg-slate-100 p-1"><button type="button" onClick={() => setTab("command")} className={tab === "command" ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm" : "px-3 py-2 text-sm text-slate-600"}>Voice Command</button><button type="button" onClick={() => setTab("speech")} className={tab === "speech" ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm" : "px-3 py-2 text-sm text-slate-600"}>Text to Voice</button></div>
          {tab === "command" ? <div className="mt-5"><p className="text-sm text-slate-600">কথা বলে website control করুন</p><button type="button" onClick={listening ? stopListening : startListening} className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">{listening ? "Stop Listening" : "Start Listening"}</button>{processing && <p className="mt-3 text-sm text-blue-600">Processing command...</p>}{transcript && <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm"><strong>Recognized:</strong> {transcript}</p>}{message && <p role="status" className="mt-3 text-sm text-slate-600">{message}</p>}</div> : <div className="mt-5 space-y-4"><p className="text-sm text-slate-600">Text লিখে voice-এ শুনুন</p><textarea rows={4} value={text} onChange={(event) => setText(event.target.value)} placeholder="বাংলা বা English text লিখুন" className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" /><select value={voiceIndex} onChange={(event) => setVoiceIndex(Number(event.target.value))} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">{voices.length ? voices.map((voice, index) => <option key={`${voice.name}-${voice.lang}`} value={index}>{voice.name} ({voice.lang})</option>) : <option>No system voices available</option>}</select>{selectedVoice && <p className="text-xs text-slate-500">Selected: {selectedVoice.name} · {selectedVoice.lang}</p>}<label className="block text-xs font-semibold">Rate: {rate.toFixed(1)}<input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} className="w-full" /></label><label className="block text-xs font-semibold">Pitch: {pitch.toFixed(1)}<input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} className="w-full" /></label><label className="block text-xs font-semibold">Volume: {volume.toFixed(1)}<input type="range" min="0" max="1" step="0.1" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="w-full" /></label><div className="grid grid-cols-2 gap-2"><button type="button" onClick={speak} className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Speak</button><button type="button" onClick={() => window.speechSynthesis.pause()} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold">Pause</button><button type="button" onClick={() => window.speechSynthesis.resume()} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold">Resume</button><button type="button" onClick={() => window.speechSynthesis.cancel()} className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600">Stop</button></div><Link href="/tools/text-to-voice" onClick={() => setOpen(false)} className="block text-center text-sm font-semibold text-blue-600">Open Text-to-Voice Tool</Link><PremiumOnlyFeature feature={{ id: "ai-voices", title: "AI voice models", description: "Natural Bengali and expressive AI voices will be available in a future release." }} /></div>}
        </aside>
      )}
    </>
  );
}
