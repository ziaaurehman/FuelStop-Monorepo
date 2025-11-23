import type {
  ApiError,
  BaseServiceConfig,
  GraphQLRequestOptions,
  GraphQLResponse,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
} from "./types";

export class BaseGraphQLApiService {
  protected endpoint: string;
  protected defaultTimeout: number;
  protected defaultHeaders: Record<string, string>;
  protected requestInterceptors: RequestInterceptor[];
  protected responseInterceptors: ResponseInterceptor[];
  protected errorInterceptors: ErrorInterceptor[];
  protected enableLogging: boolean;

  constructor(config: BaseServiceConfig = {}) {
    this.endpoint = config.baseURL || "/graphql";
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
   * Apply request interceptors
   */
  protected async applyRequestInterceptors(
    url: string,
    config: {
      headers: Record<string, string>;
      timeout?: number;
      signal?: AbortSignal;
    }
  ): Promise<{
    url: string;
    config: {
      headers: Record<string, string>;
      timeout?: number;
      signal?: AbortSignal;
    };
  }> {
    let finalUrl = url;
    let finalConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(finalUrl, {
        headers: finalConfig.headers,
        timeout: finalConfig.timeout,
        signal: finalConfig.signal,
      });
      finalUrl = result.url;
      finalConfig = {
        headers: result.config.headers || finalConfig.headers,
        timeout: result.config.timeout ?? finalConfig.timeout,
        signal: result.config.signal ?? finalConfig.signal,
      };
    }

    return { url: finalUrl, config: finalConfig };
  }

