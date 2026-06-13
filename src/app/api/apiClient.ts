import { API_BASE_URL } from './api.config';
import type {
  ApiError,
  ApiResponse,
  HttpMethod,
  QueryParamValue,
  QueryParams,
  RequestOptions,
  RequestOptionsWithBody,
} from './api.types';

const JSON_CONTENT_TYPE = 'application/json';

const isApiResponse = <T,>(value: unknown): value is ApiResponse<T> => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return 'success' in value;
};

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

const appendQueryParam = (params: URLSearchParams, key: string, value: QueryParamValue) => {
  if (value === null || value === undefined || value === '') {
    return;
  }

  params.append(key, String(value));
};

const buildUrl = (path: string, queryParams?: QueryParams) => {
  const url = new URL(`${API_BASE_URL}${normalizePath(path)}`);

  if (!queryParams) {
    return url.toString();
  }

  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => appendQueryParam(url.searchParams, key, item));
      return;
    }

    appendQueryParam(url.searchParams, key, value);
  });

  return url.toString();
};

const createApiError = (message: string, status?: number, code = 'API_ERROR'): ApiError => ({
  code,
  message,
  status,
});

const parseResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  if (!contentType?.includes(JSON_CONTENT_TYPE)) {
    return response.text();
  }

  return response.json();
};

const normalizeErrorResponse = <T,>(body: unknown, response: Response): ApiResponse<T> => {
  if (isApiResponse<T>(body) && body.error) {
    return {
      success: false,
      error: {
        ...body.error,
        status: body.error.status ?? response.status,
      },
    };
  }

  const message = body && typeof body === 'object' && 'message' in body
    ? String(body.message)
    : response.statusText || 'Error de conexion con el servidor';

  return {
    success: false,
    error: createApiError(message, response.status),
  };
};

const request = async <TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  options: RequestOptionsWithBody<TBody> & { queryParams?: QueryParams } = {},
): Promise<ApiResponse<TResponse>> => {
  const { body, headers, queryParams, signal } = options;
  const hasBody = body !== undefined;

  try {
    const response = await fetch(buildUrl(path, queryParams), {
      method,
      headers: {
        Accept: JSON_CONTENT_TYPE,
        ...(hasBody ? { 'Content-Type': JSON_CONTENT_TYPE } : {}),
        ...headers,
      },
      body: hasBody ? JSON.stringify(body) : undefined,
      signal,
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
      return normalizeErrorResponse<TResponse>(responseBody, response);
    }

    if (isApiResponse<TResponse>(responseBody)) {
      return responseBody;
    }

    return {
      success: true,
      data: responseBody as TResponse,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        error: createApiError('Solicitud cancelada', undefined, 'ABORTED'),
      };
    }

    return {
      success: false,
      error: createApiError(
        error instanceof Error ? error.message : 'No se pudo conectar con el servidor',
        undefined,
        'NETWORK_ERROR',
      ),
    };
  }
};

export const api = {
  get: <TResponse>(
    path: string,
    queryParams?: QueryParams,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResponse>> =>
    request<TResponse>('GET', path, { ...options, queryParams }),

  post: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResponse>> =>
    request<TResponse, TBody>('POST', path, { ...options, body }),

  put: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResponse>> =>
    request<TResponse, TBody>('PUT', path, { ...options, body }),

  patch: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResponse>> =>
    request<TResponse, TBody>('PATCH', path, { ...options, body }),

  delete: <TResponse>(
    path: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResponse>> =>
    request<TResponse>('DELETE', path, options),
};

