export const dynamic = 'force-dynamic';

import ContactForm from "@/components/ContactForm";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import SystemStatus from "@/components/SystemStatus";
import { ThemeToggle } from "@/components/Toggle";
import type { LucideIcon } from "lucide-react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {getLocale} from "next-intl/server";

function LinkCard({
  href,
  label,
  Icon,
  download,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm text-foreground/85 shadow-sm hover:bg-white/10"
    >
      <Icon className="h-4 w-4 opacity-70 group-hover:opacity-90" />
      <span className="font-medium">{label}</span>
    </a>
  );
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations("home");

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="relative border-b border-[color:var(--border)] pb-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left */}
          <div className="grid gap-2 pt-2">
            <h1 className="text-6xl font-semibold tracking-tight leading-[0.92]">
              {t("title")}
            </h1>
            <p className="text-foreground/70 text-lg">{t("subtitle")}</p>
          </div>

          {/* Right */}
          <div className="grid gap-4 lg:justify-self-end">
            {/* Utilities row */}
            <div className="flex items-center justify-end gap-3">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>

            {/* Links */}
            <div className="grid gap-3">
              <div className="grid gap-3">
                <LinkCard href="/cv.pdf" label={t("links.cv")} download Icon={Download} />
                <LinkCard href="https://github.com/RobredoTraining" label={t("links.github")} Icon={Github} />
              </div>

              <div className="grid gap-3">
                <LinkCard
                  href="https://www.linkedin.com/in/pablo-garc%C3%ADa-robredo/"
                  label={t("links.linkedin")}
                  Icon={Linkedin}
                />
                <LinkCard href="mailto:probredodev@gmail.com" label={t("links.email")} Icon={Mail} />
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* SOBRE MI */}
      <section className="mt-10 grid gap-3 border-b border-foreground/10 pb-10">
        <h2 className="text-xl font-semibold">{t("about.title")}</h2>

        <p className="text-foreground/80 leading-relaxed">{t("about.p1")}</p>
        <p className="text-foreground/80 leading-relaxed">{t("about.p2")}</p>
        <p className="text-foreground/80 leading-relaxed">{t("about.p3")}</p>
      </section>

      {/* PROYECTOS */}
      <section className="mt-10 grid gap-4 border-b border-foreground/10 pb-10">
        <h2 className="text-xl font-semibold">{t("projects.title")}</h2>

        <article className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">
                {t("projects.project.title")}
              </h3>

              <p className="text-foreground/75">
                {t("projects.project.subtitle")}
              </p>

              <p className="text-sm text-foreground/60">
                {t("projects.project.stack")}
              </p>
            </div>

            <a
              className="rounded-md border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm hover:bg-foreground/10"
              href="https://github.com/RobredoTraining/recipesCrud"
              target="_blank"
              rel="noreferrer"
            >
              {t("projects.project.button")} →
            </a>
          </div>
        </article>
        <article className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">
                {t("projects.project2.title")}
              </h3>

              <p className="text-foreground/75">
                {t("projects.project2.subtitle")}
              </p>

              <p className="text-sm text-foreground/60">
                {t("projects.project2.stack")}
              </p>
            </div>

            <a
              className="rounded-md border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm hover:bg-foreground/10"
              href="https://github.com/RobredoTraining/dev-cv"
              target="_blank"
              rel="noreferrer"
            >
              {t("projects.project2.button")} →
            </a>
          </div>
        </article>
      </section>

      {/* CONTACTO + ESTADO */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">{t("contact.title")}</h2>
          <ContactForm />
        </section>

        <aside className="lg:pt-1">
          <SystemStatus />
        </aside>
      </div>

      <footer className="mt-12 border-t border-foreground/10 pt-6 text-sm text-foreground/60">
        {t("footer.lastUpdate")} 
      </footer>
    </main>
  );
}
