    "use client";

import { Checkbox } from "@/components/ui/checkbox";

interface Module {
  id: string;
  name: string;
}

interface Props {
  modules: Module[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function ModuleSelector({
  modules,
  selected,
  onChange,
}: Props) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="space-y-2">
      {modules.map((m) => (
        <div key={m.id} className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(m.id)}
            onCheckedChange={() => toggle(m.id)}
          />
          <span>{m.name}</span>
        </div>
      ))}
    </div>
  );
}
