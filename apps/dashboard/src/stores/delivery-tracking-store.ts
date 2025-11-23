import { create } from "zustand";

export type DeliveryStatus = "all" | "completed" | "in-transit" | "pending";

interface DeliveryTrackingState {
  statusFilter: DeliveryStatus;
  searchQuery: string;
  setStatusFilter: (status: DeliveryStatus) => void;
  setSearchQuery: (query: string) => void;
}

export const useDeliveryTrackingStore = create<DeliveryTrackingState>((set) => ({
  statusFilter: "all",
  searchQuery: "",
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

