import { useQuery } from "@tanstack/react-query";
import { dashboardOrdersService } from "@/services/mock/dashboard-orders.service";
import type { Order } from "@/data/orders";
import type { DashboardOrdersParams } from "@/services/mock/dashboard-orders.service";

/**
 * Query key factory for recent orders
 */
export const recentOrdersKeys = {
  all: ["recent-orders"] as const,
  lists: () => [...recentOrdersKeys.all, "list"] as const,
  list: (params: DashboardOrdersParams) =>
    [...recentOrdersKeys.lists(), params] as const,
};

/**
 * Fetch recent orders function
 */
async function fetchRecentOrders(
  params: DashboardOrdersParams
): Promise<Order[]> {
  return dashboardOrdersService.getRecentOrders(params);
}

/**
 * Custom hook to fetch recent orders with React Query
 *
 * @param params - Order parameters (timeRange, optional dateRange, and limit)
 * @returns React Query result with orders data, loading state, error, etc.
 */
export function useRecentOrders(params: DashboardOrdersParams) {
  return useQuery({
    queryKey: recentOrdersKeys.list(params),
    queryFn: () => fetchRecentOrders(params),
    placeholderData: (previousData) => previousData,
    enabled: !!params.timeRange,
  });
}
