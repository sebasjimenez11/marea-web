import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApiResponse } from '@/app/api';

type ApiMutationFn<TData, TVariables> = (
  variables: TVariables,
  signal?: AbortSignal,
) => Promise<ApiResponse<TData>>;

export interface UseApiMutationOptions<TData, TVariables> {
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (data: TData | null, error: Error | null, variables: TVariables) => void;
  onSuccess?: (data: TData | null, variables: TVariables) => void;
}

export interface UseApiMutationResult<TData, TVariables> {
  data: TData | null;
  error: Error | null;
  isPending: boolean;
  mutate: (variables: TVariables) => Promise<TData | null>;
  reset: () => void;
}

export const useApiMutation = <TData, TVariables = void>(
  mutationFn: ApiMutationFn<TData, TVariables>,
  options: UseApiMutationOptions<TData, TVariables> = {},
): UseApiMutationResult<TData, TVariables> => {
  const { onError, onSettled, onSuccess } = options;
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsPending(false);
  }, []);

  const mutate = useCallback(
    async (variables: TVariables) => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setIsPending(true);
      setError(null);

      let nextData: TData | null = null;
      let nextError: Error | null = null;

      try {
        const response = await mutationFn(variables, controller.signal);

        if (response.success) {
          nextData = response.data ?? null;
          setData(nextData);
          onSuccess?.(nextData, variables);
          return nextData;
        }

        if (response.error?.code === 'ABORTED') {
          return null;
        }

        nextError = new Error(response.error?.message || 'Error desconocido');
        setError(nextError);
        onError?.(nextError, variables);
        return null;
      } catch (err) {
        nextError = err instanceof Error ? err : new Error('Error desconocido');
        setError(nextError);
        onError?.(nextError, variables);
        return null;
      } finally {
        setIsPending(false);
        onSettled?.(nextData, nextError, variables);
      }
    },
    [mutationFn, onError, onSettled, onSuccess],
  );

  useEffect(() => () => {
    controllerRef.current?.abort();
  }, []);

  return {
    data,
    error,
    isPending,
    mutate,
    reset,
  };
};
