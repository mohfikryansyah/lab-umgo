// hooks/useDebounce.ts
import { useCallback, useRef } from 'react';

/**
 * Returns a debounced version of the provided callback.
 * The callback is only invoked after `delay` ms of inactivity.
 */
export function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}