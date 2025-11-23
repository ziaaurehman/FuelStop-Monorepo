import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "@/services/mock/schedule.service";
import { ScheduleDelivery } from "@/data";

export const schedulesQueryKeys = {
  all: ["schedules"] as const,
  lists: () => [...schedulesQueryKeys.all, "list"] as const,
  list: (filters: {
    search?: string;
    driver?: string;
    district?: string;
  }) => [...schedulesQueryKeys.lists(), filters] as const,
};

/**
 * React Query hook for fetching delivery schedules.
 */
export function useSchedules(filters: {
  search?: string;
  driver?: string;
  district?: string;
}) {
  return useQuery({
    queryKey: schedulesQueryKeys.list(filters),
    queryFn: async () => {
      const result = await scheduleService.getSchedules(filters);
      return result;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 30 * 1000,
  });
}

