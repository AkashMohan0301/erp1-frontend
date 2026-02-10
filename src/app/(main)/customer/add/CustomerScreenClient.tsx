"use client";

import { useState } from "react";
import { RBACActionContainer } from "@/components/rbac/RBACActionContainer";
import { ReusableForm } from "@/features/forms/ReusableForm";
import { FormFieldConfig } from "@/features/forms/formsType";

export default function CustomerScreenClient() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields: FormFieldConfig[] = [
    {
      name: "customerName",
      label: "Customer Name",
      type: "text",
      ui: {
        wrapperClass: "col-span-6",
      },
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      ui: {
        wrapperClass: "col-span-6",
      },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "A" },
        { label: "Inactive", value: "I" },
      ],
      ui: {
        wrapperClass: "col-span-3",
      },
    },
  ];

  function handleAction(action: string) {
    if (action === "SAVE") {
      handleSave();
    }

    if (action === "DELETE") {
      handleDelete();
    }
  }

  function handleSave() {
    const nextErrors: Record<string, string> = {};

    if (!formData.customerName) {
      nextErrors.customerName = "Customer name is required";
    }

    if (!formData.email) {
      nextErrors.email = "Email is required";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    console.log("SUBMIT TO API:", formData);
  }

  function handleDelete() {
    console.log("DELETE API CALL");
  }

  return (
    <RBACActionContainer
      menuId={1}
      onAction={handleAction}
    >
      <ReusableForm
        fields={fields}
        className="grid grid-cols-12 gap-4"
        onChange={setFormData}
        errors={errors}
      />
    </RBACActionContainer>
  );
}
