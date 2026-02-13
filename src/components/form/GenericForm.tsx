"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./GenericFields";
import type {
  FormFieldConfig,
  FormErrors,
  FormMode,
} from "./GenericFormTypes";

interface Props<T> {
  fields: FormFieldConfig<T>[];
  initialValues: T;
  onSubmit: (values: T) => void;
  mode: FormMode;

  formClassName?: string;
  gridClassName?: string;
}

export function FormBuilder<T>({
  fields,
  initialValues,
  onSubmit,
  mode,
  formClassName,
  gridClassName = "grid grid-cols-1 md:grid-cols-3 gap-6",
}: Props<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);  


  const handleChange = (name: keyof T, value: any) => 
    {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors<T> = {};
    fields.forEach((field) => {
      if (
        field.required &&
        !values[field.name]
      ) {
        newErrors[field.name] =
          `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors)
      .length === 0;
  };

  const handleSubmit = () => {
    if (mode === "VIEW") return;
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <div className={formClassName}>
      <div className={gridClassName}>
        {fields.map((field) => (
          <div
            key={field.name}
            className={`col-span-${
              field.colSpan ?? 1
            }`}
          >
            <FormField
              config={field}
              value={
                (values as any)[
                  field.name
                ]
              }
              formValues={values}
              error={errors[field.name]}
              mode={mode}
              onChange={(val) =>
                handleChange(
                  field.name,
                  val
                )
              }
            />
          </div>
        ))}
      </div>

      {mode !== "VIEW" && (
        <div className="mt-6">
          <Button
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
