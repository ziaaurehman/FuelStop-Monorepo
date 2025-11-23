import { create } from "zustand";
import type { OrderStatusFilter } from "@/components/pages/orders/order-status-tabs";
import type {
  OrderPriorityFilter,
  OrderQuantityFilter,
  OrderLocationFilter,
} from "@/components/pages/orders/order-filters";

interface OrdersState {
  statusFilter: OrderStatusFilter;
  priorityFilter: OrderPriorityFilter;
  quantityFilter: OrderQuantityFilter;
  locationFilter: OrderLocationFilter;
  searchQuery: string;
  setStatusFilter: (statusFilter: OrderStatusFilter) => void;
  setPriorityFilter: (priorityFilter: OrderPriorityFilter) => void;
  setQuantityFilter: (quantityFilter: OrderQuantityFilter) => void;
  setLocationFilter: (locationFilter: OrderLocationFilter) => void;
  setSearchQuery: (searchQuery: string) => void;
  resetFilters: () => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  statusFilter: "all",
  priorityFilter: "all",
  quantityFilter: "all",
  locationFilter: "all",
  searchQuery: "",
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  setQuantityFilter: (quantityFilter) => set({ quantityFilter }),
  setLocationFilter: (locationFilter) => set({ locationFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () =>
    set({
      statusFilter: "all",
      priorityFilter: "all",
      quantityFilter: "all",
      locationFilter: "all",
      searchQuery: "",
    }),
}));
