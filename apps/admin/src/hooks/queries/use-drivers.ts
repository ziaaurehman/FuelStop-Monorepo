import { useQuery } from "@tanstack/react-query";
import { driversService } from "@/services/mock/drivers.service";
import type { Driver } from "@/data/drivers";
import type { DriversParams } from "@/services/mock/drivers.service";

export interface DriversResponse {
  drivers: Driver[];
  totalCount: number;
}

/**
 * Query key factory for drivers
 * This ensures consistent query keys across the application
 */
export const driversKeys = {
  all: ["drivers"] as const,
  lists: () => [...driversKeys.all, "list"] as const,
  list: (params: DriversParams) => [...driversKeys.lists(), params] as const,
};

/**
 * Fetch drivers function
 * This is the query function used by React Query
 */
async function fetchDrivers(params: DriversParams): Promise<DriversResponse> {
  return driversService.getDrivers(params);
}

/**
 * Custom hook to fetch drivers with React Query
 *
 * @param params - Drivers parameters (status filter and search query)
 * @returns React Query result with drivers data, loading state, error, etc.
 *
 * @example
 * ```tsx
 * const { data: driversData, isLoading, error } = useDrivers({
 *   statusFilter: "active",
 *   searchQuery: "john"
 * });
 * ```
 */
export function useDrivers(params: DriversParams) {
  return useQuery({
    queryKey: driversKeys.list(params),
    queryFn: () => fetchDrivers(params),
    // Keep previous data while fetching new data (smooth transitions)
    placeholderData: (previousData) => previousData,
    // Stale time: consider data fresh for 30 seconds
    staleTime: 30 * 1000,
  });
}

