"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
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
  Sun,
  User,
  X,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  "TypeScript",
  "React / Next.js",
  "ASP.NET Core",
  "Node.js / Express",
  "SQL Server",
  "Tailwind CSS",
  "EF Core",
];

type Project = {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn: string;
  caseStudy: {
    context: { vi: string; en: string };
    approach: { vi: string; en: string };
    highlights: { vi: string[]; en: string[] };
  };
  tech: string[];
  image: string;
  links: { demo: string; source: string };
};

const PROJECTS: Project[] = [
  {
    title: "Swebi Coffee – E-Commerce",
    description:
      "Website bán cà phê & trà với giỏ hàng, thanh toán, phân quyền Admin/Staff, tối ưu SEO & Core Web Vitals.",
    descriptionEn:
      "A coffee and tea e-commerce website with cart, checkout, Admin/Staff roles, SEO, and Core Web Vitals optimizations.",
    caseStudy: {
      context: {
        vi: "Tạo một kênh bán cà phê và trà trực tuyến, đồng thời hỗ trợ nhân sự quản trị vận hành cửa hàng.",
        en: "Create an online channel for selling coffee and tea while supporting the staff who manage store operations.",
      },
      approach: {
        vi: "Xây dựng luồng mua hàng gồm giỏ hàng và thanh toán, kết hợp phân quyền Admin/Staff cho các nghiệp vụ quản trị.",
        en: "Build a shopping flow with a cart and checkout, alongside Admin/Staff roles for store-management workflows.",
      },
      highlights: {
        vi: ["Giỏ hàng và quy trình thanh toán", "Phân quyền Admin/Staff", "Tập trung tối ưu SEO và Core Web Vitals"],
        en: ["Shopping cart and checkout flow", "Admin/Staff role management", "Focus on SEO and Core Web Vitals optimization"],
      },
    },
    tech: [
      "ASP.NET Core",
      "Entity Framework Core",
      "SQL Server",
      "Razor View",
      "Bootstrap",
      "jQuery",
    ],
    image: "/projects/Swebi.jpg",
    links: {
      demo: "https://drive.google.com/file/d/1svqI6pNCVDE5u8Px6Jvi8_MHWq0oJHN_/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/Web_CuaHangCafe_MainSwebi",
    },
  },
  {
    title: "HTSALON – Đặt lịch cắt tóc",
    titleEn: "HTSALON – Haircut Booking",
    description:
      "Hệ thống đặt lịch salon: quản lý dịch vụ, lịch hẹn, hoá đơn, phân quyền, biểu đồ báo cáo.",
    descriptionEn:
      "A salon booking system with service, appointment, invoice, and role management, plus reporting dashboards.",
    caseStudy: {
      context: {
        vi: "Bài toán đặt lịch salon cần kết nối trải nghiệm đặt hẹn với các công việc quản lý dịch vụ, hóa đơn và nhân sự.",
        en: "Salon booking needs to connect appointment scheduling with service, invoice, and staff management.",
      },
      approach: {
        vi: "Phát triển ứng dụng web React và TypeScript, đưa lịch hẹn cùng các nghiệp vụ quản lý và báo cáo vào một hệ thống.",
        en: "Develop a React and TypeScript web app that brings appointments, management workflows, and reporting into one system.",
      },
      highlights: {
        vi: ["Quản lý dịch vụ, lịch hẹn và hóa đơn", "Phân quyền người dùng", "Biểu đồ báo cáo"],
        en: ["Service, appointment, and invoice management", "User roles and permissions", "Reporting dashboards"],
      },
    },
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Tailwind",
      "Netlify",
    ],
    image: "/projects/Hairsalon.jpg",
    links: {
      demo: "https://drive.google.com/file/d/1Vb7VuIh38ISjFZrqWcGrNMTNB0d0aw52/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/hair-salon-site-main",
    },
  },
  {
    title: "Galaxy Playground – Three.js",
    description:
      "Hiệu ứng dải Ngân Hà tương tác: WebGL, tối ưu hiệu suất, tương thích di động, Sử dụng không gian 3D.",
    descriptionEn:
      "An interactive galaxy experience built with WebGL and 3D, optimized for performance and mobile devices.",
    caseStudy: {
      context: {
        vi: "Tạo trải nghiệm trực quan về dải Ngân Hà, nơi người xem có thể khám phá không gian 3D ngay trên trình duyệt.",
        en: "Create a visual galaxy experience that lets visitors explore a 3D scene in the browser.",
      },
      approach: {
        vi: "Sử dụng Three.js và WebGL để dựng cảnh tương tác, đồng thời chú trọng hiệu năng và khả năng sử dụng trên thiết bị di động.",
        en: "Use Three.js and WebGL to build an interactive scene, with attention to performance and mobile usability.",
      },
      highlights: {
        vi: ["Không gian 3D tương tác", "Đồ họa WebGL với Three.js", "Tối ưu hiệu suất và tương thích di động"],
        en: ["Interactive 3D scene", "WebGL graphics with Three.js", "Performance optimization and mobile support"],
      },
    },
    tech: ["Three.js", "HTML", "WebGL"],
    image: "/projects/Galaxy.png",
    links: {
      demo: "https://hoangnhan19032004.github.io/Galaxylovemain_HN-main/",
      source: "https://github.com/hoangnhan19032004/Galaxylovemain_HN-main",
    },
  },
  {
    title: "Salon Booking App",
    description:
      "Ứng dụng Flutter đặt lịch salon với giao diện sạch, hiện đại. Hỗ trợ các chức năng đặt lịch và xác thực Firebase.",
    descriptionEn:
      "A clean, modern Flutter salon booking app with appointment scheduling and Firebase authentication.",
    caseStudy: {
      context: {
        vi: "Đưa quy trình đặt lịch salon lên thiết bị di động với giao diện gọn gàng, dễ sử dụng.",
        en: "Bring salon appointment booking to mobile devices through a clean, approachable interface.",
      },
      approach: {
        vi: "Xây dựng ứng dụng bằng Flutter, kết hợp chức năng đặt lịch với xác thực Firebase.",
        en: "Build the app with Flutter and combine appointment scheduling with Firebase authentication.",
      },
      highlights: {
        vi: ["Ứng dụng đa nền tảng với Flutter", "Luồng đặt lịch salon", "Xác thực người dùng bằng Firebase"],
        en: ["Cross-platform app built with Flutter", "Salon appointment booking flow", "Firebase user authentication"],
      },
    },
    tech: ["Flutter", "Firebase", "Dart"],
    image: "/projects/Salonbookingapp.png",
    links: {
      demo: "https://drive.google.com/file/d/1h8ZUrNkR_SlItjHX4-c4tJbyuUaZ_UNW/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/salon_app-admin-with-adminlogin-fixed2",
    },
  },
  {
    title: "EBook-Store App",
    description:
      "Ứng dụng mua sắm sách điện tử với trải nghiệm tối ưu, thanh toán Momo/VNPay và hệ thống quản lý đơn hàng.",
    descriptionEn:
      "An e-book shopping app with an optimized user experience, MoMo/VNPay payments, and order management.",
    caseStudy: {
      context: {
        vi: "Xây dựng trải nghiệm mua sách điện tử đi cùng quy trình thanh toán và theo dõi đơn hàng.",
        en: "Build an e-book shopping experience connected to payment and order-tracking workflows.",
      },
      approach: {
        vi: "Tổ chức ứng dụng theo mô hình MVC, tích hợp API và các phương thức thanh toán MoMo/VNPay cùng nghiệp vụ quản lý đơn hàng.",
        en: "Structure the app with MVC, integrate APIs and MoMo/VNPay payments, and support order-management workflows.",
      },
      highlights: {
        vi: ["Thanh toán MoMo và VNPay", "Quản lý đơn hàng", "Tích hợp API và SQL Server"],
        en: ["MoMo and VNPay payments", "Order management", "API and SQL Server integration"],
      },
    },
    tech: ["MVC", "SQL Server", "API", "Momo", "VNPay"],
    image: "/projects/Ebook.png",
    links: {
      demo: "https://drive.google.com/file/d/1h5SRnNRjpdyS1dkL49w1dyaFZiBvdHVy/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/EBookStore-Project",
    },
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type Locale = "vi" | "en";

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
    introduction: "Tôi là",
    contactMe: "Liên hệ",
    viewCv: "Xem CV",
    skills: "Kỹ năng tổng quan",
    skillsSubtitle: "Bản đồ kỹ năng",
    projects: "Dự án nổi bật",
    projectsSubtitle: "Những sản phẩm mà tôi đã tham gia và học hỏi được nhiều nhất",
    searchProjects: "Tìm theo tên dự án hoặc công nghệ...",
    allTechnologies: "Tất cả công nghệ",
    clearFilters: "Xóa bộ lọc",
    showingProjects: (count: number) => `Hiển thị ${count}/${PROJECTS.length} dự án`,
    noProjects: "Không tìm thấy dự án phù hợp. Hãy thử từ khóa hoặc bộ lọc khác.",
    projectDetails: "Xem chi tiết",
    caseStudy: "Case study",
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
    introduction: "I'm",
    contactMe: "Get in touch",
    viewCv: "View CV",
    skills: "Skills overview",
    skillsSubtitle: "Skill map",
    projects: "Featured projects",
    projectsSubtitle: "Selected projects I've built and learned from",
    searchProjects: "Search projects or technologies...",
    allTechnologies: "All technologies",
    clearFilters: "Clear filters",
    showingProjects: (count: number) => `Showing ${count} of ${PROJECTS.length} projects`,
    noProjects: "No projects found. Try another search term or filter.",
    projectDetails: "View details",
    caseStudy: "Case study",
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
    chatPlaceholder: "Ask me anything...",
    chatInput: "Message",
    sendMessage: "Send message",
    savedSession: "This chat is saved so Hoang Nhan can follow up with you.",
    openChat: "Open AI assistant",
    backToTop: "Back to top",
    allRightsReserved: "All rights reserved.",
  },
} as const;

