"use client";

import { ReusableForm } from "@/components/reusableForm/ReusableForm";
import { useMutation } from "@tanstack/react-query";

import { uomFormFields } from "../uomFormFields";
import { uomSchema, UomFormValues } from "../uomSchema";
import { saveUom } from "../uomApi";

export default function UomPage() {
  const mutation = useMutation({
    mutationFn: saveUom,
  });

  const handleSubmit = async (data: UomFormValues) => {
    await mutation.mutateAsync(data);
  };
const loadingActions = mutation.isPending ? ["save"] : [];
  return (
    <ReusableForm<UomFormValues>
      fields={uomFormFields}
      schema={uomSchema}
      initialValues={{
        codeValue: "",
        codeDesc: "",
        remarks: "",
      }}
      onSubmit={handleSubmit}
      mode="ADD"
      loadingActions={loadingActions}
    />
  );
}