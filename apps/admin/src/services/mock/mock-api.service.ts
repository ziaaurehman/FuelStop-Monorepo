import type { ApiResponse, ApiError } from "../api/types";
import { BaseRestApiService } from "../api/base-rest-api.service";

/**
 * Mock data store
 * In a real application, this would be replaced with actual API calls
 */
class MockDataStore {
  private static instance: MockDataStore;
  private data: Map<string, unknown[]> = new Map();

  static getInstance(): MockDataStore {
    if (!MockDataStore.instance) {
      MockDataStore.instance = new MockDataStore();
    }
    return MockDataStore.instance;
  }

  /**
   * Set mock data for a resource
   */
  setData<T>(resource: string, data: T[]): void {
    this.data.set(resource, data);
  }

  /**
   * Get mock data for a resource
   */
  getData<T>(resource: string): T[] {
    return (this.data.get(resource) || []) as T[];
  }

  /**
   * Add item to mock data
   */
  addItem<T>(resource: string, item: T): T {
    const data = this.getData<T>(resource);
    data.push(item);
    this.setData(resource, data);
    return item;
  }

  /**
   * Update item in mock data
   */
  updateItem<T extends { id: string }>(
    resource: string,
    id: string,
    updates: Partial<T>
  ): T | null {
    const data = this.getData<T>(resource);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updated = { ...data[index], ...updates } as T;
    data[index] = updated;
    this.setData(resource, data);
    return updated;
  }

  /**
   * Delete item from mock data
   */
  deleteItem<T extends { id: string }>(resource: string, id: string): boolean {
    const data = this.getData<T>(resource);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    this.setData(resource, data);
    return true;
  }

  /**
   * Find item by ID
   */
  findById<T extends { id: string }>(resource: string, id: string): T | null {
    const data = this.getData<T>(resource);
    return data.find((item) => item.id === id) || null;
  }

  /**
   * Filter data
   */
  filter<T>(resource: string, predicate: (item: T) => boolean): T[] {
    const data = this.getData<T>(resource);
    return data.filter(predicate);
  }
}

/**
 * Mock API Service
 * Extends BaseRestApiService to provide mock data functionality
 */
export class MockApiService extends BaseRestApiService {
  private dataStore: MockDataStore;
  private delay: number; // Simulate network delay

  constructor(config: { delay?: number } = {}) {
    super({
      baseURL: "/api/mock",
      enableLogging: process.env.NODE_ENV === "development",
    });
    this.dataStore = MockDataStore.getInstance();
    this.delay = config.delay || 300; // Default 300ms delay
  }

  /**
   * Initialize mock data from external source
   */
  initializeMockData<T>(resource: string, data: T[]): void {
    this.dataStore.setData(resource, data);
  }

  /**
   * Simulate network delay
   */
  public async simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  /**
   * Override GET to return mock data
   */
  async get<T = unknown>(
    endpoint: string,
    config?: {
      params?: Record<string, string | number | boolean | null | undefined>;
    }
  ): Promise<ApiResponse<T>> {
    await this.simulateDelay();

    // Extract resource name from endpoint (e.g., "/api/mock/orders" -> "orders")
    const resource = endpoint.replace(/^\/api\/mock\//, "").split("/")[0];
    const params = config?.params || {};

    // Get all data for the resource
    let data = this.dataStore.getData<T>(resource);

    // Apply filtering if params provided
    if (params.filter) {
      // Simple filter implementation - can be extended
      const filterValue = String(params.filter).toLowerCase();
      data = this.dataStore.filter<T>(resource, (item) => {
        const itemStr = JSON.stringify(item).toLowerCase();
        return itemStr.includes(filterValue);
      });
    }

    // Apply pagination if provided
    if (params.page && params.limit) {
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      data = data.slice(start, end);
    }

    // Apply sorting if provided
    if (params.sortBy) {
      const sortBy = String(params.sortBy);
      const sortOrder = params.sortOrder === "desc" ? -1 : 1;
      data.sort((a: unknown, b: unknown) => {
        const aVal = (a as Record<string, unknown>)[sortBy];
        const bVal = (b as Record<string, unknown>)[sortBy];
        if (
          aVal &&
          bVal &&
          typeof aVal === "number" &&
          typeof bVal === "number"
        ) {
          if (aVal < bVal) return -1 * sortOrder;
          if (aVal > bVal) return 1 * sortOrder;
          return 0;
        }
        return 0;
      });
    }

    // Simulate error for testing
    if (params._error) {
      const error: ApiError = {
        message: "Mock API error",
        status: 500,
        code: "MOCK_ERROR",
      };
      throw error;
    }

    return {
      data: (Array.isArray(data) ? data : [data]) as T,
      status: 200,
      headers: new Headers(),
      statusText: "OK",
    };
  }

  /**
   * Override POST to add mock data
   */
  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    await this.simulateDelay();

    const resource = endpoint.replace(/^\/api\/mock\//, "").split("/")[0];
    const newItem = this.dataStore.addItem(resource, body as T);

    return {
      data: newItem as T,
      status: 201,
      headers: new Headers(),
      statusText: "Created",
    };
  }

  /**
   * Override PUT to update mock data
   */
  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    await this.simulateDelay();

    const parts = endpoint.replace(/^\/api\/mock\//, "").split("/");
    const resource = parts[0];
    const id = parts[1];

    if (!id) {
      const error: ApiError = {
        message: "ID is required for PUT request",
        status: 400,
        code: "MISSING_ID",
      };
      throw error;
    }

    const updated = this.dataStore.updateItem(
      resource,
      id,
      body as unknown as Record<string, unknown>
    );

    if (!updated) {
      const error: ApiError = {
        message: "Resource not found",
        status: 404,
        code: "NOT_FOUND",
      };
      throw error;
    }

    return {
      data: updated as T,
      status: 200,
      headers: new Headers(),
      statusText: "OK",
    };
  }

  /**
   * Override PATCH to partially update mock data
   */
  async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    return this.put<T>(endpoint, body, config) as Promise<ApiResponse<T>>;
  }

  /**
   * Override DELETE to remove mock data
   */
  async delete<T = unknown>(
    endpoint: string,
    config?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    await this.simulateDelay();

    const parts = endpoint.replace(/^\/api\/mock\//, "").split("/");
    const resource = parts[0];
    const id = parts[1];

    if (!id) {
      const error: ApiError = {
        message: "ID is required for DELETE request",
        status: 400,
        code: "MISSING_ID",
      };
      throw error;
    }

    const deleted = this.dataStore.deleteItem(resource, id);

    if (!deleted) {
      const error: ApiError = {
        message: "Resource not found",
        status: 404,
        code: "NOT_FOUND",
      };
      throw error;
    }

    return {
      data: {} as T,
      status: 200,
      headers: new Headers(),
      statusText: "OK",
    };
  }

  /**
   * Get item by ID
   */
  async getById<T extends { id: string } = { id: string }>(
    resource: string,
    id: string
  ): Promise<ApiResponse<T>> {
    await this.simulateDelay();

    const item = this.dataStore.findById<T>(resource, id);

    if (!item) {
      const error: ApiError = {
        message: "Resource not found",
        status: 404,
        code: "NOT_FOUND",
      };
      throw error;
    }

    return {
      data: item as T,
      status: 200,
      headers: new Headers(),
      statusText: "OK",
    };
  }
}
