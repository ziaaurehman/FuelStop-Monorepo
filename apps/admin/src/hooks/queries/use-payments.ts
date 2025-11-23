import { useQuery } from "@tanstack/react-query";
import { billingService } from "@/services/mock/billing.service";
import { Payment } from "@/data";

export const paymentsQueryKeys = {
  all: ["payments"] as const,
  lists: () => [...paymentsQueryKeys.all, "list"] as const,
  list: (filters: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => [...paymentsQueryKeys.lists(), filters] as const,
};

/**
 * React Query hook for fetching payments.
 * @param filters - Filter parameters for payments
 * @returns Query result with payments and total count
 */
export function usePayments(filters: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: paymentsQueryKeys.list(filters),
    queryFn: async () => {
      const result = await billingService.getPayments(filters);
      return result;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 30 * 1000, // 30 seconds
  });
}
