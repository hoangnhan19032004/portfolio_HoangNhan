"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Code2,
  Cpu,
  Facebook,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Rocket,
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

const PROJECTS = [
  {
    title: "Swebi Coffee – E-Commerce",
    description:
      "Website bán cà phê & trà với giỏ hàng, thanh toán, phân quyền Admin/Staff, tối ưu SEO & Core Web Vitals.",
    tech: [
      "ASP.NET Core",
      "Entity Framework Core",
      "SQL Server",
      "Razor View",
      "Bootstrap",
      "jQuery",
    ],
    image:
      "https://i.postimg.cc/J0j2kWt3/477708579-9146410812062255-5667828213886147487-n.jpg",
    links: {
      demo: "https://drive.google.com/file/d/1svqI6pNCVDE5u8Px6Jvi8_MHWq0oJHN_/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/Web_CuaHangCafe_MainSwebi",
    },
  },
  {
    title: "HTSALON – Đặt lịch cắt tóc",
    description:
      "Hệ thống đặt lịch salon: quản lý dịch vụ, lịch hẹn, hoá đơn, phân quyền, biểu đồ báo cáo.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Tailwind",
      "Netlify",
    ],
    image: "https://i.postimg.cc/76Zfy8PG/Screenshot-2026-03-19-150802.png",
    links: {
      demo: "https://drive.google.com/file/d/1Vb7VuIh38ISjFZrqWcGrNMTNB0d0aw52/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/hair-salon-site-main",
    },
  },
  {
    title: "Galaxy Playground – Three.js",
    description:
      "Hiệu ứng dải Ngân Hà tương tác: WebGL, tối ưu hiệu suất, tương thích di động, Sử dụng không gian 3D.",
    tech: ["Three.js", "HTML", "WebGL"],
    image: "https://i.postimg.cc/wTZkdrvg/Screenshot-2025-08-27-114610.png",
    links: {
      demo: "https://hoangnhan19032004.github.io/Galaxylovemain_HN-main/",
      source: "https://github.com/hoangnhan19032004/Galaxylovemain_HN-main",
    },
  },
  {
    title: "Salon Booking App",
    description:
      "Ứng dụng Flutter đặt lịch salon với giao diện sạch, hiện đại. Hỗ trợ các chức năng đặt lịch và xác thực Firebase.",
    tech: ["Flutter", "Firebase", "Dart"],
    image: "https://i.postimg.cc/Zq1kGJz6/z7402906345979-8b80fa58fc7b8dfd94d82d40b7e11017.jpg",
    links: {
      demo: "https://drive.google.com/file/d/1h8ZUrNkR_SlItjHX4-c4tJbyuUaZ_UNW/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/salon_app-admin-with-adminlogin-fixed2",
    },
  },
  {
    title: "EBook-Store App",
    description:
      "Ứng dụng mua sắm sách điện tử với trải nghiệm tối ưu, thanh toán Momo/VNPay và hệ thống quản lý đơn hàng.",
    tech: ["MVC", "SQL Server", "API", "Momo", "VNPay"],
    image: "https://i.postimg.cc/SQw0T6pJ/Screenshot-2026-03-25-233549.png",
    links: {
      demo: "https://drive.google.com/file/d/1h5SRnNRjpdyS1dkL49w1dyaFZiBvdHVy/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/salon_app-admin-with-adminlogin-fixed2",
    },
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function TypingEffect({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = React.useState("");
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
      {displayed}
      <span className="ml-1 inline-block h-5 w-1 animate-pulse rounded-full bg-white align-middle" />
    </p>
  );
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

function NavBar() {
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
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}>
            {dark ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </Button>
          <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5 text-white" />
            </Button>
          </a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-white" />
            </Button>
          </a>
          <a href={PROFILE.socials.facebook} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-white" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [isDark, setIsDark] = React.useState(true);

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
          className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200 shadow-lg shadow-sky-500/10">
              <Rocket className="h-3.5 w-3.5" />
              Đang mở nhận dự án thú vị
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
              Tôi là <span className="text-sky-400">{PROFILE.name}</span>
            </h1>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {PROFILE.role}
            </div>

            <TypingEffect text={PROFILE.summary} speed={24} />

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${PROFILE.email}`}>
                <Button className="h-11 min-w-[132px] justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400">
                  <Mail className="h-4 w-4" /> Liên hệ
                </Button>
              </a>
              <a href={PROFILE.socials.cv} target="_blank" rel="noreferrer" aria-label="Mở CV của Hoàng Nhân dạng PDF">
                <Button variant="secondary" className="h-11 min-w-[132px] justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white hover:bg-white/10">
                  <FileText className="h-4 w-4" /> Xem CV
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
                <SectionTitle icon={Cpu} title="Kỹ năng tổng quan" subtitle="Radar skill map" />

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

function Projects() {
  const [active, setActive] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActive((prev) => (prev + 1) % PROJECTS.length);
    }
    if (e.key === "ArrowLeft") {
      setActive((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
    }
  };

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
        <div className="relative z-10">
          <SectionTitle
            icon={Code2}
            title="Dự án nổi bật"
            subtitle="Những sản phẩm mà tôi đã tham gia và học hỏi được nhiều nhất"
          />
        </div>

        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative z-0 mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {PROJECTS.map((p, i) => {
            const isActive = active === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => containerRef.current?.focus()}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  y: isActive ? -6 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="cursor-pointer"
              >
                <Card
                  className={`project-card group h-full overflow-hidden rounded-[26px] border transition-all duration-500 ${
                    isActive
                      ? "border-sky-400/50 bg-slate-900/85 shadow-[0_20px_60px_rgba(56,189,248,0.18)]"
                      : "border-white/10 bg-slate-900/60"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden border-b border-white/10 bg-slate-950">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="project-image h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200 backdrop-blur-sm">
                      #{i + 1}
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-full border border-sky-300/25 bg-sky-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-100 backdrop-blur-sm">
                      Project
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h4 className="text-lg font-bold text-white">{p.title}</h4>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{p.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((t, idx) => (
                        <Badge key={idx} variant="outline" className="rounded-full border-white/10 bg-white/5 text-[10px] font-medium tracking-wide text-slate-200">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <a href={p.links.demo} target="_blank" rel="noreferrer">
                        <Button size="sm" className="gap-1 rounded-full bg-sky-500 text-white hover:bg-sky-400">
                          Demo <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                      <a href={p.links.source} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="secondary" className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
                          Source
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full ${
                i === active ? "h-3 w-8 bg-sky-400" : "h-3 w-3 bg-slate-600 hover:bg-sky-300/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      time: "2024 – Hiện tại",
      title: "Full-Stack Developer",
      desc: "Xây dựng ứng dụng web thương mại điện tử, kiến trúc API, tối ưu hiệu năng & bảo mật.",
    },
    {
      time: "2023 – 2024",
      title: "Frontend Engineer",
      desc: "Thiết kế UI/UX, xây dựng component library dùng lại, SSR/ISR với Next.js.",
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
          title="Kinh nghiệm"
          subtitle="Học hỏi liên tục & tạo ra giá trị"
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

function Contact() {
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
                <SectionTitle icon={Mail} title="Liên hệ hợp tác" subtitle="Mình sẽ phản hồi trong 24h" />
                <p className="text-sm leading-7 text-slate-300">
                  Bạn có dự án thú vị, cần tư vấn kiến trúc hay tối ưu hệ thống? Hãy nhắn mình nhé.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`mailto:${PROFILE.email}`}>
                    <Button className="gap-2 rounded-full bg-sky-500 text-white hover:bg-sky-400">
                      <Mail className="h-4 w-4" /> Email
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

function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-slate-300">
      <div className="mx-auto max-w-6xl px-4">
        © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </div>
    </footer>
  );
}

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const QUICK_QUESTIONS = [
  "Hoàng Nhân chuyên về công nghệ gì?",
  "Bạn có nhận dự án freelance không?",
  "Cho mình xem các dự án nổi bật",
];

function normalizeVietnamese(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function getLocalChatReply(message: string) {
  const normalized = normalizeVietnamese(message.trim());

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

function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [visitorName, setVisitorName] = React.useState("");
  const [questionStatus, setQuestionStatus] = React.useState("");
  const [questionSession, setQuestionSession] = React.useState<{ id: string; token: string } | null>(null);
  const [hasReceivedReply, setHasReceivedReply] = React.useState(false);
  const [isSubmittingQuestion, setIsSubmittingQuestion] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content: "Chào bạn! Mình là Hoàng Nhân. Bạn muốn hỏi về công nghệ, dự án, kinh nghiệm hay một công việc mới?",
    },
  ]);
  const lastQuestion = [...messages].reverse().find((message) => message.role === "user")?.content || "Xin chào Hoàng Nhân, mình có một câu hỏi về portfolio.";
  React.useEffect(() => {
    if (!questionSession || hasReceivedReply) return;

    const checkReply = async () => {
      try {
        const response = await fetch(`/api/questions?id=${encodeURIComponent(questionSession.id)}&token=${encodeURIComponent(questionSession.token)}`);
        if (!response.ok) return;
        const data = await response.json();
        if (data.status === "answered" && data.answer) {
          setMessages((current) => [...current, { id: Date.now(), role: "assistant", content: `Hoàng Nhân trả lời:\n\n${data.answer}` }]);
          setQuestionStatus("Bạn đã nhận được phản hồi trực tiếp.");
          setHasReceivedReply(true);
        }
      } catch {
        // The next polling cycle will retry while the visitor remains on the page.
      }
    };

    checkReply();
    const interval = window.setInterval(checkReply, 3000);
    return () => window.clearInterval(interval);
  }, [questionSession, hasReceivedReply]);

  const submitQuestion = async () => {
    if (!lastQuestion || isSubmittingQuestion) {
      setQuestionStatus("Hãy đặt câu hỏi trước khi gửi.");
      return;
    }

    setIsSubmittingQuestion(true);
    setQuestionStatus("");
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: visitorName, question: lastQuestion }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Không thể gửi câu hỏi.");
      setQuestionSession({ id: data.id, token: data.token });
      setHasReceivedReply(false);
      setQuestionStatus("Đã gửi. Bạn có thể chờ phản hồi ngay trong khung chat.");
      setVisitorName("");
    } catch (error) {
      setQuestionStatus(error instanceof Error ? error.message : "Không thể gửi câu hỏi lúc này.");
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  const sendMessage = async (event?: React.FormEvent, preset?: string) => {
    event?.preventDefault();
    const content = (preset ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now(), role: "user", content };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage].map(({ role, content: text }) => ({ role, content: text })) }),
      });

      if (!response.ok) throw new Error("AI unavailable");
      const data = await response.json();
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", content: getLocalChatReply(content) },
      ]);
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
                <p className="chat-title text-sm font-bold text-white">Trợ lý của Hoàng Nhân</p>
                <p className="flex items-center gap-1 text-[11px] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Đang sẵn sàng</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Đóng cửa sổ chat"><X className="chat-close h-4 w-4 text-slate-300" /></Button>
          </div>

          <div className="chat-messages flex max-h-[min(55vh,420px)] min-h-[260px] flex-col gap-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && <div className="mb-0.5 rounded-lg bg-sky-400/15 p-1.5 text-sky-300"><Bot className="h-3.5 w-3.5" /></div>}
                <div className={`chat-bubble max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.role === "user" ? "chat-user-bubble rounded-br-md bg-sky-500 text-white" : "chat-assistant-bubble rounded-bl-md border border-white/10 bg-white/5 text-slate-200"}`}>
                  {message.content}
                </div>
                {message.role === "user" && <div className="mb-0.5 rounded-lg bg-white/10 p-1.5 text-slate-300"><User className="h-3.5 w-3.5" /></div>}
              </div>
            ))}
            {isLoading && <div className="flex items-center gap-2 text-xs text-slate-400"><Bot className="h-4 w-4 text-sky-300" /> Đang suy nghĩ...</div>}
          </div>

          {messages.length === 1 && <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3">{QUICK_QUESTIONS.map((question) => <button key={question} type="button" onClick={() => sendMessage(undefined, question)} className="shrink-0 rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1.5 text-left text-[11px] text-sky-200 transition hover:bg-sky-400/20">{question}</button>)}</div>}

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Đặt câu hỏi bất kỳ..." aria-label="Tin nhắn" className="chat-input min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/60" />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading} aria-label="Gửi tin nhắn" className="shrink-0 rounded-xl bg-sky-500 text-white hover:bg-sky-400 disabled:opacity-40"><Send className="h-4 w-4" /></Button>
          </form>
          <div className="border-t border-white/10 px-4 py-3">
            <p className="mb-2 text-xs text-slate-400">Muốn Hoàng Nhân trả lời trực tiếp ngay tại đây?</p>
            <input value={visitorName} onChange={(event) => setVisitorName(event.target.value)} placeholder="Tên của bạn (không bắt buộc)" aria-label="Tên của bạn" className="chat-input mb-2 min-w-0 w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-white outline-none focus:border-sky-400/60" />
            <button type="button" onClick={submitQuestion} disabled={isSubmittingQuestion} className="chat-owner-link mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-center text-xs font-semibold text-sky-200 transition hover:bg-sky-400/20 disabled:opacity-50">
              <MessageCircle className="h-3.5 w-3.5" /> {isSubmittingQuestion ? "Đang gửi..." : "Gửi và chờ trả lời trong chat"}
            </button>
            {questionStatus && <p className="mt-2 text-center text-[11px] text-sky-300">{questionStatus}</p>}
          </div>
        </Card>
      )}
      <Button onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Đóng chat" : "Mở chat với trợ lý AI"} className="chat-launcher h-14 w-14 rounded-full bg-sky-500 p-0 text-white shadow-xl shadow-sky-500/35 hover:scale-105 hover:bg-sky-400">
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-dvh bg-slate-950 text-white selection:bg-sky-500/30 selection:text-white">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.18)_1px,transparent_0)] [background-size:24px_24px] opacity-30" />
      <NavBar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
}
