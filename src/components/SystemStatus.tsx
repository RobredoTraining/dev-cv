"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

type ApiState =
  | { state: "idle" | "loading" }
  | { state: "ok"; timeMs: number; checkedAt: number }
  | { state: "error"; message: string; checkedAt: number };

async function ping(url: string): Promise<{ ok: true; timeMs: number } | { ok: false; error: string }> {
  const t0 = performance.now();
  try {
    const res = await fetch(url, { cache: "no-store" });
    const timeMs = Math.round(performance.now() - t0);
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return { ok: true, timeMs };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

function timeAgo(ts: number, t: ReturnType<typeof useTranslations>) {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return t("timeAgo.seconds", {s});
  const m = Math.floor(s / 60);
  return t("timeAgo.minutes", {m});
}

function Row({
  path,
  state,
  t
}: {
  path: string;
  state: ApiState;
  t: ReturnType<typeof useTranslations>;
}) {
  const badge =
    state.state === "ok"
      ? "text-emerald-300"
      : state.state === "error"
      ? "text-red-300"
      : "text-foreground/60";

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-foreground/5 p-4">
      <div>
        <div className="font-medium">{path}</div>
        <div className="text-sm text-foreground/60">
          {state.state === "ok" || state.state === "error" ? timeAgo(state.checkedAt, t) : t("dash")}
          {state.state === "ok" ? ` · ${state.timeMs}ms` : ""}
          {state.state === "error" ? ` · ${state.message}` : ""}
        </div>
      </div>

      <div className={`text-sm font-medium ${badge}`}>
        {state.state === "ok"
          ? t("status.ok")
          : state.state === "error"
          ? t("status.error")
          : t("status.checking")}
      </div>
    </div>
  );
}

export default function SystemStatus() {
  const t = useTranslations("home.health");

  const [health, setHealth] = useState<ApiState>({ state: "loading" });
  

  async function run() {
    setHealth({ state: "loading" });
  
    const h = await ping("/api/health");
    const now = Date.now();
  
    setHealth(
      h.ok
        ? { state: "ok", timeMs: h.timeMs, checkedAt: now }
        : { state: "error", message: h.error, checkedAt: now }
    );
  }
  

  useEffect(() => {
    run();
    const id = setInterval(run, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="grid gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("title")}</h2>
        <button
          onClick={run}
          className="rounded-md border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-sm hover:bg-foreground/10"
        >
          {t("recheck")}
        </button>
      </div>

      <div className="grid gap-3">
        <Row path="/api/health" state={health} t={t} />
      </div>
    </section>
  );
}
