import { create } from "zustand";

export type TimeRange = "3" | "6" | "12";

interface FuelUsageState {
  timeRange: TimeRange;
  setTimeRange: (timeRange: TimeRange) => void;
}

export const useFuelUsageStore = create<FuelUsageState>((set) => ({
  timeRange: "6",
  setTimeRange: (timeRange) => set({ timeRange }),
}));
