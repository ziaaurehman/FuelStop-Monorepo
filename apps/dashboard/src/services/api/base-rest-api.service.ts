import type {
  ApiError,
  ApiResponse,
  BaseServiceConfig,
  HttpMethod,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
} from "./types";

export class BaseRestApiService {
  protected baseURL: string;
  protected defaultTimeout: number;
  protected defaultHeaders: Record<string, string>;
  protected requestInterceptors: RequestInterceptor[];
  protected responseInterceptors: ResponseInterceptor[];
  protected errorInterceptors: ErrorInterceptor[];
  protected enableLogging: boolean;

  constructor(config: BaseServiceConfig = {}) {
    this.baseURL = config.baseURL || "";
    this.defaultTimeout = config.defaultTimeout || 30000; // 30 seconds
    this.defaultHeaders = config.defaultHeaders || {
      "Content-Type": "application/json",
    };
    this.requestInterceptors = config.requestInterceptors || [];
    this.responseInterceptors = config.responseInterceptors || [];
    this.errorInterceptors = config.errorInterceptors || [];
    this.enableLogging = config.enableLogging ?? false;
  }

  /**
   * Add a request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add a response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Add an error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  /**
   * Remove authentication token
   */
  removeAuthToken(): void {
    delete this.defaultHeaders.Authorization;
  }

