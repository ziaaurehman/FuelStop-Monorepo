/**
 * Usage Examples for API Services
 *
 * This file demonstrates how to use the base API service classes.
 * These are examples - actual domain services should extend the base classes.
 */

import {
  BaseRestApiService,
  BaseGraphQLApiService,
  MockApiService,
} from "@/services";
import { apiConfig } from "@/services/config/api.config";

// ============================================================================
// REST API Service Example
// ============================================================================

/**
 * Example: Creating and using a REST API service
 */
export function restApiExample() {
  // Create a REST API service instance
  const restApi = new BaseRestApiService({
    baseURL: apiConfig.rest.baseURL,
    defaultTimeout: apiConfig.rest.defaultTimeout,
    enableLogging: apiConfig.rest.enableLogging,
  });

  // Add authentication token
  restApi.setAuthToken("your-auth-token-here");

  // Add request interceptor (e.g., for logging or adding headers)
  restApi.addRequestInterceptor(async (url, config) => {
    console.log(`Making request to: ${url}`);
    config.headers = {
      ...config.headers,
      "X-Request-ID": crypto.randomUUID(),
    };
    return { url, config };
  });

  // Add response interceptor (e.g., for data transformation)
  restApi.addResponseInterceptor(async (response, data) => {
    // Transform data if needed
    return data;
  });

  // Add error interceptor (e.g., for error handling)
  restApi.addErrorInterceptor(async (error) => {
    if (error.status === 401) {
      // Handle unauthorized - redirect to login
      console.error("Unauthorized - redirecting to login");
    }
    return error;
  });

  // Example: GET request
  async function getUsers() {
    try {
      const response =
        await restApi.get<Array<{ id: string; name: string }>>("/users");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  }

  // Example: POST request
  async function createUser(userData: { name: string; email: string }) {
    try {
      const response = await restApi.post<{
        id: string;
        name: string;
        email: string;
      }>("/users", userData);
      return response.data;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  }

  // Example: PUT request
  async function updateUser(
    userId: string,
    userData: Partial<{ name: string; email: string }>
  ) {
    try {
      const response = await restApi.put<{
        id: string;
        name: string;
        email: string;
      }>(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  }

  // Example: DELETE request
  async function deleteUser(userId: string) {
    try {
      await restApi.delete(`/users/${userId}`);
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}

// ============================================================================
// GraphQL API Service Example
// ============================================================================

/**
 * Example: Creating and using a GraphQL API service
 */
export function graphqlApiExample() {
  // Create a GraphQL API service instance
  const graphqlApi = new BaseGraphQLApiService({
    baseURL: apiConfig.graphql.endpoint,
    defaultTimeout: apiConfig.graphql.defaultTimeout,
    enableLogging: apiConfig.graphql.enableLogging,
  });

  // Add authentication token
  graphqlApi.setAuthToken("your-auth-token-here");

  // Example: GraphQL Query
  async function getUsers() {
    const query = `
      query GetUsers {
        users {
          id
          name
          email
        }
      }
    `;

    try {
      const response = await graphqlApi.query<{
        users: Array<{ id: string; name: string; email: string }>;
      }>(query);

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      return response.data?.users || [];
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  }

  // Example: GraphQL Mutation
  async function createUser(input: { name: string; email: string }) {
    const mutation = `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          email
        }
      }
    `;

    try {
      const response = await graphqlApi.mutate<{
        createUser: { id: string; name: string; email: string };
      }>(mutation, { input });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      return response.data?.createUser;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  }

  return {
    getUsers,
    createUser,
  };
}

// ============================================================================
// Mock API Service Example
// ============================================================================

/**
 * Example: Creating and using a Mock API service
 */
export function mockApiExample() {
  // Create and initialize mock API service
  const mockApi = new MockApiService({
    delay: 300,
  });

  // Example: Get mock orders with pagination
  async function getOrdersPaginated(page: number = 1, limit: number = 10) {
    try {
      const response = await mockApi.get<Array<{ id: string; client: string }>>(
        "/api/mock/orders",
        {
          params: {
            page,
            limit,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      throw error;
    }
  }

  // Example: Create a new order
  async function createOrder(orderData: {
    id: string;
    client: string;
    gallons: number;
  }) {
    try {
      const response = await mockApi.post<{
        id: string;
        client: string;
        gallons: number;
      }>("/api/mock/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  }

  // Example: Get order by ID
  async function getOrderById(orderId: string) {
    try {
      const response = await mockApi.getById<{ id: string; client: string }>(
        "orders",
        orderId
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order:", error);
      throw error;
    }
  }

  return {
    getOrdersPaginated,
    createOrder,
    getOrderById,
  };
}

// ============================================================================
// Domain-Specific Service Example
// ============================================================================

/**
 * Example: Creating a domain-specific service by extending BaseRestApiService
 *
 * This is the recommended pattern for creating service classes for different
 * domains (e.g., OrdersService, UsersService, etc.)
 */
export class OrdersService extends BaseRestApiService {
  constructor() {
    super({
      baseURL: apiConfig.rest.baseURL + "/orders",
      defaultTimeout: apiConfig.rest.defaultTimeout,
      enableLogging: apiConfig.rest.enableLogging,
    });
  }

  /**
   * Get all orders
   */
  async getAllOrders(): Promise<
    Array<{ id: string; client: string; gallons: number }>
  > {
    const response =
      await this.get<Array<{ id: string; client: string; gallons: number }>>(
        "/"
      );
    return response.data;
  }

  /**
   * Get order by ID
   */
  async getOrderById(
    id: string
  ): Promise<{ id: string; client: string; gallons: number }> {
    const response = await this.get<{
      id: string;
      client: string;
      gallons: number;
    }>(`/${id}`);
    return response.data;
  }

  /**
   * Create a new order
   */
  async createOrder(orderData: {
    client: string;
    gallons: number;
  }): Promise<{ id: string; client: string; gallons: number }> {
    const response = await this.post<{
      id: string;
      client: string;
      gallons: number;
    }>("/", orderData);
    return response.data;
  }

  /**
   * Update an order
   */
  async updateOrder(
    id: string,
    orderData: Partial<{ client: string; gallons: number }>
  ): Promise<{ id: string; client: string; gallons: number }> {
    const response = await this.put<{
      id: string;
      client: string;
      gallons: number;
    }>(`/${id}`, orderData);
    return response.data;
  }

  /**
   * Delete an order
   */
  async deleteOrder(id: string): Promise<void> {
    await this.delete(`/${id}`);
  }
}

