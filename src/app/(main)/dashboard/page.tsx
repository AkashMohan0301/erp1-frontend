// app/(main)/customer/page.tsx
"use client";

import { ProgramButtonBar } from "@/components/ProgramButtonBar";

export default function DashboardPage() {
  const handleAction = (action: string) => {
    switch (action) {
      case "new":
        console.log("Create new");
        break;
      case "save":
        console.log("Save form");
        break;
      case "delete":
        console.log("Delete record");
        break;
      case "view":
        console.log("View record");
        break;
    }
  };

  return (
    <div className="space-y-4">
      <ProgramButtonBar onAction={handleAction} />

      {/* Page content here */}
    </div>
  );
}
