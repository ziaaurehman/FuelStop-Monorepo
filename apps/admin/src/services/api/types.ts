/**
 * Common types and interfaces for API services
 */

/**
 * HTTP Methods supported by the API service
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Request configuration options
 */
export interface RequestConfig {
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to retry on failure */
  retry?: boolean;
  /** Number of retry attempts */
  retryAttempts?: number;
  /** Retry delay in milliseconds */
  retryDelay?: number;
  /** Request signal for cancellation */
  signal?: AbortSignal;
  /** Custom query parameters */
  params?: Record<string, string | number | boolean | null | undefined>;
  /** Whether to include credentials */
  withCredentials?: boolean;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  /** Response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** Response headers */
  headers: Headers;
  /** Response status text */
  statusText: string;
}

/**
 * API Error structure
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** HTTP status code */
  status?: number;
  /** HTTP status text */
  statusText?: string;
  /** Error code */
  code?: string;
  /** Additional error details */
  details?: unknown;
  /** Original error object */
  originalError?: Error;
}

/**
 * Request interceptor function type
 */
export type RequestInterceptor = (
  url: string,
  config: RequestConfig
) =>
  | Promise<{ url: string; config: RequestConfig }>
  | { url: string; config: RequestConfig };

/**
 * Response interceptor function type
 */
export type ResponseInterceptor = <T>(
  response: Response,
  data: T
) => Promise<T> | T;

/**
 * Error interceptor function type
 */
export type ErrorInterceptor = (
  error: ApiError
) => Promise<ApiError> | ApiError;

/**
 * GraphQL Query/Mutation options
 */
export interface GraphQLRequestOptions {
  /** GraphQL query or mutation string */
  query: string;
  /** GraphQL variables */
  variables?: Record<string, unknown>;
  /** Request operation name */
  operationName?: string;
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout */
  timeout?: number;
  /** Request signal for cancellation */
  signal?: AbortSignal;
}

/**
 * GraphQL Response structure
 */
export interface GraphQLResponse<T = unknown> {
  /** Response data */
  data?: T;
  /** GraphQL errors */
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
    extensions?: Record<string, unknown>;
  }>;
  /** Response extensions */
  extensions?: Record<string, unknown>;
}

/**
 * Base service configuration
 */
export interface BaseServiceConfig {
  /** Base URL for API requests */
  baseURL?: string;
  /** Default request timeout */
  defaultTimeout?: number;
  /** Default headers */
  defaultHeaders?: Record<string, string>;
  /** Request interceptors */
  requestInterceptors?: RequestInterceptor[];
  /** Response interceptors */
  responseInterceptors?: ResponseInterceptor[];
  /** Error interceptors */
  errorInterceptors?: ErrorInterceptor[];
  /** Enable request logging */
  enableLogging?: boolean;
}
