"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [resizedUrl, setResizedUrl] = useState("");
  const [isResizing, setIsResizing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    const img = new Image();

    img.onload = () => {
      setFile(selectedFile);
      setPreview(imageUrl);
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(String(img.width));
      setHeight(String(img.height));
      setResizedUrl("");
    };

    img.src = imageUrl;
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);

    if (keepRatio && originalWidth > 0 && originalHeight > 0 && value) {
      const newWidth = Number(value);
      const newHeight = Math.round(
        (newWidth / originalWidth) * originalHeight
      );
      setHeight(String(newHeight));
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);

    if (keepRatio && originalWidth > 0 && originalHeight > 0 && value) {
      const newHeight = Number(value);
      const newWidth = Math.round(
        (newHeight / originalHeight) * originalWidth
      );
      setWidth(String(newWidth));
    }
  };

  const resizeImage = () => {
    if (!file || !width || !height) return;

    const newWidth = Number(width);
    const newHeight = Number(height);

    if (newWidth <= 0 || newHeight <= 0) return;

    setIsResizing(true);

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsResizing(false);
        URL.revokeObjectURL(imageUrl);
        return;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const outputType =
        file.type === "image/png" ? "image/png" : "image/jpeg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsResizing(false);
            URL.revokeObjectURL(imageUrl);
            return;
          }

          const url = URL.createObjectURL(blob);

          setResizedUrl(url);
          setIsResizing(false);
          URL.revokeObjectURL(imageUrl);
        },
        outputType,
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
            <p className="font-semibold text-blue-600">IMAGE TOOL</p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Image Resizer
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              ছবির Width এবং Height সহজেই পরিবর্তন করুন।
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
                <div className="text-5xl">📐</div>

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
                  <p className="font-semibold">নির্বাচিত ছবি</p>

                  <p className="mt-1 break-all text-sm text-slate-600">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Original Size: {originalWidth} × {originalHeight} px
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-bold">ছবির নতুন Size</h2>

                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Width (px)
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={width}
                        onChange={(e) => handleWidthChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Height (px)
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={height}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <label className="mt-5 flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={keepRatio}
                      onChange={(e) => setKeepRatio(e.target.checked)}
                      className="h-4 w-4"
                    />

                    <span className="text-sm font-medium">
                      Maintain Aspect Ratio
                    </span>
                  </label>
                </div>

                <button
                  onClick={resizeImage}
                  disabled={isResizing}
                  className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isResizing ? "Resizing..." : "Resize Image"}
                </button>

                {preview && (
                  <div className="mt-8">
                    <h2 className="mb-3 text-lg font-bold">
                      Original Preview
                    </h2>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <img
                        src={preview}
                        alt="Original preview"
                        className="mx-auto max-h-80 max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {resizedUrl && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
                <h2 className="text-lg font-bold text-green-700">
                  Image Resized Successfully
                </h2>

                <div className="mt-5 overflow-hidden rounded-2xl border border-green-200 bg-white p-4">
                  <img
                    src={resizedUrl}
                    alt="Resized preview"
                    className="mx-auto max-h-80 max-w-full object-contain"
                  />
                </div>

                <p className="mt-4 text-sm text-slate-600">
                  New Size:{" "}
                  <strong>
                    {width} × {height} px
                  </strong>
                </p>

                <a
                  href={resizedUrl}
                  download="toolbangla-resized-image"
                  className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Download Resized Image
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              Image Resizer সম্পর্কে
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              ToolBangla Image Resizer ব্যবহার করে ছবির Width ও Height
              পরিবর্তন করতে পারবেন। Maintain Aspect Ratio চালু রাখলে ছবির
              অনুপাত ঠিক থাকবে।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}