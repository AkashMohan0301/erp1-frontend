"use client";

import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectMenus } from "@/store/authContextSlice";
import { findMenuByRoute } from "@/features/menu/menuUtils";
import { programButtonMap } from "@/features/program/programButtonConfig";
import { Button } from "@/components/ui/button";

interface Props {
  onAction?: (action: string) => void;
  loadingActions?: string[];
  disabledActions?: string[];
  align?: "left" | "right" | "center";
}

export function ProgramButtonBar({
  onAction,
  loadingActions = [],
  disabledActions = [],
  align = "left",
}: Props) {
  const pathname = usePathname();
  const menus = useAppSelector(selectMenus);

  const currentMenu = findMenuByRoute(menus, pathname);

  if (!currentMenu?.privileges?.length) {
    return null;
  }

  const justifyMap = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  };
  return (
      <div
    className={`
      sticky top-0 z-50
      rounded-xl
      backdrop-blur-md
      bg-white/20 dark:bg-zinc-900/60
      border-b border-white/20 dark:border-white/10
      shadow-sm
      px-4 py-3
      flex gap-2 flex-wrap
      mb-1
      ${justifyMap[align]}
    `}
  >
      {currentMenu.privileges.map((code) => {
        const config = programButtonMap[code];
        if (!config) return null;

        const Icon = config.icon;
        const isLoading = loadingActions.includes(config.action);
        const isDisabled = disabledActions.includes(config.action);

        return (
          <Button
            key={code}
            type={config.type ?? "button"}
            variant={config.variant}
            disabled={isDisabled || isLoading}
            className="flex items-center gap-2"
            onClick={() => onAction?.(config.action)}
          >
            {Icon && <Icon size={16} />}
            {isLoading ? "Processing..." : config.label}
          </Button>
        );
      })}
    </div>
  );
}
