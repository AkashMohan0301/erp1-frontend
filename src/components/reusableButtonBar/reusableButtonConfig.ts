import type { LucideIcon } from "lucide-react";
import { Eye, Save, Pencil, Trash2, Plus, PrinterIcon, RecycleIcon, LucideLogOut, LucideArmchair, LucideListRestart, Divide } from "lucide-react";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export interface ReusableButtonConfig {
  label: string;
  action: string;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  order: number;
  accessKey?: string; // 🔥 Keyboard shortcut (Alt + key)
}

export const programButtonMap: Record<string, ReusableButtonConfig> = {
  ADD: {
    label: "Add",
    action: "add",
    icon: Plus,
    variant: "default",
    order: 1,
    accessKey: "a", // Alt + A
  },

  EDIT: {
    label: "Edit",
    action: "edit",
    icon: Pencil,
    variant: "default",
    order: 2,
    accessKey: "e", // Alt + E
  },

  VIEW: {
    label: "View",
    action: "view",
    icon: Eye,
    variant: "default",
    order: 3,
    accessKey: "v", // Alt + V
  },

  SAVE: {
    label: "Save",
    action: "save",
    icon: Save,
    variant: "default",
    type: "submit",
    order: 4,
    accessKey: "s", // Alt + S
  },
  PRINT: {
    label: "Print",
    action: "print",
    icon: PrinterIcon,
    variant: "default",
    type: "submit",
    order: 5,
    accessKey: "p", // Alt + P  
  },
    RESET: {
    label: "Reset",
    action: "reset",
    icon: LucideListRestart,
    variant: "default",
    type: "submit",
    order: 6,
    accessKey: "r", // Alt + R
  },
      EXIT: {
    label: "Exit",
    action: "exit",
    icon: LucideLogOut,
    variant: "default",
    type: "submit",
    order: 7,
    accessKey: "e", // Alt + E
  },
  DELETE: {
    label: "Delete",
    action: "delete",
    icon: Trash2,
    variant: "destructive",
    order: 8,
    accessKey: "d", // Alt + D
  },
};
