import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardStore } from "@/stores/dashboard-store";
import type {
  TimeRange,
  DateRange,
} from "@/services/mock/dashboard-stats.service";

function parseDateRangeFromUrl(dateRangeStr: string): DateRange | undefined {
  try {
    const [startStr, endStr] = dateRangeStr.split("_");
    if (!startStr || !endStr) return undefined;

    const startDate = new Date(parseInt(startStr, 10));
    const endDate = new Date(parseInt(endStr, 10));

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return undefined;
    }

    return { startDate, endDate };
  } catch {
    return undefined;
  }
}

/**
 * Format date range to URL string
 */
function formatDateRangeToUrl(dateRange: DateRange): string {
  return `${dateRange.startDate.getTime()}_${dateRange.endDate.getTime()}`;
}

/**
 * Hook to sync dashboard state with URL and initialize from URL
 */
export function useDashboardUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { timeRange, dateRange, setTimeRangeAndDateRange } =
    useDashboardStore();

  // Initialize from URL on mount
  useEffect(() => {
    const urlTimeRange = searchParams.get("timeRange") as TimeRange | null;
    const urlDateRange = searchParams.get("dateRange");

    if (
      urlTimeRange &&
      ["today", "yesterday", "week", "month", "year", "custom"].includes(
        urlTimeRange
      )
    ) {
      const parsedDateRange = urlDateRange
        ? parseDateRangeFromUrl(urlDateRange)
        : undefined;
      setTimeRangeAndDateRange(urlTimeRange, parsedDateRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount - searchParams and setTimeRangeAndDateRange are stable

  // Update URL when store changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (timeRange) {
      params.set("timeRange", timeRange);
    } else {
      params.delete("timeRange");
    }

    if (dateRange) {
      params.set("dateRange", formatDateRangeToUrl(dateRange));
    } else {
      params.delete("dateRange");
    }

    // Only update URL if params actually changed
    const newUrl = params.toString();
    const currentUrl = searchParams.toString();

    if (newUrl !== currentUrl) {
      router.replace(`?${newUrl}`, { scroll: false });
    }
  }, [timeRange, dateRange, router, searchParams]);
}
