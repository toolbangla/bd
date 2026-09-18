"use client";

import { useEffect, useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type ToolMode =
  | "remove-bg"
  | "convert"
  | "crop"
  | "compress"
  | "resize"
  | "pdf";

type Props = {
  title: string;
  slug: string;
  mode: ToolMode;
  description: string;
};

type CropState = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function FileUtilityTool({
  title,
  slug,
  mode,
  description,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const [format, setFormat] = useState("image/png");

  const [crop, setCrop] = useState<CropState>({
    x: 0,
    y: 0,
    width: 500,
    height: 500,
  });

  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [url, resultUrl]);

  const handleFile = (selectedFile?: File) => {
    if (!selectedFile) {
      return;
    }

    setMessage("");
    setResultUrl("");

    if (url) {
      URL.revokeObjectURL(url);
    }

    const previewUrl = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setUrl(previewUrl);
  };

  const processRemoveBackground = async () => {
    if (!file) {
      setMessage("Please select an image first.");
      return;
    }

    setProcessing(true);
    setMessage("");
    setResultUrl("");

    try {
      const formData = new FormData();
      formData.append("image_file", file);

      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = "Background removal failed.";

        try {
          const data = await response.json();

          if (data?.error) {
            errorMessage = data.error;
          }
        } catch {
          // Ignore JSON parsing error.
        }

        throw new Error(errorMessage);
      }

      const blob = await response.blob();

      if (!blob.type.startsWith("image/")) {
        throw new Error("The server did not return a valid image.");
      }

      const outputUrl = URL.createObjectURL(blob);

      setResultUrl(outputUrl);
    } catch (error) {
      console.error("Background removal error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Background removal failed."
      );
    } finally {
      setProcessing(false);
    }
  };

  const processImage = async () => {
    if (!file || !url) {
      setMessage("Please select an image first.");
      return;
    }

    if (mode === "remove-bg") {
      await processRemoveBackground();
      return;
    }

    setProcessing(true);
    setMessage("");
    setResultUrl("");

    try {
      const image = new Image();

      image.src = url;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("Image could not be loaded."));
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Your browser could not create a canvas.");
      }

      const sourceX = mode === "crop" ? Math.max(0, crop.x) : 0;
      const sourceY = mode === "crop" ? Math.max(0, crop.y) : 0;

      const sourceWidth =
        mode === "crop"
          ? Math.min(crop.width, image.width - sourceX)
          : image.width;

      const sourceHeight =
        mode === "crop"
          ? Math.min(crop.height, image.height - sourceY)
          : image.height;

      if (sourceWidth <= 0 || sourceHeight <= 0) {
        throw new Error("Invalid crop dimensions.");
      }

      canvas.width = sourceWidth;
      canvas.height = sourceHeight;

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sourceWidth,
        sourceHeight
      );

      const outputType =
        mode === "convert" ? format : "image/png";

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, outputType, 0.92);
      });

      if (!blob) {
        throw new Error("Processing failed.");
      }

      const outputUrl = URL.createObjectURL(blob);

      setResultUrl(outputUrl);
    } catch (error) {
      console.error("Image processing error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Processing failed."
      );
    } finally {
      setProcessing(false);
    }
  };

  const clear = () => {
    if (url) {
      URL.revokeObjectURL(url);
    }

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setUrl("");
    setResultUrl("");
    setMessage("");
    setProcessing(false);
  };

  const getDownloadExtension = () => {
    if (mode === "remove-bg") {
      return "png";
    }

    if (format === "image/jpeg") {
      return "jpg";
    }

    if (format === "image/webp") {
      return "webp";
    }

    return "png";
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              FILE TOOL
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              {title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              {description}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              আপনার ফাইল আপনার ব্রাউজার থেকেই প্রসেস করা হবে।
              স্থায়ীভাবে সংরক্ষণ করা হবে না।
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <input
              type="file"
              accept={
                mode === "pdf"
                  ? ".pdf,application/pdf"
                  : "image/*"
              }
              onChange={(event) =>
                handleFile(event.target.files?.[0])
              }
              className="block w-full rounded-xl border border-slate-200 p-4"
            />

            {file && (
              <p className="mt-4 text-sm text-slate-600">
                Selected: {file.name}
              </p>
            )}

            {url && mode !== "pdf" && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <img
                  src={url}
                  alt="Selected file preview"
                  className="mx-auto max-h-80 max-w-full rounded-xl object-contain"
                />
              </div>
            )}

            {mode === "convert" && (
              <select
                value={format}
                onChange={(event) =>
                  setFormat(event.target.value)
                }
                className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WEBP</option>
              </select>
            )}

            {mode === "crop" && (
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {(["x", "y", "width", "height"] as const).map(
                  (key) => (
                    <input
                      key={key}
                      type="number"
                      min="0"
                      value={crop[key]}
                      onChange={(event) =>
                        setCrop((current) => ({
                          ...current,
                          [key]: Number(event.target.value),
                        }))
                      }
                      aria-label={key}
                      placeholder={key}
                      className="rounded-xl border border-slate-200 px-3 py-2"
                    />
                  )
                )}
              </div>
            )}

            {message && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {message}
              </p>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void processImage()}
                disabled={!file || processing}
                className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing
                  ? "Processing..."
                  : mode === "remove-bg"
                    ? "Remove Background"
                    : "Process File"}
              </button>

              <button
                type="button"
                onClick={clear}
                className="rounded-xl border border-slate-200 px-6 py-4 font-bold text-slate-700 hover:bg-slate-50"
              >
                Clear
              </button>
            </div>

            {resultUrl && (
              <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center">
                <p className="mb-4 font-semibold text-slate-700">
                  Result
                </p>

                <div
                  className="mx-auto flex min-h-64 max-w-2xl items-center justify-center overflow-hidden rounded-xl p-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
                    backgroundSize: "24px 24px",
                    backgroundPosition:
                      "0 0, 0 12px, 12px -12px, -12px 0px",
                  }}
                >
                  <img
                    src={resultUrl}
                    alt="Processed result"
                    className="max-h-96 max-w-full object-contain"
                  />
                </div>

                <a
                  href={resultUrl}
                  download={`${slug}-result.${getDownloadExtension()}`}
                  className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Download Result
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}