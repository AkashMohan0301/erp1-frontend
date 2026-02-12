"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { api } from "@/lib/api";
import type { LookupConfig, LookupField } from "./filtertype";

interface Props<T> {
  open: boolean;
  onClose: () => void;
  config: LookupConfig<T>;
  onSelect: (row: T) => void;
}

export function LookupDialog<T extends Record<string, any>>({
  open,
  onClose,
  config,
  onSelect,
}: Props<T>) {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [page, setPage] = useState(1);

  // =============================
  // Fetch (Simple & Clean)
  // =============================
  const { data, isLoading } = useQuery({
    queryKey: ["lookup", config.endpoint, filters, page],
    queryFn: async () => {
      const params: Record<string, any> = {
        Page: page,
        PageSize: 10,
      };

      // camelCase → PascalCase
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          const backendKey =
            key.charAt(0).toUpperCase() + key.slice(1);
          params[backendKey] = value;
        }
      });

      const res = await api.get(config.endpoint, { params });

      return res.data.data;
    },
    enabled: open,
  });

  const rows = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  // =============================
  // Render Filter Field
  // =============================
  const renderField = (field: LookupField) => {
    const value = filters[field.name];

    switch (field.type) {
      case "number":
        return (
          <Input
            key={field.name}
            type="number"
            placeholder={field.label}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
          />
        );

      case "date":
        return (
          <Popover key={field.name}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                {value
                  ? format(new Date(value), "dd-MM-yyyy")
                  : field.label}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) =>
                  setFilters((prev) => ({
                    ...prev,
                    [field.name]: date?.toISOString(),
                  }))
                }
              />
            </PopoverContent>
          </Popover>
        );

      case "select":
        return (
          <Select
            key={field.name}
            onValueChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                [field.name]: val,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            key={field.name}
            type="text"
            placeholder={field.label}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
          />
        );
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-4">
          {config.fields.map(renderField)}

          <Button
            onClick={() => setPage(1)}
          >
            Search
          </Button>
        </div>

        {/* Table */}
        <div className="mt-6 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {config.columns.map((col) => (
                  <TableHead key={String(col.accessor)}>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={config.columns.length}>
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={config.columns.length}>
                    No data found
                  </TableCell>
                </TableRow>
              )}

              {rows.map((row: T, idx: number) => (
                <TableRow
                  key={idx}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => {
                    onSelect(row);
                    onClose();
                  }}
                >
                  {config.columns.map((col) => (
                    <TableCell key={String(col.accessor)}>
                      {row[col.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
