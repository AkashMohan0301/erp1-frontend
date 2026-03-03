//usermaster/components

"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  modules: any[];
  selected: any[];
  onChange: (updated: any[]) => void;
}

export function ModulePrivilegeTab({
  modules,
  selected,
  onChange,
}: Props) {

  const toggleModule = (module: any) => {
    const exists = selected.find(m => m.moduleId === module.moduleId);

    if (exists) {
      onChange(selected.filter(m => m.moduleId !== module.moduleId));
    } else {
      onChange([
        ...selected,
        {
          moduleId: module.moduleId,
          companyId: module.companyId,
          unitId: module.unitId,
          role: "O",
          modulePriority: module.priority
        }
      ]);
    }
  };

  return (
    <div className="space-y-2">
      {modules.map(mod => (
        <div key={mod.moduleId} className="flex items-center gap-2">
          <Checkbox
            checked={!!selected.find(m => m.moduleId === mod.moduleId)}
            onCheckedChange={() => toggleModule(mod)}
          />
          <span>{mod.moduleName}</span>
        </div>
      ))}
    </div>
  );
}