"use client";

import { Button } from "@repo/components";
import { cn } from "@/lib";
import { useFuelUsageStore } from "@/stores/fuel-usage-store";

export function TimeRangeSelector() {
  const { timeRange, setTimeRange } = useFuelUsageStore();

  const options = [
    { label: "3 Month", value: "3" as const },
    { label: "6 Month", value: "6" as const },
    { label: "12 Month", value: "12" as const },
  ];

  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {options.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-md px-4",
            timeRange === option.value &&
              "bg-background shadow-sm hover:bg-background"
          )}
          onClick={() => setTimeRange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
