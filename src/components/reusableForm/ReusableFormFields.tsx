"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { LookupDialog } from "@/components/filter/GenericFilter";
import { api } from "@/lib/api";

import type { FormFieldConfig, FormMode } from "./reusableFormTypes";

interface Props<T> {
  config: FormFieldConfig<T>;
  value: any;
  error?: string;
  formValues: T;
  mode: FormMode;
  onChange: (value: any) => void;
}

export function FormField<T>({
  config,
  value,
  error,
  formValues,
  mode,
  onChange,
}: Props<T>) {
  const [lookupOpen, setLookupOpen] = useState(false);

  const parentValue = config.dependsOn
    ? (formValues as any)[config.dependsOn]
    : null;

  // ===============================
  // Dynamic Select (A → B → C)
  // ===============================
  const { data: dynamicOptions = [] } = useQuery({
    queryKey: ["dynamic", config.endpoint, parentValue],
    queryFn: async () => {
      if (!config.endpoint) return [];
      const res = await api.get(config.endpoint, {
        params: parentValue ? { parentId: parentValue } : {},
      });
      return res.data.data;
    },
    enabled:
      config.type === "dynamic-select" && (!config.dependsOn || !!parentValue),
  });

  // Reset child when parent changes
  useEffect(() => {
    if (config.dependsOn) {
      onChange(null);
    }
  }, [parentValue]);

  // Hide entire field
  if (config.hideInModes?.includes(mode)) {
    return null;
  }

  // Disable field
  const isDisabled = config.disableInModes?.includes(mode) ?? false;

  // ===============================
  // Render
  // ===============================
  const renderInput = () => {
    switch (config.type) {
      case "text":
        return (
          <Input
            value={value ?? ""}
            disabled={isDisabled}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={value ?? ""}
            disabled={isDisabled}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value ?? ""}
            disabled={isDisabled}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" disabled={isDisabled}>
                {value ? format(new Date(value), "dd-MM-yyyy") : "Select date"}
                <CalendarIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => onChange(date?.toISOString())}
              />
            </PopoverContent>
          </Popover>
        );

      case "select":
        return (
          <Select
            value={value ?? ""}
            disabled={isDisabled}
            onValueChange={onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {config.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "dynamic-select":
        return (
          <Select
            value={value ?? ""}
            disabled={isDisabled || (config.dependsOn && !parentValue)}
            onValueChange={onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {dynamicOptions.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "lookup":
        return (
          <>
            <div className="flex gap-2">
              <Input
                value={value ?? ""}
                disabled={isDisabled}
                onChange={(e) => onChange(Number(e.target.value))}
                onBlur={() => {
                  if (value) onChange(Number(value));
                }}
              />
              {!config.hideFilterInModes?.includes(mode) && !isDisabled && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLookupOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {!config.hideFilterInModes?.includes(mode) && !isDisabled && (
              <LookupDialog
                open={lookupOpen}
                onClose={() => setLookupOpen(false)}
                config={config.lookupConfig}
                onSelect={(row: any) => {
                  const id = row[config.lookupConfig.idField];

                  onChange(id); // store only id in form state
                }}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-1 ${config.className ?? ""}`}>
      <Label>
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {renderInput()}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
