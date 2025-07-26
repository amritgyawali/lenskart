/**
 * Async operations hook with loading states and error handling
 * Provides consistent async state management across components
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AppError, handleError, logError } from '@/lib/errors';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

export interface AsyncOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: AppError) => void;
}

export function useAsync<T = any, Args extends any[] = any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: AsyncOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mountedRef = useRef(true);
  const lastCallId = useRef(0);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: Args) => {
      const callId = ++lastCallId.current;

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const data = await asyncFunction(...args);

        // Only update state if this is the most recent call and component is still mounted
        if (callId === lastCallId.current && mountedRef.current) {
          setState({ data, loading: false, error: null });
          onSuccess?.(data);
        }

        return data;
      } catch (error) {
        const appError = handleError(error);
        
        // Log error for monitoring
        logError(appError, { function: asyncFunction.name, args });

        // Only update state if this is the most recent call and component is still mounted
        if (callId === lastCallId.current && mountedRef.current) {
          setState({ data: null, loading: false, error: appError });
          onError?.(appError);
        }

        throw appError;
      }
    },
    [asyncFunction, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Hook for handling multiple async operations
 */
export function useAsyncQueue<T = any>() {
  const [queue, setQueue] = useState<Array<() => Promise<T>>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<T[]>([]);
  const [errors, setErrors] = useState<AppError[]>([]);

  const addToQueue = useCallback((asyncFn: () => Promise<T>) => {
    setQueue(prev => [...prev, asyncFn]);
  }, []);

  const processQueue = useCallback(async () => {
    if (isProcessing || queue.length === 0) return;

    setIsProcessing(true);
    setResults([]);
    setErrors([]);

    for (const asyncFn of queue) {
      try {
        const result = await asyncFn();
        setResults(prev => [...prev, result]);
      } catch (error) {
        const appError = handleError(error);
        setErrors(prev => [...prev, appError]);
        logError(appError);
      }
    }

    setQueue([]);
    setIsProcessing(false);
  }, [queue, isProcessing]);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setResults([]);
    setErrors([]);
  }, []);

  return {
    queue,
    isProcessing,
    results,
    errors,
    addToQueue,
    processQueue,
    clearQueue,
  };
}