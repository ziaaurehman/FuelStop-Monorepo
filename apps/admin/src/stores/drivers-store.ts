import { create } from "zustand";
import type { DriverStatusFilter } from "@/components/pages/drivers/driver-status-tabs";

interface DriversState {
  statusFilter: DriverStatusFilter;
  searchQuery: string;
  page: number;
  pageSize: number;
  setStatusFilter: (statusFilter: DriverStatusFilter) => void;
  setSearchQuery: (searchQuery: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;
}

export const useDriversStore = create<DriversState>((set) => ({
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
