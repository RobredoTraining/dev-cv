"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", isDark);
}

function getSavedTheme(): Theme {
  const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const t = getSavedTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  // Si el usuario está en "system", reacciona a cambios del SO en tiempo real
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
  
    const onChange = () => {
      const saved = getSavedTheme();
      if (saved === "system") applyTheme("system");
    };
  
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  return (
    <div
      className="
        inline-flex items-center rounded-lg border
        border-[color:var(--border)]
        bg-[color:var(--card)]
        text-sm
      "
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`px-3 py-2 text-sm ${theme === "light" ? "font-semibold" : "text-[color:var(--muted)]"}`}
      >
        ☀️ Light
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`px-3 py-2 text-sm ${theme === "system" ? "font-semibold" : "text-[color:var(--muted)]"}`}
      >
        🖥 System
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`px-3 py-2 text-sm ${theme === "dark" ? "font-semibold" : "text-[color:var(--muted)]"}`}
      >
        🌙 Dark
      </button>
    </div>
  );
}
