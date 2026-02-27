"use client";

import { useEffect, useMemo, useState } from "react";
import { ProgramButtonBar } from "@/components/program/ProgramButtonBar";
import { FormField } from "./ReusableFormFields";
import { ReusableFormTabs } from "./ReusableFormTabs";
import { useReusableForm } from "./useReusableForm";
import type { FormProps } from "./reusableFormTypes";
import { usePopup } from "../popupDialog/PopupProvider";
import { redirect } from "next/navigation";

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

  const { values, errors, handleChange, handleSubmit, setValues, reset } =
    useReusableForm<T>({ initialValues, schema, onSubmit });

  // ============================
  // Tabs
  // ============================
  const tabs = useMemo(() => {
    const unique = new Set<string>();
    fields.forEach((f) => unique.add(f.tab ?? "General"));
    return Array.from(unique);
  }, [fields]);

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [errorTabs, setErrorTabs] = useState<string[]>([]);

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0]);
    }
  }, [tabs]);

  // ============================
  // Field Change
  // ============================
  const handleFieldChange = (name: keyof T, value: any) => {
    handleChange(name, value);
    onValueChange?.(name, value);
  };

  // ============================
  // Hydrate External Data
  // ============================
  useEffect(() => {
    if (externalData) {
      setValues(externalData as T);
      setMode("VIEW");
      setErrorTabs([]);
    }
  }, [externalData, setValues]);

  // ============================
  // Mode-Based Disabled Actions
  // ============================
  const computedDisabledActions = useMemo(() => {
    const disabled = new Set(disabledActions);

    if (mode === "VIEW") disabled.add("save");
    if (mode === "ADD") disabled.add("edit");
    if (mode === "EDIT") disabled.add("add");

    return Array.from(disabled);
  }, [mode, disabledActions]);

  // ============================
  // Button Actions
  // ============================
  const handleAction = async (action: string) => {
    switch (action) {
      case "save": {
        if (mode === "VIEW") return;

        const result = await handleSubmit();

        if (!result.hasError) {
          setErrorTabs([]);

          show({
            type: "success",
            title: "Success",
            message: "Saved successfully",
          });

          setValues(initialValues);
          setMode("ADD");
        } else {
          if (result.fieldErrors) {
            const errorKeys = Object.keys(result.fieldErrors);

            const tabsWithErrors = fields
              .filter((f) => errorKeys.includes(f.name))
              .map((f) => f.tab ?? "General");

            if (tabsWithErrors.length > 0) {
              setActiveTab(tabsWithErrors[0]);
              setErrorTabs([...new Set(tabsWithErrors)]);
            }
          }

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
        setErrorTabs([]);
        break;

      case "view":
        setValues(initialValues);
        setMode("VIEW");
        setErrorTabs([]);
        break;

      case "reset":
        reset();
        setMode("ADD");
        setErrorTabs([]);
        break;

      case "exit":
        redirect("/dashboard");
        break;
    }
  };

  // ============================
  // Render
  // ============================
  return (
    <div className={formClassName} >
      <p className="text-2xl font-bold mb-4">{heading}</p>

      <ProgramButtonBar
        align="left"
        onAction={handleAction}
        loadingActions={loadingActions}
        disabledActions={computedDisabledActions}
      />

      <ReusableFormTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        errorTabs={errorTabs}
      >
        {(currentTab) => (
          <div className={gridClassName}>
            {fields
              .filter((f) => (f.tab ?? "General") === currentTab)
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
