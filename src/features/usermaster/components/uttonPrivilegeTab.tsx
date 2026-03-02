"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type {
  UserMenuPrivilege,
  UserButtonPrivilege,
} from "../userTypes";

interface Props {
  buttons: {
    buttonId: string;
    buttonName: string;
    menuId: number;
    moduleId: string;
    companyId: number;
    unitId: number;
  }[];

  selectedMenus: UserMenuPrivilege[];
  selectedButtons: UserButtonPrivilege[];
  onChange: (updated: UserButtonPrivilege[]) => void;
}

export function ButtonPrivilegeTab({
  buttons,
  selectedMenus,
  selectedButtons,
  onChange,
}: Props) {

  const selectedMenuIds = selectedMenus.map(m => m.menuId);

  const filteredButtons = buttons.filter(btn =>
    selectedMenuIds.includes(btn.menuId)
  );

  const toggleButton = (btn: any) => {
    const exists = selectedButtons.find(
      b => b.buttonId === btn.buttonId && b.menuId === btn.menuId
    );

    if (exists) {
      onChange(
        selectedButtons.filter(
          b => !(b.buttonId === btn.buttonId && b.menuId === btn.menuId)
        )
      );
    } else {
      onChange([
        ...selectedButtons,
        {
          menuId: btn.menuId,
          moduleId: btn.moduleId,
          buttonId: btn.buttonId,
          companyId: btn.companyId,
          unitId: btn.unitId,
        },
      ]);
    }
  };

  return (
    <div className="space-y-3">
      {filteredButtons.map(btn => (
        <div key={`${btn.menuId}-${btn.buttonId}`} className="flex items-center gap-2">
          <Checkbox
            checked={!!selectedButtons.find(
              b => b.buttonId === btn.buttonId && b.menuId === btn.menuId
            )}
            onCheckedChange={() => toggleButton(btn)}
          />
          <span>{btn.buttonName}</span>
        </div>
      ))}

      {filteredButtons.length === 0 && (
        <div className="text-sm text-muted-foreground">
          Select menus first.
        </div>
      )}
    </div>
  );
}