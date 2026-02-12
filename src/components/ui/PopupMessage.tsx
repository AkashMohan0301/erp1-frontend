"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "error" | "success" | "warning" | "info";

interface PopupMessageProps {
  message?: string;
  variant?: Variant;
  autoClose?: number; // milliseconds
  className?: string;
}

export function PopupMessage({
  message,
  variant = "error",
  autoClose,
  className,
}: PopupMessageProps) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    setVisible(Boolean(message));
  }, [message]);

  useEffect(() => {
    if (!autoClose || !visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose, visible]);

  if (!visible || !message) return null;

  const variantStyles: Record<Variant, string> = {
    error: "border-red-300 bg-red-50 text-red-800",
    success: "border-green-300 bg-green-50 text-green-800",
    warning: "border-yellow-300 bg-yellow-50 text-yellow-800",
    info: "border-blue-300 bg-blue-50 text-blue-800",
  };

  return (
    <Alert
      className={cn(
        "relative flex items-start justify-between",
        variantStyles[variant],
        className
      )}
    >
      <AlertDescription>{message}</AlertDescription>

      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-sm opacity-70 hover:opacity-100"
      >
        <X size={16} />
      </button>
    </Alert>
  );
}
