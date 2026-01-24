import type { Metadata } from "next";
import "./globals.css";
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Pablo García Robredo — Backend / Systems",
  description:
    "Portfolio de Pablo García Robredo. Backend, APIs, sistemas y redes. Enfoque en producción, fiabilidad y código mantenible.",
  openGraph: {
    title: "Pablo García Robredo — Backend / Systems",
    description:
      "Backend, APIs, sistemas y redes. Enfoque en producción y mantenibilidad.",
    type: "website",
    // OG image:
    // images: ["/og.png"],
  },
};

const themeInitScript = `
(() => {
  try {
    const saved = localStorage.getItem("theme"); // "light" | "dark" | "system" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";

    const isDark = theme === "dark" || (theme === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
