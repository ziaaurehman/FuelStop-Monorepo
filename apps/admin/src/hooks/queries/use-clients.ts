import { useQuery } from "@tanstack/react-query";
import { clientsService } from "@/services/mock/clients.service";
import type { Client } from "@/data/clients";
import type { ClientsParams } from "@/services/mock/clients.service";

export interface ClientsResponse {
  clients: Client[];
  totalCount: number;
}

/**
 * Query key factory for clients
 * This ensures consistent query keys across the application
 */
export const clientsKeys = {
  all: ["clients"] as const,
  lists: () => [...clientsKeys.all, "list"] as const,
  list: (params: ClientsParams) => [...clientsKeys.lists(), params] as const,
};

/**
 * Fetch clients function
 * This is the query function used by React Query
 */
async function fetchClients(params: ClientsParams): Promise<ClientsResponse> {
  return clientsService.getClients(params);
}

/**
 * Custom hook to fetch clients with React Query
 *
 * @param params - Clients parameters (status filter and search query)
 * @returns React Query result with clients data, loading state, error, etc.
 *
 * @example
 * ```tsx
 * const { data: clientsData, isLoading, error } = useClients({
 *   statusFilter: "active",
 *   searchQuery: "john"
 * });
 * ```
 */
export function useClients(params: ClientsParams) {
  return useQuery({
    queryKey: clientsKeys.list(params),
    queryFn: () => fetchClients(params),
    // Keep previous data while fetching new data (smooth transitions)
    placeholderData: (previousData) => previousData,
    // Stale time: consider data fresh for 30 seconds
    staleTime: 30 * 1000,
  });
}

