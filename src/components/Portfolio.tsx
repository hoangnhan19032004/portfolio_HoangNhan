"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Facebook,
  FileText,
  Github,
  Languages,
  Layers3,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sun,
  User,
  X,
} from "lucide-react";
import {
  siBootstrap,
  siC,
  siCplusplus,
  siCss,
  siDocker,
  siDotnet,
  siExpress,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siKotlin,
  siLinux,
  siMongodb,
  siMysql,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siOpenjdk,
  siPostman,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectTitle, PROJECTS, type Locale, type Project } from "@/lib/projects";

const PROFILE = {
  name: "CodeWithHN",
  role: "Full-Stack Developer",
  location: "Ho Chi Minh City, Vietnam",
  email: "hoangnhan93204@gmail.com",
  phone: "+84 903 126 432",
  summary:
    "Lập trình viên web đam mê xây dựng sản phẩm hiệu năng cao, chú trọng UI/UX tinh gọn và kiến trúc bền vững. Luôn tìm hiểu về React, Node.js, .NET, SQL, quan tâm đến DevOps, Cloud-native và bảo mật, với mục tiêu tạo ra sản phẩm trải nghiệm tốt, vận hành ổn định và an toàn.",
  summaryEn:
    "A web developer passionate about building high-performance products with thoughtful UI/UX and sustainable architecture. I work with React, Node.js, .NET, and SQL, and I'm interested in DevOps, cloud-native technologies, and security.",
  socials: {
    github: "https://github.com/hoangnhan19032004",
    linkedin: "https://www.linkedin.com/in/nh%C3%A2n-ho%C3%A0ng-348a89380/",
    facebook: "https://www.facebook.com/hoangnhan.9304",
    website: "https://yourdomain.dev",
    cv: "/[en] CV-PhanNguyenHoangNhan.pdf",
  },
};

const SKILLS = [
  { subject: "React", A: 92 },
  { subject: "Node.js", A: 88 },
  { subject: ".NET", A: 80 },
  { subject: "SQL", A: 75 },
  { subject: "DevOps", A: 60 },
  { subject: "Security", A: 65 },
];

const TECH_STACK = [
  "React / Next.js",
  "Nuxt.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Bootstrap",
  "C#",
  "Java",
  "Python",
  "C",
  "C++",
  "Kotlin",
  "ASP.NET Core",
  "Node.js / Express",
  "EF Core",
  "SQL Server",
  "MySQL",
  "MongoDB",
  "Firebase",
  "Supabase",
  "Linux",
  "VS Code",
  "Docker",
  "Git",
  "GitHub",
  "Netlify",
  "Postman",
  "Figma",
  "AI Agents",
];

const TECHNOLOGIES = [
  { name: "React", icon: siReact, color: "#61DAFB" },
  { name: "Next.js", icon: siNextdotjs, color: "#F8FAFC" },
  { name: "Nuxt.js", icon: siNuxt, color: "#00DC82" },
  { name: "TypeScript", icon: siTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: siJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: siHtml5, color: "#E34F26" },
  { name: "CSS", icon: siCss, color: "#663399" },
  { name: "Tailwind CSS", icon: siTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: siBootstrap, color: "#7952B3" },
  { name: "Node.js", icon: siNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: siExpress, color: "#F8FAFC" },
  { name: "ASP.NET Core", icon: siDotnet, color: "#512BD4" },
  { name: "C#", icon: siDotnet, color: "#512BD4" },
  { name: "Java", icon: siOpenjdk, color: "#F89820" },
  { name: "Python", icon: siPython, color: "#3776AB" },
  { name: "C", icon: siC, color: "#A8B9CC" },
  { name: "C++", icon: siCplusplus, color: "#00599C" },
  { name: "Kotlin", icon: siKotlin, color: "#7F52FF" },
  { name: "SQL Server", icon: null, color: "#CC2927" },
  { name: "MySQL", icon: siMysql, color: "#4479A1" },
  { name: "MongoDB", icon: siMongodb, color: "#47A248" },
  { name: "Firebase", icon: siFirebase, color: "#FFCA28" },
  { name: "Supabase", icon: siSupabase, color: "#3FCF8E" },
  { name: "Linux", icon: siLinux, color: "#FCC624" },
  { name: "Docker", icon: siDocker, color: "#2496ED" },
  { name: "VS Code", icon: null, color: "#007ACC" },
  { name: "Git", icon: siGit, color: "#F05032" },
  { name: "GitHub", icon: siGithub, color: "#F8FAFC" },
  { name: "Netlify", icon: siNetlify, color: "#00C7B7" },
  { name: "Postman", icon: siPostman, color: "#FF6C37" },
  { name: "Figma", icon: siFigma, color: "#F24E1E" },
  { name: "AI Agents", icon: null, color: "#A78BFA" },
];

