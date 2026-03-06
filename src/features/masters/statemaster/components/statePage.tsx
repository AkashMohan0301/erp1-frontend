"use client";

import { ReusableForm } from "@/components/reusableForm/ReusableForm";
import { useMutation } from "@tanstack/react-query";

import { stateFormFields } from "../stateFormFields";
import { stateSchema, StateFormValues } from "../stateSchema";
import { saveState } from "../stateApi";

export default function StatePage() {
  const mutation = useMutation({
    mutationFn: saveState,
  });

  const handleSubmit = async (data: StateFormValues) => {
    await mutation.mutateAsync(data);
  };

  return (
    <ReusableForm<StateFormValues>
      fields={stateFormFields}
      schema={stateSchema}
      initialValues={{
        parentCodeValue: "",
        codeValue: "",
        codeDesc: "",
        remarks: "",
      }}
      onSubmit={handleSubmit}
      mode="ADD"
    />
  );
}