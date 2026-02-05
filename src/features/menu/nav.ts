import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  url?: string;              // ✅ optional
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];         // ✅ recursive
};

interface NavMainProps {
  items: NavItem[];
}
