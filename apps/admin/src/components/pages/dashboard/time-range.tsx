"use client";

import { useState } from "react";
import {
  Button,
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";
import { CalendarIcon } from "lucide-react";

type TimeRange = "today" | "yesterday" | "week" | "month" | "year";

export function TimeRangeTabs() {
  const [activeRange, setActiveRange] = useState<TimeRange>("month");
  const [dateRange, setDateRange] = useState("10 April 2024 - 10 April 2025");

  const ranges: { label: string; value: TimeRange }[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Time Range Tabs */}
      <div className="hidden sm:flex items-center gap-2 border-b overflow-x-auto hide-scrollbar w-full sm:w-auto">
        {ranges.map((range) => (
          <Button
            key={range.value}
            variant="ghost"
            onClick={() => setActiveRange(range.value)}
            className={cn(
              "rounded-b-none whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors",
              activeRange === range.value
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Date Range Selector */}
      <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[280px]">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10 April 2024 - 10 April 2025">
              10 April 2024 - 10 April 2025
            </SelectItem>
            <SelectItem value="1 Jan 2024 - 31 Dec 2024">
              1 Jan 2024 - 31 Dec 2024
            </SelectItem>
            <SelectItem value="1 Jan 2025 - 31 Dec 2025">
              1 Jan 2025 - 31 Dec 2025
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
