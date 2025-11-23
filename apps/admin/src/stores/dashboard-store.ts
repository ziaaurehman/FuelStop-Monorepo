import { create } from "zustand";
import type {
  TimeRange,
  DateRange,
} from "@/services/mock/dashboard-stats.service";

interface DashboardState {
  timeRange: TimeRange;
  dateRange: DateRange | undefined;
  setTimeRange: (timeRange: TimeRange) => void;
  setDateRange: (dateRange: DateRange | undefined) => void;
  setTimeRangeAndDateRange: (
    timeRange: TimeRange,
    dateRange?: DateRange
  ) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  timeRange: "month",
  dateRange: undefined,
  setTimeRange: (timeRange) => set({ timeRange }),
  setDateRange: (dateRange) => set({ dateRange }),
  setTimeRangeAndDateRange: (timeRange, dateRange) =>
    set({ timeRange, dateRange }),
}));
