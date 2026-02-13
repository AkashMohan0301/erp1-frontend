"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import type { ButtonNode } from "./menuAssignmentTypes";

interface Props {
  menuId: number;
  button: ButtonNode;
  onChange: (
    menuId: number,
    buttonId: number,
    checked: boolean
  ) => void;
}

export function PermissionCheckbox({
  menuId,
  button,
  onChange,
}: Props) {
  const initial = button.fromRole || button.fromUser;

  const [checked, setChecked] = useState(initial);

  useEffect(() => {
    setChecked(initial);
  }, [initial]);

  const colorClass = button.fromUser
    ? "text-green-600"
    : button.fromRole
    ? "text-blue-600"
    : "text-gray-500";

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => {
          const value = !!val;
          setChecked(value);
          onChange(menuId, button.buttonId, value);
        }}
      />
      <span className={colorClass}>{button.name}</span>
    </div>
  );
}
