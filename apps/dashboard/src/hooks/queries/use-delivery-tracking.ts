import { useQuery } from "@tanstack/react-query";
import { getDeliveryTrackingData } from "@/services/mock/delivery-tracking.service";
import type { DeliveryTrackingData } from "@/services/mock/delivery-tracking.service";
import type { DeliveryStatus } from "@/services/mock/delivery-tracking.service";

/**
 * Query key factory for delivery tracking
 */
export const deliveryTrackingKeys = {
  all: ["deliveryTracking"] as const,
  lists: () => [...deliveryTrackingKeys.all, "list"] as const,
  list: (statusFilter: "all" | DeliveryStatus, searchQuery: string) =>
    [...deliveryTrackingKeys.lists(), statusFilter, searchQuery] as const,
};

/**
 * Fetch delivery tracking function
 */
async function fetchDeliveryTracking(
  statusFilter: "all" | DeliveryStatus,
  searchQuery: string
): Promise<DeliveryTrackingData> {
  return getDeliveryTrackingData(statusFilter, searchQuery);
}

/**
 * Custom hook to fetch delivery tracking data with React Query
 *
 * @param statusFilter - Filter by delivery status (all, completed, in-transit, pending)
 * @param searchQuery - Search query to filter deliveries
 * @returns React Query result with delivery tracking data, loading state, error, etc.
 */
export function useDeliveryTracking(
  statusFilter: "all" | DeliveryStatus = "all",
  searchQuery: string = ""
) {
  return useQuery({
    queryKey: deliveryTrackingKeys.list(statusFilter, searchQuery),
    queryFn: () => fetchDeliveryTracking(statusFilter, searchQuery),
    // Keep previous data while fetching new data (smooth transitions)
    placeholderData: (previousData) => previousData,
    // Stale time: consider data fresh for 30 seconds
    staleTime: 30 * 1000,
  });
}