const TECHNOLOGY_ROW_SIZES = [9, 8, 8, 7];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const COPY = {
  vi: {
    navHome: "Trang chủ",
    navProjects: "Dự án",
    navExperience: "Kinh nghiệm",
    navContact: "Liên hệ",
    switchLanguage: "Switch language to English",
    switchThemeToLight: "Chuyển sang giao diện sáng",
    switchThemeToDark: "Chuyển sang giao diện tối",
    openCv: "Mở CV của Hoàng Nhân dạng PDF",
    available: "Đang mở nhận dự án thú vị",
    entryEyebrow: "FRONTEND DEVELOPER · CREATIVE CODING",
    entryTitle: "Khám phá thế giới số của",
    entryDescription: "Một không gian tương tác về giao diện, chuyển động và những trải nghiệm web mình yêu thích.",
    entryButton: "Khám phá portfolio",
    entryHint: "Tự động vào sau 15 giây · nhấn để vào ngay",
    introduction: "Tôi là",
    contactMe: "Liên hệ",
    viewCv: "Xem CV",
    skills: "Kỹ năng tổng quan",
    skillsSubtitle: "Ma trận năng lực cốt lõi",
    skillsStatus: "ĐANG HOẠT ĐỘNG",
    skillsIndex: "NĂNG LỰC",
    skillsModules: "6 NĂNG LỰC CỐT LÕI",
    projects: "Dự án nổi bật",
    projectsSubtitle: "Những sản phẩm mà tôi đã tham gia và học hỏi được nhiều nhất",
    technologies: "Công nghệ sử dụng",
    technologiesSubtitle: "Các ngôn ngữ, framework và công cụ mình sử dụng để xây dựng sản phẩm.",
    searchProjects: "Tìm theo tên dự án hoặc công nghệ...",
    allTechnologies: "Tất cả công nghệ",
    clearFilters: "Xóa bộ lọc",
    showingProjects: (count: number) => `Hiển thị ${count}/${PROJECTS.length} dự án`,
    noProjects: "Không tìm thấy dự án phù hợp. Hãy thử từ khóa hoặc bộ lọc khác.",
    projectDetails: "Xem chi tiết",
    caseStudy: "Case study",
    openCaseStudy: "Mở trang dự án",
    contextLabel: "Bối cảnh",
    approachLabel: "Cách tiếp cận",
    highlightsLabel: "Trọng tâm triển khai",
    close: "Đóng",
    project: "Dự án",
    demo: "Xem demo",
    source: "Mã nguồn",
    experience: "Kinh nghiệm",
    experienceSubtitle: "Học hỏi liên tục & tạo ra giá trị",
    experienceNow: "2024 – Hiện tại",
    experienceNowDescription: "Xây dựng ứng dụng web thương mại điện tử, kiến trúc API, tối ưu hiệu năng & bảo mật.",
    experiencePrevious: "2023 – 2024",
    experiencePreviousDescription: "Thiết kế UI/UX, xây dựng component library dùng lại, SSR/ISR với Next.js.",
    contactTitle: "Liên hệ hợp tác",
    contactSubtitle: "Mình sẽ phản hồi trong 24h",
    contactDescription: "Bạn có dự án thú vị, cần tư vấn kiến trúc hay tối ưu hệ thống? Hãy nhắn mình nhé.",
    email: "Email",
    chatName: "Trợ lý của Hoàng Nhân",
    online: "Đang sẵn sàng",
    closeChat: "Đóng cửa sổ chat",
    startConversation: "Bắt đầu cuộc trò chuyện",
    chatIntro: "Vui lòng cung cấp họ tên và email để lưu lại phiên chat và nhận phản hồi.",
    fullName: "Họ và tên",
    emailAddress: "Địa chỉ email",
    creatingSession: "Đang tạo phiên...",
    startChat: "Bắt đầu chat",
    thinking: "Đang suy nghĩ...",
    chatInactivityWarning: "Thông báo: Nếu bạn không phản hồi, phiên chat sẽ tự động kết thúc sau 180 giây. Bộ đếm bắt đầu từ tin nhắn này.",
    chatEnded: "Phiên chat đã kết thúc do không có phản hồi. Bạn có thể bắt đầu cuộc trò chuyện mới.",
    chatSaveError: "Không thể đồng bộ tin nhắn. Vui lòng thử lại.",
    chatPlaceholder: "Đặt câu hỏi bất kỳ...",
    chatInput: "Tin nhắn",
    sendMessage: "Gửi tin nhắn",
    savedSession: "Phiên chat được lưu để Hoàng Nhân có thể tiếp tục phản hồi.",
    openChat: "Mở chat với trợ lý AI",
    backToTop: "Về đầu trang",
    allRightsReserved: "Bảo lưu mọi quyền.",
  },
  en: {
    navHome: "Home",
    navProjects: "Projects",
    navExperience: "Experience",
    navContact: "Contact",
    switchLanguage: "Chuyển ngôn ngữ sang tiếng Việt",
    switchThemeToLight: "Switch to light theme",
    switchThemeToDark: "Switch to dark theme",
    openCv: "Open Hoang Nhan's CV as a PDF",
    available: "Open to exciting opportunities",
    entryEyebrow: "FRONTEND DEVELOPER · CREATIVE CODING",
    entryTitle: "Explore the digital world of",
    entryDescription: "An interactive space for interfaces, motion, and the web experiences I love to build.",
    entryButton: "Enter portfolio",
    entryHint: "Entering automatically in 15 seconds · click to enter now",
    introduction: "I'm",
    contactMe: "Get in touch",
    viewCv: "View CV",
    skills: "Skills overview",
    skillsSubtitle: "Core competency matrix",
    skillsStatus: "SYSTEM ONLINE",
    skillsIndex: "SKILL INDEX",
    skillsModules: "6 CORE SKILLS",
    projects: "Featured projects",
    projectsSubtitle: "Selected projects I've built and learned from",
    technologies: "Technology stack",
    technologiesSubtitle: "Languages, frameworks, and tools I use to build products.",
    searchProjects: "Search projects or technologies...",
    allTechnologies: "All technologies",
    clearFilters: "Clear filters",
    showingProjects: (count: number) => `Showing ${count} of ${PROJECTS.length} projects`,
    noProjects: "No projects found. Try another search term or filter.",
    projectDetails: "View details",
    caseStudy: "Case study",
    openCaseStudy: "Open project page",
    contextLabel: "Project context",
    approachLabel: "Approach",
    highlightsLabel: "Key focus",
    close: "Close",
    project: "Project",
    demo: "Live demo",
    source: "Source code",
    experience: "Experience",
    experienceSubtitle: "Continuous learning & creating value",
    experienceNow: "2024 – Present",
    experienceNowDescription: "Building e-commerce web apps and APIs, with a focus on performance and security.",
    experiencePrevious: "2023 – 2024",
    experiencePreviousDescription: "Designed UI/UX, built reusable component libraries, and worked with SSR/ISR in Next.js.",
    contactTitle: "Let's work together",
    contactSubtitle: "I usually respond within 24 hours",
    contactDescription: "Have an interesting project, need architecture advice, or want to improve a system? Let's talk.",
    email: "Email",
    chatName: "Hoang Nhan's assistant",
    online: "Online",
    closeChat: "Close chat window",
    startConversation: "Start a conversation",
    chatIntro: "Share your name and email to save this chat and receive a reply.",
    fullName: "Full name",
    emailAddress: "Email address",
    creatingSession: "Starting session...",
    startChat: "Start chat",
    thinking: "Thinking...",
    chatInactivityWarning: "Notice: If you don't reply, this chat will end automatically in 180 seconds. The timer starts with this message.",
    chatEnded: "This chat ended after a period of inactivity. You can start a new conversation.",
    chatSaveError: "Unable to sync your message. Please try again.",
    chatPlaceholder: "Ask me anything...",
    chatInput: "Message",
    sendMessage: "Send message",
    savedSession: "This chat is saved so Hoang Nhan can follow up with you.",
    openChat: "Open AI assistant",
    backToTop: "Back to top",
    allRightsReserved: "All rights reserved.",
  },
} as const;

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-title mb-6 flex items-center gap-3">
      <div className="section-title-icon section-icon rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-sky-500/10">
        <Icon className="h-5 w-5 text-sky-300" />
      </div>
      <div className="section-title-copy">
        <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="-mt-0.5 text-sm text-slate-300">{subtitle}</p>}
      </div>
    </div>
  );
}

