"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

type ConvertedPage = {
  pageNumber: number;
  url: string;
};

export default function PdfToImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<ConvertedPage[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("শুধু PDF ফাইল নির্বাচন করুন।");
      return;
    }

    urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    urlsRef.current = [];

    setFile(selectedFile);
    setPages([]);
    setProgress(0);
  };

  const convertToImages = async () => {
    if (!file) {
      alert("দয়া করে একটি PDF ফাইল নির্বাচন করুন।");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current = [];
      setPages([]);

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      const convertedPages: ConvertedPage[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale: 2,
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas তৈরি করা যায়নি।");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvas,
          canvasContext: context,
          viewport,
        }).promise;

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, "image/png");
        });

        if (!blob) {
          throw new Error("Image তৈরি করা যায়নি।");
        }

        const url = URL.createObjectURL(blob);

        urlsRef.current.push(url);

        convertedPages.push({
          pageNumber,
          url,
        });

        setProgress(
          Math.round((pageNumber / pdf.numPages) * 100)
        );
      }

      setPages(convertedPages);
      void recordToolHistory({
        tool_name: "PDF to Image",
        input: file.name,
        output: `${convertedPages.length} PNG image(s) created`,
      });
    } catch (error) {
      console.error(error);
      alert(
        "PDF থেকে Image তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string, pageNumber: number) => {
    const link = document.createElement("a");

    link.href = url;
    link.download = `toolbangla-page-${pageNumber}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    if (pages.length === 0) return;

    pages.forEach((page) => {
      downloadImage(page.url, page.pageNumber);
    });
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              PDF TO IMAGE
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              PDF to Image
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              PDF-এর প্রতিটি পেজ PNG Image হিসেবে বের করে নিন।
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
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center transition hover:border-blue-400 hover:bg-blue-50">
              <div className="text-5xl">📑</div>

              <h2 className="mt-4 text-xl font-bold">
                PDF নির্বাচন করুন
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                শুধুমাত্র PDF ফাইল
              </p>

              <span className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
                PDF নির্বাচন করুন
              </span>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {file && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold">নির্বাচিত PDF</p>

                <p className="mt-2 truncate text-sm text-slate-600">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <button
                  onClick={convertToImages}
                  disabled={loading}
                  className="mt-5 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? `রূপান্তর হচ্ছে... ${progress}%`
                    : "Image-এ রূপান্তর করুন →"}
                </button>
              </div>
            )}
          </div>

          {pages.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    তৈরি হওয়া Images
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    মোট {pages.length}টি পেজ
                  </p>
                </div>

                <button
                  onClick={downloadAll}
                  className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
                >
                  সব Image Download করুন
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {pages.map((page) => (
                  <div
                    key={page.pageNumber}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img
                        src={page.url}
                        alt={`PDF page ${page.pageNumber}`}
                        className="h-auto w-full"
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold">
                        Page {page.pageNumber}
                      </span>

                      <button
                        onClick={() =>
                          downloadImage(
                            page.url,
                            page.pageNumber
                          )
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              PDF to Image কী?
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              এই টুলের মাধ্যমে PDF-এর প্রতিটি পেজ আলাদা PNG Image-এ
              রূপান্তর করতে পারবেন। আপনার PDF ব্রাউজারেই প্রসেস করা হয়।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}