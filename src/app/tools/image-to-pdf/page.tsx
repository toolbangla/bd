"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import ToolLayout from "@/components/ToolLayout";

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    setFiles(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
  };

  const createPDF = async () => {
    if (files.length === 0) {
      alert("দয়া করে অন্তত একটি ছবি নির্বাচন করুন।");
      return;
    }

    try {
      setLoading(true);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () =>
            reject(new Error("ছবি লোড করা যায়নি"));
          img.src = imageUrl;
        });

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;

        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;

        const imageRatio = img.width / img.height;

        let width = maxWidth;
        let height = width / imageRatio;

        if (height > maxHeight) {
          height = maxHeight;
          width = height * imageRatio;
        }

        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          img,
          "JPEG",
          x,
          y,
          width,
          height,
          undefined,
          "FAST"
        );

        URL.revokeObjectURL(imageUrl);
      }

      pdf.save("toolbangla-image-to-pdf.pdf");
    } catch (error) {
      console.error(error);
      alert("PDF তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              IMAGE TO PDF
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Image to PDF
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              এক বা একাধিক ছবি খুব সহজে একটি PDF ফাইলে তৈরি করুন।
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
              <div className="text-5xl">📄</div>

              <h2 className="mt-4 text-xl font-bold">
                ছবি নির্বাচন করুন
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                JPG, JPEG, PNG এবং অন্যান্য Image ফাইল
              </p>

              <span className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
                ছবি নির্বাচন করুন
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
            </label>

            {files.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">
                    নির্বাচিত ছবি ({files.length})
                  </h2>

                  <button
                    onClick={() => setFiles([])}
                    className="text-sm font-semibold text-red-500 hover:text-red-700"
                  >
                    সব মুছে দিন
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {index + 1}. {file.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        onClick={() => removeFile(index)}
                        className="ml-4 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                      >
                        মুছে দিন
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={createPDF}
                  disabled={loading}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "PDF তৈরি হচ্ছে..."
                    : "PDF তৈরি করুন →"}
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              Image to PDF কী?
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              এই টুল ব্যবহার করে এক বা একাধিক ছবি একটি PDF ফাইলে
              রূপান্তর করতে পারবেন। ছবিগুলো আপনার ব্রাউজারেই
              প্রসেস করা হয়।
            </p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}