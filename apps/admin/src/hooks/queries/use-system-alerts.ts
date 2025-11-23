import { useQuery } from "@tanstack/react-query";
import { dashboardAlertsService } from "@/services/mock/dashboard-alerts.service";
import type {
  SystemAlert,
  DashboardAlertsParams,
} from "@/services/mock/dashboard-alerts.service";

/**
 * Query key factory for system alerts
 */
export const systemAlertsKeys = {
  all: ["system-alerts"] as const,
  lists: () => [...systemAlertsKeys.all, "list"] as const,
  list: (params: DashboardAlertsParams) =>
    [...systemAlertsKeys.lists(), params] as const,
};

/**
 * Fetch system alerts function
 */
async function fetchSystemAlerts(
  params: DashboardAlertsParams
): Promise<SystemAlert[]> {
  return dashboardAlertsService.getSystemAlerts(params);
}

/**
 * Custom hook to fetch system alerts with React Query
 *
 * @param params - Alert parameters (tab and optional searchQuery)
 * @returns React Query result with alerts data, loading state, error, etc.
 */
export function useSystemAlerts(params: DashboardAlertsParams) {
  return useQuery({
    queryKey: systemAlertsKeys.list(params),
    queryFn: () => fetchSystemAlerts(params),
    placeholderData: (previousData) => previousData,
    enabled: !!params.tab,
  });
}