  /**
   * Build full URL with query parameters
   */
  protected buildURL(
    endpoint: string,
    params?: RequestConfig["params"]
  ): string {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseURL}${endpoint}`;

    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString
      ? `${url}${url.includes("?") ? "&" : "?"}${queryString}`
      : url;
  }

  /**
   * Apply request interceptors
   */
  protected async applyRequestInterceptors(
    url: string,
    config: RequestConfig
  ): Promise<{ url: string; config: RequestConfig }> {
    let finalUrl = url;
    let finalConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(finalUrl, finalConfig);
      finalUrl = result.url;
      finalConfig = result.config;
    }

    return { url: finalUrl, config: finalConfig };
  }

  /**
   * Apply response interceptors
   */
  protected async applyResponseInterceptors<T>(
    response: Response,
    data: T
  ): Promise<T> {
    let finalData = data;

    for (const interceptor of this.responseInterceptors) {
      finalData = await interceptor(response, finalData);
    }

    return finalData;
  }

  /**
   * Apply error interceptors
   */
  protected async applyErrorInterceptors(error: ApiError): Promise<ApiError> {
    let finalError = error;

    for (const interceptor of this.errorInterceptors) {
      finalError = await interceptor(finalError);
    }

    return finalError;
  }

  /**
   * Create error object from response or error
   */
  protected async createError(
    response: Response | null,
    error?: Error
  ): Promise<ApiError> {
    const apiError: ApiError = {
      message: error?.message || "An unknown error occurred",
      originalError: error,
    };

    if (response) {
      apiError.status = response.status;
      apiError.statusText = response.statusText;

      try {
        const errorData = await response.json().catch(() => ({}));
        apiError.message =
          errorData.message || response.statusText || apiError.message;
        apiError.code = errorData.code;
        apiError.details = errorData;
      } catch {
        // If JSON parsing fails, use status text
        apiError.message = response.statusText || apiError.message;
      }
    }

    return this.applyErrorInterceptors(apiError);
  }

  /**
   * Log request (if logging is enabled)
   */
  protected logRequest(
    method: HttpMethod,
    url: string,
    config: RequestConfig
  ): void {
    if (this.enableLogging) {
      console.log(`[API Request] ${method} ${url}`, {
        headers: config.headers,
        timeout: config.timeout,
      });
    }
  }

  /**
   * Log response (if logging is enabled)
   */
  protected logResponse(url: string, status: number, data: unknown): void {
    if (this.enableLogging) {
      console.log(`[API Response] ${url}`, { status, data });
    }
  }

  /**
   * Log error (if logging is enabled)
   */
  protected logError(url: string, error: ApiError): void {
    if (this.enableLogging) {
      console.error(`[API Error] ${url}`, error);
    }
  }

  /**
   * Sleep utility for retry delays
   */
  protected sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Execute request with retry logic
   */
  protected async executeRequest<T>(
    method: HttpMethod,
    endpoint: string,
    config: RequestConfig = {},
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retry = false,
      retryAttempts = 3,
      retryDelay = 1000,
      signal,
      params,
      withCredentials = false,
    } = config;

    const url = this.buildURL(endpoint, params);
    const headers = {
      ...this.defaultHeaders,
      ...config.headers,
    };

    // Remove Content-Type for FormData
    if (body instanceof FormData) {
      delete headers["Content-Type"];
    }

    let lastError: ApiError | null = null;
    let attempts = 0;
    const maxAttempts = retry ? retryAttempts : 1;

    while (attempts < maxAttempts) {
      let timeoutId: NodeJS.Timeout | null = null;
      try {
        // Apply request interceptors
        const { url: finalUrl, config: finalConfig } =
          await this.applyRequestInterceptors(url, { ...config, headers });

        this.logRequest(method, finalUrl, finalConfig);

        // Create abort controller for timeout
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), timeout);

        // Combine signals if both provided
        const abortSignal = signal
          ? AbortSignal.any([signal, controller.signal])
          : controller.signal;

        // Build request options
        const requestOptions: RequestInit = {
          method,
          headers: finalConfig.headers,
          signal: abortSignal,
          credentials: withCredentials ? "include" : "same-origin",
        };

        // Add body for non-GET requests
        if (body !== undefined && method !== "GET") {
          if (body instanceof FormData) {
            requestOptions.body = body;
          } else {
            requestOptions.body = JSON.stringify(body);
          }
        }

        // Make the request
        const response = await fetch(finalUrl, requestOptions);
        clearTimeout(timeoutId);

        // Handle non-OK responses
        if (!response.ok) {
          const error = await this.createError(response);
          this.logError(finalUrl, error);

          // Retry on 5xx errors if retry is enabled
          if (retry && response.status >= 500 && attempts < maxAttempts - 1) {
            attempts++;
            await this.sleep(retryDelay * attempts); // Exponential backoff
            continue;
          }

          throw error;
        }

        // Parse response
        const contentType = response.headers.get("content-type");
        let data: T;

        if (contentType?.includes("application/json")) {
          data = await response.json();
        } else if (contentType?.includes("text/")) {
          data = (await response.text()) as unknown as T;
        } else {
          data = (await response.blob()) as unknown as T;
        }

        // Apply response interceptors
        const finalData = await this.applyResponseInterceptors(response, data);

        this.logResponse(finalUrl, response.status, finalData);

        return {
          data: finalData,
          status: response.status,
          headers: response.headers,
          statusText: response.statusText,
        };
      } catch (error) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        if (error instanceof Error && error.name === "AbortError") {
          lastError = await this.createError(
            null,
            new Error("Request timeout")
          );
        } else if (error instanceof Error && "status" in error) {
          lastError = error as ApiError;
        } else {
          lastError = await this.createError(null, error as Error);
        }

        this.logError(url, lastError);

        // Retry on network errors if retry is enabled
        if (retry && attempts < maxAttempts - 1) {
          attempts++;
          await this.sleep(retryDelay * attempts);
          continue;
        }

        throw lastError;
      }
    }

    throw (
      lastError || (await this.createError(null, new Error("Request failed")))
    );
  }

  /**
   * GET request
   */
  async get<T = unknown>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>("GET", endpoint, config);
  }

  /**
   * POST request
   */
  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>("POST", endpoint, config, body);
  }

  /**
   * PUT request
   */
  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>("PUT", endpoint, config, body);
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>("PATCH", endpoint, config, body);
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>("DELETE", endpoint, config);
  }
}