  /**
   * Apply response interceptors
   */
  protected async applyResponseInterceptors<T>(
    response: Response,
    data: GraphQLResponse<T>
  ): Promise<GraphQLResponse<T>> {
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
   * Create error object from GraphQL response or error
   */
  protected async createError(
    response: Response | null,
    graphQLResponse?: GraphQLResponse,
    error?: Error
  ): Promise<ApiError> {
    const apiError: ApiError = {
      message: error?.message || "An unknown error occurred",
      originalError: error,
    };

    if (graphQLResponse?.errors && graphQLResponse.errors.length > 0) {
      const firstError = graphQLResponse.errors[0];
      apiError.message = firstError.message;
      apiError.details = {
        errors: graphQLResponse.errors,
        extensions: graphQLResponse.extensions,
      };
    }

    if (response) {
      apiError.status = response.status;
      apiError.statusText = response.statusText;

      if (
        !apiError.message ||
        apiError.message === "An unknown error occurred"
      ) {
        apiError.message = response.statusText || apiError.message;
      }
    }

    return this.applyErrorInterceptors(apiError);
  }

  /**
   * Log request (if logging is enabled)
   */
  protected logRequest(
    operationName: string | undefined,
    query: string,
    variables?: Record<string, unknown>
  ): void {
    if (this.enableLogging) {
      console.log(`[GraphQL Request] ${operationName || "Anonymous"}`, {
        query: query.substring(0, 100) + (query.length > 100 ? "..." : ""),
        variables,
      });
    }
  }

  /**
   * Log response (if logging is enabled)
   */
  protected logResponse(
    operationName: string | undefined,
    response: GraphQLResponse
  ): void {
    if (this.enableLogging) {
      console.log(`[GraphQL Response] ${operationName || "Anonymous"}`, {
        hasData: !!response.data,
        hasErrors: !!response.errors,
        errors: response.errors,
      });
    }
  }

  /**
   * Log error (if logging is enabled)
   */
  protected logError(operationName: string | undefined, error: ApiError): void {
    if (this.enableLogging) {
      console.error(`[GraphQL Error] ${operationName || "Anonymous"}`, error);
    }
  }

  /**
   * Sleep utility for retry delays
   */
  protected sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Execute GraphQL request
   */
  protected async executeRequest<T>(
    options: GraphQLRequestOptions,
    retry = false,
    retryAttempts = 3,
    retryDelay = 1000
  ): Promise<GraphQLResponse<T>> {
    const {
      query,
      variables,
      operationName,
      headers = {},
      timeout = this.defaultTimeout,
      signal,
    } = options;

    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    let attempts = 0;
    const maxAttempts = retry ? retryAttempts : 1;
    let lastError: ApiError | null = null;

    this.logRequest(operationName, query, variables);

    while (attempts < maxAttempts) {
      try {
        // Apply request interceptors
        const { url: finalUrl, config: finalConfig } =
          await this.applyRequestInterceptors(this.endpoint, {
            headers: requestHeaders,
            timeout,
            signal,
          });

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId: NodeJS.Timeout | null = setTimeout(
          () => controller.abort(),
          timeout
        );

        // Combine signals if both provided
        const abortSignal = signal
          ? AbortSignal.any([signal, controller.signal])
          : controller.signal;

        // Build GraphQL request body
        const body: {
          query: string;
          variables?: Record<string, unknown>;
          operationName?: string;
        } = {
          query,
        };

        if (variables) {
          body.variables = variables;
        }

        if (operationName) {
          body.operationName = operationName;
        }

        // Make the request
        const response = await fetch(finalUrl, {
          method: "POST",
          headers: finalConfig.headers,
          body: JSON.stringify(body),
          signal: abortSignal,
          credentials: "include",
        });

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Parse response
        const graphQLResponse: GraphQLResponse<T> = await response.json();

        // Check for GraphQL errors
        if (graphQLResponse.errors && graphQLResponse.errors.length > 0) {
          const error = await this.createError(response, graphQLResponse);
          this.logError(operationName, error);

          // Retry on network/5xx errors if retry is enabled
          if (retry && response.status >= 500 && attempts < maxAttempts - 1) {
            attempts++;
            await this.sleep(retryDelay * attempts);
            continue;
          }

          throw error;
        }

        // Check for HTTP errors
        if (!response.ok) {
          const error = await this.createError(response, graphQLResponse);
          this.logError(operationName, error);

          // Retry on 5xx errors if retry is enabled
          if (retry && response.status >= 500 && attempts < maxAttempts - 1) {
            attempts++;
            await this.sleep(retryDelay * attempts);
            continue;
          }

          throw error;
        }

        // Apply response interceptors
        const finalResponse = await this.applyResponseInterceptors(
          response,
          graphQLResponse
        );

        this.logResponse(operationName, finalResponse);

        return finalResponse;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          lastError = await this.createError(
            null,
            undefined,
            new Error("Request timeout")
          );
        } else if (error instanceof Error && "status" in error) {
          lastError = error as ApiError;
        } else {
          lastError = await this.createError(null, undefined, error as Error);
        }

        this.logError(operationName, lastError);

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
      lastError ||
      (await this.createError(null, undefined, new Error("Request failed")))
    );
  }

  /**
   * Execute a GraphQL query
   */
  async query<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
    options?: Omit<GraphQLRequestOptions, "query" | "variables">
  ): Promise<GraphQLResponse<T>> {
    return this.executeRequest<T>({
      query,
      variables,
      ...options,
    });
  }

  /**
   * Execute a GraphQL mutation
   */
  async mutate<T = unknown>(
    mutation: string,
    variables?: Record<string, unknown>,
    options?: Omit<GraphQLRequestOptions, "query" | "variables">
  ): Promise<GraphQLResponse<T>> {
    return this.executeRequest<T>({
      query: mutation,
      variables,
      ...options,
    });
  }

  /**
   * Execute a GraphQL request with custom options
   */
  async request<T = unknown>(
    options: GraphQLRequestOptions
  ): Promise<GraphQLResponse<T>> {
    return this.executeRequest<T>(options);
  }

  /**
   * Execute a GraphQL request with retry logic
   */
  async requestWithRetry<T = unknown>(
    options: GraphQLRequestOptions,
    retryAttempts = 3,
    retryDelay = 1000
  ): Promise<GraphQLResponse<T>> {
    return this.executeRequest<T>(options, true, retryAttempts, retryDelay);
  }
}
