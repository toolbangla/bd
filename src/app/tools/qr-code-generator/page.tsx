"use client";

import { useState } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { recordToolHistory } from "@/lib/tool-history";

type QrMode = "text" | "url" | "image" | "video";

export default function QrCodeGeneratorPage() {
  const [mode, setMode] = useState<QrMode>("text");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isWorking, setIsWorking] = useState(false);

  const resetOutput = () => {
    setQrCodeUrl("");
    setErrorMessage("");
    setStatusMessage("");
  };

  const selectMode = (nextMode: QrMode) => {
    setMode(nextMode);
    setValue("");
    setFile(null);
    setPreviewUrl("");
    resetOutput();
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const expectedType = mode === "image" ? "image/" : "video/";
    if (!selectedFile.type.startsWith(expectedType)) {
      setFile(null);
      setPreviewUrl("");
      setErrorMessage(`Unsupported file type. Choose a ${mode} file.`);
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setFile(null);
      setPreviewUrl("");
      setErrorMessage("File too large. Please choose a file smaller than 25 MB.");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    resetOutput();
  };

  const generateQrCode = async (content: string, historyInput: string) => {
    const dataUrl = await QRCode.toDataURL(content, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: "M",
    });

    setQrCodeUrl(dataUrl);
    setStatusMessage("QR code generated successfully.");
    void recordToolHistory({
      tool_id: "qr-code-generator",
      tool_name: "QR Code Generator",
      input: historyInput,
      output: "QR code generated",
    });
  };

  const generate = async () => {
    const input = value.trim();
    setErrorMessage("");
    setStatusMessage("");

    if ((mode === "text" || mode === "url") && !input) {
      setQrCodeUrl("");
      setErrorMessage(mode === "url" ? "Enter a URL to generate a QR code." : "Enter text to generate a QR code.");
      return;
    }

    if (mode === "url") {
      try {
        const url = new URL(input);
        if (!/^https?:$/.test(url.protocol)) throw new Error("Unsupported protocol");
      } catch {
        setQrCodeUrl("");
        setErrorMessage("Invalid URL. Use a complete http:// or https:// URL.");
        return;
      }
    }

    if ((mode === "image" || mode === "video") && !file) {
      setErrorMessage(`Choose a ${mode} before generating a QR code.`);
      return;
    }

    setIsWorking(true);

    try {
      let content = input;
      let historyInput = input;

      if (file) {
        const supabase = getSupabaseBrowserClient();
        if (!supabase) throw new Error("Supabase is not configured.");

        setStatusMessage("Uploading...");
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const path = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage.from("qr-media").upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("qr-media").getPublicUrl(path);
        content = data.publicUrl;
        historyInput = `${file.name} (${mode})`;
      }

      await generateQrCode(content, historyInput);
    } catch (error) {
      console.error("QR code generation failed:", error);
      setQrCodeUrl("");
      setErrorMessage(file ? "Upload failed. Check Storage policies and try again." : "The QR code could not be generated. Please try again.");
      setStatusMessage("");
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">QR CODE GENERATOR</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">QR Code Generator</h1>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">Create a QR code from text, links, images, or videos.</p>
            <div className="mt-5">
              <a href="/tools" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                &larr; All Tools
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(["text", "url", "image", "video"] as QrMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectMode(item)}
                  className={mode === item ? "rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white" : "rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600"}
                >
                  {item === "url" ? "Link / URL" : item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            {(mode === "text" || mode === "url") && (
              <>
                <label htmlFor="qr-value" className="mt-6 block text-sm font-semibold text-slate-700">{mode === "url" ? "URL" : "Text"}</label>
                <textarea
                  id="qr-value"
                  rows={4}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder={mode === "url" ? "https://example.com" : "Enter any text"}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </>
            )}

            {(mode === "image" || mode === "video") && (
              <div className="mt-6">
                <label htmlFor="qr-media" className="block text-sm font-semibold text-slate-700">Choose {mode === "image" ? "Image" : "Video"}</label>
                <input id="qr-media" type="file" accept={mode === "image" ? "image/*" : "video/*"} onChange={handleFile} className="mt-2 block w-full rounded-xl border border-slate-200 p-3 text-sm" />
                {file && <p className="mt-2 text-sm text-slate-600">Selected: {file.name}</p>}
                {mode === "image" && previewUrl && <img src={previewUrl} alt="Selected image preview" className="mt-4 max-h-48 max-w-full rounded-xl object-contain" />}
                {mode === "video" && previewUrl && <video src={previewUrl} controls className="mt-4 max-h-48 max-w-full rounded-xl" />}
              </div>
            )}

            {errorMessage && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}
            {statusMessage && <p role="status" className="mt-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{statusMessage}</p>}

            <button
              type="button"
              onClick={() => void generate()}
              disabled={isWorking}
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isWorking ? (file ? "Uploading..." : "Generating...") : "Generate QR Code"}
            </button>

            {qrCodeUrl && (
              <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center">
                <img src={qrCodeUrl} alt="Generated QR code" className="mx-auto h-80 w-80 max-w-full" />
                <a
                  href={qrCodeUrl}
                  download="toolbangla-qr-code.png"
                  className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Download QR Code
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
