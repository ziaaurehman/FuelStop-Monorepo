import { create } from "zustand";

type ScheduleViewMode = "board" | "calendar";

interface ScheduleStore {
  viewMode: ScheduleViewMode;
  setViewMode: (mode: ScheduleViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  driverFilter: string;
  setDriverFilter: (driver: string) => void;
  districtFilter: string;
  setDistrictFilter: (district: string) => void;
  routeOptimization: string;
  setRouteOptimization: (optimization: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  viewMode: "board",
  setViewMode: (mode) => set({ viewMode: mode }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  driverFilter: "all",
  setDriverFilter: (driver) => set({ driverFilter: driver }),
  districtFilter: "all",
  setDistrictFilter: (district) => set({ districtFilter: district }),
  routeOptimization: "default",
  setRouteOptimization: (optimization) =>
    set({ routeOptimization: optimization }),
  activeTab: "scheduled",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
