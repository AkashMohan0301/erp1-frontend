"use client";

import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectMenus } from "@/store/authContextSlice";
import { findMenuByRoute } from "@/features/menu/menuUtils";
import { programButtonMap } from "@/components/reusableButtonBar/reusableButtonConfig";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Loader2, SaveIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Kbd } from "../ui/kbd";

interface Props {
  onAction?: (action: string) => void;
  loadingActions?: string[];
  disabledActions?: string[];
  align?: "left" | "right" | "center";
}

export function ResusableButtonBar({
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
        (btn) => btn.accessKey?.toLowerCase() === key,
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
    <Card
      className={`
        sticky top-0 z-50
        flex flex-row gap-2 flex-wrap
        p-2
        shadow-md
        mb-4
        ${justifyMap[align]}
      `}
    >
      {sortedButtons.map(({ code, config }) => {
        const Icon = config.icon;
        const isLoading = loadingActions.includes(config.action);
        const isDisabled = disabledActions.includes(config.action);

        return (
          <Tooltip key={code}>
            <TooltipTrigger asChild>
          <Button
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
            </TooltipTrigger>
            <TooltipContent>
              ALT + <Kbd>{config.accessKey}</Kbd>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </Card>
  );
}
