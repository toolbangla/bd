"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { ADMIN_EMAIL, isAdminEmail } from "@/lib/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      void Promise.resolve().then(() => {
        setLoading(false);
        setErrorMessage("Supabase is not configured. Check the public environment variables.");
      });
      return;
    }

    void supabase.auth.getUser().then(({ data }) => {
      if (isAdminEmail(data.user?.email)) router.replace("/admin");
      else setLoading(false);
    });
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!isAdminEmail(email)) {
      setErrorMessage("Only the authorized admin account can sign in here.");
      return;
    }

    if (!password) {
      setErrorMessage("Enter your password to continue.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Supabase is not configured. Check the public environment variables.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message || "Sign-in failed. Please check your credentials.");
      return;
    }

    router.replace("/admin");
  };

  return (
    <ToolLayout>
      <section className="px-5 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
          <p className="font-semibold text-blue-600">ADMIN ACCESS</p>
          <h1 className="mt-2 text-3xl font-bold">Admin Login</h1>
          <p className="mt-3 text-slate-600">Sign in to manage ToolBangla.</p>

          {loading ? (
            <p className="mt-8 text-center text-slate-500">Checking session...</p>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="admin-email" className="text-sm font-semibold">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="text-sm font-semibold">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {errorMessage && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}
        </div>
      </section>
    </ToolLayout>
  );
}
