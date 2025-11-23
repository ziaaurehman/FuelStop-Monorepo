import { useQuery } from "@tanstack/react-query";
import { getFuelUsageData } from "@/services/mock/fuel-usage.service";
import type { FuelUsageData } from "@/services/mock/fuel-usage.service";
import type { TimeRange } from "@/stores/fuel-usage-store";

/**
 * Query key factory for fuel usage
 */
export const fuelUsageKeys = {
  all: ["fuelUsage"] as const,
  lists: () => [...fuelUsageKeys.all, "list"] as const,
  list: (timeRange: TimeRange) => [...fuelUsageKeys.lists(), timeRange] as const,
};

/**
 * Fetch fuel usage function
 */
async function fetchFuelUsage(timeRange: TimeRange): Promise<FuelUsageData> {
  return getFuelUsageData(timeRange);
}

/**
 * Custom hook to fetch fuel usage data with React Query
 *
 * @param timeRange - Time range for the data (3, 6, or 12 months)
 * @returns React Query result with fuel usage data, loading state, error, etc.
 */
export function useFuelUsage(timeRange: TimeRange) {
  return useQuery({
    queryKey: fuelUsageKeys.list(timeRange),
    queryFn: () => fetchFuelUsage(timeRange),
    // Keep previous data while fetching new data (smooth transitions)
    placeholderData: (previousData) => previousData,
    // Stale time: consider data fresh for 30 seconds
    staleTime: 30 * 1000,
  });
}

