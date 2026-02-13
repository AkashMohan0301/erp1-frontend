"use client";

import type { ModuleNode, MenuNode } from "./menuAssignmentTypes";
import { PermissionCheckbox } from "./PermissionCheckbox";

function buildTree(menus: MenuNode[]) {
  const map = new Map<number, MenuNode & { children: MenuNode[] }>();

  menus.forEach((m) =>
    map.set(m.menuId, { ...m, children: [] })
  );

  const roots: any[] = [];

  menus.forEach((m) => {
    if (m.parentMenuId && map.has(m.parentMenuId)) {
      map.get(m.parentMenuId)?.children.push(
        map.get(m.menuId)!
      );
    } else {
      roots.push(map.get(m.menuId));
    }
  });

  return roots;
}

function RenderMenu({
  menu,
  onPermissionChange,
}: {
  menu: any;
  onPermissionChange: any;
}) {
  return (
    <div className="ml-4 mb-4">
      <h4 className="font-medium">{menu.label}</h4>

      <div className="ml-6 space-y-1">
        {menu.buttons.map((btn: any) => (
          <PermissionCheckbox
            key={btn.buttonId}
            menuId={menu.menuId}
            button={btn}
            onChange={onPermissionChange}
          />
        ))}
      </div>

      {menu.children?.length > 0 && (
        <div className="ml-4 border-l pl-4">
          {menu.children.map((child: any) => (
            <RenderMenu
              key={child.menuId}
              menu={child}
              onPermissionChange={onPermissionChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MenuTree({
  modules,
  onPermissionChange,
}: {
  modules: ModuleNode[];
  onPermissionChange: any;
}) {
  return (
    <div className="space-y-6">
      {modules.map((module) => {
        const tree = buildTree(module.menus);

        return (
          <div key={module.moduleId}>
            <h3 className="text-lg font-semibold mb-2">
              {module.moduleName}
            </h3>

            {tree.map((menu: any) => (
              <RenderMenu
                key={menu.menuId}
                menu={menu}
                onPermissionChange={onPermissionChange}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
