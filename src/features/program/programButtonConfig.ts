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
  variant?: ButtonVariant;
  className?: string;
}

export const programButtonMap: Record<string, ProgramButtonConfig> = {
  VIEW: {
    label: "View",
    action: "view",
    variant: "secondary",
    className:"bg-blue-500"
  },
  SAVE: {
    label: "Save",
    action: "save",
    variant: "default",
  },
  EDIT: {
    label: "Edit",
    action: "edit",
    variant: "outline",
  },
  DELETE: {
    label: "Delete",
    action: "delete",
    variant: "destructive",
  },
  NEW: {
    label: "New",
    action: "new",
    variant: "default",
  },

  
};
