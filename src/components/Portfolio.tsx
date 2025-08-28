"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Facebook, Mail, Phone, ArrowRight,
  Code2, Cpu, Rocket, Globe, Sun, Moon, MapPin, FileText,
} from "lucide-react";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    cv: "#",
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
  "SQL Server / PostgreSQL",
  "Tailwind CSS",
  "Prisma / EF Core",
  "Docker / CI-CD",
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
    links: { demo: "#", source: "#" },
  },
  {
    title: "HTSALON – Đặt lịch cắt tóc",
    description:
      "Hệ thống đặt lịch salon: quản lý dịch vụ, lịch hẹn, hoá đơn, phân quyền, biểu đồ báo cáo.",
    tech: [
      "Frontend: React + TypeScript + TailwindCSS + Vite",
      "Backend: Node.js + Express (có thể kết nối database)",
      "ESLint",
      "Prettier",
      "Netlify",
      "Git",
    ],
    image: "https://ext.same-assets.com/2406252202/1174023361.jpeg",
    links: { demo: "#", source: "#" },
  },
  {
    title: "Galaxy Playground – Three.js",
    description:
      "Hiệu ứng dải Ngân Hà tương tác: WebGL, tối ưu hiệu suất, tương thích di động, Sử dụng không gian 3D.",
    tech: ["Three.js", "HTML"],
    image: "https://i.postimg.cc/wTZkdrvg/Screenshot-2025-08-27-114610.png",
    links: { demo: "#", source: "#" },
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// 🔹 TypingEffect Component
function TypingEffect({ text, speed = 35 }: { text: string; speed?: number }) {
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
    <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl">
      {displayed}
      <span className="inline-block w-1 bg-foreground animate-pulse ml-0.5"></span>
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
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-2xl bg-primary/10">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground -mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function NavBar() {
  const [dark, setDark] = React.useState(true);
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-lg">
          {PROFILE.name}
        </a>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </Button>
          </a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>
          <a href={PROFILE.socials.facebook} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
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
    <section
      id="home"
      className="relative pt-28 md:pt-32 pb-16 overflow-hidden"
    >
      <GradientOrbs />
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border bg-background/60">
              <Rocket className="w-3.5 h-3.5" />
              Đang mở nhận dự án thú vị
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              Xin chào, mình là{" "}
              <span className="text-primary">{PROFILE.name}</span>
            </h1>

            {/* 🔹 Typing effect summary */}
            <TypingEffect text={PROFILE.summary} speed={35} />

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${PROFILE.email}`}>
                <Button className="gap-2">
                  <Mail className="w-4 h-4" /> Liên hệ
                </Button>
              </a>
              <a href={PROFILE.socials.cv} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="gap-2">
                  <FileText className="w-4 h-4" /> Xem CV
                </Button>
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="w-4 h-4" /> {PROFILE.phone}
              </span>
            </div>
          </div>
          <div className="relative">
            <Card className="rounded-2xl shadow-sm border bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-6">
                <SectionTitle
                  icon={Cpu}
                  title="Kỹ năng tổng quan"
                  subtitle="Radar skill map"
                />
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS}>
                      <PolarGrid stroke={isDark ? "#555" : "#ddd"} />
                      <PolarAngleAxis
                        dataKey="subject"
                        stroke={isDark ? "#fff" : "#000"}
                        tick={{ fill: isDark ? "#fff" : "#000" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1f2937" : "#fff",
                          color: isDark ? "#fff" : "#000",
                          borderRadius: "8px",
                          border: "1px solid #888",
                        }}
                      />
                      <Radar
                        name="Skill"
                        dataKey="A"
                        stroke={isDark ? "#38bdf8" : "#2563eb"}
                        fill={isDark ? "#38bdf8" : "#2563eb"}
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TECH_STACK.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="text-xs px-2.5 py-1 rounded-full"
                    >
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
  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          icon={Code2}
          title="Dự án nổi bật"
          subtitle="Một vài sản phẩm mình đã xây dựng"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="group overflow-hidden rounded-2xl border bg-background/60 hover:shadow-lg transition">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <CardContent className="p-5">
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-[11px]">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={p.links.demo} target="_blank" rel="noreferrer">
                      <Button size="sm" className="gap-1">
                        Demo <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                    <a href={p.links.source} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="secondary">
                        Source
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
    <section id="experience" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          icon={Rocket}
          title="Kinh nghiệm"
          subtitle="Học hỏi liên tục & tạo ra giá trị"
        />
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-6">
            {items.map((it) => (
              <div key={it.title} className="relative">
                <div className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-primary" />
                <Card className="border bg-background/60">
                  <CardContent className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold">{it.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {it.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {it.desc}
                    </p>
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
    <section id="contact" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="border bg-gradient-to-br from-primary/10 via-background to-background">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <SectionTitle
                  icon={Mail}
                  title="Liên hệ hợp tác"
                  subtitle="Mình sẽ phản hồi trong 24h"
                />
                <p className="text-sm text-muted-foreground">
                  Bạn có dự án thú vị, cần tư vấn kiến trúc hay tối ưu hệ thống?
                  Hãy nhắn mình nhé.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`mailto:${PROFILE.email}`}>
                    <Button className="gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </Button>
                  </a>
                  <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="gap-2">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </Button>
                  </a>
                  <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="gap-2">
                      <Github className="w-4 h-4" /> GitHub
                    </Button>
                  </a>
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2 p-4 rounded-2xl border bg-background/60">
                  <Mail className="w-4 h-4" /> {PROFILE.email}
                </div>
                <div className="flex items-center gap-2 p-4 rounded-2xl border bg-background/60">
                  <Phone className="w-4 h-4" /> {PROFILE.phone}
                </div>
                <div className="flex items-center gap-2 p-4 rounded-2xl border bg-background/60">
                  <MapPin className="w-4 h-4" /> {PROFILE.location}
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
    <footer className="py-10 text-center text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4">
        © {new Date().getFullYear()} {PROFILE.name}. Crafted with ❤️ & caffeine.
      </div>
    </footer>
  );
}

function GradientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-10 -right-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-dvh bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      <div className="fixed inset-0 -z-20 [background:radial-gradient(circle_at_1px_1px,theme(colors.muted.DEFAULT)_1px,transparent_0)] [background-size:24px_24px] opacity-[0.25]" />
      <NavBar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
