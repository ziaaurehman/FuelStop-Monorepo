import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/services/mock/invoices.service";
import type { PaymentsResponse } from "@/services/mock/invoices.service";
import type { PaymentStatus } from "@/services/mock/invoices.service";

export type PaymentStatusFilter = "all" | PaymentStatus;

/**
 * Query key factory for payments
 */
export const paymentsKeys = {
  all: ["payments"] as const,
  lists: () => [...paymentsKeys.all, "list"] as const,
  list: (
    statusFilter: PaymentStatusFilter,
    searchQuery: string,
    page: number,
    pageSize: number
  ) =>
    [
      ...paymentsKeys.lists(),
      statusFilter,
      searchQuery,
      page,
      pageSize,
    ] as const,
};

/**
 * Fetch payments function
 */
async function fetchPayments(
  statusFilter: PaymentStatusFilter,
  searchQuery: string,
  page: number,
  pageSize: number
): Promise<PaymentsResponse> {
  return getPayments(statusFilter, searchQuery, page, pageSize);
}

/**
 * Custom hook to fetch payments with React Query
 */
export function usePayments(
  statusFilter: PaymentStatusFilter = "all",
  searchQuery: string = "",
  page: number = 1,
  pageSize: number = 9
) {
  return useQuery({
    queryKey: paymentsKeys.list(statusFilter, searchQuery, page, pageSize),
    queryFn: () => fetchPayments(statusFilter, searchQuery, page, pageSize),
    placeholderData: (previousData) => previousData,
    staleTime: 30 * 1000,
  });
}
