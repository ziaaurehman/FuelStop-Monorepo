import { QueryClient } from "@tanstack/react-query";

/**
 * Default query options for all queries
 */
export const defaultQueryOptions = {
  queries: {
    // Time before data is considered stale (5 minutes)
    staleTime: 1000 * 60 * 5,
    // Time before inactive queries are garbage collected (10 minutes)
    gcTime: 1000 * 60 * 10, // Previously cacheTime
    // Retry failed requests
    retry: 2,
    // Retry delay increases exponentially
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
    // Refetch on window focus in production (disabled in dev for better DX)
    refetchOnWindowFocus: process.env.NODE_ENV === "production",
    // Refetch on reconnect
    refetchOnReconnect: true,
    // Don't refetch on mount if data is fresh
    refetchOnMount: true,
  },
  mutations: {
    // Retry failed mutations once
    retry: 1,
    // Retry delay
    retryDelay: 1000,
  },
};

/**
 * Create and configure QueryClient instance
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  });
}

/**
 * Singleton QueryClient instance
 * Use this for server-side rendering or when you need a single instance
 */
let queryClientSingleton: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  if (!queryClientSingleton) {
    queryClientSingleton = createQueryClient();
  }
  return queryClientSingleton;
}

