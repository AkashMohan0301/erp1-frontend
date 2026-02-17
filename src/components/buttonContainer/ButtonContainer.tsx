"use client";

import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { mapVariant } from "./buttonVariantMapper";
import { mapButtonClass } from "./buttonClassMapper";
import { mapIcon } from "./buttonIconMapper";
import { rbacApiQueries } from "@/features/rbac/rbacApiQueries";

interface Props {
  menuId: number;
  onAction: (action: string) => void;
  children: ReactNode;
}

export function ButtonContainer({
  menuId,
  onAction,
  children,
}: Props) {

 const { data = [], isLoading } = useQuery(
    rbacApiQueries.menuActions(menuId)
  );

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex p-1 gap-2 overflow-x-auto justify-end">
        {isLoading && <span>Loading...</span>}

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

      <div>{children}</div>
    </div>
  );
}
