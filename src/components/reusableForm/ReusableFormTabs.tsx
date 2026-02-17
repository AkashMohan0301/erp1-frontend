"use client";

import { useState } from "react";

interface Props {
  tabs: string[];
  children: (activeTab: string) => React.ReactNode;
}

export function ReusableFormTabs({ tabs, children }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-primary font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {children(activeTab)}
    </>
  );
}
