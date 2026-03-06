"use client";

import { ReusableForm } from "@/components/reusableForm/ReusableForm";
import { useMutation } from "@tanstack/react-query";

import { countryFormFields } from "../countryFormFields";
import { countrySchema, CountryFormValues } from "../countrySchema";
import { saveCountry } from "../countryApi";

export default function CountryPage() {
  const mutation = useMutation({
    mutationFn: saveCountry,
  });

  const handleSubmit = async (data: CountryFormValues) => {
    await mutation.mutateAsync(data);
  };

  return (
    <ReusableForm<CountryFormValues>
      fields={countryFormFields}
      schema={countrySchema}
      initialValues={{
        codeValue: "",
        codeDesc: "",
        remarks: "",
      }}
      onSubmit={handleSubmit}
      mode="ADD"
    />
  );
}