"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PopupDialog, PopupType } from "./PopupDialog";

interface PopupState {
  open: boolean;
  type: PopupType;
  title: string;
  message: string;
}

interface PopupContextType {
  show: (config: {
    type: PopupType;
    title: string;
    message: string;
  }) => void;
}

const PopupContext = createContext<PopupContextType | null>(null);

export function PopupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<PopupState>({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = ({
    type,
    title,
    message,
  }: {
    type: PopupType;
    title: string;
    message: string;
  }) => {
    setState({
      open: true,
      type,
      title,
      message,
    });
  };

  const close = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  // 🔥 Auto-close logic
  useEffect(() => {
    if (state.open && state.type === "success") {
      timerRef.current = setTimeout(() => {
        close();
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [state.open, state.type]);

  return (
    <PopupContext.Provider value={{ show }}>
      {children}

      <PopupDialog
        open={state.open}
        type={state.type}
        title={state.title}
        message={state.message}
        onClose={close}
      />
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context)
    throw new Error("usePopup must be used within PopupProvider");

  return context;
}
