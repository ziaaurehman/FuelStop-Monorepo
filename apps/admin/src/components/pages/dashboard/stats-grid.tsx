"use client";

import { StatsCard, StatsCardSkeleton } from "@/components/misc";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useDashboardStats } from "@/hooks/queries";

export function StatsGrid() {
  const { timeRange, dateRange } = useDashboardStore();

  // Use React Query hook to fetch dashboard stats
  const {
    data: stats = [],
    isLoading,
    isError,
    error,
  } = useDashboardStats({
    timeRange,
    dateRange,
  });

  // Show loading skeleton while fetching
  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 py-2">
        {[1, 2, 3, 4].map((index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show error state (optional - you can customize this)
  if (isError) {
    console.error("Failed to fetch dashboard stats:", error);
    // Fallback: show empty state or error message
    // For now, we'll show empty state
    return (
      <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 py-2">
        <div className="col-span-full text-center text-muted-foreground py-8">
          Failed to load dashboard statistics. Please try again.
        </div>
      </div>
    );
  }

  // Render stats cards
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 py-2">
      {stats.map((stat, index) => (
        <StatsCard key={index} stat={stat} />
      ))}
    </div>
  );
}
