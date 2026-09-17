"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressImage = () => {
    if (!file) return;

    setIsCompressing(true);

    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsCompressing(false);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsCompressing(false);
            return;
          }

          const url = URL.createObjectURL(blob);

          setCompressedUrl(url);
          setCompressedSize(blob.size);
          setIsCompressing(false);

          void recordToolHistory({
            tool_id: "image-compressor",
            tool_name: "Image Compressor",
            input: `${file.name}, ${formatSize(file.size)}, quality ${quality}%`,
            output: `Compressed size: ${formatSize(blob.size)}`,
          });
        },
        "image/jpeg",
        quality / 100
      );
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setCompressedUrl("");
    setCompressedSize(0);
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              IMAGE TOOL
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Image Compressor
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              ছবির মান যতটা সম্ভব ঠিক রেখে ছবির ফাইল সাইজ
              কমিয়ে নিন।
            </p>

            <div className="mt-5">
              <a
                href="/tools"
                className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                ← সব টুল
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <label className="block cursor-pointer">
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-blue-400 hover:bg-blue-50">
                <div className="text-5xl">🖼️</div>

                <h2 className="mt-4 text-xl font-bold">
                  ছবি নির্বাচন করুন
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  JPG, JPEG অথবা PNG ছবি নির্বাচন করুন
                </p>

                <span className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
                  Choose Image
                </span>
              </div>

              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file && (
              <div className="mt-8">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="font-semibold">
                    নির্বাচিত ছবি
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-600">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Original Size: {formatSize(file.size)}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold">
                      Compression Quality
                    </label>

                    <span className="font-bold text-blue-600">
                      {quality}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) =>
                      setQuality(Number(e.target.value))
                    }
                    className="mt-4 w-full"
                  />

                  <div className="flex justify-between text-xs text-slate-500">
                    <span>কম সাইজ</span>
                    <span>উচ্চ মান</span>
                  </div>
                </div>

                <button
                  onClick={compressImage}
                  disabled={isCompressing}
                  className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCompressing
                    ? "Compressing..."
                    : "Compress Image"}
                </button>
              </div>
            )}

            {compressedUrl && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
                <h2 className="text-lg font-bold text-green-700">
                  Compression Complete
                </h2>

                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    Original Size:{" "}
                    <strong>
                      {formatSize(file?.size || 0)}
                    </strong>
                  </p>

                  <p>
                    Compressed Size:{" "}
                    <strong>
                      {formatSize(compressedSize)}
                    </strong>
                  </p>
                </div>

                <a
                  href={compressedUrl}
                  download="toolbangla-compressed.jpg"
                  className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Download Compressed Image
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              Image Compressor সম্পর্কে
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              ToolBangla Image Compressor ব্যবহার করে সহজেই
              ছবির ফাইল সাইজ কমাতে পারবেন। আপনার ছবি
              সার্ভারে আপলোড না করেই ব্রাউজারেই প্রসেস করা
              হবে।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}