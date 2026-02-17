"use client";

import { useState } from "react";
import {
  useMenuAssignment,
  useSaveMenuAssignment,
} from "./menuAssignmentHooks";
import { ModuleSelector } from "./ModuleSelector";
import { MenuTree } from "./MenuTree";
import { Button } from "@/components/ui/button";

const AVAILABLE_MODULES = [
  { id: "ADM", name: "Administration" },
  { id: "DSB", name: "Dashboard" },
];

interface Props {
  userId: number;
  unitId: number;
}

export default function MenuAssignmentPage({
  userId,
  unitId,
}: Props) {
  const [selectedModules, setSelectedModules] =
    useState<string[]>([]);

  const { data } = useMenuAssignment(
    userId,
    unitId,
    selectedModules
  );

  const saveMutation = useSaveMenuAssignment(userId);

  const [overrides, setOverrides] = useState<
    { menuId: number; buttonId: number }[]
  >([]);

  function handlePermissionChange(
    menuId: number,
    buttonId: number,
    checked: boolean
  ) {
    setOverrides((prev) => {
      if (checked) {
        return [...prev, { menuId, buttonId }];
      } else {
        return prev.filter(
          (x) =>
            !(x.menuId === menuId && x.buttonId === buttonId)
        );
      }
    });
  }

  function handleSave() {
    saveMutation.mutate({
      unitId,
      moduleIds: selectedModules,
      permissions: overrides,
    });
  }

  return (
    <div className="flex gap-6 p-6">
      <div className="w-64">
        <h3 className="font-semibold mb-2">Modules</h3>
        <ModuleSelector
          modules={AVAILABLE_MODULES}
          selected={selectedModules}
          onChange={setSelectedModules}
        />
      </div>

      <div className="flex-1">
        {data && (
          <MenuTree
            modules={data.modules}
            onPermissionChange={handlePermissionChange}
          />
        )}

        <div className="mt-6">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
