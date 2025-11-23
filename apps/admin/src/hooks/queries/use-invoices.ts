import { useQuery } from "@tanstack/react-query";
import { billingService } from "@/services/mock/billing.service";
import { Invoice } from "@/data";

export const invoicesQueryKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoicesQueryKeys.all, "list"] as const,
  list: (filters: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => [...invoicesQueryKeys.lists(), filters] as const,
};

/**
 * React Query hook for fetching invoices.
 * @param filters - Filter parameters for invoices
 * @returns Query result with invoices and total count
 */
export function useInvoices(filters: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: invoicesQueryKeys.list(filters),
    queryFn: async () => {
      const result = await billingService.getInvoices(filters);
      return result;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 30 * 1000, // 30 seconds
  });
}
