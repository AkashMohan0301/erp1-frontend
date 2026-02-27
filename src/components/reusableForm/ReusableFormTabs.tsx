"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  errorTabs?: string[];
  children: (activeTab: string) => React.ReactNode;
}

export function ReusableFormTabs({
  tabs,
  activeTab,
  setActiveTab,
  errorTabs = [],
  children,
}: Props) {
  const currentIndex = tabs.indexOf(activeTab);
  const hasNext = currentIndex < tabs.length - 1;
  const hasPrevious = currentIndex > 0;

  const goNext = () => {
    if (hasNext) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goPrevious = () => {
    if (hasPrevious) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      {/* Tab Headers */}
      <TabsList className="mb-6">
        {tabs.map((tab) => {
          const hasError = errorTabs.includes(tab);

          return (
            <TabsTrigger
              key={tab}
              value={tab}
              className={hasError ? "text-red-600" : ""}
            >
              {tab}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* Tab Contents */}
      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab}>
          {children(tab)}
        </TabsContent>
      ))}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {hasPrevious ? (
          <button
            type="button"
            onClick={goPrevious}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {hasNext && (
          <button
            type="button"
            onClick={goNext}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </Tabs>
  );
}