function getProjectTitle(project: Project, locale: Locale) {
  return locale === "en" && project.titleEn ? project.titleEn : project.title;
}

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
    <div className="mb-6 flex items-center gap-3">
      <div className="section-icon rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-sky-500/10">
        <Icon className="h-5 w-5 text-sky-300" />
      </div>
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
          {PROFILE.name}
        </a>
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
          <a className="hidden md:block" href={PROFILE.socials.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5 text-white" />
            </Button>
          </a>
          <a className="hidden md:block" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-white" />
            </Button>
          </a>
          <a className="hidden md:block" href={PROFILE.socials.facebook} target="_blank" rel="noreferrer">
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
  const [isDark, setIsDark] = React.useState(true);
  const copy = COPY[locale];

  React.useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 md:pt-32">
      <div
        className="absolute inset-0 -z-20 opacity-90"
        style={{
          backgroundImage:
            "var(--photo-overlay), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.25),transparent_30%)]" />

      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="grid min-w-0 grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200 shadow-lg shadow-sky-500/10">
              <Rocket className="h-3.5 w-3.5" />
              {copy.available}
            </div>

            <h1 className="mt-5 break-words text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-6xl">
              {copy.introduction} <span className="text-sky-400">{PROFILE.name}</span>
            </h1>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {PROFILE.role}
            </div>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              {locale === "vi" ? PROFILE.summary : PROFILE.summaryEn}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-sky-300" /> {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Phone className="h-4 w-4 text-sky-300" /> {PROFILE.phone}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-sky-400/30 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-fuchsia-500/25 blur-3xl" />

            <Card className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 shadow-2xl shadow-sky-950/40 backdrop-blur-xl">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent className="relative p-6">
                <SectionTitle icon={Cpu} title={copy.skills} subtitle={copy.skillsSubtitle} />

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS}>
                      <PolarGrid stroke={isDark ? "#94a3b8" : "#94a3b8"} />
                      <PolarAngleAxis
                        dataKey="subject"
                        stroke={isDark ? "#fff" : "#334155"}
                        tick={{ fill: isDark ? "#fff" : "#334155", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15,23,42,0.9)",
                          border: "1px solid rgba(148,163,184,0.4)",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                      />
                      <Radar
                        name="Skill"
                        dataKey="A"
                        stroke="#38bdf8"
                        fill="#38bdf8"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {TECH_STACK.map((t) => (
                    <Badge key={t} variant="secondary" className="tech-stack-badge rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 text-[11px] text-sky-100">
                      {t}
                    </Badge>
                  ))}
                </div>
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
    <section id="projects" className="relative py-20">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "var(--section-overlay), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle icon={Code2} title={copy.projects} subtitle={copy.projectsSubtitle} />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchProjects}
              aria-label={copy.searchProjects}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400/60"
            />
          </label>
          <label className="sm:w-64">
            <span className="sr-only">{copy.allTechnologies}</span>
            <select
              value={technology}
              onChange={(event) => setTechnology(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/60"
            >
              <option value="">{copy.allTechnologies}</option>
              {technologies.map((item) => (
                <option key={item} value={item} className="bg-slate-900">
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 flex min-h-7 flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <Card className="project-card group h-full overflow-hidden rounded-[26px] border border-white/10 bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`${copy.projectDetails}: ${getProjectTitle(project, locale)}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-slate-950 text-left"
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
                    <span className="absolute bottom-4 right-4 rounded-full border border-sky-300/25 bg-sky-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-100 backdrop-blur-sm">
                      {copy.project}
                    </span>
                  </button>

                  <CardContent className="p-5">
                    <h4 className="text-lg font-bold text-white">{getProjectTitle(project, locale)}</h4>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                      {locale === "vi" ? project.description : project.descriptionEn}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
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
    <section id="experience" className="relative py-16 md:py-20">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "var(--section-overlay), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          icon={Rocket}
          title={copy.experience}
          subtitle={copy.experienceSubtitle}
        />

        <div className="relative pl-12">
          <div className="absolute left-12 top-0 bottom-0 z-0 w-px bg-white/10" />
          <div className="space-y-6">
            {items.map((it) => (
              <div key={it.title} className="relative">
                <div className="absolute -left-[7px] top-2 z-10 h-3.5 w-3.5 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.9)]" />
                <Card className="relative z-10 ml-4 border border-white/10 bg-slate-900/60 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-lg font-semibold text-white">{it.title}</h4>
                      <span className="text-xs text-slate-300">{it.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{it.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Card className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/60 shadow-[0_20px_80px_rgba(14,165,233,0.15)]">
          <div
            className="absolute inset-0 -z-10 opacity-50"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1800&q=80')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
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
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200">
                  <Mail className="h-4 w-4 text-sky-300" /> {PROFILE.email}
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200">
                  <Phone className="h-4 w-4 text-sky-300" /> {PROFILE.phone}
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200">
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
    <footer className="py-10 text-center text-sm text-slate-300">
      <div className="mx-auto max-w-6xl px-4">
        © {new Date().getFullYear()} {PROFILE.name}. {COPY[locale].allRightsReserved}
      </div>
    </footer>
  );
}

type ChatMessage = {
  id: string | number;
  role: "user" | "assistant" | "admin";
  content: string;
};

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
  const copy = COPY[locale];
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [visitorName, setVisitorName] = React.useState("");
  const [visitorEmail, setVisitorEmail] = React.useState("");
  const [questionStatus, setQuestionStatus] = React.useState("");
  const [questionSession, setQuestionSession] = React.useState<{ id: string; token: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 500);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  React.useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-chat-session");
    if (!saved) return;
    try {
      const session = JSON.parse(saved) as { id: string; token: string; name?: string; email?: string };
      if (session.id && session.token) {
        setQuestionSession({ id: session.id, token: session.token });
        setVisitorName(session.name || "");
        setVisitorEmail(session.email || "");
      }
    } catch {
      window.localStorage.removeItem("portfolio-chat-session");
    }
  }, []);

  React.useEffect(() => {
    if (!questionSession) return;

    const checkReply = async () => {
      try {
        const response = await fetch(`/api/questions?id=${encodeURIComponent(questionSession.id)}&token=${encodeURIComponent(questionSession.token)}`);
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data.messages)) setMessages(data.messages.map((message: { role: ChatMessage["role"]; content: string; created_at: string }, index: number) => ({ ...message, id: `${message.created_at}-${index}` })));
      } catch {
      }
    };

    checkReply();
    const interval = window.setInterval(checkReply, 3000);
    return () => window.clearInterval(interval);
  }, [questionSession]);

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
      setQuestionSession({ id: data.id, token: data.token });
      setMessages([]);
      window.localStorage.setItem("portfolio-chat-session", JSON.stringify({ id: data.id, token: data.token, name: visitorName.trim(), email: visitorEmail.trim() }));
    } catch (error) {
      setQuestionStatus(error instanceof Error ? error.message : locale === "vi" ? "Không thể gửi câu hỏi lúc này." : "Unable to start the chat right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveMessage = async (role: "user" | "assistant", content: string) => {
    if (!questionSession) return;
    await fetch("/api/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "message", ...questionSession, role, content }) });
  };

  const sendMessage = async (event?: React.FormEvent, preset?: string) => {
    event?.preventDefault();
    const content = (preset ?? input).trim();
    if (!content || isLoading || !questionSession) return;

    const userMessage: ChatMessage = { id: Date.now(), role: "user", content };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      await saveMessage("user", content);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: locale,
          messages: [...messages, userMessage].map(({ role, content: text }) => ({ role, content: text })),
        }),
      });

      const assistantContent = response.ok ? (await response.json()).message : getLocalChatReply(content, locale);
      setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", content: assistantContent }]);
      await saveMessage("assistant", assistantContent);
    } catch {
      const assistantContent = getLocalChatReply(content, locale);
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", content: assistantContent },
      ]);
      await saveMessage("assistant", assistantContent);
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
              <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && <div className="mb-0.5 rounded-lg bg-sky-400/15 p-1.5 text-sky-300"><Bot className="h-3.5 w-3.5" /></div>}
                <div className={`chat-bubble max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.role === "user" ? "chat-user-bubble rounded-br-md bg-sky-500 text-white" : "chat-assistant-bubble rounded-bl-md border border-white/10 bg-white/5 text-slate-200"}`}>
                  {message.content}
                </div>
                {message.role === "user" && <div className="mb-0.5 rounded-lg bg-white/10 p-1.5 text-slate-300"><User className="h-3.5 w-3.5" /></div>}
              </div>
            ))}
            {isLoading && <div className="flex items-center gap-2 text-xs text-slate-400"><Bot className="h-4 w-4 text-sky-300" /> {copy.thinking}</div>}
          </div>

          {messages.length === 0 && <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3">{QUICK_QUESTIONS[locale].map((question) => <button key={question} type="button" onClick={() => sendMessage(undefined, question)} className="shrink-0 rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1.5 text-left text-[11px] text-sky-200 transition hover:bg-sky-400/20">{question}</button>)}</div>}

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
          className="h-12 w-12 rounded-full border border-white/15 bg-slate-900/80 p-0 text-white shadow-xl shadow-slate-950/30 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-sky-500"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [locale, setLocale] = React.useState<Locale>("vi");

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

  return (
    <div className="min-h-dvh bg-slate-950 text-white selection:bg-sky-500/30 selection:text-white">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.18)_1px,transparent_0)] [background-size:24px_24px] opacity-30" />
      <NavBar locale={locale} onLocaleChange={changeLocale} />
      <main>
        <Hero locale={locale} />
        <Projects locale={locale} />
        <Experience locale={locale} />
        <Contact locale={locale} />
      </main>
      <ChatWidget locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