function NavBar({
  locale,
  onLocaleChange,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}) {
  const [dark, setDark] = React.useState(true);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialDark = savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initialDark);
    root.classList.toggle("dark", initialDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    window.localStorage.setItem("portfolio-theme", nextDark ? "dark" : "light");
    window.document.documentElement.classList.toggle("dark", nextDark);
  };

  return (
    <div className="site-navbar fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="site-navbar-inner mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
          {PROFILE.name}
        </a>
        <nav className="portfolio-nav" aria-label={locale === "vi" ? "Điều hướng chính" : "Main navigation"}>
          <Link className="nav-link" href="/home">{COPY[locale].navHome}</Link>
          <Link className="nav-link" href="/projects">{COPY[locale].navProjects}</Link>
          <Link className="nav-link" href="/experience">{COPY[locale].navExperience}</Link>
          <Link className="nav-link" href="/technologies">{COPY[locale].technologies}</Link>
          <Link className="nav-link" href="/contact">{COPY[locale].navContact}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLocaleChange(locale === "vi" ? "en" : "vi")}
            aria-label={COPY[locale].switchLanguage}
            className="gap-1.5 rounded-full px-2.5 text-xs font-bold text-white"
          >
            <Languages className="h-4 w-4" />
            {locale.toUpperCase()}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? COPY[locale].switchThemeToLight : COPY[locale].switchThemeToDark}>
            {dark ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </Button>
          <a className="hidden xl:block" href={PROFILE.socials.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5 text-white" />
            </Button>
          </a>
          <a className="hidden xl:block" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-white" />
            </Button>
          </a>
          <a className="hidden xl:block" href={PROFILE.socials.facebook} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-white" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const averageSkill = Math.round(
    SKILLS.reduce((total, skill) => total + skill.A, 0) / SKILLS.length,
  );

  return (
    <section id="home" className="portfolio-section hero-section relative overflow-hidden pb-20 pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="hero-layout grid min-w-0 grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="hero-copy min-w-0">
            <div className="hero-availability inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200 shadow-lg shadow-sky-500/10">
              <Rocket className="h-3.5 w-3.5" />
              {copy.available}
            </div>

            <h1 className="hero-title mt-5 break-words text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-6xl">
              {copy.introduction} <span className="text-sky-400">{PROFILE.name}</span>
            </h1>

            <div className="hero-role mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {PROFILE.role}
            </div>

            <p className="hero-summary mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              {locale === "vi" ? PROFILE.summary : PROFILE.summaryEn}
            </p>

            <div className="hero-actions mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${PROFILE.email}`}>
                <Button className="h-11 min-w-[132px] justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400">
                  <Mail className="h-4 w-4" /> {copy.contactMe}
                </Button>
              </a>
              <a href={PROFILE.socials.cv} target="_blank" rel="noreferrer" aria-label={copy.openCv}>
                <Button variant="secondary" className="h-11 min-w-[132px] justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white hover:bg-white/10">
                  <FileText className="h-4 w-4" /> {copy.viewCv}
                </Button>
              </a>
            </div>

            <div className="hero-meta mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="hero-meta-item inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-sky-300" /> {PROFILE.location}
              </span>
              <span className="hero-meta-item inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Phone className="h-4 w-4 text-sky-300" /> {PROFILE.phone}
              </span>
            </div>
          </div>

          <div className="hero-visual relative">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-sky-400/30 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-fuchsia-500/25 blur-3xl" />

            <div className="hero-agent-scene" aria-hidden="true">
              <div className="hero-3d-orbit hero-3d-orbit-one" />
              <div className="hero-3d-orbit hero-3d-orbit-two" />
              <div className="hero-3d-cube">
                <span className="hero-3d-face hero-3d-face-front"><Bot /></span>
                <span className="hero-3d-face hero-3d-face-back">AI</span>
                <span className="hero-3d-face hero-3d-face-right">{"{ }"}</span>
                <span className="hero-3d-face hero-3d-face-left">&lt;/&gt;</span>
                <span className="hero-3d-face hero-3d-face-top">3D</span>
                <span className="hero-3d-face hero-3d-face-bottom">DEV</span>
              </div>
              <span className="hero-3d-particle hero-3d-particle-one" />
              <span className="hero-3d-particle hero-3d-particle-two" />
            </div>

            <Card className="hero-skills-card hero-console skills-dashboard-card relative overflow-hidden">
              <CardContent className="skills-dashboard-content">
                <header className="skills-dashboard-header">
                  <div className="skills-dashboard-title">
                    <span className="skills-dashboard-kicker">CORE SYSTEM / 01</span>
                    <div className="skills-dashboard-heading">
                      <Cpu aria-hidden="true" />
                      <h3>{copy.skills}</h3>
                    </div>
                    <p>{copy.skillsSubtitle}</p>
                  </div>
                  <span className="skills-dashboard-status">
                    <span aria-hidden="true" />
                    {copy.skillsStatus}
                  </span>
                </header>

                <div className="skills-dashboard-body">
                  <div className="skills-gauge" role="img" aria-label={`${copy.skillsIndex}: ${averageSkill}%`}>
                    <svg aria-hidden="true" viewBox="0 0 100 100">
                      <circle className="skills-gauge-track" cx="50" cy="50" r="42" />
                      <circle
                        className="skills-gauge-value"
                        cx="50"
                        cy="50"
                        r="42"
                        style={{ strokeDasharray: `${Math.round((averageSkill / 100) * 264)} 264` }}
                      />
                    </svg>
                    <div className="skills-gauge-copy">
                      <strong>{averageSkill}<span>%</span></strong>
                      <span>{copy.skillsIndex}</span>
                    </div>
                    <span aria-hidden="true" className="skills-gauge-orbit" />
                  </div>

                  <div className="skills-meter-list">
                    {SKILLS.map((skill, index) => (
                      <div className="skills-meter" key={skill.subject}>
                        <div className="skills-meter-label">
                          <span><i>{String(index + 1).padStart(2, "0")}</i>{skill.subject}</span>
                          <strong>{skill.A}%</strong>
                        </div>
                        <div
                          className="skills-meter-track"
                          role="meter"
                          aria-label={skill.subject}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={skill.A}
                          aria-valuetext={`${skill.A}%`}
                        >
                          <span style={{ width: `${skill.A}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <footer className="skills-dashboard-footer">
                  <span className="skills-footer-signal" />
                  <span>{copy.skillsModules}</span>
                  <span className="skills-footer-code">HN · 0{SKILLS.length}</span>
                </footer>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects({ locale }: { locale: Locale }) {
  const [search, setSearch] = React.useState("");
  const [technology, setTechnology] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const copy = COPY[locale];
  const technologies = Array.from(new Set(PROJECTS.flatMap((project) => project.tech))).sort();
  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch = normalizeVietnamese(
      `${getProjectTitle(project, locale)} ${project.title} ${project.description} ${project.descriptionEn} ${project.tech.join(" ")}`,
    ).includes(normalizeVietnamese(search.trim()));
    return matchesSearch && (!technology || project.tech.includes(technology));
  });

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSelectedProject(null);
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      event.preventDefault();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  React.useEffect(() => {
    if (!selectedProject) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="portfolio-section projects-section relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle icon={Code2} title={copy.projects} subtitle={copy.projectsSubtitle} />

        <div className="project-filters mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchProjects}
              aria-label={copy.searchProjects}
              className="project-search-input w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400/60"
            />
          </label>
          <label className="sm:w-64">
            <span className="sr-only">{copy.allTechnologies}</span>
            <select
              value={technology}
              onChange={(event) => setTechnology(event.target.value)}
              className="technology-filter w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/60"
            >
              <option value="">{copy.allTechnologies}</option>
              {technologies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="project-results mt-3 flex min-h-7 flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <span aria-live="polite">{copy.showingProjects(filteredProjects.length)}</span>
          {(search || technology) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setTechnology("");
              }}
              className="font-semibold text-sky-300 hover:text-sky-200"
            >
              {copy.clearFilters}
            </button>
          )}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.48, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="project-card group h-full overflow-hidden rounded-[26px] border border-white/10 bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`${copy.projectDetails}: ${getProjectTitle(project, locale)}`}
                    className="project-media relative block aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-slate-950 text-left"
                  >
                    <img
                      src={project.image}
                      alt={getProjectTitle(project, locale)}
                      className="project-image h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200 backdrop-blur-sm">
                      #{PROJECTS.indexOf(project) + 1}
                    </span>
                    <span className="project-type-badge absolute bottom-4 right-4 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm">
                      {copy.project}
                    </span>
                  </button>

                  <CardContent className="p-5">
                    <h4 className="text-lg font-bold text-white">{getProjectTitle(project, locale)}</h4>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                      {locale === "vi" ? project.description : project.descriptionEn}
                    </p>

                    <div className="project-tech-tags mt-3 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <Badge key={item} variant="outline" className="rounded-full border-white/10 bg-white/5 text-[10px] font-medium tracking-wide text-slate-200">
                          {item}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="gap-1 rounded-full bg-sky-500 text-white hover:bg-sky-400"
                      >
                        {copy.projectDetails} <ArrowRight className="h-4 w-4" />
                      </Button>
                      <a href={project.links.demo} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="secondary" className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
                          {copy.demo}
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-12 text-center text-sm text-slate-300">
            {copy.noProjects}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedProject(null);
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              tabIndex={-1}
              onKeyDown={handleDialogKeyDown}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97, y: prefersReducedMotion ? 0 : 8 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 320, damping: 28 }
              }
              className="case-study-dialog my-auto max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-slate-900 shadow-2xl shadow-slate-950/60 outline-none"
            >
              <div className="relative aspect-[16/7] bg-slate-950">
                <img src={selectedProject.image} alt={getProjectTitle(selectedProject, locale)} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
                <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:bottom-6 sm:left-7">
                  <Code2 className="h-3.5 w-3.5 text-sky-300" />
                  {copy.caseStudy}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  aria-label={copy.close}
                  className="absolute right-3 top-3 rounded-full bg-slate-950/70 text-white hover:bg-slate-950"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-5 sm:p-7">
                <h3 id="project-dialog-title" className="text-2xl font-bold text-white">
                  {getProjectTitle(selectedProject, locale)}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  {locale === "vi" ? selectedProject.description : selectedProject.descriptionEn}
                </p>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <section className="case-study-panel rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                        <Lightbulb className="h-4 w-4" />
                      </span>
                      {copy.contextLabel}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {selectedProject.caseStudy.context[locale]}
                    </p>
                  </section>

                  <section className="case-study-panel rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                        <Layers3 className="h-4 w-4" />
                      </span>
                      {copy.approachLabel}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {selectedProject.caseStudy.approach[locale]}
                    </p>
                  </section>
                </div>

                <section className="mt-6">
                  <h4 className="text-sm font-semibold text-white">{copy.highlightsLabel}</h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {selectedProject.caseStudy.highlights[locale].map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5 text-sm leading-6 text-slate-300">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {locale === "vi" ? "Công nghệ sử dụng" : "Technologies"}
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.tech.map((item) => (
                      <Badge key={item} variant="outline" className="rounded-full border-sky-400/20 bg-sky-500/10 text-sky-100">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={`/projects/${selectedProject.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    {copy.openCaseStudy} <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href={selectedProject.links.demo} target="_blank" rel="noreferrer">
                    <Button className="gap-2 rounded-full bg-sky-500 text-white hover:bg-sky-400">
                      {copy.demo} <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href={selectedProject.links.source} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="gap-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
                      {copy.source} <Github className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Experience({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const prefersReducedMotion = useReducedMotion();
  const items = [
    {
      time: copy.experienceNow,
      title: "Full-Stack Developer",
      desc: copy.experienceNowDescription,
    },
    {
      time: copy.experiencePrevious,
      title: "Frontend Engineer",
      desc: copy.experiencePreviousDescription,
    },
  ];

  return (
    <section id="experience" className="portfolio-section experience-section relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          icon={Rocket}
          title={copy.experience}
          subtitle={copy.experienceSubtitle}
        />

        <div className="experience-timeline relative pl-12">
          <div className="absolute left-12 top-0 bottom-0 z-0 w-px bg-white/10" />
          <div className="space-y-6">
            {items.map((it, index) => (
              <motion.div
                key={it.title}
                className="relative"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute -left-[7px] top-2 z-10 h-3.5 w-3.5 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.9)]" />
                <Card className="experience-card relative z-10 ml-4 border border-white/10 bg-slate-900/60 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-lg font-semibold text-white">{it.title}</h4>
                      <span className="text-xs text-slate-300">{it.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{it.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologyItem({ technology }: { technology: (typeof TECHNOLOGIES)[number] }) {
  return (
    <li className="technology-card">
      <span className="technology-icon" style={{ color: technology.color }}>
        {technology.icon ? (
          <svg
            aria-hidden="true"
            className="technology-logo"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path d={technology.icon.path} fill="currentColor" />
          </svg>
        ) : technology.name === "SQL Server" ? (
          <Database aria-hidden="true" className="technology-logo" />
        ) : technology.name === "AI Agents" ? (
          <Bot aria-hidden="true" className="technology-logo" />
        ) : (
          <Code2 aria-hidden="true" className="technology-logo" />
        )}
      </span>
      <span className="technology-name">{technology.name}</span>
    </li>
  );
}

function Technologies({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const rows: (typeof TECHNOLOGIES)[] = [];
  let offset = 0;
  for (const size of TECHNOLOGY_ROW_SIZES) {
    rows.push(TECHNOLOGIES.slice(offset, offset + size));
    offset += size;
  }

  return (
    <section id="technologies" className="portfolio-section technologies-section relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          icon={Layers3}
          title={copy.technologies}
          subtitle={copy.technologiesSubtitle}
        />

        <div className="technology-pyramid technology-marquee">
          {rows.map((row, rowIndex) => (
            <div
              className={`technology-marquee-row ${rowIndex % 2 === 0 ? "technology-marquee-forward" : "technology-marquee-reverse"}`}
              key={rowIndex}
            >
              <div className="technology-marquee-track">
                <ul className="technology-marquee-group">
                  {row.map((technology) => (
                    <TechnologyItem key={technology.name} technology={technology} />
                  ))}
                </ul>
                <ul className="technology-marquee-group" aria-hidden="true">
                  {row.map((technology) => (
                    <TechnologyItem key={technology.name} technology={technology} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section id="contact" className="portfolio-section contact-section py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Card className="contact-card relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/60 shadow-[0_20px_80px_rgba(14,165,233,0.15)]">
          <CardContent className="p-6 md:p-8">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <SectionTitle icon={Mail} title={copy.contactTitle} subtitle={copy.contactSubtitle} />
                <p className="text-sm leading-7 text-slate-300">
                  {copy.contactDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`mailto:${PROFILE.email}`}>
                    <Button className="gap-2 rounded-full bg-sky-500 text-white hover:bg-sky-400">
                      <Mail className="h-4 w-4" /> {copy.email}
                    </Button>
                  </a>
                  <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="gap-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </Button>
                  </a>
                  <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="gap-2 rounded-full border border-white/10 bg-transparent text-white hover:bg-white/10">
                      <Github className="h-4 w-4" /> GitHub
                    </Button>
                  </a>
                </div>
              </div>

              <div className="grid gap-3 text-sm">
                <a href={`mailto:${PROFILE.email}`} className="contact-detail flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200">
                  <Mail className="h-4 w-4 text-sky-300" /> {PROFILE.email}
                </a>
                <a href={`tel:${PROFILE.phone.replace(/[^\d+]/g, "")}`} className="contact-detail flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200">
                  <Phone className="h-4 w-4 text-sky-300" /> {PROFILE.phone}
                </a>
                <div className="contact-detail flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200">
                  <MapPin className="h-4 w-4 text-sky-300" /> {PROFILE.location}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="portfolio-footer py-7 text-sm text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
        <Link href="/home" className="font-semibold tracking-[0.12em] text-white uppercase">{PROFILE.name}</Link>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label={locale === "vi" ? "Điều hướng chân trang" : "Footer navigation"}>
          <Link className="nav-link" href="/projects">{COPY[locale].navProjects}</Link>
          <Link className="nav-link" href="/experience">{COPY[locale].navExperience}</Link>
          <Link className="nav-link" href="/technologies">{COPY[locale].technologies}</Link>
          <Link className="nav-link" href="/contact">{COPY[locale].navContact}</Link>
        </nav>
        <span>© {new Date().getFullYear()} {PROFILE.name}. {COPY[locale].allRightsReserved}</span>
      </div>
    </footer>
  );
}

type ChatMessage = {
  id: string | number;
  role: "user" | "assistant" | "admin" | "system";
  content: string;
  created_at: string;
};

function getInactivityTimestamps(messages: ChatMessage[]) {
  let lastUserIndex = -1;
  for (let index = 0; index < messages.length; index += 1) {
    if (messages[index].role === "user") lastUserIndex = index;
  }

  if (lastUserIndex < 0) return { lastUserAt: null, warningAt: null };
  const lastUserAt = Date.parse(messages[lastUserIndex].created_at);
  let warningAt: number | null = null;
  for (let index = lastUserIndex + 1; index < messages.length; index += 1) {
    if (messages[index].role === "system") warningAt = Date.parse(messages[index].created_at);
  }

  return {
    lastUserAt: Number.isFinite(lastUserAt) ? lastUserAt : null,
    warningAt: warningAt !== null && Number.isFinite(warningAt) ? warningAt : null,
  };
}

const QUICK_QUESTIONS = {
  vi: [
    "Hoàng Nhân chuyên về công nghệ gì?",
    "Bạn có nhận dự án freelance không?",
    "Cho mình xem các dự án nổi bật",
  ],
  en: [
    "What technologies does Hoang Nhan use?",
    "Are you available for freelance projects?",
    "Show me your featured projects",
  ],
};

function normalizeVietnamese(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function getLocalChatReply(message: string, locale: Locale) {
  const normalized = normalizeVietnamese(message.trim());

  if (locale === "en") {
    if (/^(hello|hi|hey)\b/.test(normalized)) {
      return "Hi! I'm Hoang Nhan's assistant. Would you like to learn about the technologies I use, my projects, or discuss a new project?";
    }
    if (normalized.includes("technology") || normalized.includes("technologies") || normalized.includes("skills") || normalized.includes("tech stack")) {
      return `I work with ${TECH_STACK.join(", ")}. My main focus is React/Next.js, Node.js, ASP.NET Core, and SQL Server, with a strong interest in performance, DevOps, and security.`;
    }
    if (normalized.includes("react") || normalized.includes("next.js") || normalized.includes("nextjs")) {
      return "I use React and Next.js to build clear, responsive interfaces and reusable components, with a focus on maintainability and SSR/ISR.";
    }
    if (normalized.includes("node") || normalized.includes(".net") || normalized.includes("asp.net") || normalized.includes("backend") || normalized.includes("api")) {
      return "For backend development, I build APIs with Node.js/Express or ASP.NET Core, using SQL Server and Entity Framework Core. I also focus on authorization, validation, performance, and API security.";
    }
    if (normalized.includes("experience") || normalized.includes("work")) {
      return "I'm a Full-Stack Developer with experience building e-commerce websites, booking systems, APIs, and admin interfaces—from requirements analysis through delivery and optimization.";
    }
    if (normalized.includes("project") || normalized.includes("portfolio") || normalized.includes("built")) {
      return `My featured projects include ${PROJECTS.map((project) => getProjectTitle(project, locale)).join(", ")}. Explore the Projects section for details, technologies, demos, and source code.`;
    }
    if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("quote")) {
      return "I don't have a fixed rate because each project has a different scope. Share your requirements, key features, and timeline, and I'll provide a suitable quote.";
    }
    if (normalized.includes("freelance") || normalized.includes("available") || normalized.includes("collaborat")) {
      return "I'm open to suitable projects. Send me your goals, key features, and timeline, and I'll get back to you here.";
    }
    if (normalized.includes("cv") || normalized.includes("resume")) {
      return "You can open my CV using the View CV button in the introduction section. Leave a message in the chat if you need any additional information.";
    }
    if (normalized.includes("location") || normalized.includes("where")) {
      return `I'm based in ${PROFILE.location}. I'm also happy to discuss work online through chat or the contact links on this portfolio.`;
    }
    if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("facebook") || normalized.includes("github") || normalized.includes("linkedin")) {
      return `You can reach me at ${PROFILE.email}, or find me on GitHub, LinkedIn, or Facebook. If you leave a question here, I can follow up in this chat.`;
    }
    return "I don't have a reliable answer for that yet. Try rephrasing your question or leave a message for Hoang Nhan, and he'll follow up in this chat.";
  }

  if (/^(xin chao|chao|hello|hi|hey)\b/.test(normalized)) {
    return "Chào bạn, mình là Trợ lý của Hoàng Nhân. Bạn muốn tìm hiểu về công nghệ mình sử dụng, các dự án đã làm hay trao đổi một dự án mới?";
  }

  if (normalized.includes("cong nghe") || normalized.includes("ky nang") || normalized.includes("skill") || normalized.includes("tech stack")) {
    return `Mình thường làm việc với ${TECH_STACK.join(", ")}. Phần mình tập trung nhiều nhất là React/Next.js, Node.js, ASP.NET Core và SQL Server; ngoài ra mình cũng quan tâm đến hiệu năng, DevOps và bảo mật.`;
  }

  if (normalized.includes("react") || normalized.includes("next.js") || normalized.includes("nextjs")) {
    return "Mình dùng React và Next.js để xây dựng giao diện, component dùng lại và các ứng dụng có SSR/ISR. Mình ưu tiên giao diện rõ ràng, responsive và dễ bảo trì.";
  }

  if (normalized.includes("node") || normalized.includes(".net") || normalized.includes("asp.net") || normalized.includes("backend") || normalized.includes("api")) {
    return "Ở phần backend, mình làm API với Node.js/Express hoặc ASP.NET Core, kết nối SQL Server và Entity Framework Core. Mình cũng chú ý đến phân quyền, validation, hiệu năng và bảo mật API.";
  }

  if (normalized.includes("kinh nghiem") || normalized.includes("experience") || normalized.includes("lam viec")) {
    return "Mình là Full-Stack Developer, từng xây dựng website thương mại điện tử, hệ thống đặt lịch, API và giao diện quản trị. Mình thường tham gia từ lúc phân tích yêu cầu, xây dựng tính năng đến tối ưu và hoàn thiện sản phẩm.";
  }

  if (normalized.includes("du an") || normalized.includes("project") || normalized.includes("portfolio") || normalized.includes("da lam") || normalized.includes("noi bat")) {
    return `Các dự án nổi bật của mình gồm ${PROJECTS.map((project) => project.title).join(", ")}. Bạn có thể xem phần Dự án nổi bật để xem mô tả, công nghệ, demo và mã nguồn của từng sản phẩm.`;
  }

  if (normalized.includes("gia") || normalized.includes("chi phi") || normalized.includes("bao gia")) {
    return "Mình chưa có bảng giá cố định vì mỗi dự án có phạm vi khác nhau. Bạn gửi mình yêu cầu, số tính năng và thời gian mong muốn; sau khi trao đổi rõ phạm vi, mình sẽ báo giá phù hợp.";
  }

  if (normalized.includes("nhan du an") || normalized.includes("freelance") || normalized.includes("con trong") || normalized.includes("hop tac") || normalized.includes("thoi gian")) {
    return "Hiện mình đang mở nhận dự án phù hợp. Bạn cứ gửi mục tiêu, các tính năng chính và thời gian cần hoàn thành; mình sẽ xem qua và phản hồi trực tiếp trong khung chat này.";
  }

  if (normalized.includes("cv") || normalized.includes("resume") || normalized.includes("ho so")) {
    return "Bạn có thể bấm nút Xem CV ở phần giới thiệu. Nếu cần mình gửi thêm CV hoặc thông tin kinh nghiệm, bạn cứ để lại câu hỏi trong khung chat.";
  }

  if (normalized.includes("o dau") || normalized.includes("dia diem") || normalized.includes("location")) {
    return `Mình đang ở ${PROFILE.location}. Mình có thể trao đổi công việc online qua chat hoặc các kênh liên hệ trên portfolio.`;
  }

  if (normalized.includes("lien he") || normalized.includes("email") || normalized.includes("facebook") || normalized.includes("github") || normalized.includes("linkedin")) {
    return `Bạn có thể liên hệ với mình qua email ${PROFILE.email}, GitHub, LinkedIn hoặc Facebook. Nếu bạn để lại câu hỏi trong chat, mình có thể phản hồi trực tiếp tại đây.`;
  }

  return "Mình chưa có thông tin chính xác cho câu hỏi này. Bạn có thể viết rõ hơn một chút hoặc gửi câu hỏi cho Hoàng Nhân; mình sẽ xem và phản hồi trực tiếp trong chat.";
}

function ChatWidget({ locale }: { locale: Locale }) {
  const warningDelay = 60_000;
  const idleTimeout = 180_000;
  const copy = COPY[locale];
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [visitorName, setVisitorName] = React.useState("");
  const [visitorEmail, setVisitorEmail] = React.useState("");
  const [questionStatus, setQuestionStatus] = React.useState("");
  const [questionSession, setQuestionSession] = React.useState<{ id: string; token: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [lastUserAt, setLastUserAt] = React.useState<number | null>(null);
  const [warningAt, setWarningAt] = React.useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const closingSessionId = React.useRef<string | null>(null);
  const warningWriteKey = React.useRef<string | null>(null);

  const resetSession = React.useCallback((sessionId: string) => {
    window.localStorage.removeItem("portfolio-chat-session");
    window.sessionStorage.removeItem("portfolio-chat-session");
    setQuestionSession((current) => current?.id === sessionId ? null : current);
    setVisitorName("");
    setVisitorEmail("");
    setMessages([]);
    setInput("");
    setLastUserAt(null);
    setWarningAt(null);
    warningWriteKey.current = null;
    setIsLoading(false);
    setQuestionStatus(copy.chatEnded);
  }, [copy.chatEnded]);

  const saveMessage = React.useCallback(async (
    session: { id: string; token: string },
    role: "user" | "assistant" | "system",
    content: string,
  ) => {
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "message", ...session, role, content }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || copy.chatSaveError);
    return (data.messages as Omit<ChatMessage, "id">[]).map((message, index) => ({
      ...message,
      id: `${message.created_at}-${index}`,
    }));
  }, [copy.chatSaveError]);

  React.useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 500);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  React.useEffect(() => {
    window.localStorage.removeItem("portfolio-chat-session");
    window.sessionStorage.removeItem("portfolio-chat-session");
  }, []);

  React.useEffect(() => {
    if (!questionSession) return;

    const checkReply = async () => {
      try {
        const response = await fetch(`/api/questions?id=${encodeURIComponent(questionSession.id)}&token=${encodeURIComponent(questionSession.token)}`);
        if (!response.ok) return;
        const data = await response.json();
        if (data.status === "closed") {
          resetSession(questionSession.id);
          return;
        }
        if (Array.isArray(data.messages)) {
          const updatedMessages = data.messages.map((message: { role: ChatMessage["role"]; content: string; created_at: string }, index: number) => ({ ...message, id: `${message.created_at}-${index}` }));
          setMessages(updatedMessages);
          if (!isLoading) {
            const timing = getInactivityTimestamps(updatedMessages);
            warningWriteKey.current = timing.warningAt === null ? warningWriteKey.current : null;
            setWarningAt(timing.warningAt);
            setLastUserAt(timing.warningAt === null ? timing.lastUserAt : null);
          }
        }
      } catch {
      }
    };

    checkReply();
    const interval = window.setInterval(checkReply, 3000);
    return () => window.clearInterval(interval);
  }, [isLoading, questionSession, resetSession]);

  const activateInactivityWarning = React.useCallback(async (
    session: { id: string; token: string },
    expectedLastUserAt: number,
  ) => {
    const writeKey = `${session.id}-${expectedLastUserAt}`;
    if (warningWriteKey.current === writeKey) return;
    warningWriteKey.current = writeKey;
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "warning",
          ...session,
          lastUserAt: expectedLastUserAt,
          content: copy.chatInactivityWarning,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || copy.chatSaveError);
      if (Array.isArray(data.messages)) {
        const updatedMessages = data.messages.map((message: Omit<ChatMessage, "id">, index: number) => ({
          ...message,
          id: `${message.created_at}-${index}`,
        }));
        setMessages(updatedMessages);
        const timing = getInactivityTimestamps(updatedMessages);
        setWarningAt(timing.warningAt);
        setLastUserAt(timing.warningAt === null ? timing.lastUserAt : null);
      }
      warningWriteKey.current = null;
    } catch (error) {
      setQuestionStatus(error instanceof Error ? error.message : copy.chatSaveError);
      warningWriteKey.current = null;
    }
  }, [copy.chatInactivityWarning, copy.chatSaveError]);

  const endIdleSession = React.useCallback(async (
    session: { id: string; token: string },
    expectedWarningAt: number,
  ) => {
    if (closingSessionId.current === session.id) return;
    closingSessionId.current = session.id;
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "close",
          ...session,
          warningAt: expectedWarningAt,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || copy.chatSaveError);
      if (data.closed) {
        resetSession(session.id);
      } else {
        setWarningAt(null);
      }
    } catch {
      resetSession(session.id);
      setQuestionStatus(copy.chatSaveError);
    } finally {
      closingSessionId.current = null;
    }
  }, [copy.chatSaveError, resetSession]);

  React.useEffect(() => {
    if (!questionSession) return;
    if (warningAt !== null) {
      const remaining = warningAt + idleTimeout - Date.now();
      const timeout = window.setTimeout(
        () => void endIdleSession(questionSession, warningAt),
        Math.max(remaining, 0),
      );
      return () => window.clearTimeout(timeout);
    }
    if (lastUserAt !== null) {
      const remaining = lastUserAt + warningDelay - Date.now();
      const timeout = window.setTimeout(
        () => void activateInactivityWarning(questionSession, lastUserAt),
        Math.max(remaining, 0),
      );
      return () => window.clearTimeout(timeout);
    }
  }, [activateInactivityWarning, endIdleSession, idleTimeout, lastUserAt, messages, questionSession, warningAt, warningDelay]);

  const startSession = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!visitorName.trim() || !visitorEmail.includes("@") || isLoading) {
      setQuestionStatus(locale === "vi" ? "Vui lòng nhập họ tên và email hợp lệ." : "Enter your name and a valid email address.");
      return;
    }

    setIsLoading(true);
    setQuestionStatus("");
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: visitorName, email: visitorEmail }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(locale === "en" ? "Unable to start the chat. Please try again later." : data.error || "Không thể bắt đầu phiên chat.");
      }
      const session = { id: data.id as string, token: data.token as string };
      setQuestionSession(session);
      setMessages([]);
      setLastUserAt(null);
      setWarningAt(null);
    } catch (error) {
      setQuestionStatus(error instanceof Error ? error.message : locale === "vi" ? "Không thể gửi câu hỏi lúc này." : "Unable to start the chat right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (event?: React.FormEvent, preset?: string) => {
    event?.preventDefault();
    const content = (preset ?? input).trim();
    if (!content || isLoading || !questionSession) return;

    const userMessage: ChatMessage = { id: Date.now(), role: "user", content, created_at: new Date().toISOString() };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);
    setLastUserAt(null);
    setWarningAt(null);

    try {
      const visitorMessages = await saveMessage(questionSession, "user", content);
      setMessages(visitorMessages);
      const visitorTiming = getInactivityTimestamps(visitorMessages);
      setLastUserAt(visitorTiming.lastUserAt);
      setWarningAt(visitorTiming.warningAt);
      let assistantContent: string;
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lang: locale,
            messages: [...messages.filter((message) => message.role !== "system"), userMessage]
              .map(({ role, content: text }) => ({ role, content: text })),
          }),
        });
        assistantContent = response.ok ? (await response.json()).message : getLocalChatReply(content, locale);
      } catch {
        assistantContent = getLocalChatReply(content, locale);
      }
      const updatedMessages = await saveMessage(questionSession, "assistant", assistantContent);
      setMessages(updatedMessages);
      setQuestionStatus("");
    } catch (error) {
      setQuestionStatus(error instanceof Error ? error.message : copy.chatSaveError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {isOpen && (
        <Card className="chat-panel w-[calc(100vw-2.5rem)] max-w-[390px] overflow-hidden rounded-[26px] border-white/15 bg-slate-950/95 shadow-2xl shadow-sky-950/40 backdrop-blur-xl">
          <div className="chat-header flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-400/15 p-2 text-sky-300"><Bot className="h-5 w-5" /></div>
              <div>
                <p className="chat-title text-sm font-bold text-white">{copy.chatName}</p>
                <p className="flex items-center gap-1 text-[11px] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {copy.online}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label={copy.closeChat}><X className="chat-close h-4 w-4 text-slate-300" /></Button>
          </div>

          {!questionSession ? <form onSubmit={startSession} className="space-y-3 p-5"><div><p className="text-sm font-semibold text-white">{copy.startConversation}</p><p className="mt-1 text-xs leading-5 text-slate-400">{copy.chatIntro}</p></div><input required value={visitorName} onChange={(event) => setVisitorName(event.target.value)} placeholder={copy.fullName} className="chat-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400/60" /><input required type="email" value={visitorEmail} onChange={(event) => setVisitorEmail(event.target.value)} placeholder={copy.emailAddress} className="chat-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400/60" /><Button type="submit" disabled={isLoading} className="w-full rounded-xl bg-sky-500 text-white">{isLoading ? copy.creatingSession : copy.startChat}</Button>{questionStatus && <p className="text-xs text-rose-300">{questionStatus}</p>}</form> : <>
          <div className="chat-messages flex max-h-[min(55vh,420px)] min-h-[260px] flex-col gap-3 overflow-y-auto p-4">
            {messages.map((message) => (
              message.role === "system" ? (
                <p key={message.id} role="status" className="chat-system-notice mx-auto max-w-[92%] rounded-xl px-3 py-2 text-center text-xs leading-5">
                  {message.content}
                </p>
              ) : (
                <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && <div className="mb-0.5 rounded-lg bg-sky-400/15 p-1.5 text-sky-300"><Bot className="h-3.5 w-3.5" /></div>}
                  {message.role === "admin" && (
                    <div className="chat-admin-avatar mb-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sky-100" title={locale === "vi" ? "Admin" : "Admin"}>
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`chat-bubble max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    message.role === "user"
                      ? "chat-user-bubble rounded-br-md bg-sky-500 text-white"
                      : message.role === "admin"
                        ? "chat-admin-bubble rounded-bl-md border border-sky-400/30 text-white"
                        : "chat-assistant-bubble rounded-bl-md border border-white/10 bg-white/5 text-slate-200"
                  }`}>
                    {message.content}
                  </div>
                  {message.role === "user" && <div className="mb-0.5 rounded-lg bg-white/10 p-1.5 text-slate-300"><User className="h-3.5 w-3.5" /></div>}
                </div>
              )
            ))}
            {isLoading && <div className="flex items-center gap-2 text-xs text-slate-400"><Bot className="h-4 w-4 text-sky-300" /> {copy.thinking}</div>}
          </div>

          {questionStatus && <p role="alert" className="px-4 pb-2 text-xs text-rose-300">{questionStatus}</p>}

          {!messages.some((message) => message.role !== "system") && <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3">{QUICK_QUESTIONS[locale].map((question) => <button key={question} type="button" onClick={() => sendMessage(undefined, question)} className="shrink-0 rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1.5 text-left text-[11px] text-sky-200 transition hover:bg-sky-400/20">{question}</button>)}</div>}

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={copy.chatPlaceholder} aria-label={copy.chatInput} className="chat-input min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/60" />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading} aria-label={copy.sendMessage} className="shrink-0 rounded-xl bg-sky-500 text-white hover:bg-sky-400 disabled:opacity-40"><Send className="h-4 w-4" /></Button>
          </form>
          <p className="border-t border-white/10 px-4 py-3 text-center text-[11px] text-slate-500">{copy.savedSession}</p>
          </>}
        </Card>
      )}
      <Button onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? copy.closeChat : copy.openChat} className="chat-launcher h-14 w-14 rounded-full bg-sky-500 p-0 text-white shadow-xl shadow-sky-500/35 hover:scale-105 hover:bg-sky-400">
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
      {showBackToTop && (
        <Button
          type="button"
          onClick={() => {
            const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
            window.scrollTo({ top: 0, behavior });
          }}
          aria-label={copy.backToTop}
          title={copy.backToTop}
          className="back-to-top-button h-12 w-12 rounded-full border border-white/15 bg-slate-900/80 p-0 text-white shadow-xl shadow-slate-950/30 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-sky-500"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

function PortfolioEntry({
  locale,
  onLocaleChange,
  onEnter,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onEnter: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const enterTriggered = React.useRef(false);
  const enterOnce = React.useCallback(() => {
    if (enterTriggered.current) return;
    enterTriggered.current = true;
    onEnter();
  }, [onEnter]);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(enterOnce, 15_000);
    return () => window.clearTimeout(timeoutId);
  }, [enterOnce]);

  const handleScenePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -14;
    event.currentTarget.style.setProperty("--entry-tilt-x", `${x}deg`);
    event.currentTarget.style.setProperty("--entry-tilt-y", `${y}deg`);
  };

  const resetScenePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--entry-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--entry-tilt-y", "0deg");
  };

  return (
    <motion.main
      className="entry-screen"
      aria-labelledby="entry-title"
      initial={false}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025 }}
      transition={{ duration: prefersReducedMotion ? 0.12 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="entry-backdrop-grid" aria-hidden="true" />
      <div className="entry-ambient entry-ambient-one" aria-hidden="true" />
      <div className="entry-ambient entry-ambient-two" aria-hidden="true" />

      <header className="entry-header">
        <a href="/" className="entry-brand" aria-label="CodeWithHN home">
          <span className="entry-brand-mark"><Code2 className="h-4 w-4" /></span>
          <span>CODEWITHHN</span>
        </a>
        <div className="entry-header-meta">
          <span className="entry-header-status"><i /> {locale === "vi" ? "PORTFOLIO TƯƠNG TÁC" : "INTERACTIVE PORTFOLIO"}</span>
          <button
            type="button"
            className="entry-language-button"
            onClick={() => onLocaleChange(locale === "vi" ? "en" : "vi")}
            aria-label={COPY[locale].switchLanguage}
          >
            <Languages className="h-4 w-4" />
            {locale.toUpperCase()}
          </button>
        </div>
      </header>

      <div className="entry-layout">
        <section className="entry-copy">
          <p className="entry-eyebrow"><span />{COPY[locale].entryEyebrow}</p>
          <h1 id="entry-title">
            {COPY[locale].entryTitle}
            <span>CodeWithHN</span>
          </h1>
          <p className="entry-description">{COPY[locale].entryDescription}</p>
          <div className="entry-stack" aria-label="Frontend technologies">
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>UI / UX</span>
          </div>
          <button type="button" className="entry-cta" onClick={enterOnce}>
            <span>{COPY[locale].entryButton}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="entry-hint">{COPY[locale].entryHint}</p>
        </section>

        <div
          className="entry-visual"
          aria-hidden="true"
          onPointerMove={handleScenePointerMove}
          onPointerLeave={resetScenePointer}
        >
          <div className="entry-visual-glow" />
          <div className="entry-grid-plane" />
          <div className="entry-orbit entry-orbit-one" />
          <div className="entry-orbit entry-orbit-two" />
          <div className="entry-cube-shadow" />
          <div className="entry-cube-wrap">
            <div className="entry-cube">
              <div className="entry-cube-face entry-cube-front">
                <Code2 />
                <span>BUILD</span>
              </div>
              <div className="entry-cube-face entry-cube-back"><span>{"</>"}</span></div>
              <div className="entry-cube-face entry-cube-right"><span>TS</span></div>
              <div className="entry-cube-face entry-cube-left"><span>{"{ }"}</span></div>
              <div className="entry-cube-face entry-cube-top"><span>UI</span></div>
              <div className="entry-cube-face entry-cube-bottom"><span>UX</span></div>
            </div>
          </div>
          <div className="entry-code-panel">
            <div className="entry-code-panel-header">
              <span><i /><i /><i /></span>
              <span>experience.tsx</span>
            </div>
            <div className="entry-code-line"><span>01</span><code><b>const</b> craft = <em>&quot;with intent&quot;</em>;</code></div>
            <div className="entry-code-line"><span>02</span><code><b>return</b> &lt;Experience /&gt;;</code></div>
          </div>
          <span className="entry-tech-tag entry-tech-react">React.js</span>
          <span className="entry-tech-tag entry-tech-next">Next.js</span>
          <span className="entry-tech-tag entry-tech-css">CSS · 3D</span>
          <div className="entry-scene-index"><span>01</span><i /> INTERACTIVE EXPERIENCE</div>
        </div>
      </div>

      <footer className="entry-footer">
        <span>© {new Date().getFullYear()} CodeWithHN</span>
        <span>{PROFILE.role}</span>
      </footer>
    </motion.main>
  );
}

type PortfolioSection = "home" | "projects" | "experience" | "technologies" | "contact";

export default function Portfolio({ initialSection }: { initialSection?: PortfolioSection }) {
  const router = useRouter();
  const [locale, setLocale] = React.useState<Locale>("vi");
  const [hasEntered, setHasEntered] = React.useState(Boolean(initialSection));
  const enterPortfolio = React.useCallback(() => {
    setHasEntered(true);
    if (!initialSection) router.replace("/home", { scroll: false });
  }, [initialSection, router]);

  React.useEffect(() => {
    const savedLocale = window.localStorage.getItem("portfolio-language");
    const initialLocale: Locale = savedLocale === "en" ? "en" : "vi";
    setLocale(initialLocale);
    document.documentElement.lang = initialLocale;
  }, []);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    window.localStorage.setItem("portfolio-language", nextLocale);
    document.documentElement.lang = nextLocale;
  };

  React.useEffect(() => {
    if (!hasEntered || !initialSection) return;
    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(initialSection)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [hasEntered, initialSection]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!hasEntered ? (
        <PortfolioEntry
          key="portfolio-entry"
          locale={locale}
          onLocaleChange={changeLocale}
          onEnter={enterPortfolio}
        />
      ) : (
        <motion.div
          key="portfolio-content"
          className="portfolio-shell min-h-dvh bg-slate-950 text-white selection:bg-sky-500/30 selection:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <NavBar locale={locale} onLocaleChange={changeLocale} />
          <main className="relative">
            <Hero locale={locale} />
            <Projects locale={locale} />
            <Experience locale={locale} />
            <Technologies locale={locale} />
            <Contact locale={locale} />
          </main>
          <ChatWidget locale={locale} />
          <Footer locale={locale} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
