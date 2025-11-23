/**
 * API Configuration
 *
 * Centralized configuration for API services
 */

export const apiConfig = {
  /**
   * REST API Configuration
   */
  rest: {
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    defaultTimeout: 30000,
    defaultHeaders: {
      "Content-Type": "application/json",
    },
    enableLogging: process.env.NODE_ENV === "development",
  },

  /**
   * GraphQL API Configuration
   */
  graphql: {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "/graphql",
    defaultTimeout: 30000,
    defaultHeaders: {
      "Content-Type": "application/json",
    },
    enableLogging: process.env.NODE_ENV === "development",
  },

  /**
   * Mock API Configuration
   */
  mock: {
    enabled:
      process.env.NEXT_PUBLIC_USE_MOCK_API === "true" ||
      process.env.NODE_ENV === "development",
    delay: 300, // Simulated network delay in milliseconds
  },
};

