"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// ----------------------------------
// TYPES
// ----------------------------------
export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
};

// ----------------------------------
// COMPONENT
// ----------------------------------
export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items?.length;

          // ==================================================
          // 1️⃣ PARENT MENU → DROPDOWN
          // ==================================================
          if (hasChildren) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items!.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            {subItem.url ? (
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            ) : (
                              <span className="opacity-60">
                                {subItem.title}
                              </span>
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // ==================================================
          // 2️⃣ LEAF MENU → CLICKABLE
          // ==================================================
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                {item.url ? (
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <span className="opacity-60">{item.title}</span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
