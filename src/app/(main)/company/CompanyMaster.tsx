"use client";

import { ReusableForm } from "@/components/reusableForm/ReusableForm";
import { companySchema } from "@/features/company/companySchema";
import { companyFormFields } from "@/features/company/companyFormFields";
import { useSaveCompany } from "@/features/company/companyHooks";
import type { CompanyFormValues } from "@/features/company/companySchema";

import { useCompany } from "@/features/company/companyHooks";
import { useEffect, useState } from "react";

export default function CompanyMasterPage() {
  const saveMutation = useSaveCompany();

  const [selectedId, setSelectedId] = useState<number | undefined>();

  const { data: companyData } = useCompany(selectedId);

  const initialValues: CompanyFormValues = {
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
    pin: "",
    uniqueId: "",
  };

  return (
    <ReusableForm<CompanyFormValues>
      heading="Company Master"
      fields={companyFormFields}
      initialValues={initialValues}
      schema={companySchema}
      mode="ADD"
      formClassName="p-3 bg-background rounded-sm border shadow-sm"
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
