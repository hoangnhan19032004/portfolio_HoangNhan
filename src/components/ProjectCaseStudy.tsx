"use client";

import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Languages,
  Share2,
} from "lucide-react";
import { PROJECTS, type Locale, type Project, getProjectTitle } from "@/lib/projects";

const COPY = {
  vi: {
    projects: "Tất cả dự án",
    caseStudy: "Hồ sơ dự án",
    context: "Bối cảnh",
    approach: "Cách tiếp cận",
    highlights: "Trọng tâm triển khai",
    technologies: "Công nghệ sử dụng",
    demo: "Xem demo",
    source: "Mã nguồn",
    share: "Sao chép liên kết",
    copied: "Đã sao chép liên kết",
    copyFailed: "Không thể sao chép liên kết. Hãy thử sao chép URL trên thanh địa chỉ.",
    previous: "Dự án trước",
    next: "Dự án tiếp theo",
    switchLanguage: "Chuyển sang tiếng Anh",
  },
  en: {
    projects: "All projects",
    caseStudy: "Project case study",
    context: "Project context",
    approach: "Approach",
    highlights: "Key focus",
    technologies: "Technologies",
    demo: "Live demo",
    source: "Source code",
    share: "Copy project link",
    copied: "Link copied",
    copyFailed: "Could not copy the link. Copy the URL from your address bar instead.",
    previous: "Previous project",
    next: "Next project",
    switchLanguage: "Switch to Vietnamese",
  },
} as const;

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const [locale, setLocale] = React.useState<Locale>("vi");
  const [shareStatus, setShareStatus] = React.useState("");
  const copy = COPY[locale];
  const projectIndex = PROJECTS.findIndex((item) => item.slug === project.slug);
  const previousProject = PROJECTS[projectIndex - 1];
  const nextProject = PROJECTS[projectIndex + 1];

  React.useEffect(() => {
    const savedLocale = window.localStorage.getItem("portfolio-language");
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextLocale: Locale = savedLocale === "en" ? "en" : "vi";

    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.classList.toggle("dark", savedTheme !== "light");
  }, []);

  const toggleLocale = () => {
    const nextLocale: Locale = locale === "vi" ? "en" : "vi";
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem("portfolio-language", nextLocale);
  };

  const shareProject = async () => {
    setShareStatus("");
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus(copy.copied);
    } catch {
      setShareStatus(copy.copyFailed);
    }
  };

  const title = getProjectTitle(project, locale);
  const description = locale === "vi" ? project.description : project.descriptionEn;

  return (
    <main className="project-case-study-page min-h-dvh bg-slate-950 px-4 py-8 text-white sm:py-12">
      <article className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-sm font-bold tracking-[0.18em] text-white uppercase">
            CodeWithHN
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={copy.switchLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <Languages className="h-4 w-4" />
              {locale.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={shareProject}
              aria-label={copy.share}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">{copy.share}</span>
            </button>
          </div>
        </header>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 shadow-2xl shadow-sky-950/20">
          <div className="relative aspect-[16/8] max-h-[520px] bg-slate-950">
            <img src={project.image} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
            <span className="case-study-image-label absolute bottom-5 left-5 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:bottom-8 sm:left-8">
              {copy.caseStudy}
            </span>
          </div>

          <div className="p-5 sm:p-8 md:p-10">
            <a href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">
              <ArrowLeft className="h-4 w-4" />
              {copy.projects}
            </a>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {description}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-base font-semibold text-white">{copy.context}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {project.caseStudy.context[locale]}
                </p>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-base font-semibold text-white">{copy.approach}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {project.caseStudy.approach[locale]}
                </p>
              </section>
            </div>

            <section className="mt-8">
              <h2 className="text-base font-semibold text-white">{copy.highlights}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.caseStudy.highlights[locale].map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 border-t border-white/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">
                {copy.technologies}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-100"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="case-study-primary-button inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                {copy.demo}
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={project.links.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {copy.source}
                <Github className="h-4 w-4" />
              </a>
            </div>
            {shareStatus && (
              <p role="status" aria-live="polite" className="mt-3 text-sm text-slate-300">
                {shareStatus}
              </p>
            )}
          </div>
        </div>

        {(previousProject || nextProject) && (
          <nav aria-label={locale === "vi" ? "Điều hướng dự án" : "Project navigation"} className="mt-6 grid gap-3 sm:grid-cols-2">
            {previousProject ? (
              <a
                href={`/projects/${previousProject.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300 transition hover:border-sky-400/40 hover:bg-slate-900"
              >
                <span className="block text-xs text-slate-400">{copy.previous}</span>
                <span className="mt-1 flex items-center gap-2 font-semibold text-white">
                  <ArrowLeft className="h-4 w-4" />
                  {getProjectTitle(previousProject, locale)}
                </span>
              </a>
            ) : <span />}
            {nextProject && (
              <a
                href={`/projects/${nextProject.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-right text-sm text-slate-300 transition hover:border-sky-400/40 hover:bg-slate-900"
              >
                <span className="block text-xs text-slate-400">{copy.next}</span>
                <span className="mt-1 flex items-center justify-end gap-2 font-semibold text-white">
                  {getProjectTitle(nextProject, locale)}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            )}
          </nav>
        )}
      </article>
    </main>
  );
}
