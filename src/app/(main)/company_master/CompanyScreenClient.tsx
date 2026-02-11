"use client";

import { useState, useEffect } from "react";
import { ButtonContainer } from "@/components/buttonContainer/ButtonContainer";
import { ReusableForm } from "@/features/forms/ReusableForm";
import { FormFieldConfig } from "@/features/forms/formsType";
import { useCompany, useSaveCompany } from "@/features/company/companyHooks";
import type { CompanyDto } from "@/features/company/companyTypes";

export default function CompanyScreenClient() {
  // ============================
  // STATE (STRICTLY TYPED)
  // ============================
  const [formData, setFormData] = useState<CompanyDto>({
    companyName: "",
    address: "",
    city: "",
    stateCode: "",
    countryCode: "IN",
    customerShortName: "",
    contactNo: "",
    emailId: "",
    status: "A",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<"create" | "view" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const { data } = useCompany(selectedId);
  const saveMutation = useSaveCompany();

  // ============================
  // LOAD DATA INTO FORM
  // ============================
  useEffect(() => {
    if (data && mode === "view") {
      setFormData(data);
    }
  }, [data, mode]);

  // ============================
  // FIELD CONFIG
  // ============================
  const baseFields: FormFieldConfig<CompanyDto>[] = [
    {
      name: "companyId",
      label: "Company ID",
      type: "text",
      editableOnEdit: false,
      ui: { wrapperClass: "col-span-12" },
    },
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      ui: { wrapperClass: "col-span-12" },
    },
    {
      name: "customerShortName",
      label: "Short Name",
      type: "text",
      ui: { wrapperClass: "col-span-12" },
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      ui: { wrapperClass: "col-span-6 " },
    },
    {
      name: "city",
      label: "City",
      type: "text",
      ui: { wrapperClass: "col-span-6" },
    },
    {
      name: "stateCode",
      label: "State",
      type: "select",
      options: [
        { label: "Tamil Nadu", value: "TN" },
        { label: "Karnataka", value: "KA" },
      ],
      ui: { wrapperClass: "col-span-6" },
    },
    {
      name: "countryCode",
      label: "Country",
      type: "select",
      options: [{ label: "India", value: "IN" }],
      ui: { wrapperClass: "col-span-6" },
    },
    {
      name: "contactNo",
      label: "Contact No",
      type: "text",
      ui: { wrapperClass: "col-span-6 " },
    },
    {
      name: "emailId",
      label: "Email",
      type: "text",
      ui: { wrapperClass: "col-span-6" },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "A" },
        { label: "Inactive", value: "I" },
      ],
      ui: { wrapperClass: "col-span-6 " },
    },
  ];

  // ============================
  // LOCKING LOGIC
  // ============================
  const computedFields = baseFields.map((field) => {
    const isView = mode === "view";
    const isEdit = mode === "edit";
    const locked = isEdit && field.editableOnEdit === false;

    return {
      ...field,
      ui: {
        ...field.ui,
        readOnly: isView || locked,
        disabled: isView || locked,
      },
    };
  });

  // ============================
  // ACTIONS
  // ============================
  async function handleSave() {
    setErrors({});

    try {
      const saved = await saveMutation.mutateAsync(formData);
      setFormData(saved);
      setSelectedId(saved.companyId);
      setMode("view");
    } catch (err: any) {
      if (err) {
        setErrors(err);
      }
    }
  }

  function handleCreate() {
    setFormData({
      companyName: "",
      address: "",
      city: "",
      stateCode: "",
      countryCode: "IN",
      customerShortName: "",
      contactNo: "",
      emailId: "",
      status: "A",
    });
    setSelectedId(undefined);
    setMode("create");
  }

  function handleView(id: number) {
    setSelectedId(id);
    setMode("view");
  }

  const actionMap: Record<string, () => void> = {
    NEW: handleCreate,
    VIEW: () => handleView(1),
    EDIT: () => setMode("edit"),
    SAVE: handleSave,
  };

  function handleAction(action: string) {
    actionMap[action]?.();
  }

  // ============================
  // RENDER
  // ============================
  return (
    <div className="p-3">
      <p>{JSON.stringify(errors)}</p>
      <h1 className="text-2xl font-bold ">Company Master</h1>
      <ButtonContainer menuId={2} onAction={handleAction}>
        <ReusableForm<CompanyDto>
          fields={computedFields}
          className="grid grid-cols-12 gap-2 "
          values={formData}
          onChange={setFormData}
          errors={errors}
        />
      </ButtonContainer>
    </div>
  );  
}
