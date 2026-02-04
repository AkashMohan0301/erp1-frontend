"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/uiSlice";
import { ThemeToggle } from "@/components/ui/themes/ThemeToggle";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/auth.hooks";
import { DropdownItem } from "@/components/DropdownMenu";
import { AppDropdown } from "@/components/DropdownMenu";
import { Button } from "@/components/ui/button"
import {UserIcon,CreditCardIcon,SettingsIcon,LogOutIcon,Settings} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar";



export default function TopBar() {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

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
    type: "item",
    label: "Billing",
    icon: <CreditCardIcon className="h-4 w-4" />,
  },
  {
    type: "item",
    label: "Settings",
    icon: <SettingsIcon className="h-4 w-4" />,
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
]


  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-4 shadow-sm">
      <div className="flex items-center gap-3">
         <SidebarTrigger />
        <div>
          <h1 className="text-sm font-semibold">Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Demo Corp
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <AppDropdown trigger={<Button variant="outline" size="icon"><Settings /></Button>} items={menuItems}/>
      </div>
    </header>
  );
}
