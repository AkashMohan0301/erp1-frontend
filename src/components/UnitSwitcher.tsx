"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// --------------------
// TYPES
// --------------------
export type SwitcherItem = {
  id: number;
  name: string;
  logo?: React.ElementType;
};

interface TeamSwitcherProps {
  items: SwitcherItem[];
  activeId: number | null;
  onChange: (id: number) => void;
  label?: string;
}

export function TeamSwitcher({
  items,
  activeId,
  onChange,
  label = "Units",
}: TeamSwitcherProps) {
  const { isMobile } = useSidebar();

  const activeItem = items.find((i) => i.id === activeId) ?? items[0];

  if (!activeItem) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeItem.logo ? (
                  <activeItem.logo className="size-4" />
                ) : (
                  <span className="text-xs font-semibold">
                    {activeItem.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeItem.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {label}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {label}
            </DropdownMenuLabel>

            {items.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onChange(item.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {item.logo ? (
                    <item.logo className="size-3.5" />
                  ) : (
                    <span className="text-xs font-semibold">
                      {item.name.charAt(0)}
                    </span>
                  )}
                </div>
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
