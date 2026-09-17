import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export const HISTORY_STORAGE_KEY = "toolbangla-history";

export type ToolHistoryRecord = {
  id: string;
  tool_name: string;
  input: string;
  output: string;
  created_at: string;
};

type NewHistoryRecord = Omit<ToolHistoryRecord, "id" | "created_at">;

function getGuestHistory(): ToolHistoryRecord[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) ?? "[]") as ToolHistoryRecord[];
  } catch {
    return [];
  }
}

function notifyHistoryChanged() {
  window.dispatchEvent(new Event("tool-history-updated"));
}

export async function recordToolHistory(record: NewHistoryRecord) {
  if (typeof window === "undefined") return;

  const supabase = getSupabaseBrowserClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (user && supabase) {
    const { error } = await supabase.from("tool_history").insert({
      user_id: user.id,
      tool_name: record.tool_name,
      input: record.input,
      output: record.output,
    });

    if (!error) notifyHistoryChanged();
    return;
  }

  const history: ToolHistoryRecord[] = [
    {
      ...record,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    },
    ...getGuestHistory(),
  ];

  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  notifyHistoryChanged();
}

export async function getToolHistory() {
  if (typeof window === "undefined") return [];

  const supabase = getSupabaseBrowserClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (user && supabase) {
    const { data, error } = await supabase
      .from("tool_history")
      .select("id, tool_name, input, output, created_at")
      .order("created_at", { ascending: false });

    if (!error) return (data ?? []) as ToolHistoryRecord[];
  }

  return getGuestHistory().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function deleteToolHistory(id: string) {
  const supabase = getSupabaseBrowserClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (user && supabase) {
    await supabase.from("tool_history").delete().eq("id", id);
  } else {
    const updated = getGuestHistory().filter((record) => record.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  }

  notifyHistoryChanged();
}

export async function clearToolHistory() {
  const supabase = getSupabaseBrowserClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (user && supabase) {
    await supabase.from("tool_history").delete().eq("user_id", user.id);
  } else {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  }

  notifyHistoryChanged();
}
