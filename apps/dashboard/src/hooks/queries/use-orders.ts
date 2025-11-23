import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/mock/orders.service";
import type { Order } from "@/data/orders";
import type { OrdersParams } from "@/services/mock/orders.service";

export interface OrdersResponse {
  orders: Order[];
  totalCount: number;
}

/**
 * Query key factory for orders
 * This ensures consistent query keys across the application
 */
export const ordersKeys = {
  all: ["orders"] as const,
  lists: () => [...ordersKeys.all, "list"] as const,
  list: (params: OrdersParams) => [...ordersKeys.lists(), params] as const,
};

/**
 * Fetch orders function
 * This is the query function used by React Query
 */
async function fetchOrders(params: OrdersParams): Promise<OrdersResponse> {
  return ordersService.getOrders(params);
}

/**
 * Custom hook to fetch orders with React Query
 *
 * @param params - Orders parameters (filters and search query)
 * @returns React Query result with orders data, loading state, error, etc.
 *
 * @example
 * ```tsx
 * const { data: orders, isLoading, error } = useOrders({
 *   statusFilter: "all",
 *   priorityFilter: "high",
 *   quantityFilter: "all",
 *   locationFilter: "all",
 *   searchQuery: "metro"
 * });
 * ```
 */
export function useOrders(params: OrdersParams) {
  return useQuery({
    queryKey: ordersKeys.list(params),
    queryFn: () => fetchOrders(params),
    // Keep previous data while fetching new data (smooth transitions)
    placeholderData: (previousData) => previousData,
    // Stale time: consider data fresh for 30 seconds
    staleTime: 30 * 1000,
  });
}

