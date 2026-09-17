"use client";

import { useEffect, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

type FileUtilityProps = { title: string; description: string; slug: string; mode: "crop" | "convert" | "remove-bg" | "pdf" };

export default function FileUtilityTool({ title, description, slug, mode }: FileUtilityProps) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [format, setFormat] = useState("image/png");
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 300, height: 300 });

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); if (resultUrl) URL.revokeObjectURL(resultUrl); }, [url, resultUrl]);

  const handleFile = (selected: File | undefined) => {
    if (!selected) return;
    const valid = mode === "pdf" ? selected.type === "application/pdf" || selected.name.endsWith(".pdf") : selected.type.startsWith("image/");
    if (!valid) { setMessage(mode === "pdf" ? "Please choose a PDF file." : "Please choose an image file."); return; }
    setFile(selected); setMessage(""); setResultUrl(""); setUrl(URL.createObjectURL(selected));
  };

  const process = async () => {
    if (!file) { setMessage("Please choose a file first."); return; }
    if (mode === "pdf") { setMessage("PDF file is ready. Use the existing PDF tools for browser-safe PDF processing."); return; }
    setProcessing(true); setMessage("");
    const image = new Image(); image.src = url;
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("Image could not be loaded")); });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) { setMessage("Your browser could not create a canvas."); setProcessing(false); return; }
    const sourceX = mode === "crop" ? Math.max(0, crop.x) : 0;
    const sourceY = mode === "crop" ? Math.max(0, crop.y) : 0;
    const sourceWidth = mode === "crop" ? Math.min(crop.width, image.width - sourceX) : image.width;
    const sourceHeight = mode === "crop" ? Math.min(crop.height, image.height - sourceY) : image.height;
    canvas.width = sourceWidth; canvas.height = sourceHeight; context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
    if (mode === "remove-bg") {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height); for (let index = 0; index < pixels.data.length; index += 4) { if (pixels.data[index] > 235 && pixels.data[index + 1] > 235 && pixels.data[index + 2] > 235) pixels.data[index + 3] = 0; } context.putImageData(pixels, 0, 0);
    }
    const outputType = mode === "convert" ? format : "image/png";
    canvas.toBlob((blob) => { if (!blob) { setMessage("Processing failed."); setProcessing(false); return; } const output = URL.createObjectURL(blob); setResultUrl(output); setProcessing(false); void recordToolHistory({ tool_id: slug, tool_name: title, input: file.name, output: `Processed image (${Math.round(blob.size / 1024)} KB)` }); }, outputType, 0.92);
  };

  const clear = () => { setFile(null); setUrl(""); setResultUrl(""); setMessage(""); };

  return <ToolLayout><section className="px-5 py-14"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="font-semibold text-blue-600">FILE TOOL</p><h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">{description}</p><p className="mt-3 text-sm text-slate-500">ফাইল আপনার ব্রাউজারেই প্রসেস হবে; স্থায়ীভাবে সংরক্ষণ করা হবে না।</p></div><div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><input type="file" accept={mode === "pdf" ? ".pdf,application/pdf" : "image/*"} onChange={(event) => handleFile(event.target.files?.[0])} className="block w-full rounded-xl border border-slate-200 p-4" />{file && <p className="mt-4 text-sm text-slate-600">Selected: {file.name}</p>}{url && mode !== "pdf" && <img src={url} alt="Selected file preview" className="mt-5 max-h-72 max-w-full rounded-xl object-contain" />}{mode === "convert" && <select value={format} onChange={(event) => setFormat(event.target.value)} className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3"><option value="image/png">PNG</option><option value="image/jpeg">JPG</option><option value="image/webp">WEBP</option></select>}{mode === "crop" && <div className="mt-5 grid gap-3 sm:grid-cols-4">{(["x", "y", "width", "height"] as const).map((key) => <input key={key} type="number" min="0" value={crop[key]} onChange={(event) => setCrop((current) => ({ ...current, [key]: Number(event.target.value) }))} aria-label={key} className="rounded-xl border border-slate-200 px-3 py-2" />)}</div>}{message && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}<div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => void process()} disabled={processing} className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-60">{processing ? "Processing..." : "Process File"}</button><button type="button" onClick={clear} className="rounded-xl border border-slate-200 px-6 py-4 font-bold text-slate-700">Clear</button></div>{resultUrl && <div className="mt-8 rounded-2xl bg-green-50 p-6 text-center"><img src={resultUrl} alt="Processed result" className="mx-auto max-h-72 max-w-full object-contain" /><a href={resultUrl} download={`${slug}-result.${format === "image/jpeg" ? "jpg" : "png"}`} className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">Download Result</a></div>}</div></div></section></ToolLayout>;
}
