import type { LucideIcon } from "lucide-react";
import { Eye, Save, Pencil, Trash2, Plus } from "lucide-react";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export interface ProgramButtonConfig {
  label: string;
  action: string;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
}

export const programButtonMap: Record<string, ProgramButtonConfig> = {
  VIEW: {
    label: "View",
    action: "view",
    icon: Eye,
    variant: "secondary",
  },
  SAVE: {
    label: "Save",
    action: "save",
    icon: Save,
    variant: "default",
    type: "submit",
  },
  EDIT: {
    label: "Edit",
    action: "edit",
    icon: Pencil,
    variant: "outline",
  },
  DELETE: {
    label: "Delete",
    action: "delete",
    icon: Trash2,
    variant: "destructive",
  },
  NEW: {
    label: "New",
    action: "new",
    icon: Plus,
    variant: "default",
  },
};
