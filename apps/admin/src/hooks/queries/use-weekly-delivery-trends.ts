import { useQuery } from "@tanstack/react-query";
import { dashboardChartsService } from "@/services/mock/dashboard-charts.service";
import type {
  WeeklyDeliveryTrendsData,
  DashboardChartsParams,
} from "@/services/mock/dashboard-charts.service";

/**
 * Query key factory for weekly delivery trends
 */
export const weeklyDeliveryTrendsKeys = {
  all: ["weekly-delivery-trends"] as const,
  lists: () => [...weeklyDeliveryTrendsKeys.all, "list"] as const,
  list: (params: DashboardChartsParams) =>
    [...weeklyDeliveryTrendsKeys.lists(), params] as const,
};

/**
 * Fetch weekly delivery trends function
 */
async function fetchWeeklyDeliveryTrends(
  params: DashboardChartsParams
): Promise<WeeklyDeliveryTrendsData> {
  return dashboardChartsService.getWeeklyDeliveryTrends(params);
}

/**
 * Custom hook to fetch weekly delivery trends with React Query
 *
 * @param params - Chart parameters (timeRange and optional dateRange)
 * @returns React Query result with chart data, loading state, error, etc.
 */
export function useWeeklyDeliveryTrends(params: DashboardChartsParams) {
  return useQuery({
    queryKey: weeklyDeliveryTrendsKeys.list(params),
    queryFn: () => fetchWeeklyDeliveryTrends(params),
    placeholderData: (previousData) => previousData,
    enabled: !!params.timeRange,
  });
}
