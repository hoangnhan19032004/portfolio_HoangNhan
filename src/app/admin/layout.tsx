import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | CodeWithHN",
  description: "Bảng quản trị inbox khách hàng của CodeWithHN",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
