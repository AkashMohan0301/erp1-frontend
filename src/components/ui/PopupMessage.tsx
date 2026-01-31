import { useEffect, useState } from "react";

type Props = {
  message?: string;
};

export function FormError({ message }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!message) return;

    setOpen(true); 

    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!open) return null;

  return (
    <div
      className="
        fixed top-4 right-4 z-50
        w-[320px]
        p-4 pr-10
        text-sm rounded-lg border
        text-red-600 bg-red-50 border-red-200
        dark:bg-red-950 dark:border-red-800
        animate-slide-in
      "
    >
      {message}

      {/* Close button */}
      <button
        onClick={() => setOpen(false)}
        className="
          absolute top-2 right-2
          text-red-500 hover:text-red-700
        "
        aria-label="Close error"
      >
        ✕
      </button>
    </div>
  );
}
