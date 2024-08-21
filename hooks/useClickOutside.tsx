import { RefObject, useEffect } from "react";

/**
 * Handles a callback when clicking outside the ref
 *
 * Ex:
 * `const ref = useRef<HTMLDivElement>(null);`
 *
 * `useClickOutside(ref, () => {
 *    console.log("clicked outside");
 * });`
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback]);
};
