"use client";

import { useQuery } from "@tanstack/react-query";
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

/* =========================================================
   PROPS
========================================================= */

interface ReusableFormProps<T extends Record<string, any>> {
  fields: FormFieldConfig<T>[];
  values: T;
  onChange: (data: T) => void;
  errors?: Partial<Record<keyof T, string>>;
  className?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

export function ReusableForm<T extends Record<string, any>>({
  fields,
  className,
  values,
  onChange,
  errors,
}: ReusableFormProps<T>) {
  function updateField<K extends keyof T>(name: K, value: T[K]) {
    onChange({ ...values, [name]: value });
  }

  return (
    <div className={className}>
      {fields.map((field) => {
        if (field.ui?.hidden) return null;

        const hasError = Boolean(errors?.[field.name]);

        const inputClass = clsx(
          FORM_DEFAULT_CSS.inputClass,
          hasError && FORM_DEFAULT_CSS.errorInputClass,
          field.ui?.inputClass
        );

        return (
          <div
            key={String(field.name)}
            className={clsx(
              FORM_DEFAULT_CSS.wrapperClass,
              field.ui?.wrapperClass
            )}
          >
            <Label
              className={clsx(
                FORM_DEFAULT_CSS.labelClass,
                field.ui?.labelClass
              )}
            >
              {field.label}
            </Label>

            {renderField<T>(
              field,
              values,
              values[field.name],
              inputClass,
              updateField
            )}

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

/* =========================================================
   FIELD RENDERER
========================================================= */

function renderField<T extends Record<string, any>>(
  field: FormFieldConfig<T>,
  values: T,
  value: any,
  inputClass: string,
  onChange: <K extends keyof T>(name: K, value: T[K]) => void
) {
  switch (field.type) {
    case "text":
    case "number":
      return (
        <Input
          type={field.type}
          value={value ?? ""}
          className={inputClass}
          placeholder={field.placeholder}
          disabled={field.ui?.disabled}
          readOnly={field.ui?.readOnly}
          onChange={(e) =>
            onChange(field.name, e.target.value as any)
          }
        />
      );

    case "textarea":
      return (
        <Textarea
          value={value ?? ""}
          className={inputClass}
          placeholder={field.placeholder}
          disabled={field.ui?.disabled}
          readOnly={field.ui?.readOnly}
          onChange={(e) =>
            onChange(field.name, e.target.value as any)
          }
        />
      );

    case "select":
      return renderSelectField<T>(
        field,
        values,
        value,
        inputClass,
        onChange
      );

    default:
      return null;
  }
}

/* =========================================================
   SELECT FIELD (STATIC + DYNAMIC SUPPORT)
========================================================= */

function renderSelectField<T extends Record<string, any>>(
  field: FormFieldConfig<T>,
  values: T,
  value: any,
  inputClass: string,
  onChange: <K extends keyof T>(name: K, value: T[K]) => void
) {
  const hasDynamic = Boolean(field.dataSource);

  let options = field.options ?? [];
  let disabled = field.ui?.disabled ?? false;

  if (hasDynamic) {
    const { endpoint, dependsOn } = field.dataSource!;

    const isReady =
      !dependsOn ||
      dependsOn.every((dep) => values[dep]);

    const finalEndpoint = buildEndpoint(
      endpoint,
      dependsOn,
      values
    );

    const { data, isLoading } = useQuery({
      queryKey: [finalEndpoint],
      queryFn: async () => {
        const res = await fetch(finalEndpoint);
        if (!res.ok) throw new Error("Failed to load options");
        return res.json();
      },
      enabled: isReady,
    });

    options = data ?? [];
    disabled = disabled || !isReady || isLoading;
  }

  return (
    <Select
      value={value ?? ""}
      disabled={disabled}
      onValueChange={(v) =>
        onChange(field.name, v as any)
      }
    >
      <SelectTrigger className={inputClass}>
        <SelectValue placeholder={field.placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt: any) => (
          <SelectItem
            key={opt.value ?? opt.id}
            value={String(opt.value ?? opt.id)}
          >
            {opt.label ?? opt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* =========================================================
   HELPER
========================================================= */

function buildEndpoint(
  base: string,
  dependsOn: string[] | undefined,
  values: Record<string, any>
) {
  if (!dependsOn || dependsOn.length === 0) return base;

  const params = dependsOn
    .map((key) => `${key}=${values[key]}`)
    .join("&");

  return `${base}?${params}`;
}
