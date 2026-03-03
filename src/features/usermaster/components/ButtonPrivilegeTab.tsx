"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { UserMenuPrivilege, UserButtonPrivilege } from "../userTypes";

interface Props {
  buttons: {
    buttonId: string;
    buttonName: string;
    menuId: number;
    moduleId: string;
  }[];

  menus: {
    menuId: number;
    menuName: string;
  }[];

  selectedMenus: UserMenuPrivilege[];
  selectedButtons: UserButtonPrivilege[];
  onChange: (updated: UserButtonPrivilege[]) => void;
}

export function ButtonPrivilegeTab({
  buttons,
  menus,
  selectedMenus,
  selectedButtons,
  onChange,
}: Props) {

  // =========================================================
  // Build Menu Name Map
  // =========================================================
  const menuNameMap = Object.fromEntries(
    menus.map((m) => [m.menuId, m.menuName])
  );

  // =========================================================
  // Filter Buttons By Selected Menus
  // =========================================================
  const selectedMenuIds = selectedMenus.map((m) => m.menuId);

  const filteredButtons = buttons.filter((btn) =>
    selectedMenuIds.includes(btn.menuId)
  );

  // =========================================================
  // Group Buttons By Menu
  // =========================================================
  const grouped = filteredButtons.reduce<Record<number, typeof buttons>>(
    (acc, btn) => {
      if (!acc[btn.menuId]) {
        acc[btn.menuId] = [];
      }
      acc[btn.menuId].push(btn);
      return acc;
    },
    {}
  );

  // =========================================================
  // Toggle Button
  // =========================================================
  const toggleButton = (btn: typeof buttons[number]) => {
    const exists = selectedButtons.find(
      (b) => b.buttonId === btn.buttonId && b.menuId === btn.menuId
    );

    if (exists) {
      onChange(
        selectedButtons.filter(
          (b) => !(b.buttonId === btn.buttonId && b.menuId === btn.menuId)
        )
      );
    } else {
      onChange([
        ...selectedButtons,
        {
          menuId: btn.menuId,
          moduleId: btn.moduleId,
          buttonId: btn.buttonId,
          companyId: selectedMenus.find((m) => m.menuId === btn.menuId)
            ?.companyId!,
        },
      ]);
    }
  };

  if (selectedMenus.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Select menus first.
      </div>
    );
  }

  // =========================================================
  // Render
  // =========================================================
  return (
    <div className="space-y-6">
      {selectedMenus.map((menu) => {
        const menuButtons = grouped[menu.menuId];

        if (!menuButtons || menuButtons.length === 0) return null;

        return (
          <div key={menu.menuId} className="border p-3 rounded-md">
            <div className="font-semibold mb-2">
              {menuNameMap[menu.menuId] ?? `Menu ${menu.menuId}`}
            </div>

            <div className="space-y-2">
              {menuButtons.map((btn) => (
                <div
                  key={`${btn.menuId}-${btn.buttonId}`}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    checked={
                      !!selectedButtons.find(
                        (b) =>
                          b.buttonId === btn.buttonId &&
                          b.menuId === btn.menuId
                      )
                    }
                    onCheckedChange={() => toggleButton(btn)}
                  />
                  <span>{btn.buttonName}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}