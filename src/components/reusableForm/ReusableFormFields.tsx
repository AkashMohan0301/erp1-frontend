"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, FunnelPlus, Search, TextSearch } from "lucide-react";

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

import { LookupDialog } from "@/components/reusableFilter/ReusableFilter";
import { api } from "@/lib/api";

import type { FormFieldConfig } from "./reusableFormTypes";

import { useAppSelector } from "@/store/hooks";
import { selectFormMode } from "@/store/authContextSlice";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props<T> {
  config: FormFieldConfig<T>;
  value: any;
  error?: string;
  formValues: T;
  onChange: (value: any) => void;
}

export function FormField<T>({
  config,
  value,
  error,
  formValues,
  onChange,
}: Props<T>) {
  const mode = useAppSelector(selectFormMode);

  const [lookupOpen, setLookupOpen] = useState(false);

  const parentValue = config.dependsOn
    ? (formValues as any)[config.dependsOn]
    : null;

  /* ========================================
     Dynamic Select Query
  ======================================== */

  const { data: dynamicOptions = [] } = useQuery({
    queryKey: ["dynamic", config.endpoint, parentValue],
    queryFn: async () => {
      if (!config.endpoint) return [];

      const res = await api.get(config.endpoint, {
        params: parentValue
          ? {
              parentCodeId: config.parentCodeId,
              parentCodeValue: parentValue,
            }
          : {},
      });

      return res.data.data;
    },
    enabled:
      config.type === "dynamic-select" && (!config.dependsOn || !!parentValue),
  });

  /* ========================================
     Reset child when parent changes
  ======================================== */

  const [previousParent, setPreviousParent] = useState(parentValue);

  useEffect(() => {
    if (!config.dependsOn) return;

    if (previousParent !== parentValue) {
      onChange(null);
    }

    setPreviousParent(parentValue);
  }, [parentValue]);

  /* ========================================
     Hide field completely
  ======================================== */

  if (config.hideInModes?.includes(mode)) {
    return null;
  }

  /* ========================================
     Disabled logic
  ======================================== */

  const isDisabled = config.disableInModes?.includes(mode) ?? false;

  /* ========================================
     Render Input
  ======================================== */

  const renderInput = () => {
    switch (config.type) {
      case "text":
        return (
          <Input
            value={value ?? ""}
            disabled={isDisabled}
            className={config.uppercase ? "uppercase" : ""}
            onChange={(e) => {
              let val = e.target.value;
              if (config.uppercase) val = val.toUpperCase();
              onChange(val);
            }}
          />
        );
      case "password":
        return (
          <Input
            type="password"
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
              <Button
                variant="outline"
                disabled={isDisabled}
                className="w-full justify-start"
              >
                {value ? format(new Date(value), "dd-MM-yyyy") : "Select date"}

                <CalendarIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                disabled={isDisabled}
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
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent className="w-full min-w-0">
              {config.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "dynamic-select":
        if (config.dependsOn && !parentValue) {
          return (
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select parent first" />
              </SelectTrigger>
            </Select>
          );
        }

        return (
          <Select
            key={`${config.name}-${parentValue}`}
            value={value ?? ""}
            disabled={isDisabled}
            onValueChange={onChange}
          >
            <SelectTrigger className="w-full min-w-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent className="w-full">
              {dynamicOptions.map((opt: any) => (
                <SelectItem key={opt.codeValue} value={opt.codeValue}>
                  {opt.codeDesc}
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
                type={config.inputType ?? "number"} // ✅ only used here
                value={value ?? ""}
                disabled={isDisabled}
                onChange={(e) => {
                  const val = e.target.value.trim();

                  if (val === "") {
                    onChange(null);
                    return;
                  }

                  if (config.inputType === "number") {
                    const num = Number(val);
                    if (isNaN(num)) return;
                    onChange(num);
                  } else {
                    onChange(val);
                  }
                }}
                onKeyDown={(e) => {
                  if (config.inputType === "number") {
                    if (
                      !/[0-9]/.test(e.key) &&
                      ![
                        "Backspace",
                        "Delete",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }
                }}
              />

              {!config.hideFilterInModes?.includes(mode) && !isDisabled && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLookupOpen(true)}
                    >
                      <TextSearch className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Advanced Search</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {!config.hideFilterInModes?.includes(mode) && !isDisabled && (
              <LookupDialog
                open={lookupOpen}
                onClose={() => setLookupOpen(false)}
                config={config.lookupConfig}
                onSelect={(row: any) => {
                  const id = row[config.lookupConfig.idField];

                  onChange(id);
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
    <div className={`space-y-1 w-full min-w-0 ${config.className ?? ""}`}>
      <Label>
        {config.label}

        {config.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {renderInput()}

      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <p className="text-sm text-muted-foreground">{config.fieldmessage}</p>
      )}
    </div>
  );
}
