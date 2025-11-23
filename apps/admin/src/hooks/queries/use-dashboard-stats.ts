import { useQuery } from "@tanstack/react-query";
import { dashboardStatsService } from "@/services/mock/dashboard-stats.service";
import type { StatItem } from "@/components/misc/stats-card";
import type { DashboardStatsParams } from "@/services/mock/dashboard-stats.service";

/**
 * Query key factory for dashboard stats
 * This ensures consistent query keys across the application
 */
export const dashboardStatsKeys = {
  all: ["dashboard-stats"] as const,
  lists: () => [...dashboardStatsKeys.all, "list"] as const,
  list: (params: DashboardStatsParams) =>
    [...dashboardStatsKeys.lists(), params] as const,
};

/**
 * Fetch dashboard stats function
 * This is the query function used by React Query
 */
async function fetchDashboardStats(
  params: DashboardStatsParams
): Promise<StatItem[]> {
  return dashboardStatsService.getDashboardStats(params);
}

/**
 * Custom hook to fetch dashboard stats with React Query
 *
 * @param params - Dashboard stats parameters (timeRange and optional dateRange)
 * @returns React Query result with stats data, loading state, error, etc.
 *
 * @example
 * ```tsx
 * const { data: stats, isLoading, error } = useDashboardStats({
 *   timeRange: "month",
 *   dateRange: { startDate: new Date(), endDate: new Date() }
 * });
 * ```
 */
export function useDashboardStats(params: DashboardStatsParams) {
  return useQuery({
    queryKey: dashboardStatsKeys.list(params),
    queryFn: () => fetchDashboardStats(params),
    // Keep previous data while fetching new data (smooth transitions)
    placeholderData: (previousData) => previousData,
    // Enable/disable query based on params
    enabled: !!params.timeRange,
  });
}
