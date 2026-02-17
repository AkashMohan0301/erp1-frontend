"use client";

import { useMemo, useState } from "react";
import { ProgramButtonBar } from "@/features/program/ProgramButtonBar";
import { FormField } from "./ReusableFormFields";
import { ReusableFormTabs } from "./ReusableFormTabs";
import { useReusableForm } from "./useReusableForm";
import type { FormProps } from "./reusableFormTypes";

export function ReusableForm<T>({
  fields,
  heading,
  initialValues,
  schema,
  onSubmit,
  mode: initialMode,
  formClassName,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 gap-6",
}: FormProps<T>) {
  const [mode, setMode] = useState(initialMode);

  const { values,errors,handleChange,handleSubmit,setValues,} = useReusableForm<T>
        ({initialValues,schema,onSubmit,});

  // ===========================
  // Tabs
  // ===========================
  const tabs = useMemo(() => {
    const unique = new Set<string>();
    fields.forEach((f) =>
      unique.add(f.tab ?? "General")
    );
    return Array.from(unique);
  }, [fields]);

  // ===========================
  // Button Actions
  // ===========================
  const handleAction = async (action: string) => {
    switch (action) {
      case "save":
        await handleSubmit();
        break;

      case "edit":
        setMode("EDIT");
        break;

      case "new":
        setValues(initialValues);
        setMode("CREATE");
        break;
    }
  };

  return (
    <div className={formClassName}>
      <p className="text-2xl font-bold mb-2">{heading}</p>

      {/* Program Button Bar */}
      <ProgramButtonBar
        align="right"
        onAction={handleAction}
      />

      {/* Tabs */}
      <ReusableFormTabs tabs={tabs}>
        {(activeTab) => (
          <div className={gridClassName}>
            {fields
              .filter(
                (f) =>
                  (f.tab ?? "General") === activeTab
              )
              .map((field) => (
                <div
                  key={field.name}
                  className={`col-span-${
                    field.colSpan ?? 1
                  }`}
                >
                  <FormField
                    config={field}
                    value={
                      (values as any)[field.name]
                    }
                    formValues={values}
                    error={errors[field.name]}
                    mode={mode}
                    onChange={(val) =>
                      handleChange(
                        field.name,
                        val
                      )
                    }
                  />
                </div>
              ))}
          </div>
        )}
      </ReusableFormTabs>
    </div>
  );
}
