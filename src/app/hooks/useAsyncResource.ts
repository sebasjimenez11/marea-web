import { useCallback, useEffect, useState, type DependencyList } from 'react';
import type { ApiResponse } from '@/app/api';

type AsyncResourceFetcher<T> = (signal?: AbortSignal) => Promise<ApiResponse<T>>;

const EMPTY_DEPENDENCIES: DependencyList = [];

export interface UseAsyncResourceOptions<T> {
  dependencies?: DependencyList;
  enabled?: boolean;
  initialData?: T | null;
  keepPreviousData?: boolean;
}

export interface UseAsyncResourceResult<T> {
  data: T | null;
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useAsyncResource = <T,>(
  fetcher: AsyncResourceFetcher<T>,
  options: UseAsyncResourceOptions<T> = {},
): UseAsyncResourceResult<T> => {
  const {
    dependencies = EMPTY_DEPENDENCIES,
    enabled = true,
    initialData = null,
    keepPreviousData = true,
  } = options;
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(enabled && initialData === null);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey(current => current + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let isMounted = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        setIsLoading(current => {
          if (current) {
            return true;
          }

          setIsRefetching(true);
          return false;
        });
        setError(null);

        if (!keepPreviousData) {
          setData(null);
        }

        const response = await fetcher(controller.signal);

        if (!isMounted) {
          return;
        }

        if (response.success) {
          setData(response.data ?? null);
          return;
        }

        if (response.error?.code === 'ABORTED') {
          return;
        }

        setError(new Error(response.error?.message || 'Error desconocido'));
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error desconocido'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsRefetching(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [dependencies, enabled, fetcher, keepPreviousData, reloadKey]);

  return { data, isLoading, isRefetching, error, refetch };
};
