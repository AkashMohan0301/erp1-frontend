//path: src/app/%28main%29/layout.tsx
import MainLayoutClient from "@/components/layoutGuard/MainLayoutClient";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayoutClient>{children}</MainLayoutClient>;
}
