"use client";

import { useEffect, useMemo, useState } from "react";
import { ProgramButtonBar } from "@/components/program/ProgramButtonBar";
import { FormField } from "./ReusableFormFields";
import { ReusableFormTabs } from "./ReusableFormTabs";
import { useReusableForm } from "./useReusableForm";
import type { FormProps } from "./reusableFormTypes";
import { usePopup } from "../popupDialog/PopupProvider";

export function ReusableForm<T>({
  fields,
  heading,
  initialValues,
  schema,
  onSubmit,
  mode: initialMode,
  formClassName,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 gap-6",
  onValueChange,
  externalData,
  loadingActions = [],
  disabledActions = [],
}: FormProps<T>) {
  const [mode, setMode] = useState(initialMode);
  const { show } = usePopup();

  const { values, errors, handleChange, handleSubmit, setValues } =
    useReusableForm<T>({ initialValues, schema, onSubmit });

  // ===========================
  // Field Change Handler
  // ===========================
  const handleFieldChange = (name: keyof T, value: any) => {
    handleChange(name, value);
    onValueChange?.(name, value);
  };

  // ===========================
  // Hydrate external data
  // ===========================
  useEffect(() => {
    if (externalData) {
      setValues(externalData as T);
      setMode("VIEW");
    }
  }, [externalData, setValues]);

  // ===========================
  // Tabs
  // ===========================
  const tabs = useMemo(() => {
    const unique = new Set<string>();
    fields.forEach((f) => unique.add(f.tab ?? "General"));
    return Array.from(unique);
  }, [fields]);

  // ===========================
  // Button Actions
  // ===========================
  const handleAction = async (action: string) => {
    switch (action) {
      case "save": {
        const result = await handleSubmit();

        if (!result.hasError) {
          show({
            type: "success",
            title: "Success",
            message: "Saved successfully",
          });

          setValues(initialValues);
          setMode("ADD");
        } else {
          // Optional: show generic backend error
          show({
            type: "error",
            title: "Error",
            message: "Please fix the highlighted errors",
          });
        }

        break;
      }

      case "edit":
        setMode("EDIT");
        break;

      case "add":
        setValues(initialValues);
        setMode("ADD");
        break;

      case "view":
        setValues(initialValues);
        setMode("VIEW");
        break;
    }
  };

  return (
    <div className={formClassName}>
      <p className="text-2xl font-bold mb-2">{heading}</p>

      <ProgramButtonBar
        align="center"
        onAction={handleAction}
        loadingActions={loadingActions}
        disabledActions={disabledActions}
      />

      <ReusableFormTabs tabs={tabs}>
        {(activeTab) => (
          <div className={gridClassName}>
            {fields
              .filter((f) => (f.tab ?? "General") === activeTab)
              .map((field) => (
                <div
                  key={field.name}
                  className={`col-span-${field.colSpan ?? 1}`}
                >
                  <FormField
                    config={field}
                    value={(values as any)[field.name]}
                    formValues={values}
                    error={errors[field.name]}
                    mode={mode}
                    onChange={(val) => handleFieldChange(field.name, val)}
                  />
                </div>
              ))}
          </div>
        )}
      </ReusableFormTabs>
    </div>
  );
}
