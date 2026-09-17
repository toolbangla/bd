"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { ADMIN_EMAIL, isAdminEmail } from "@/lib/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export default function AdminPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [historyCount, setHistoryCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingLogo, setSavingLogo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  const loadDashboard = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Supabase is not configured. Check the public environment variables.");
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    if (!isAdminEmail(userData.user?.email)) {
      router.replace("/admin/login");
      return;
    }

    const [messagesResult, settingsResult, historyResult] = await Promise.all([
      supabase
        .from("contact_messages")
        .select("id, name, email, phone, subject, message, created_at, is_read")
        .order("created_at", { ascending: false }),
      supabase.from("site_settings").select("logo_url").eq("id", 1).maybeSingle(),
      supabase.from("tool_history").select("id", { count: "exact", head: true }),
    ]);

    if (messagesResult.error) {
      setErrorMessage(`Could not load contact messages: ${messagesResult.error.message}`);
    } else {
      setMessages((messagesResult.data ?? []) as ContactMessage[]);
    }

    if (settingsResult.error) {
      setErrorMessage((current) => current || `Could not load logo settings: ${settingsResult.error.message}`);
    } else {
      setLogoUrl(settingsResult.data?.logo_url ?? "");
    }

    setHistoryCount(historyResult.count ?? null);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void Promise.resolve().then(loadDashboard);
  }, [loadDashboard]);

  const updateReadStatus = async (message: ContactMessage) => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !message.is_read })
      .eq("id", message.id);

    if (error) {
      setErrorMessage(`Could not update message status: ${error.message}`);
      return;
    }

    setMessages((current) => current.map((item) => (
      item.id === message.id ? { ...item, is_read: !item.is_read } : item
    )));
  };

  const saveLogo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingLogo(true);
    setErrorMessage("");
    setNotice("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Supabase is not configured. Check the public environment variables.");
      setSavingLogo(false);
      return;
    }

    const { error } = await supabase
      .from("site_settings")
      .update({ logo_url: logoUrl.trim() || null, updated_at: new Date().toISOString() })
      .eq("id", 1);

    setSavingLogo(false);

    if (error) {
      setErrorMessage(`Could not save logo settings: ${error.message}`);
      return;
    }

    setNotice("Logo settings saved. Refresh public pages to see the updated logo.");
  };

  const handleLogoFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Unsupported logo type. Choose a PNG, JPG, WEBP, or SVG image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Logo file is too large. Choose an image smaller than 5 MB.");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setErrorMessage("");
    setNotice("");
  };

  const uploadLogo = async () => {
    if (!logoFile) {
      setErrorMessage("Choose a logo file first.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Supabase is not configured. Check the public environment variables.");
      return;
    }

    setSavingLogo(true);
    setErrorMessage("");
    setNotice("");

    const safeName = logoFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `logos/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from("site-assets").upload(path, logoFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: logoFile.type,
    });

    if (uploadError) {
      setSavingLogo(false);
      setErrorMessage(`Logo upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    const { error: settingsError } = await supabase
      .from("site_settings")
      .update({ logo_url: data.publicUrl, updated_at: new Date().toISOString() })
      .eq("id", 1);

    setSavingLogo(false);
    if (settingsError) {
      setErrorMessage(`Logo uploaded but settings could not be saved: ${settingsError.message}`);
      return;
    }

    setLogoUrl(data.publicUrl);
    setLogoPreview(data.publicUrl);
    setNotice("Logo uploaded and saved successfully.");
  };

  const signOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <ToolLayout>
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-blue-600">CONTROL PANEL</p>
              <h1 className="mt-2 text-4xl font-bold">Admin Dashboard</h1>
              <p className="mt-3 text-slate-600">Signed in as {ADMIN_EMAIL}</p>
            </div>
            <button type="button" onClick={signOut} className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">
              Sign Out
            </button>
          </div>

          {errorMessage && <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}
          {notice && <p role="status" className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{notice}</p>}

          {loading ? (
            <p className="mt-10 text-center text-slate-500">Loading dashboard...</p>
          ) : (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">Contact Messages</p>
                  <p className="mt-2 text-3xl font-bold">{messages.length}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">Your Tool History</p>
                  <p className="mt-2 text-3xl font-bold">{historyCount ?? "—"}</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold">Logo Management</h2>
                <p className="mt-2 text-sm text-slate-600">Upload a logo file or save an external image URL.</p>
                {(logoPreview || logoUrl) && <img src={logoPreview || logoUrl} alt="Current ToolBangla logo" className="mt-5 h-20 w-auto max-w-full object-contain" />}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleLogoFile} className="min-w-0 flex-1 rounded-xl border border-slate-200 p-3 text-sm" />
                  <button type="button" onClick={() => void uploadLogo()} disabled={savingLogo || !logoFile} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                    {savingLogo ? "Uploading..." : "Upload Logo"}
                  </button>
                </div>
                <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={saveLogo}>
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(event) => setLogoUrl(event.target.value)}
                    placeholder="https://..."
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                  <button type="submit" disabled={savingLogo} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
                    {savingLogo ? "Saving..." : "Save Logo URL"}
                  </button>
                </form>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold">Contact Messages</h2>
                <div className="mt-6 space-y-4">
                  {!messages.length && <p className="text-slate-500">No messages yet.</p>}
                  {messages.map((message) => (
                    <article key={message.id} className="rounded-2xl border border-slate-200 p-5">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row">
                        <div>
                          <h3 className="font-bold">{message.subject}</h3>
                          <p className="mt-1 text-sm text-slate-600">{message.name} · {message.email}{message.phone ? ` · ${message.phone}` : ""}</p>
                          <p className="mt-1 text-xs text-slate-500">{new Date(message.created_at).toLocaleString()}</p>
                        </div>
                        <button type="button" onClick={() => void updateReadStatus(message)} className="self-start rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50">
                          {message.is_read ? "Mark Unread" : "Mark Read"}
                        </button>
                      </div>
                      <p className="mt-4 whitespace-pre-wrap text-slate-800">{message.message}</p>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </ToolLayout>
  );
}
