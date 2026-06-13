export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type QueryParamValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

export interface ApiError {
  code: string;
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface RequestOptions {
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export interface RequestOptionsWithBody<TBody> extends RequestOptions {
  body?: TBody;
}

