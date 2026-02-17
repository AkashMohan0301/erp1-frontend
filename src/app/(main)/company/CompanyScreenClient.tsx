"use client";

import { useState } from "react";
import { ButtonContainer } from "@/components/buttonContainer/ButtonContainer";
import { FormBuilder } from "@/features/forms/FormBuilder";
import type { FormFieldConfig, FormMode } from "@/features/forms/formTypes";
import { api } from "@/lib/api";
import { companySearchConfig } from "./companySearchConfig";

interface CompanyDto {
  companyId?: number;
  companyName: string;
  address: string;
  city: string;
  stateCode: string;
  countryCode: string;
  customerShortName: string;
  contactNo?: string;
  emailId?: string;
  status: string;
}

export default function CompanyMaster() {
  const [mode, setMode] = useState<FormMode>("CREATE");

  const [values, setValues] = useState<CompanyDto>({
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

  async function loadCompany(id: number) {
    const res = await api.get(`/company/${id}`);
    setValues(res.data.data);
    setMode("VIEW");
  }

  async function handleSave(val: CompanyDto) {
    const res = await api.post("/company", val);
    setValues(res.data.data);
    setMode("VIEW");
  }

  const fields: FormFieldConfig<CompanyDto>[] = [
    {
      name: "companyId",
      label: "Search Company",
      type: "lookup",
      colSpan: 6,
      editableOnEdit: false,
      hideOnView: mode === "VIEW",
      lookupConfig: companySearchConfig,
    },
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      required: true,
      colSpan: 6,
    },
    {
      name: "customerShortName",
      label: "Short Name",
      type: "text",
      required: true,
      colSpan: 6,
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      required: true,
      colSpan: 12,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      required: true,
      colSpan: 6,
    },
    {
      name: "stateCode",
      label: "State",
      type: "select",
      required: true,
      colSpan: 3,
      options: [
        { label: "Tamil Nadu", value: "TN" },
        { label: "Karnataka", value: "KA" },
      ],
    },
    {
      name: "countryCode",
      label: "Country",
      type: "select",
      required: true,
      colSpan: 3,
      options: [{ label: "India", value: "IN" }],
    },
    {
      name: "contactNo",
      label: "Contact No",
      type: "text",
      colSpan: 6,
    },
    {
      name: "emailId",
      label: "Email",
      type: "text",
      colSpan: 6,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      colSpan: 3,
      options: [
        { label: "Active", value: "A" },
        { label: "Inactive", value: "I" },
      ],
    },
  ];

  return (
    <div className="p-6">
      <ButtonContainer
        menuId={2}
        onAction={(action) => {
          if (action === "NEW") {
            setMode("CREATE");
            setValues({
              companyName      : "",
              address          : "",
              city             : "",
              stateCode        : "",
              countryCode      : "IN",
              customerShortName: "",
              contactNo        : "",
              emailId          : "",
              status           : "A",
            });
          }

          if (action === "EDIT") {
            setMode("EDIT");
          }

          if (action === "SAVE") {
            handleSave(values);
          }
          
        }}
      >
        <FormBuilder
          mode={mode}
          fields={fields}
          initialValues={values}
          onSubmit={handleSave}
          formClassName="bg-background p-6 border border-border rounded-xl shadow-sm"
          gridClassName="grid grid-cols-2 gap-4"
        />
      </ButtonContainer>
    </div>
  );
}
