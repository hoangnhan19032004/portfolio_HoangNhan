import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://codewithhn.netlify.app"),
  title: {
    default: "Hoàng Nhân | Full-Stack Developer",
    template: "%s | Hoàng Nhân",
  },
  description:
    "Portfolio của Hoàng Nhân: các dự án web và ứng dụng, công nghệ sử dụng, kinh nghiệm và thông tin liên hệ.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Hoàng Nhân Portfolio",
    title: "Hoàng Nhân | Full-Stack Developer",
    description:
      "Khám phá các dự án, case study và công nghệ Hoàng Nhân sử dụng.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
