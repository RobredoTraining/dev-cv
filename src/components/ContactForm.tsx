"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-md border border-foreground/20 bg-foreground/5 px-3 py-2 text-foreground " +
  "placeholder:text-foreground/50 outline-none focus:ring-2 focus:ring-foreground/20";

const labelCls = "text-sm text-foreground/80";

export default function ContactForm() {
  const t = useTranslations("home.contact.card");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong");
      }

      setStatus("success");
      setForm({name: "", email: "", message: "", website: ""});
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-[520px]">
      <div className="grid gap-1.5">
        <label className={labelCls} htmlFor="name">{t("name")}</label>
        <input
          id="name"
          className={inputCls}
          value={form.name}
          onChange={(e) => setForm((f) => ({...f, name: e.target.value}))}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <label className={labelCls} htmlFor="email">{t("email")}</label>
        <input
          id="email"
          className={inputCls}
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({...f, email: e.target.value}))}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <label className={labelCls} htmlFor="message">{t("message")}</label>
        <textarea
          id="message"
          className={inputCls}
          value={form.message}
          onChange={(e) => setForm((f) => ({...f, message: e.target.value}))}
          rows={6}
          required
          maxLength={1500}
        />
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          className={inputCls}
          value={form.website}
          onChange={(e) => setForm((f) => ({...f, website: e.target.value}))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        className="rounded-md border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-foreground/85 shadow-sm hover:bg-white/10"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? t("loading") : t("button")}
      </button>

      {status === "success" && (
        <p className="text-foreground/80">{t("success")}</p>
      )}

      {status === "error" && <p className="text-red-400">{error}</p>}
    </form>
  );
}
