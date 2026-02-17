"use client";

import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectMenus } from "@/store/authContextSlice";
import { findMenuByRoute } from "@/features/menu/menuUtils";
import { programButtonMap } from "@/features/program/programButtonConfig";
import { Button } from "@/components/ui/button";

interface Props {
  onAction?: (action: string) => void;
}

export function ProgramButtonBar({ onAction }: Props) {
  const pathname = usePathname();
  const menus = useAppSelector(selectMenus);

  const currentMenu = findMenuByRoute(menus, pathname);

  if (!currentMenu || !currentMenu.privileges?.length) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {currentMenu.privileges.map((code) => {
        const config = programButtonMap[code];

        if (!config) return null;

        return (
          <Button
            key={code}
            variant={config.variant}
            className={config.className}
            onClick={() => onAction?.(config.action)}
          >
            {config.label}
          </Button>
        );
      })}
    </div>
  );
}
