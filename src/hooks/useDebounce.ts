/**
 * Debounce hook for optimizing search and input handling
 * Delays execution until after a specified delay period
 */

import { useState, useEffect } from 'react';
import { UI_CONFIG } from '@/lib/constants';

export function useDebounce<T>(
  value: T,
  delay: number = UI_CONFIG.debounceDelay
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounced callback hook
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = UI_CONFIG.debounceDelay
): T {
  const [debouncedCallback, setDebouncedCallback] = useState<T | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  return (debouncedCallback || callback) as T;
}