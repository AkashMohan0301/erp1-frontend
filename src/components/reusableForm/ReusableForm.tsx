"use client";

import { useEffect, useMemo, useState } from "react";
import { ResusableButtonBar } from "@/components/reusableButtonBar/ReusableButtonBar";
import { FormField } from "./ReusableFormFields";
import { ReusableFormTabs } from "./ReusableFormTabs";
import { useReusableForm } from "./useReusableForm";
import type { FormProps } from "./reusableFormTypes";
import { usePopup } from "../popupDialog/PopupProvider";
import { redirect } from "next/navigation";
import { Card } from "../ui/card";

import { setFormMode } from "@/store/authContextSlice";
import { useAppDispatch } from "@/store/hooks";

export function ReusableForm<T>({
  fields,
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
  children,
  onReset,
}: FormProps<T> & { onReset?: () => void }) {
  const [mode, setMode] = useState(initialMode);
  const dispatch = useAppDispatch();
  const { show } = usePopup();

  const { values, errors, handleChange, handleSubmit, setValues, reset } =
    useReusableForm<T>({ initialValues, schema, onSubmit });

  /* =================================
     Sync mode to Redux
  ================================= */

  useEffect(() => {
    dispatch(setFormMode(mode));
  }, [mode, dispatch]);

  /* =================================
     Tabs
  ================================= */

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

  /* =================================
     Field Change
  ================================= */

  const handleFieldChange = (name: keyof T, value: any) => {
    handleChange(name, value);
    onValueChange?.(name, value);
  };

  /* =================================
     Hydrate External Data
  ================================= */

  useEffect(() => {
    if (externalData) {
      setValues(externalData as T);
      setErrorTabs([]);
    }
  }, [externalData, setValues]);

  /* =================================
     Button disable logic
  ================================= */

  const computedDisabledActions = useMemo(() => {
    const disabled = new Set(disabledActions);

    if (mode === "VIEW") disabled.add("save");
    if (mode === "EDIT") disabled.add("add");

    return Array.from(disabled);
  }, [mode, disabledActions]);

  const handleReset = () => {
    setErrorTabs([]);
    reset();
    if (tabs.length > 0) {
      setActiveTab(tabs[0]);
    }
  };

  /* =================================
     Actions
  ================================= */

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
        handleReset();
        onReset?.();
        setMode("ADD");
        setErrorTabs([]);
        break;

      case "view":
        setValues(initialValues);
        handleReset();
        onReset?.();
        setMode("VIEW");
        break;

      case "reset":
        handleReset();
        onReset?.();
        setMode("ADD");
        break;

      case "exit":
        redirect("/dashboard");
        break;
    }
  };

  /* =================================
     Render
  ================================= */

  return (
    <div className={formClassName}>
      <ResusableButtonBar
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
          <Card>
            {/* Default Fields */}

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
                      onChange={(val) => handleFieldChange(field.name, val)}
                    />
                  </div>
                ))}
            </div>
            {loadingActions.includes("save") && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white px-6 py-4 rounded shadow">
                  Saving... Please wait
                </div>
              </div>
            )}
            {/* Custom Tab Content */}

            {children?.(currentTab, values, setValues)}
          </Card>
        )}
      </ReusableFormTabs>
    </div>
  );
}
