"use client";

import { ReusableForm } from "@/components/reusableForm/ReusableForm";
import { companySchema } from "@/features/company/companySchema";
import { companyFormFields } from "@/features/company/companyFormFields";
import {
  useSaveCompany,
} from "@/features/company/companyHooks";
import { companySearchConfig } from "../../../features/company/companySearchConfig";
import type { CompanyFormValues } from "@/features/company/companySchema";

export default function CompanyPage() {
  const saveMutation = useSaveCompany();

  const initialValues: CompanyFormValues = {
    companyName: "",
    address: "",
    city: "",
    stateCode: "",
    countryCode: "IN",
    customerShortName: "",
    contactNo: "",
    emailId: "",
    status: "A",
  };

  return (
    <div className="p-1 ">
    <ReusableForm<CompanyFormValues>
      heading = "Company Master"
      fields={companyFormFields}
      initialValues={initialValues}
      schema={companySchema}
      mode="CREATE"
      formClassName="p-3 bg-background rounded-sm border shadow-sm"
      onSubmit={async (values) => {
        await saveMutation.mutateAsync(values);
      }}
    />
    </div>
  );
}
