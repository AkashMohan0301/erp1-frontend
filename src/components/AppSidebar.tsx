"use client";

import * as React from "react";
import {
  Bot,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { TeamSwitcher } from "./UnitSwitcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  selectAuthContext,
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";
import { setActiveUnit } from "@/store/authContextSlice";
import { useUserUnits } from "@/features/auth/auth.hooks";

// --------------------
// STATIC NAV
// --------------------
const navMain = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
    items: [
      { title: "Genesis", url: "#" },
      { title: "Explorer", url: "#" },
      { title: "Quantum", url: "#" },
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch();
  const { unitId } = useAppSelector(selectAuthContext);
  const { data: units, isLoading } = useUserUnits();

  const unitItems =
    units?.map((u) => ({
      id: u.unitId,
      name: u.unitName,
      logo: GalleryVerticalEnd,
    })) ?? [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isLoading ? (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Loading units…
          </div>
        ) : (
          <TeamSwitcher
            items={unitItems}
            activeId={unitId}
            label="Unit"
            onChange={(id) =>
              dispatch(setActiveUnit({ unitId: id }))
            }
          />
        )}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "System User",
            email: "",
            avatar: "/avatars/default.png",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
