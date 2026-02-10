"use client";

import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMenuActions } from "@/features/rbac/rbac.api";
import { Button } from "@/components/ui/button";
import { mapVariant } from "./buttonVariantMapper";
import { mapButtonClass } from "./buttonClassMapper";
import { mapIcon } from "./buttonIconMapper";

interface Props {
  menuId: number;
  onAction: (action: string) => void;
  children: ReactNode;
}

export function RBACActionContainer({ menuId, onAction, children }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menu-actions", menuId],
    queryFn: () => fetchMenuActions(menuId),
  });

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className="space-y-4">
      {/* ACTION BAR */}
      <div className="flex gap-2 justify-end">
        {data?.map((btn) => (
          <Button
            key={btn.buttonCode}
            variant={mapVariant(btn)}
            className={mapButtonClass(btn.buttonCode)}
            onClick={() => onAction(btn.action)}
          >
            {mapIcon(btn.buttonCode)}
            <span className="ml-2">{btn.label}</span>
          </Button>
        ))}
      </div>

      {/* CONTENT */}
      <div>{children}</div>
    </div>
  );
}
