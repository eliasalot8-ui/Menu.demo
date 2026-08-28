import { createContext, useCallback, useContext, useRef, useState } from "react";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [label, setLabel] = useState("");
  const depth = useRef(0);

  const showCursor = useCallback((text) => {
    depth.current += 1;
    setLabel(text);
  }, []);

  const hideCursor = useCallback(() => {
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setLabel("");
  }, []);

  return (
    <CursorContext.Provider value={{ label, showCursor, hideCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}

/** Spread onto any hoverable element to request a cursor label on hover. */
export function useCursorHover(text) {
  const ctx = useCursor();
  if (!ctx) return {};
  return {
    onMouseEnter: () => ctx.showCursor(text),
    onMouseLeave: () => ctx.hideCursor(),
  };
}
