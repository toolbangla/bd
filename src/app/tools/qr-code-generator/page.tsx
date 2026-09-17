"use client";

import { useState } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";
import { recordToolHistory } from "@/lib/tool-history";

type QrMode = "text" | "url" | "contact";

type ContactForm = {
  fullName: string;
  mobile: string;
  email: string;
  facebook: string;
  address: string;
};

type ContactVCardResult =
  | { error: string }
  | { content: string; contact: ContactForm };

const initialContact: ContactForm = {
  fullName: "",
  mobile: "",
  email: "",
  facebook: "",
  address: "",
};

function escapeVCardValue(value: string) {
  return value
    .trim()
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function getFacebookUrl(value: string) {
  const input = value.trim();
  if (!input) return "";

  if (/^https?:\/\//i.test(input)) return input;
  if (/^(www\.)?facebook\.com\//i.test(input)) return `https://${input}`;

  return `https://www.facebook.com/${encodeURIComponent(input)}`;
}

function isValidPhone(value: string) {
  return /^\+?[\d\s().-]{7,20}$/.test(value.trim());
}

function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value.trim());
}

export default function QrCodeGeneratorPage() {
  const [mode, setMode] = useState<QrMode>("text");
  const [value, setValue] = useState("");
  const [contact, setContact] = useState<ContactForm>(initialContact);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [summary, setSummary] = useState<ContactForm | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const resetOutput = () => {
    setQrCodeUrl("");
    setSummary(null);
    setErrorMessage("");
    setStatusMessage("");
  };

  const selectMode = (nextMode: QrMode) => {
    setMode(nextMode);
    setValue("");
    setContact(initialContact);
    resetOutput();
  };

  const updateContact = (field: keyof ContactForm, fieldValue: string) => {
    setContact((current) => ({ ...current, [field]: fieldValue }));
    setErrorMessage("");
    setStatusMessage("");
  };

  const buildContactVCard = (): ContactVCardResult => {
    const fullName = contact.fullName.trim();
    const mobile = contact.mobile.trim();
    const email = contact.email.trim();
    const facebook = getFacebookUrl(contact.facebook);
    const address = contact.address.trim();

    if (!fullName) return { error: "Full Name is required." };
    if (!mobile || !isValidPhone(mobile)) return { error: "Enter a valid mobile number." };
    if (email && !isValidEmail(email)) return { error: "Enter a valid email address." };

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCardValue(fullName)}`,
      `TEL;TYPE=CELL:${escapeVCardValue(mobile)}`,
    ];

    if (email) lines.push(`EMAIL:${escapeVCardValue(email)}`);
    if (facebook) lines.push(`URL:${escapeVCardValue(facebook)}`);
    if (address) lines.push(`ADR;TYPE=HOME:;;${escapeVCardValue(address)};;;`);
    lines.push("END:VCARD");

    return {
      content: lines.join("\n"),
      contact: { ...contact, fullName, mobile, email, facebook, address },
    };
  };

  const generateQrCode = async () => {
    setErrorMessage("");
    setStatusMessage("");
    setSummary(null);

    let content = value.trim();
    let historyInput = mode === "text" ? "Text QR" : "URL QR";

    if (mode === "text" && !content) {
      setErrorMessage("Enter text to generate a QR code.");
      return;
    }

    if (mode === "url") {
      if (!content) {
        setErrorMessage("Enter a URL to generate a QR code.");
        return;
      }

      try {
        const url = new URL(content);
        if (!/^https?:$/.test(url.protocol)) throw new Error("Unsupported protocol");
      } catch {
        setErrorMessage("Invalid URL. Use a complete http:// or https:// URL.");
        return;
      }
    }

    if (mode === "contact") {
      const contactResult = buildContactVCard();
      if (!("content" in contactResult)) {
        setErrorMessage(contactResult.error);
        return;
      }

      content = contactResult.content;
      setSummary(contactResult.contact);
      historyInput = `Contact QR: ${contactResult.contact.fullName}`;
    }

    setIsGenerating(true);

    try {
      const dataUrl = await QRCode.toDataURL(content, {
        width: 320,
        margin: 2,
        errorCorrectionLevel: "M",
      });

      setQrCodeUrl(dataUrl);
      setStatusMessage("QR code generated successfully.");
      void recordToolHistory({
        tool_id: "qr-code-generator",
        tool_name: "QR Code Generator",
        input: historyInput,
        output: "QR code generated",
      });
    } catch (error) {
      console.error("QR code generation failed:", error);
      setQrCodeUrl("");
      setErrorMessage("The QR code could not be generated. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ToolLayout>
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-600">QR CODE GENERATOR</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">QR Code Generator</h1>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Create a QR code from text, a link, or contact information.
            </p>
            <div className="mt-5">
              <a href="/tools" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                &larr; All Tools
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid grid-cols-3 gap-2">
              {(["text", "url", "contact"] as QrMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectMode(item)}
                  className={mode === item ? "rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white sm:px-4" : "rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 sm:px-4"}
                >
                  {item === "url" ? "URL" : item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            {(mode === "text" || mode === "url") && (
              <div className="mt-6">
                <label htmlFor="qr-value" className="text-sm font-semibold text-slate-700">
                  {mode === "url" ? "URL" : "Text"}
                </label>
                <textarea
                  id="qr-value"
                  rows={4}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder={mode === "url" ? "https://example.com" : "Enter any text"}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            )}

            {mode === "contact" && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-semibold text-slate-700">Full Name *</label>
                  <input id="contact-name" type="text" value={contact.fullName} onChange={(event) => updateContact("fullName", event.target.value)} placeholder="Your full name" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <div>
                  <label htmlFor="contact-mobile" className="text-sm font-semibold text-slate-700">Mobile Number *</label>
                  <input id="contact-mobile" type="tel" value={contact.mobile} onChange={(event) => updateContact("mobile", event.target.value)} placeholder="+880 1XXXXXXXXX" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input id="contact-email" type="email" value={contact.email} onChange={(event) => updateContact("email", event.target.value)} placeholder="your@email.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <div>
                  <label htmlFor="contact-facebook" className="text-sm font-semibold text-slate-700">Facebook ID / Profile URL</label>
                  <input id="contact-facebook" type="text" value={contact.facebook} onChange={(event) => updateContact("facebook", event.target.value)} placeholder="username or https://facebook.com/..." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-address" className="text-sm font-semibold text-slate-700">Address</label>
                  <textarea id="contact-address" rows={3} value={contact.address} onChange={(event) => updateContact("address", event.target.value)} placeholder="Your address" className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
              </div>
            )}

            {errorMessage && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}
            {statusMessage && <p role="status" className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{statusMessage}</p>}

            <button type="button" onClick={() => void generateQrCode()} disabled={isGenerating} className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isGenerating ? "Generating..." : "Generate QR Code"}
            </button>

            {qrCodeUrl && (
              <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center">
                <img src={qrCodeUrl} alt="Generated QR code" className="mx-auto h-80 w-80 max-w-full" />
                {summary && (
                  <div className="mx-auto mt-5 max-w-md rounded-xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-700">
                    <p className="font-semibold">Contact summary</p>
                    <p className="mt-2"><strong>Name:</strong> {summary.fullName}</p>
                    <p><strong>Mobile:</strong> {summary.mobile}</p>
                    {summary.email && <p><strong>Email:</strong> {summary.email}</p>}
                    {summary.facebook && <p className="break-all"><strong>Facebook:</strong> {summary.facebook}</p>}
                    {summary.address && <p><strong>Address:</strong> {summary.address}</p>}
                  </div>
                )}
                <a href={qrCodeUrl} download="toolbangla-qr-code.png" className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
                  Download QR Code
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
