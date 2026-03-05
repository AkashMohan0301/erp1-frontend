"use client";

import { ThemeToggle } from "@/components/ui/themes/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/authHooks";
import { DropdownItem } from "@/components/main/DropdownMenu";
import { AppDropdown } from "@/components/main/DropdownMenu";
import { Button } from "@/components/ui/button";
import {
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  LogOutIcon,
  Settings,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { selectMenus } from "@/store/authContextSlice";
import { getBreadcrumbPath } from "@/features/menu/menuUtils";

export default function TopBar() {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.replace("/login"); // ✅ IMPORTANT
    } catch {
      // optional: show toast
    }
  };

  const menuItems: DropdownItem[] = [
    {
      type: "item",
      label: "Profile",
      icon: <UserIcon className="h-4 w-4" />,
      onClick: () => console.log("Profile"),
    },

    {
      type: "separator",
    },
    {
      type: "item",
      label: "Log out",
      icon: <LogOutIcon className="h-4 w-4" />,
      variant: "destructive",
      onClick: handleLogout,
    },
  ];

  const pathname = usePathname();
  const menus = useAppSelector(selectMenus);

  const breadcrumb = getBreadcrumbPath(menus, pathname) ?? [];

  return (
    <header className="h-14 border-b rounded-b-sm flex items-center px-4 shadow-sm mt-1 overflow-auto">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div>
          <nav className="flex items-center text-sm text-slate-600 dark:text-slate-300">
            {breadcrumb.map((item, index) => (
              <div key={item.route ?? item.label} className="flex items-center">
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "font-extrabold text-slate-900 dark:text-white"
                      : ""
                  }
                >
                  {item.label}
                </span>

                {index < breadcrumb.length - 1 && (
                  <span className="mx-2 text-slate-400">/</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <AppDropdown
          trigger={
            <Button variant="outline" size="icon">
              <Settings />
            </Button>
          }
          items={menuItems}
        />
      </div>
    </header>
  );
}
