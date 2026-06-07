const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function apiClient<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('No se pudo completar la peticion.');
  }

  return response.json() as Promise<T>;
}
