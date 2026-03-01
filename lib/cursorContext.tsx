"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export type CursorState =
  | "default"
  | "view"
  | "book"
  | "visit"
  | "drag"
  | "play";

interface CursorContextValue {
  state: CursorState;
  setState: (s: CursorState) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<CursorState>("default");

  const setState = useCallback((s: CursorState) => {
    setStateRaw(s);
  }, []);

  return (
    <CursorContext.Provider value={{ state, setState }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return ctx;
}
