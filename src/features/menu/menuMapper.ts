import type { MenuNode } from "./menu";
import type { NavItem } from "./nav";




export function mapMenuToNav(menu: MenuNode): NavItem {
  const hasChildren = menu.children.length > 0;
  const hasRoute = !!menu.route;

  // ✅ LEAF MENU WITH ROUTE (Dashboard, Customer, etc.)
  if (!hasChildren && hasRoute) {
    return {
      title: menu.label,
      url: menu.route!,   // REAL route → navigation works
    };
  }

  // ✅ PARENT MENU (Master)
  if (hasChildren) {
    return {
      title: menu.label,
      items: menu.children.map(mapMenuToNav),
    };
  }

  // ✅ LEAF MENU WITHOUT ROUTE (rare / future-proof)
  return {
    title: menu.label,
    url: "", // renders disabled, no dropdown
  };
}
