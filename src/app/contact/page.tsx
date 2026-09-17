"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      setStatus({ type: "error", message: "Please complete all required fields." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus({
        type: "error",
        message: "The contact service is not configured. Please try again later.",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      subject,
      message,
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Contact submission failed:", error);
      setStatus({
        type: "error",
        message: "Your message could not be sent. Please try again.",
      });
      return;
    }

    setForm(initialForm);
    setStatus({ type: "success", message: "Message sent successfully." });
  };

  return (
    <ToolLayout>
      <section className="px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">CONTACT</p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Contact</h1>

            <p className="mt-4 text-slate-600">Questions, feedback, or issues? Send us a message.</p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="text-sm font-semibold">Full Name *</label>

                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your full name"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-semibold">Email Address *</label>

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-semibold">Phone Number</label>

                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Your phone number"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="subject" className="text-sm font-semibold">Subject *</label>

                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  placeholder="How can we help?"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-semibold">Message *</label>

                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Write your message..."
                  required
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </button>
            </form>

            {status && (
              <p
                role="status"
                className={`mt-4 rounded-xl px-4 py-3 text-center text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}