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

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import { selectUnitId } from "@/store/authContextSlice";

import { setActiveUnit } from "@/store/authContextSlice";
import { useUserUnits } from "@/features/auth/authHooks";

import { useMenus } from "@/features/menu/menuHooks";
import { mapMenuToNav } from "@/features/menu/menuMapper";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch();
  const unitId = useAppSelector(selectUnitId);

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
            onChange={(id) => {
                                  dispatch(setActiveUnit({ unitId: id }));

                                  // Persist last active unit
                                  document.cookie = `activeUnitId=${id}; path=/; SameSite=Lax`;
                                }}
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

      {/* <SidebarFooter>
        <NavUser
          user={{
            name: "System User",
            email: "",
            avatar: "/avatars/default.png",
          }}
        />
      </SidebarFooter> */}

      <SidebarRail />
    </Sidebar>
  );
}
