import type { MenuNode } from "./menu";

export function flattenMenus(menus: MenuNode[] = []): MenuNode[] {
  const result: MenuNode[] = [];

  for (const m of menus) {
    result.push(m);
    if (m.children?.length) {
      result.push(...flattenMenus(m.children));
    }
  }

  return result;
}
/**
 * Finds a menu entry by route pathname
 */
export function findMenuByRoute(
  menus: MenuNode[] | undefined,
  pathname: string
): MenuNode | undefined {
  if (!menus) return undefined;

  for (const m of menus) {
    // 🔹 Match only if route exists
    if (m.route && m.route === pathname) {
      return m;
    }

    // 🔹 Search children recursively
    if (m.children?.length) {
      const found = findMenuByRoute(m.children, pathname);
      if (found) return found;
    }
  }

  return undefined;
}


/**
 * Returns the first allowed route for a unit
 */
export function getDefaultRoute(
  menus: MenuNode[] | undefined
): string | null {
  if (!menus) return null;

  const flat = flattenMenus(menus);

  // 🔹 Find first menu that actually has a route
  const firstRoutable = flat.find(m => !!m.route);

  return firstRoutable?.route ?? null;
}
