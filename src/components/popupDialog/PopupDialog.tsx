"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

export type PopupType = "success" | "error" | "warning" | "info";

interface Props {
  open: boolean;
  type: PopupType;
  title: string;
  message: string;
  onClose: () => void;
}

const typeStyles = {
  success: {
    icon: CheckCircle2,
    color: "text-green-600",
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  info: {
    icon: Info,
    color: "text-blue-600",
  },
};

export function PopupDialog({
  open,
  type,
  title,
  message,
  onClose,
}: Props) {
  const Icon = typeStyles[type].icon;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${typeStyles[type].color}`} />
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>

          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
