"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

export default function PngToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "image/png") {
      alert("শুধু PNG ছবি নির্বাচন করুন।");
      return;
    }

    const url = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(url);
    setConvertedUrl("");
  };

  const convertToJpg = () => {
    if (!file) return;

    setIsConverting(true);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsConverting(false);
        URL.revokeObjectURL(imageUrl);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsConverting(false);
            URL.revokeObjectURL(imageUrl);
            return;
          }

          setConvertedUrl(URL.createObjectURL(blob));
          setIsConverting(false);
          void recordToolHistory({
            tool_name: "PNG to JPG",
            input: file.name,
            output: "JPG image created",
          });
          URL.revokeObjectURL(imageUrl);
        },
        "image/jpeg",
        0.92
      );
    };

    img.src = imageUrl;
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              IMAGE CONVERTER
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              PNG to JPG
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              PNG ছবি JPG ফরম্যাটে পরিবর্তন করুন।
            </p>

            <div className="mt-5">
              <a
                href="/tools"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                ← সব টুল
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <label className="block cursor-pointer">
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-blue-400 hover:bg-blue-50">
                <div className="text-5xl">🔄</div>

                <h2 className="mt-4 text-xl font-bold">
                  PNG ছবি নির্বাচন করুন
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  শুধুমাত্র PNG ফাইল
                </p>

                <span className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
                  Choose PNG Image
                </span>
              </div>

              <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file && (
              <>
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <p className="font-semibold">{file.name}</p>

                  <p className="mt-1 text-sm text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                {preview && (
                  <div className="mt-6">
                    <h2 className="mb-3 text-lg font-bold">
                      Preview
                    </h2>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <img
                        src={preview}
                        alt="PNG preview"
                        className="mx-auto max-h-80 max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={convertToJpg}
                  disabled={isConverting}
                  className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isConverting
                    ? "Converting..."
                    : "Convert to JPG"}
                </button>
              </>
            )}

            {convertedUrl && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
                <h2 className="text-lg font-bold text-green-700">
                  Conversion Complete
                </h2>

                <div className="mt-5 overflow-hidden rounded-2xl border border-green-200 bg-white p-4">
                  <img
                    src={convertedUrl}
                    alt="Converted JPG"
                    className="mx-auto max-h-80 max-w-full object-contain"
                  />
                </div>

                <a
                  href={convertedUrl}
                  download="toolbangla-converted.jpg"
                  className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Download JPG
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              PNG to JPG সম্পর্কে
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              ToolBangla PNG to JPG Converter ব্যবহার করে PNG ছবি
              JPG ফরম্যাটে পরিবর্তন করতে পারবেন। ছবিটি আপনার
              ব্রাউজারেই প্রসেস করা হয়।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}