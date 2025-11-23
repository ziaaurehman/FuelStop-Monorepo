import { create } from "zustand";
import type { ClientStatusFilter } from "@/components/pages/clients/client-status-tabs";

interface ClientsState {
  statusFilter: ClientStatusFilter;
  searchQuery: string;
  page: number;
  pageSize: number;
  setStatusFilter: (statusFilter: ClientStatusFilter) => void;
  setSearchQuery: (searchQuery: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;
}

export const useClientsStore = create<ClientsState>((set) => ({
  statusFilter: "all",
  searchQuery: "",
  page: 1,
  pageSize: 10,
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }), // Reset to page 1 when page size changes
  resetFilters: () =>
    set({
      statusFilter: "all",
      searchQuery: "",
      page: 1,
      pageSize: 10,
    }),
}));
