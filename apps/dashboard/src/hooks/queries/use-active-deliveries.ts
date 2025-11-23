import { useQuery } from "@tanstack/react-query";
import { getActiveDeliveriesData } from "@/services/mock/active-deliveries.service";
import type { ActiveDeliveriesData } from "@/services/mock/active-deliveries.service";
import type {
  RegionFilter,
  DriverFilter,
  FuelTypeFilter,
  DateFilter,
} from "@/stores/active-deliveries-store";

/**
 * Query key factory for active deliveries
 */
export const activeDeliveriesKeys = {
  all: ["activeDeliveries"] as const,
  lists: () => [...activeDeliveriesKeys.all, "list"] as const,
  list: (
    regionFilter: RegionFilter,
    driverFilter: DriverFilter,
    fuelTypeFilter: FuelTypeFilter,
    dateFilter: DateFilter,
    searchQuery: string
  ) =>
    [
      ...activeDeliveriesKeys.lists(),
      regionFilter,
      driverFilter,
      fuelTypeFilter,
      dateFilter,
      searchQuery,
    ] as const,
};

/**
 * Fetch active deliveries function
 */
async function fetchActiveDeliveries(
  regionFilter: RegionFilter,
  driverFilter: DriverFilter,
  fuelTypeFilter: FuelTypeFilter,
  dateFilter: DateFilter,
  searchQuery: string
): Promise<ActiveDeliveriesData> {
  return getActiveDeliveriesData(
    regionFilter,
    driverFilter,
    fuelTypeFilter,
    dateFilter,
    searchQuery
  );
}

/**
 * Custom hook to fetch active deliveries data with React Query
 *
 * @param regionFilter - Filter by region (all, downtown, uptown)
 * @param driverFilter - Filter by driver name
 * @param fuelTypeFilter - Filter by fuel type (all, Diesel, Gasoline)
 * @param dateFilter - Filter by date (all, today, week)
 * @param searchQuery - Search query to filter deliveries
 * @returns React Query result with active deliveries data, loading state, error, etc.
 */
export function useActiveDeliveries(
  regionFilter: RegionFilter = "all",
  driverFilter: DriverFilter = "all",
  fuelTypeFilter: FuelTypeFilter = "all",
  dateFilter: DateFilter = "all",
  searchQuery: string = ""
) {
  return useQuery({
    queryKey: activeDeliveriesKeys.list(
      regionFilter,
      driverFilter,
      fuelTypeFilter,
      dateFilter,
      searchQuery
    ),
    queryFn: () =>
      fetchActiveDeliveries(
        regionFilter,
        driverFilter,
        fuelTypeFilter,
        dateFilter,
        searchQuery
      ),
    // Keep previous data while fetching new data (smooth transitions)
    placeholderData: (previousData) => previousData,
    // Stale time: consider data fresh for 30 seconds
    staleTime: 30 * 1000,
  });
}

