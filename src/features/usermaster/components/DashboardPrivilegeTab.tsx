"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { UserDashboardPrivilege } from "../userTypes";

interface Props {
  dashboards: {
    dashboardId: number;
    dashboardName: string;
    companyId: number;
    unitId: number;
  }[];

  selected: UserDashboardPrivilege[];
  onChange: (updated: UserDashboardPrivilege[]) => void;
}

export function DashboardPrivilegeTab({
  dashboards,
  selected,
  onChange,
}: Props) {

  const toggleDashboard = (dash: any) => {
    const exists = selected.find(
      d => d.dashboardId === dash.dashboardId
    );

    if (exists) {
      onChange(
        selected.filter(d => d.dashboardId !== dash.dashboardId)
      );
    } else {
      onChange([
        ...selected,
        {
          dashboardId: dash.dashboardId,
          companyId: dash.companyId,
          unitId: dash.unitId,
        },
      ]);
    }
  };

  return (
    <div className="space-y-2">
      {dashboards.map(dash => (
        <div key={dash.dashboardId} className="flex items-center gap-2">
          <Checkbox
            checked={!!selected.find(
              d => d.dashboardId === dash.dashboardId
            )}
            onCheckedChange={() => toggleDashboard(dash)}
          />
          <span>{dash.dashboardName}</span>
        </div>
      ))}
    </div>
  );
}