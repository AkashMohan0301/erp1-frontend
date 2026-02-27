"use client";

import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectMenus } from "@/store/authContextSlice";
import { findMenuByRoute } from "@/features/menu/menuUtils";
import { programButtonMap } from "@/components/program/programButtonConfig";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

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

  const sortedButtons = currentMenu.privileges
    .map((code) => ({
      code,
      config: programButtonMap[code],
    }))
    .filter((item) => item.config)
    .sort((a, b) => a.config.order - b.config.order);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.altKey) return;

      const key = e.key.toLowerCase();

      const availableButtons = currentMenu?.privileges
        ?.map((code) => programButtonMap[code])
        .filter(Boolean);

      if (!availableButtons) return;

      const match = availableButtons.find(
        (btn) => btn.accessKey?.toLowerCase() === key
      );

      if (!match) return;

      e.preventDefault();

      if (
        !disabledActions.includes(match.action) &&
        !loadingActions.includes(match.action)
      ) {
        onAction?.(match.action);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentMenu, disabledActions, loadingActions, onAction]);

  return (
    <div
      className={`
        sticky top-0 z-50
        backdrop-blur-md
        border-b 
        py-3
        flex gap-2 flex-wrap
        mb-1
        ${justifyMap[align]}
      `}
    >
      {sortedButtons.map(({ code, config }) => {
        const Icon = config.icon;
        const isLoading = loadingActions.includes(config.action);
        const isDisabled = disabledActions.includes(config.action);

        return (
          <Button
            key={code}
            type={config.type ?? "button"}
            variant={config.variant}
            disabled={isDisabled || isLoading}
            className={`flex items-center gap-2 ${config.className ?? ""}`}
            onClick={() => onAction?.(config.action)}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              Icon && <Icon size={16} />
            )}

            {isLoading
              ? config.action === "save"
                ? "Saving..."
                : "Processing..."
              : config.label}
          </Button>
        );
      })}
    </div>
  );
}