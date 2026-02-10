"use client";

import { useState } from "react";
import clsx from "clsx";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FORM_DEFAULT_CSS } from "./formDefaultCss";
import { FormFieldConfig } from "./formsType";

interface ReusableFormProps {
  fields: FormFieldConfig[];
  className?: string;
  onChange?: (data: Record<string, any>) => void;
  errors?: Record<string, string>;
}

export function ReusableForm({
  fields,
  className,
  onChange,
  errors,
}: ReusableFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  function updateField(name: string, value: any) {
    const next = { ...formData, [name]: value };
    setFormData(next);
    onChange?.(next);
  }

  return (
    <div className={className}>
      {fields.map((field) => {
        if (field.ui?.hidden) return null;

        const hasError = Boolean(errors?.[field.name]);

        return (
          <div
            key={field.name}
            className={clsx(
              FORM_DEFAULT_CSS.wrapperClass,
              field.ui?.wrapperClass
            )}
          >
            {/* Label */}
            <Label
              className={clsx(
                FORM_DEFAULT_CSS.labelClass,
                field.ui?.labelClass
              )}
            >
              {field.label}
            </Label>

            {/* Input */}
            {renderField(field, formData[field.name], updateField, hasError)}

            {/* Error message */}
            {hasError && (
              <div
                className={clsx(
                  FORM_DEFAULT_CSS.errorClass,
                  field.ui?.errorClass
                )}
              >
                {errors?.[field.name]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------
   Field Renderer (NO layout or logic assumptions)
-------------------------------------------------------- */

function renderField(
  field: FormFieldConfig,
  value: any,
  onChange: (name: string, value: any) => void,
  hasError: boolean
) {
  const inputClass = clsx(
    FORM_DEFAULT_CSS.inputClass,
    hasError && FORM_DEFAULT_CSS.errorInputClass,
    field.ui?.inputClass
  );

  switch (field.type) {
    case "text":
    case "number":
      return (
        <Input
          type={field.type}
          className={inputClass}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          disabled={field.ui?.disabled}
          readOnly={field.ui?.readOnly}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      );

    case "textarea":
      return (
        <Textarea
          className={inputClass}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          disabled={field.ui?.disabled}
          readOnly={field.ui?.readOnly}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      );

    case "select":
      return (
        <Select
          defaultValue={field.defaultValue}
          disabled={field.ui?.disabled}
          onValueChange={(v) => onChange(field.name, v)}
        >
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>

          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem
                key={opt.value}
                value={String(opt.value)}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    default:
      return null;
  }
}
