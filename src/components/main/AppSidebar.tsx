"use client";

import * as React from "react";
import { NavMain } from "@/components/NavMain";
import { TeamSwitcher } from "./CompanySwitcher";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAppSelector } from "@/store/hooks";
import {
  selectMenus,
  selectCompanyId,
  selectCompanies,
} from "@/store/authContextSlice";

import { mapMenuToNav } from "@/features/menu/menuMapper";
import { useSwitchCompany } from "@/features/auth/authHooks";

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const companyId = useAppSelector(selectCompanyId);
  const companies = useAppSelector(selectCompanies);
  const menus = useAppSelector(selectMenus);

  const { mutate: switchCompany } = useSwitchCompany();

  const navItems = menus?.map(mapMenuToNav) ?? [];

  const companyItems =
    companies?.map((c) => ({
      id: c.companyId,
      name: c.companyName,
    })) ?? [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          items={companyItems}
          activeId={companyId}
          onChange={(id) => {
            if (id !== companyId) {
              switchCompany(id);
            }
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