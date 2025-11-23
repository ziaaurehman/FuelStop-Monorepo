import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/services/mock/invoices.service";
import type { InvoicesResponse } from "@/services/mock/invoices.service";
import type { InvoiceStatusFilter } from "@/stores/invoices-store";

/**
 * Query key factory for invoices
 */
export const invoicesKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoicesKeys.all, "list"] as const,
  list: (
    statusFilter: InvoiceStatusFilter,
    searchQuery: string,
    page: number,
    pageSize: number
  ) =>
    [
      ...invoicesKeys.lists(),
      statusFilter,
      searchQuery,
      page,
      pageSize,
    ] as const,
};

/**
 * Fetch invoices function
 */
async function fetchInvoices(
  statusFilter: InvoiceStatusFilter,
  searchQuery: string,
  page: number,
  pageSize: number
): Promise<InvoicesResponse> {
  return getInvoices(statusFilter, searchQuery, page, pageSize);
}

/**
 * Custom hook to fetch invoices with React Query
 */
export function useInvoices(
  statusFilter: InvoiceStatusFilter = "all",
  searchQuery: string = "",
  page: number = 1,
  pageSize: number = 9
) {
  return useQuery({
    queryKey: invoicesKeys.list(statusFilter, searchQuery, page, pageSize),
    queryFn: () => fetchInvoices(statusFilter, searchQuery, page, pageSize),
    placeholderData: (previousData) => previousData,
    staleTime: 30 * 1000,
  });
}

