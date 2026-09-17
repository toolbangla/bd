export type ToolHistoryRecord = {
  id: string;
  tool_name: string;
  tool_id?: string;
  input: string;
  output: string;
  created_at: string;
};

type NewHistoryRecord = Omit<ToolHistoryRecord, "id" | "created_at">;

let sessionHistory: ToolHistoryRecord[] = [];

function notifyHistoryChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("tool-history-updated"));
}

export async function recordToolHistory(record: NewHistoryRecord) {
  if (typeof window === "undefined") return;

  sessionHistory = [
    {
      ...record,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    },
    ...sessionHistory,
  ];

  notifyHistoryChanged();
}

export async function getToolHistory() {
  if (typeof window === "undefined") return [];
  return [...sessionHistory];
}

export async function deleteToolHistory(id: string) {
  sessionHistory = sessionHistory.filter((record) => record.id !== id);

  notifyHistoryChanged();
}

export async function clearToolHistory() {
  sessionHistory = [];

  notifyHistoryChanged();
}

export async function getToolHistoryForTool(toolName: string) {
  const history = await getToolHistory();
  return history.filter((record) => record.tool_name === toolName);
}

export async function clearToolHistoryForTool(toolName: string) {
  sessionHistory = sessionHistory.filter((record) => record.tool_name !== toolName);

  notifyHistoryChanged();
}
