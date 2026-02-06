"use client"

import {
  ChevronRight,
  Folder,
  FolderOpen,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

/* ----------------------------------
   TYPES
---------------------------------- */
export type NavItem = {
  title: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavItem[]
}

/* ----------------------------------
   RECURSIVE RENDERER
---------------------------------- */
function RenderNavItem({ item }: { item: NavItem }) {
  const hasChildren = !!item.items?.length

  /* ========== LEAF ========== */
  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          {item.url ? (
            <Link href={item.url}>
              <span>{item.title}</span>
            </Link>
          ) : (
            <span className="opacity-60">{item.title}</span>
          )}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  /* ========== PARENT ========== */
  return (
    <SidebarMenuItem>
      <Collapsible
        defaultOpen={item.isActive}
        className="
          group/collapsible
          [&[data-state=open]>button>svg.chevron]:rotate-90
          [&[data-state=open]>button>svg.folder-closed]:hidden
          [&[data-state=open]>button>svg.folder-open]:block
        "
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {/* Chevron */}
            <ChevronRight className="chevron transition-transform" />

            {/* Folder icons */}
            <Folder className="folder-closed" />
            <FolderOpen className="folder-open hidden" />

            <span>{item.title}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items!.map((child) => (
              <RenderNavItem key={child.title} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

/* ----------------------------------
   MAIN COMPONENT
---------------------------------- */
export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <RenderNavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
