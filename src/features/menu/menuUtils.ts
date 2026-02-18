// src/features/menu/menuUtils.ts

import type { MenuNode } from "./menuType";

/**
 * Normalize route:
 * - remove leading slash
 * - lowercase
 */
function normalize(value: string) {
  return value.replace(/^\/+/, "").toLowerCase();
}

/**
 * Match current pathname to menu route.
 * Supports nested routes:
 * /company
 * /company/add
 * /company/edit/12
 */
export function findMenuByRoute(
  menus: MenuNode[] | undefined,
  pathname: string
): MenuNode | undefined {
  if (!menus) return undefined;

  const current = normalize(pathname);

  for (const m of menus) {
    if (m.route) {
      const route = normalize(m.route);

      // ✅ exact match OR nested match
      if (current === route || current.startsWith(route + "/")) {
        return m;
      }
    }

    if (m.children?.length) {
      const found = findMenuByRoute(m.children, pathname);
      if (found) return found;
    }
  }

  return undefined;
}

/**
 * Return first routable menu
 */
export function getDefaultRoute(
  menus: MenuNode[] | undefined
): string | null {
  if (!menus) return null;

  for (const m of menus) {
    if (m.route) return "/" + normalize(m.route);

    if (m.children?.length) {
      const child = getDefaultRoute(m.children);
      if (child) return child;
    }
  }

  return null;
}
/**
 * Return breadcrumb path from menu tree
 */
export function getBreadcrumbPath(
  menus: MenuNode[] | undefined,
  pathname: string,
  parentTrail: MenuNode[] = []
): MenuNode[] | null {
  if (!menus) return null;

  const current = normalize(pathname);

  for (const menu of menus) {
    const newTrail = [...parentTrail, menu];

    if (menu.route) {
      const route = normalize(menu.route);

      if (current === route || current.startsWith(route + "/")) {
        return newTrail;
      }
    }

    if (menu.children?.length) {
      const childResult = getBreadcrumbPath(
        menu.children,
        pathname,
        newTrail
      );
      if (childResult) return childResult;
    }
  }

  return null;
}
