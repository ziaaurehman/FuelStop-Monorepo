import { create } from "zustand";

interface NotificationStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  filterType: "all",
  setFilterType: (type) => set({ filterType: type }),
}));
