"use client";
import { ReusableForm } from "@/components/reusableForm/ReusableForm";
import { companySchema } from "@/features/masters/companymaster/companySchema";
import { companyFormFields } from "@/features/masters/companymaster/companyFormFields";
import { useSaveCompany, useCompany } from "@/features/masters/companymaster/companyHooks";
import type { CompanySchema } from "@/features/masters/companymaster/companySchema";
import { useState } from "react";

export default function CompanyMasterPage() {
  const saveMutation = useSaveCompany();
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const { data: companyData } = useCompany(selectedId);

  const initialValues: CompanySchema = {
    companyId: undefined,
    companyName: "",
    address: "",
    city: "",
    stateCode: "",
    countryCode: "IN",
    customerShortName: "",
    contactNo: "",
    emailId: "",
    status: "A",
    pin: ""
  };

  return (
    <ReusableForm<CompanySchema>
      heading="Company Master"
      fields={companyFormFields}
      initialValues={initialValues}
      schema={companySchema}
      mode="ADD"
      onSubmit={async (values) => {
        await saveMutation.mutateAsync(values);
      }}
      onValueChange={(field, value) => {
        if (field === "companyId") {
          setSelectedId(value);
        }
      }}
      externalData={companyData}
      loadingActions={saveMutation.isPending ? ["save"] : []}
    />
  );
}