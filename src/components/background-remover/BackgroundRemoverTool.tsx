"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";

type BackgroundChoice =
  | "transparent"
  | "white"
  | "black"
  | "soft"
  | "custom";

const backgroundOptions: {
  id: BackgroundChoice;
  label: string;
  preview: string;
}[] = [
  {
    id: "transparent",
    label: "Transparent",
    preview: "checker",
  },
  {
    id: "white",
    label: "White",
    preview: "#ffffff",
  },
  {
    id: "black",
    label: "Black",
    preview: "#111827",
  },
  {
    id: "soft",
    label: "Soft",
    preview: "#eef2ff",
  },
];

const features = [
  {
    title: "AI Background Removal",
    description:
      "ছবির মূল subject আলাদা করে background সরানোর জন্য AI-powered processing ব্যবহার করুন।",
    icon: "✦",
  },
  {
    title: "Transparent PNG",
    description:
      "Background remove করার পরে transparent PNG হিসেবে result preview ও download করতে পারবেন।",
    icon: "◈",
  },
  {
    title: "One-click Workflow",
    description:
      "কোনো complicated editing software ছাড়াই upload থেকে download পর্যন্ত সহজ workflow।",
    icon: "↗",
  },
  {
    title: "Background Color",
    description:
      "Transparent result-এর ওপর white, black, soft বা নিজের পছন্দের color বসাতে পারবেন।",
    icon: "●",
  },
  {
    title: "Before & After",
    description:
      "Original image এবং background-removed result পাশাপাশি দেখে পরিবর্তনটি যাচাই করুন।",
    icon: "◫",
  },
  {
    title: "Responsive Design",
    description:
      "Desktop, tablet এবং mobile—সব device-এর জন্য responsive interface।",
    icon: "⌁",
  },
];

const useCases = [
  {
    title: "E-commerce",
    description:
      "Product listing-এর জন্য clean subject image তৈরি করুন।",
    emoji: "🛍️",
  },
  {
    title: "Profile Photos",
    description:
      "Profile, CV বা professional design-এর জন্য subject আলাদা করুন।",
    emoji: "👤",
  },
  {
    title: "Social Media",
    description:
      "Social post, cover এবং creative design-এর জন্য transparent image তৈরি করুন।",
    emoji: "📱",
  },
  {
    title: "Marketplace",
    description:
      "Online marketplace-এর product photo আরও clean presentation দিন।",
    emoji: "🏷️",
  },
  {
    title: "Marketing",
    description:
      "Banner, advertisement ও promotional design-এ cutout image ব্যবহার করুন।",
    emoji: "📣",
  },
  {
    title: "Creative Design",
    description:
      "Poster, thumbnail ও অন্যান্য graphics-এর জন্য subject আলাদা করুন।",
    emoji: "✨",
  },
];

const faqs = [
  {
    question: "Background Remover কীভাবে কাজ করে?",
    answer:
      "আপনি একটি image upload করলে ToolBangla সেটি background-removal processing-এর জন্য server API route-এ পাঠায়। সেখান থেকে transparent PNG result পাওয়া গেলে সেটি browser-এ preview করা হয়।",
  },
  {
    question: "কোন image format ব্যবহার করতে পারি?",
    answer:
      "বর্তমান interface-এ JPG, PNG এবং WEBP image upload করার জন্য তৈরি করা হয়েছে।",
  },
  {
    question: "Result কি transparent PNG হবে?",
    answer:
      "হ্যাঁ। মূল background removal result PNG format-এ নেওয়া হয়, তাই transparent background রাখা সম্ভব।",
  },
  {
    question: "আমি কি result-এর background color পরিবর্তন করতে পারি?",
    answer:
      "হ্যাঁ। Transparent result-এর পরে White, Black, Soft বা Custom color নির্বাচন করতে পারবেন।",
  },
  {
    question: "আমার API key কি browser-এ দেখা যাবে?",
    answer:
      "না। API key server-side environment variable হিসেবে রাখা হয় এবং client-side component থেকে সরাসরি ব্যবহার করা হয় না।",
  },
];

function UploadIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 16V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.5 8.5 12 4l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 14.5v3A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"
        fill="currentColor"
      />
      <path
        d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4v11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="m7.5 11.5 4.5 4.5 4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 20h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12.5 4.2 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BackgroundRemoverTool() {
  const inputRef = useRef<HTMLInputElement>(null);

  const originalUrlRef = useRef("");
  const transparentUrlRef = useRef("");
  const composedUrlRef = useRef("");

  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [transparentUrl, setTransparentUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");

  const [background, setBackground] =
    useState<BackgroundChoice>("transparent");

  const [customColor, setCustomColor] = useState("#ffffff");

  const revokeOriginal = () => {
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = "";
    }
  };

  const revokeTransparent = () => {
    if (transparentUrlRef.current) {
      URL.revokeObjectURL(transparentUrlRef.current);
      transparentUrlRef.current = "";
    }
  };

  const revokeComposed = () => {
    if (composedUrlRef.current) {
      URL.revokeObjectURL(composedUrlRef.current);
      composedUrlRef.current = "";
    }
  };

  const resetResult = () => {
    revokeTransparent();
    revokeComposed();

    setTransparentUrl("");
    setResultUrl("");
    setBackground("transparent");
  };

  const handleFile = (selectedFile?: File) => {
    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    revokeOriginal();
    resetResult();

    const previewUrl = URL.createObjectURL(selectedFile);

    originalUrlRef.current = previewUrl;

    setFile(selectedFile);
    setOriginalUrl(previewUrl);
    setMessage("");
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFile(event.target.files?.[0]);

    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const processRemoveBackground = async () => {
    if (!file) {
      setMessage("প্রথমে একটি image select করুন।");
      return;
    }

    setProcessing(true);
    setMessage("");

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
          // Ignore JSON parsing errors.
        }

        throw new Error(errorMessage);
      }

      const blob = await response.blob();

      if (!blob.type.startsWith("image/")) {
        throw new Error("Server did not return a valid image.");
      }

      revokeTransparent();
      revokeComposed();

      const outputUrl = URL.createObjectURL(blob);

      transparentUrlRef.current = outputUrl;

      setTransparentUrl(outputUrl);
      setResultUrl(outputUrl);
      setBackground("transparent");
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

  const applyBackground = async (
    choice: BackgroundChoice,
    color?: string
  ) => {
    const sourceUrl = transparentUrlRef.current;

    if (!sourceUrl) {
      return;
    }

    if (choice === "transparent") {
      revokeComposed();
      setResultUrl(sourceUrl);
      return;
    }

    try {
      const image = new Image();

      image.src = sourceUrl;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("Result image could not be loaded."));
      });

      const canvas = document.createElement("canvas");

      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Your browser could not create a canvas.");
      }

      let backgroundColor = "#ffffff";

      if (choice === "black") {
        backgroundColor = "#111827";
      }

      if (choice === "soft") {
        backgroundColor = "#eef2ff";
      }

      if (choice === "custom" && color) {
        backgroundColor = color;
      }

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const composedBlob = await new Promise<Blob | null>(
        (resolve) => {
          canvas.toBlob(resolve, "image/png");
        }
      );

      if (!composedBlob) {
        throw new Error("Could not create the final image.");
      }

      revokeComposed();

      const composedUrl = URL.createObjectURL(composedBlob);

      composedUrlRef.current = composedUrl;

      setResultUrl(composedUrl);
    } catch (error) {
      console.error("Background composition error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not change the background."
      );
    }
  };

  const selectBackground = (choice: BackgroundChoice) => {
    setBackground(choice);

    void applyBackground(
      choice,
      choice === "custom" ? customColor : undefined
    );
  };

  const handleCustomColor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;

    setCustomColor(color);
    setBackground("custom");

    void applyBackground("custom", color);
  };

  const clearAll = () => {
    revokeOriginal();
    resetResult();

    setFile(null);
    setOriginalUrl("");
    setMessage("");
    setProcessing(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const scrollToUpload = () => {
    document
      .getElementById("background-remover-upload")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  return (
    <ToolLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(59,130,246,0.28), transparent 30%), radial-gradient(circle at 85% 10%, rgba(168,85,247,0.25), transparent 28%), radial-gradient(circle at 55% 90%, rgba(14,165,233,0.18), transparent 32%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:py-18 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.16em] text-blue-200">
                <SparklesIcon />
                AI BACKGROUND REMOVER
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                ছবির Background
                <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                  এক ক্লিকেই Remove করুন
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                আপনার ছবির মূল subject রেখে unwanted background সরিয়ে
                clean transparent PNG তৈরি করুন। Upload করুন, process করুন
                এবং result download করুন।
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "JPG",
                  "PNG",
                  "WEBP",
                  "Transparent PNG",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">01</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Upload image
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">02</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Remove background
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">03</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Download PNG
                  </p>
                </div>
              </div>
            </div>

            {/* UPLOAD CARD */}
            <div
              id="background-remover-upload"
              className="rounded-[2rem] border border-white/10 bg-white p-3 shadow-2xl shadow-black/30"
            >
              <div className="rounded-[1.6rem] bg-slate-50 p-5 text-slate-900 sm:p-7">
                {!file && (
                  <div
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`rounded-[1.5rem] border-2 border-dashed p-8 text-center transition sm:p-12 ${
                      dragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/40"
                    }`}
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                      <UploadIcon />
                    </div>

                    <h2 className="mt-6 text-xl font-extrabold sm:text-2xl">
                      আপনার ছবি এখানে Drop করুন
                    </h2>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                      অথবা আপনার computer থেকে একটি image select করুন।
                      Background automatically remove করার জন্য প্রস্তুত।
                    </p>

                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="mt-7 inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      <UploadIcon />
                      <span className="ml-2">Upload Image</span>
                    </button>

                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <p className="mt-5 text-xs font-medium text-slate-400">
                      Supported: JPG, PNG, WEBP
                    </p>
                  </div>
                )}

                {file && (
                  <div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          Selected image
                        </p>
                        <h2 className="mt-1 max-w-md truncate text-lg font-extrabold">
                          {file.name}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={clearAll}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                      >
                        Choose another
                      </button>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="flex min-h-[280px] items-center justify-center p-5 sm:min-h-[340px]">
                        <img
                          src={
                            resultUrl
                              ? resultUrl
                              : originalUrl
                          }
                          alt={
                            resultUrl
                              ? "Background removed result"
                              : "Selected image preview"
                          }
                          className="max-h-[340px] max-w-full rounded-xl object-contain"
                        />
                      </div>
                    </div>

                    {!transparentUrl && (
                      <button
                        type="button"
                        onClick={() => void processRemoveBackground()}
                        disabled={processing}
                        className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {processing ? (
                          <>
                            <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Background Removing...
                          </>
                        ) : (
                          <>
                            <SparklesIcon />
                            <span className="ml-2">
                              Remove Background
                            </span>
                          </>
                        )}
                      </button>
                    )}

                    {transparentUrl && (
                      <div className="mt-5">
                        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                          <CheckIcon />
                          Background successfully removed
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-bold text-slate-700">
                            Choose result background
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {backgroundOptions.map((option) => (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() =>
                                  selectBackground(option.id)
                                }
                                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                                  background === option.id
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                }`}
                              >
                                <span
                                  className="h-5 w-5 rounded-md border border-slate-200"
                                  style={
                                    option.preview === "checker"
                                      ? {
                                          backgroundImage:
                                            "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
                                          backgroundSize:
                                            "10px 10px",
                                          backgroundPosition:
                                            "0 0, 0 5px, 5px -5px, -5px 0px",
                                        }
                                      : {
                                          background:
                                            option.preview,
                                        }
                                  }
                                />
                                {option.label}
                              </button>
                            ))}

                            <label
                              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                                background === "custom"
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 bg-white text-slate-600"
                              }`}
                            >
                              <input
                                type="color"
                                value={customColor}
                                onChange={handleCustomColor}
                                className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                              />
                              Custom
                            </label>
                          </div>
                        </div>

                        <div
                          className="mt-5 flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 p-5"
                          style={
                            background === "transparent"
                              ? {
                                  backgroundImage:
                                    "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
                                  backgroundSize: "24px 24px",
                                  backgroundPosition:
                                    "0 0, 0 12px, 12px -12px, -12px 0px",
                                }
                              : {
                                  background:
                                    background === "white"
                                      ? "#ffffff"
                                      : background === "black"
                                        ? "#111827"
                                        : background === "soft"
                                          ? "#eef2ff"
                                          : customColor,
                                }
                          }
                        >
                          <img
                            src={resultUrl}
                            alt="Background removed result"
                            className="max-h-[330px] max-w-full object-contain"
                          />
                        </div>

                        <a
                          href={resultUrl}
                          download="toolbangla-background-removed.png"
                          className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-emerald-700"
                        >
                          <DownloadIcon />
                          <span className="ml-2">
                            Download PNG
                          </span>
                        </a>
                      </div>
                    )}

                    {message && (
                      <div
                        role="alert"
                        className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                      >
                        {message}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6 text-sm font-semibold text-slate-600 lg:px-8">
          <span className="flex items-center gap-2">
            <CheckIcon />
            Easy upload
          </span>

          <span className="flex items-center gap-2">
            <CheckIcon />
            Transparent PNG
          </span>

          <span className="flex items-center gap-2">
            <CheckIcon />
            Background color options
          </span>

          <span className="flex items-center gap-2">
            <CheckIcon />
            Download ready
          </span>
        </div>
      </section>

      {/* BEFORE AFTER */}
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">
              Clean cutout
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Original থেকে clean transparent result
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              আপনার image upload করার পর original এবং processed result
              একই workflow-এর মধ্যে দেখতে পারবেন।
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                <span className="text-sm font-extrabold">
                  Original
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                  BEFORE
                </span>
              </div>

              <div className="flex min-h-[300px] items-center justify-center p-6">
                {originalUrl ? (
                  <img
                    src={originalUrl}
                    alt="Original uploaded image"
                    className="max-h-[360px] max-w-full rounded-2xl object-contain"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <div className="text-5xl">🖼️</div>
                    <p className="mt-3 text-sm font-semibold">
                      Your original image will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                <span className="text-sm font-extrabold">
                  Removed Background
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                  AFTER
                </span>
              </div>

              <div
                className="flex min-h-[300px] items-center justify-center p-6"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
                  backgroundSize: "28px 28px",
                  backgroundPosition:
                    "0 0, 0 14px, 14px -14px, -14px 0px",
                }}
              >
                {transparentUrl ? (
                  <img
                    src={transparentUrl}
                    alt="Background removed image"
                    className="max-h-[360px] max-w-full object-contain"
                  />
                ) : (
                  <div className="rounded-2xl bg-white/80 px-6 py-5 text-center text-slate-500 shadow-sm backdrop-blur">
                    <div className="text-5xl">✨</div>
                    <p className="mt-3 text-sm font-semibold">
                      Process your image to see the result
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">
              Why ToolBangla
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Background removal workflow, made simple
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Upload থেকে final PNG download পর্যন্ত সবকিছু একটি clean
              interface-এর মধ্যে রাখার চেষ্টা করা হয়েছে।
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              তিনটি সহজ ধাপ
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Upload",
                text: "আপনার JPG, PNG বা WEBP image select করুন অথবা drag & drop করুন।",
              },
              {
                number: "02",
                title: "Remove",
                text: "Remove Background button চাপুন এবং processing শেষ হওয়া পর্যন্ত অপেক্ষা করুন।",
              },
              {
                number: "03",
                title: "Download",
                text: "Transparent অথবা customized background result দেখে PNG download করুন।",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <span className="text-5xl font-black tracking-tight text-blue-100">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-slate-950 px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-300">
              Use cases
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              যেকোনো creative workflow-এর জন্য
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Product image থেকে social media creative—subject আলাদা
              করার জন্য একই সহজ workflow ব্যবহার করুন।
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="text-3xl">{item.emoji}</div>

                <h3 className="mt-5 text-lg font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              সাধারণ প্রশ্নের উত্তর
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5"
              >
                <summary className="cursor-pointer list-none pr-8 text-base font-extrabold text-slate-950">
                  {faq.question}
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED TOOLS */}
      <section className="bg-slate-50 px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-wider text-blue-600">
                  More image tools
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  আরও image tools ব্যবহার করুন
                </h2>
              </div>

              <Link
                href="/tools/image-compressor"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Image Compressor
                <ArrowIcon />
              </Link>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Link
                href="/tools/image-resizer"
                className="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-600"
              >
                Image Resizer
              </Link>

              <Link
                href="/tools/image-converter"
                className="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-600"
              >
                Image Converter
              </Link>

              <Link
                href="/tools/image-cropper"
                className="rounded-2xl border border-slate-200 p-4 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-600"
              >
                Image Cropper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-12 text-center text-white shadow-2xl shadow-blue-600/20 sm:px-12 sm:py-16">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-100">
            Ready to start?
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            আপনার ছবির background এখনই remove করুন
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Image upload করুন এবং simple workflow-এর মাধ্যমে transparent
            result তৈরি করুন।
          </p>

          <button
            type="button"
            onClick={scrollToUpload}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 shadow-lg transition hover:bg-blue-50"
          >
            Start Removing Background
            <ArrowIcon />
          </button>
        </div>
      </section>
    </ToolLayout>
  );
}