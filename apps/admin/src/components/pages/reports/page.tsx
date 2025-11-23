"use client";

import { useMemo } from "react";
import {
  FuelUsage,
  ReportsStatsGrid,
  DeliveryTimes,
  ComparativeClient,
} from "@/components";
import { ReportsTimeRange } from "./reports-time-range";
import { useReportsUrlSync } from "@/hooks/use-reports-url-sync";
import { useReportsStore } from "@/stores/reports-store";

/**
 * Main reports page component.
 */
export default function ReportsPage() {
  useReportsUrlSync();

  // Use selective subscription to prevent unnecessary re-renders
  const timeRange = useReportsStore((state) => state.timeRange);

  // Memoize timeRange to prevent unnecessary re-renders of child components
  const memoizedTimeRange = useMemo(
    () => timeRange as "3" | "6" | "12",
    [timeRange]
  );

  return (
    <div className="space-y-4">
      <ReportsTimeRange />
      <ReportsStatsGrid />
      <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
        <div className="lg:col-span-1">
          <FuelUsage />
        </div>
        <div className="lg:col-span-2">
          <DeliveryTimes timeRange={memoizedTimeRange} />
        </div>
      </div>
      <ComparativeClient timeRange={memoizedTimeRange} />
    </div>
  );
}
