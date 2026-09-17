"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearToolHistoryForTool,
  getToolHistoryForTool,
  type ToolHistoryRecord,
} from "@/lib/tool-history";

type ToolHistoryProps = {
  toolName: string;
};

export default function ToolHistory({ toolName }: ToolHistoryProps) {
  const [history, setHistory] = useState<ToolHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    setHistory(await getToolHistoryForTool(toolName));
    setLoading(false);
  }, [toolName]);

  useEffect(() => {
    let mounted = true;
    void getToolHistoryForTool(toolName).then((records) => {
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
  }, [loadHistory, toolName]);

  const clearHistory = async () => {
    if (!history.length || !window.confirm(`Clear ${toolName} history?`)) return;
    await clearToolHistoryForTool(toolName);
    await loadHistory();
  };

  return (
    <section className="mx-auto mt-8 max-w-4xl px-5 pb-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold">{toolName} History</h2>
          <p className="mt-1 text-sm text-slate-500">Recent activity for this tool only.</p>
        </div>
        <button
          type="button"
          onClick={() => void clearHistory()}
          disabled={!history.length}
          className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Tool History
        </button>
      </div>

        <div className="mt-5 space-y-3">
        {loading && <p className="text-sm text-slate-500">Loading history...</p>}
        {!loading && !history.length && <p className="text-sm text-slate-500">No activity recorded yet.</p>}
        {!loading && history.map((record) => (
          <article key={record.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs text-slate-500">{new Date(record.created_at).toLocaleString()}</p>
            <p className="mt-2 break-words text-sm"><strong>Input:</strong> {record.input || "—"}</p>
            <p className="mt-1 break-words text-sm"><strong>Result:</strong> {record.output || "—"}</p>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
