import { create } from "zustand";

interface ReportsStore {
  timeRange: string;
  setTimeRange: (range: string) => void;
}

export const useReportsStore = create<ReportsStore>((set) => ({
  timeRange: "12",
  setTimeRange: (range) => set({ timeRange: range }),
}));
