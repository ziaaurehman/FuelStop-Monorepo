"use client";

import { useMemo } from "react";
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
import { format } from "date-fns";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useDashboardUrlSync } from "@/hooks/use-dashboard-url-sync";
import type {
  TimeRange,
  DateRange,
} from "@/services/mock/dashboard-stats.service";

export function TimeRangeTabs() {
  const { timeRange, dateRange, setTimeRangeAndDateRange } =
    useDashboardStore();

  useDashboardUrlSync();

  const ranges: { label: string; value: TimeRange }[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  const dateRangeOptions = useMemo(() => {
    const now = new Date();
    const options: { label: string; value: string; dateRange: DateRange }[] =
      [];

    switch (timeRange) {
      case "week": {
        // Last 7 days
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        options.push({
          label: `${format(weekAgo, "d MMM yyyy")} - ${format(now, "d MMM yyyy")}`,
          value: `week-${weekAgo.getTime()}-${now.getTime()}`,
          dateRange: { startDate: weekAgo, endDate: now },
        });

        // Previous week
        const prevWeekEnd = new Date(weekAgo);
        prevWeekEnd.setDate(prevWeekEnd.getDate() - 1);
        const prevWeekStart = new Date(prevWeekEnd);
        prevWeekStart.setDate(prevWeekStart.getDate() - 7);
        options.push({
          label: `${format(prevWeekStart, "d MMM yyyy")} - ${format(prevWeekEnd, "d MMM yyyy")}`,
          value: `week-${prevWeekStart.getTime()}-${prevWeekEnd.getTime()}`,
          dateRange: { startDate: prevWeekStart, endDate: prevWeekEnd },
        });
        break;
      }
      case "month": {
        // Current month
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        options.push({
          label: `${format(monthStart, "d MMM yyyy")} - ${format(now, "d MMM yyyy")}`,
          value: `month-${monthStart.getTime()}-${now.getTime()}`,
          dateRange: { startDate: monthStart, endDate: now },
        });

        // Previous month
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        const prevMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        options.push({
          label: `${format(prevMonthStart, "d MMM yyyy")} - ${format(prevMonthEnd, "d MMM yyyy")}`,
          value: `month-${prevMonthStart.getTime()}-${prevMonthEnd.getTime()}`,
          dateRange: { startDate: prevMonthStart, endDate: prevMonthEnd },
        });
        break;
      }
      case "year": {
        // Current year
        const yearStart = new Date(now.getFullYear(), 0, 1);
        options.push({
          label: `${format(yearStart, "d MMM yyyy")} - ${format(now, "d MMM yyyy")}`,
          value: `year-${yearStart.getTime()}-${now.getTime()}`,
          dateRange: { startDate: yearStart, endDate: now },
        });

        // Previous year
        const prevYearStart = new Date(now.getFullYear() - 1, 0, 1);
        const prevYearEnd = new Date(now.getFullYear() - 1, 11, 31);
        options.push({
          label: `${format(prevYearStart, "d MMM yyyy")} - ${format(prevYearEnd, "d MMM yyyy")}`,
          value: `year-${prevYearStart.getTime()}-${prevYearEnd.getTime()}`,
          dateRange: { startDate: prevYearStart, endDate: prevYearEnd },
        });
        break;
      }
    }

    return options;
  }, [timeRange]);

  // Compute selected date range value from store
  const selectedDateRange = useMemo(() => {
    if (dateRange && dateRangeOptions.length > 0) {
      const matchingOption = dateRangeOptions.find(
        (opt) =>
          opt.dateRange.startDate.getTime() === dateRange.startDate.getTime() &&
          opt.dateRange.endDate.getTime() === dateRange.endDate.getTime()
      );
      if (matchingOption) {
        return matchingOption.value;
      }
    }
    return dateRangeOptions.length > 0 ? dateRangeOptions[0]?.value : "";
  }, [dateRange, dateRangeOptions]);

  // Update store when date range selection changes
  const handleDateRangeChange = (value: string) => {
    const selectedOption = dateRangeOptions.find((opt) => opt.value === value);
    if (selectedOption) {
      setTimeRangeAndDateRange(timeRange, selectedOption.dateRange);
    }
  };

  // Show date range selector only for week, month, and year
  const showDateRangeSelector =
    timeRange === "week" || timeRange === "month" || timeRange === "year";

  const handleTimeRangeChange = (newRange: TimeRange) => {
    setTimeRangeAndDateRange(newRange, undefined);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Time Range Tabs */}
      <div className="hidden sm:flex items-center gap-2 border-b overflow-x-auto hide-scrollbar w-full sm:w-auto">
        {ranges.map((range) => (
          <Button
            key={range.value}
            variant="ghost"
            onClick={() => handleTimeRangeChange(range.value)}
            className={cn(
              "rounded-b-none whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors",
              timeRange === range.value
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Date Range Selector - Only show for week, month, and year */}
      {showDateRangeSelector && dateRangeOptions.length > 0 && (
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end">
          <Select
            value={selectedDateRange || dateRangeOptions[0]?.value}
            onValueChange={handleDateRangeChange}
          >
            <SelectTrigger className="w-full sm:w-[280px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
