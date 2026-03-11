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
import { COL_SPANS, ROW_SPANS } from "./gridSpanHelpers";
import { setFormMode } from "@/store/authContextSlice";
import { useAppDispatch } from "@/store/hooks";

export function ReusableForm<T>({
  fields,
  initialValues,
  schema,
  onSubmit,
  mode: initialMode,
  formClassName,
  gridClassName = "grid grid-cols-1 md:grid-cols-12 gap-3 auto-rows-[minmax(60px,auto)]",
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

  /* Sync mode */
  useEffect(() => {
    dispatch(setFormMode(mode));
  }, [mode, dispatch]);

  /* Tabs */
  const tabs = useMemo(() => {
    const unique = new Set<string>();
    fields.forEach((f) => unique.add(f.tab ?? "General"));
    return Array.from(unique);
  }, [fields]);

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [errorTabs, setErrorTabs] = useState<string[]>([]);

  useEffect(() => {
    if (tabs.length) setActiveTab(tabs[0]);
  }, [tabs]);

  /* Field change */
  const handleFieldChange = (name: keyof T, value: any) => {
    handleChange(name, value);
    onValueChange?.(name, value);
  };

  /* Hydrate EDIT data */
  useEffect(() => {
    if (externalData) {
      setValues(externalData as T);
      setErrorTabs([]);
    }
  }, [externalData, setValues]);

  /* Disabled buttons */
  const computedDisabledActions = useMemo(() => {
    const disabled = new Set(disabledActions);
    if (mode === "VIEW") disabled.add("save");
    if (mode === "EDIT") disabled.add("add");
    return Array.from(disabled);
  }, [mode, disabledActions]);

  /* Common UI reset */
  const resetUI = () => {
    setErrorTabs([]);
    if (tabs.length) setActiveTab(tabs[0]);
  };

  /* Actions */
  const handleAction = async (action: string) => {
    switch (action) {
      case "save": {
        if (mode === "VIEW") return;

        const result = await handleSubmit();

        if (!result.hasError) {
          show({
            type: "success",
            title: "Success",
            message: result?.message ?? "Data saved successfully",
          });

          reset();     // form state
          resetUI();   // tab state
          setMode("ADD");
        } else {
          if (result.fieldErrors) {
            const errorKeys = Object.keys(result.fieldErrors);
            const tabsWithErrors = fields
              .filter((f) => errorKeys.includes(f.name))
              .map((f) => f.tab ?? "General");

            if (tabsWithErrors.length) {
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
        reset();
        resetUI();
        onReset?.();
        setMode("ADD");
        break;

      case "view":
        reset();
        resetUI();
        onReset?.();
        setMode("VIEW");
        break;

      case "reset":
        reset();
        resetUI();
        onReset?.();
        break;

      case "exit":
        redirect("/dashboard");
        break;
    }
  };

  /* Render */
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
            <div className={gridClassName}>
              {fields
                .filter((f) => {
                  const tabMatch = (f.tab ?? "General") === currentTab;
                  const hidden = f.hideInModes?.includes(mode);
                  return tabMatch && !hidden;
                })
                .map((field) => (
                  <div
                    key={field.name}
                    className={`min-w-0 w-full
                      ${COL_SPANS[(field.colSpan ?? 12) as keyof typeof COL_SPANS]}
                      ${ROW_SPANS[(field.rowSpan ?? 1) as keyof typeof ROW_SPANS]}
                    `}
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

            {children?.(currentTab, values, setValues)}
          </Card>
        )}
      </ReusableFormTabs>
    </div>
  );
}