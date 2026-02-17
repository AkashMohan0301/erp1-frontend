"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/NavMain";
import { TeamSwitcher } from "./UnitSwitcher";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectMenus,
  selectUnitId,
  selectUnits,
  setActiveUnit,
} from "@/store/authContextSlice";

import { mapMenuToNav } from "@/features/menu/menuMapper";

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const dispatch = useAppDispatch();

  const unitId = useAppSelector(selectUnitId);
  const units = useAppSelector(selectUnits);
  const menus = useAppSelector(selectMenus);

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
        <TeamSwitcher
          items={unitItems}
          activeId={unitId}
          label="Unit"
          onChange={(id) => {
            dispatch(setActiveUnit({ unitId: id }));
            document.cookie = `activeUnitId=${id}; path=/; SameSite=Lax`;     
          }}
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
