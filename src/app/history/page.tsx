"use client";

import { useCallback, useEffect, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import {
  clearToolHistory,
  deleteToolHistory,
  getToolHistory,
  type ToolHistoryRecord,
} from "@/lib/tool-history";

export default function HistoryPage() {
  const [history, setHistory] = useState<ToolHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setHistory(await getToolHistory());
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    void getToolHistory().then((records) => {
      if (!mounted) return;
      setHistory(records);
      setLoading(false);
    });

    const handleUpdate = () => void loadHistory();
    window.addEventListener("tool-history-updated", handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener("tool-history-updated", handleUpdate);
    };
  }, [loadHistory]);

  const handleClear = async () => {
    if (!history.length) return;
    if (!window.confirm("Are you sure you want to clear all history?")) return;

    await clearToolHistory();
    await loadHistory();
  };

  return (
    <ToolLayout>
      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-blue-600">ACTIVITY</p>
              <h1 className="mt-2 text-4xl font-bold md:text-5xl">History</h1>
              <p className="mt-4 text-slate-600">
                Your previous tool activities, newest first.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClear}
              disabled={!history.length}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear All History
            </button>
          </div>

          <div className="mt-10 space-y-4">
            {loading && <p className="text-center text-slate-500">Loading history...</p>}

            {!loading && !history.length && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                No tool activity yet.
              </div>
            )}

            {!loading && history.map((record) => (
              <article key={record.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{record.tool_name}</h2>
                    <p className="text-sm text-slate-500">
                      {new Date(record.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteToolHistory(record.id);
                      await loadHistory();
                    }}
                    className="font-semibold text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Input</p>
                    <p className="mt-1 break-words text-slate-800">{record.input || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Result</p>
                    <p className="mt-1 break-words text-slate-800">{record.output || "—"}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
