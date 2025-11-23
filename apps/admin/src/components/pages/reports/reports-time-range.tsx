"use client";

import { useMemo, useCallback } from "react";
import { Button, cn } from "@repo/components";
import { useReportsStore } from "@/stores/reports-store";

const ranges: { label: string; value: string }[] = [
  { label: "7 Days", value: "7" },
  { label: "30 Days", value: "30" },
  { label: "90 Days", value: "90" },
  { label: "12 Months", value: "12" },
];

/**
 * Time range selector for reports page.
 */
export function ReportsTimeRange() {
  // Use selective subscription to prevent unnecessary re-renders
  const timeRange = useReportsStore((state) => state.timeRange);
  const setTimeRange = useReportsStore((state) => state.setTimeRange);

  // Memoize ranges to prevent recreation on every render
  const memoizedRanges = useMemo(() => ranges, []);

  const handleRangeClick = useCallback(
    (value: string) => {
      setTimeRange(value);
    },
    [setTimeRange]
  );

  return (
    <div className="flex items-center gap-2 mb-6">
      {memoizedRanges.map((range) => (
        <Button
          key={range.value}
          variant={timeRange === range.value ? "default" : "outline"}
          size="sm"
          onClick={() => handleRangeClick(range.value)}
          className={cn(
            timeRange === range.value && "bg-primary text-primary-foreground"
          )}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}
