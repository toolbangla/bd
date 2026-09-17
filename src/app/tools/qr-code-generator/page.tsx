"use client";

import { useState } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

export default function QrCodeGeneratorPage() {
  const [value, setValue] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateQrCode = async () => {
    const input = value.trim();
    setErrorMessage("");

    if (!input) {
      setQrCodeUrl("");
      setErrorMessage("Enter text or a URL to generate a QR code.");
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(input, {
        width: 320,
        margin: 2,
        errorCorrectionLevel: "M",
      });
      setQrCodeUrl(dataUrl);
      void recordToolHistory({
        tool_id: "qr-code-generator",
        tool_name: "QR Code Generator",
        input,
        output: "QR code generated",
      });
    } catch (error) {
      console.error("QR code generation failed:", error);
      setQrCodeUrl("");
      setErrorMessage("The QR code could not be generated. Please try again.");
    }
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">QR CODE GENERATOR</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">QR Code Generator</h1>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Create a QR code from any text, link, or contact detail.
            </p>
            <div className="mt-5">
              <a href="/tools" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                &larr; All Tools
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <label htmlFor="qr-value" className="text-sm font-semibold text-slate-700">Text or URL</label>
            <textarea
              id="qr-value"
              rows={4}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="https://example.com"
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            {errorMessage && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}

            <button
              type="button"
              onClick={() => void generateQrCode()}
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700"
            >
              Generate QR Code
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
