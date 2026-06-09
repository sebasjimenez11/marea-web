import { useEffect, useState } from 'react';

interface ApiLikeResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}

export interface UseAsyncResourceResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export const useAsyncResource = <T,>(
  fetcher: () => Promise<ApiLikeResponse<T>>,
): UseAsyncResourceResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetcher();

        if (!isMounted) {
          return;
        }

        if (response.success && response.data) {
          setData(response.data);
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
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  return { data, isLoading, error };
};
