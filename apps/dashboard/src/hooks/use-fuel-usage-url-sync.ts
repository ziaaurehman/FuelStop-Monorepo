import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useFuelUsageStore } from "@/stores/fuel-usage-store";
import type { TimeRange } from "@/stores/fuel-usage-store";

/**
 * Validates if a string is a valid TimeRange
 */
function isValidTimeRange(value: string | null): value is TimeRange {
  return value === "3" || value === "6" || value === "12";
}

/**
 * Hook to sync fuel-usage page state with URL and initialize from URL
 */
export function useFuelUsageUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { timeRange, setTimeRange } = useFuelUsageStore();

  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  // Initialize from URL on mount
  useEffect(() => {
    if (isInitialMount.current) {
      isUpdatingFromUrl.current = true;
      const urlTimeRange = searchParams.get("timeRange");
      if (urlTimeRange && isValidTimeRange(urlTimeRange)) {
        setTimeRange(urlTimeRange);
      }
      isInitialMount.current = false;
      isUpdatingFromUrl.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update URL when store changes
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;

    const params = new URLSearchParams(searchParams.toString());

    if (timeRange && timeRange !== "6") {
      params.set("timeRange", timeRange);
    } else {
      params.delete("timeRange");
    }

    // Only update URL if params actually changed
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [timeRange, pathname, router, searchParams]);
}

