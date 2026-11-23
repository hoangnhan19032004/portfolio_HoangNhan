import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Portfolio from "@/components/Portfolio";

type Section = "home" | "projects" | "experience" | "technologies" | "contact";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

const SECTIONS: Section[] = ["home", "projects", "experience", "technologies", "contact"];

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  if (!SECTIONS.includes(section as Section)) notFound();

  return {
    title: section === "home" ? "Trang chủ" : section,
    alternates: {
      canonical: `/${section}`,
    },
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  if (!SECTIONS.includes(section as Section)) notFound();

  return <Portfolio initialSection={section as Section} />;
}
