"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useReportsStore } from "@/stores/reports-store";

/**
 * Synchronizes reports page state with URL query parameters.
 * Prevents circular updates by using a ref to track initialization.
 */
export function useReportsUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  const { timeRange, setTimeRange } = useReportsStore();

  // Read from URL on mount only
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;
    isUpdatingFromUrl.current = true;

    const timeRangeParam = searchParams.get("timeRange");
    if (timeRangeParam) {
      setTimeRange(timeRangeParam);
    }

    // Reset flag after a short delay to allow store updates to complete
    setTimeout(() => {
      isUpdatingFromUrl.current = false;
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update URL when store state changes (but not when updating from URL)
  useEffect(() => {
    if (isUpdatingFromUrl.current || isInitialMount.current) return;

    const params = new URLSearchParams(searchParams.toString());

    if (timeRange !== "12") {
      params.set("timeRange", timeRange);
    } else {
      params.delete("timeRange");
    }

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    // Only update URL if it's different
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [timeRange, pathname, router, searchParams]);
}
