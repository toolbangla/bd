"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

type PdfUtilityProps = { title: string; description: string; slug: string; action: "jpg-to-pdf" | "pdf-to-jpg" | "compress" | "merge" | "split" };

export default function PdfUtilityTool({ title, description, slug, action }: PdfUtilityProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [outputUrl, setOutputUrl] = useState("");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  const chooseFiles = (selected: FileList | null) => {
    if (!selected) return;
    const list = Array.from(selected);
    const valid = action === "jpg-to-pdf" ? list.every((file) => file.type.startsWith("image/")) : list.every((file) => file.type === "application/pdf" || file.name.endsWith(".pdf"));
    if (!valid) { setMessage(action === "jpg-to-pdf" ? "Choose image files." : "Choose PDF files."); return; }
    setFiles(list); setMessage(""); setOutputUrl("");
  };

  const makePdfFromImages = async () => {
    const pdf = await PDFDocument.create();
    for (const file of files) {
      const bytes = await file.arrayBuffer(); const image = file.type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes); const page = pdf.addPage([image.width, image.height]); page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    return pdf.save();
  };

  const process = async () => {
    if (!files.length) { setMessage("Please choose the required files first."); return; }
    setWorking(true); setMessage("");
    try {
      if (action === "pdf-to-jpg") {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const pdfDocument = await pdfjsLib.getDocument({ data: await files[0].arrayBuffer() }).promise;
        const page = await pdfDocument.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas unavailable");
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({ canvas, canvasContext: context, viewport }).promise;
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
        if (!blob) throw new Error("JPG conversion failed");
        setOutputUrl(URL.createObjectURL(blob)); setMessage("JPG created successfully."); setWorking(false);
        void recordToolHistory({ tool_id: slug, tool_name: title, input: files[0].name, output: "JPG image generated" });
        return;
      }
      let bytes: Uint8Array;
      if (action === "jpg-to-pdf") bytes = await makePdfFromImages();
      else {
        const first = await PDFDocument.load(await files[0].arrayBuffer());
        if (action === "merge") {
          const merged = await PDFDocument.create();
          for (const file of files) { const source = await PDFDocument.load(await file.arrayBuffer()); const pages = await merged.copyPages(source, source.getPageIndices()); pages.forEach((page) => merged.addPage(page)); }
          bytes = await merged.save();
        } else if (action === "split") {
          const split = await PDFDocument.create(); const [page] = await split.copyPages(first, [0]); split.addPage(page); bytes = await split.save();
        } else bytes = await first.save({ useObjectStreams: true });
      }
      const safeBytes = new Uint8Array(bytes);
      const blob = new Blob([safeBytes.buffer as ArrayBuffer], { type: "application/pdf" }); const url = URL.createObjectURL(blob); setOutputUrl(url); setMessage("PDF ready successfully."); void recordToolHistory({ tool_id: slug, tool_name: title, input: files.map((file) => file.name).join(", "), output: "PDF generated" });
    } catch (error) { console.error(error); setMessage("Could not process the file. Please try again."); } finally { setWorking(false); }
  };

  return <ToolLayout><section className="px-5 py-14"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="font-semibold text-blue-600">PDF TOOL</p><h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">{description}</p><p className="mt-3 text-sm text-slate-500">ফাইল আপনার ব্রাউজারেই প্রসেস হবে এবং স্থায়ীভাবে সংরক্ষণ করা হবে না।</p></div><div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><input type="file" multiple={action === "merge" || action === "jpg-to-pdf"} accept={action === "jpg-to-pdf" ? "image/jpeg,image/png" : "application/pdf,.pdf"} onChange={(event) => chooseFiles(event.target.files)} className="block w-full rounded-xl border border-slate-200 p-4" />{files.length > 0 && <p className="mt-4 text-sm text-slate-600">{files.length} file(s) selected: {files.map((file) => file.name).join(", ")}</p>}{message && <p role="alert" className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-slate-700">{message}</p>}<div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => void process()} disabled={working} className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-60">{working ? "Processing..." : "Process PDF"}</button><button type="button" onClick={() => { setFiles([]); setOutputUrl(""); setMessage(""); }} className="rounded-xl border border-slate-200 px-6 py-4 font-bold text-slate-700">Clear</button></div>{outputUrl && <a href={outputUrl} download={`${slug}-result.${action === "pdf-to-jpg" ? "jpg" : "pdf"}`} className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">Download {action === "pdf-to-jpg" ? "JPG" : "PDF"}</a>}</div></div></section></ToolLayout>;
}
