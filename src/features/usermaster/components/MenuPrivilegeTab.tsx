//usermaster/components

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type {
  UserModulePrivilege,
  UserMenuPrivilege,
} from "../userTypes";

interface Props {
  menus: {
    menuId: number;
    menuName: string;
    moduleId: string;
    companyId: number;
    unitId: number;
  }[];

  selectedModules: UserModulePrivilege[];
  selectedMenus: UserMenuPrivilege[];
  onChange: (updated: UserMenuPrivilege[]) => void;
}

export function MenuPrivilegeTab({
  menus,
  selectedModules,
  selectedMenus,
  onChange,
}: Props) {

  const selectedModuleIds = selectedModules.map(m => m.moduleId);

  const filteredMenus = menus.filter(menu =>
    selectedModuleIds.includes(menu.moduleId)
  );

  const toggleMenu = (menu: any) => {
    const exists = selectedMenus.find(
      m => m.menuId === menu.menuId
    );

    if (exists) {
      onChange(selectedMenus.filter(m => m.menuId !== menu.menuId));
    } else {
      onChange([
        ...selectedMenus,
        {
          menuId: menu.menuId,
          moduleId: menu.moduleId,
          companyId: menu.companyId,
        
        },
      ]);
    }
  };

  // Group by module
  const grouped = filteredMenus.reduce((acc: any, menu) => {
    acc[menu.moduleId] = acc[menu.moduleId] || [];
    acc[menu.moduleId].push(menu);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([moduleId, moduleMenus]: any) => (
        <div key={moduleId} className="border p-3 rounded-md bg-white">
          <div className="font-semibold mb-2">
            Module: {moduleId}
          </div>

          <div className="space-y-2">
            {moduleMenus.map((menu: any) => (
              <div key={menu.menuId} className="flex items-center gap-2">
                <Checkbox
                  checked={!!selectedMenus.find(
                    m => m.menuId === menu.menuId
                  )}
                  onCheckedChange={() => toggleMenu(menu)}
                />
                <span>{menu.menuName}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredMenus.length === 0 && (
        <div className="text-sm text-muted-foreground">
          Select modules first.
        </div>
      )}
    </div>
  );
}