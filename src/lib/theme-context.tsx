import {
  createContext,
  useCallback,
  useContext,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Theme / persona context.                                                   */
/*  Two personas: "build" (developer) and "breach" (security).                 */
/*                                                                             */
/*  A provider can be LOCKED to a mode via the `mode` prop — this is what lets  */
/*  the full-page compare render both personas at once (one provider per side).*/
/*  Left unlocked, it manages its own mode and `toggle()` flips it.            */
/*                                                                             */
/*  Breach = the `.dark` CSS scope. The provider applies `.dark` to its own    */
/*  wrapper element, so nested providers can theme independent subtrees.       */
/* -------------------------------------------------------------------------- */
export type Mode = "build" | "breach";

interface ThemeContextValue {
  mode: Mode;
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  /** Lock this subtree to a fixed persona (used by the compare view). */
  mode?: Mode;
  /** Default persona when unlocked. */
  defaultMode?: Mode;
  className?: string;
  style?: CSSProperties;
}

export function ThemeProvider({
  children,
  mode: locked,
  defaultMode = "build",
  className,
  style,
}: ThemeProviderProps) {
  const [internal, setInternal] = useState<Mode>(defaultMode);
  const mode = locked ?? internal;
  const isDark = mode === "breach";

  const toggle = useCallback(() => {
    if (locked) return; // a locked provider never flips
    setInternal((m) => (m === "build" ? "breach" : "build"));
  }, [locked]);

  return (
    <ThemeContext.Provider value={{ mode, isDark, toggle }}>
      <div className={cn(isDark && "dark", className)} style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}