"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

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

import { useMenus } from "@/features/menu/menu.hooks";
import { mapMenuToNav } from "@/features/menu/menuMapper";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch();
  const { unitId } = useAppSelector(selectAuthContext);

  const { data: units, isLoading: unitsLoading } = useUserUnits();
  const { data: menus, isLoading: menusLoading } = useMenus(unitId);

  const navItems = menus?.map(mapMenuToNav) ?? [];
  const unitItems =
    units?.map((u) => ({
      id: u.unitId,
      name: u.unitName,
      logo: GalleryVerticalEnd,
    })) ?? [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {unitsLoading ? (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Loading units…
          </div>
        ) : (
          <TeamSwitcher
            items={unitItems}
            activeId={unitId}
            label="Unit"
            onChange={(id) => dispatch(setActiveUnit({ unitId: id }))}
          />
        )}
      </SidebarHeader>

      <SidebarContent>
        {menusLoading ? (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Loading menus…
          </div>
        ) : (
          <NavMain items={navItems} />
        )}
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
