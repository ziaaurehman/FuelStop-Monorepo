import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDeliveryTrackingStore } from "@/stores/delivery-tracking-store";
import type { DeliveryStatus } from "@/stores/delivery-tracking-store";

/**
 * Validates if a string is a valid DeliveryStatus
 */
function isValidDeliveryStatus(value: string | null): value is DeliveryStatus {
  return value === "all" || value === "completed" || value === "in-transit" || value === "pending";
}

/**
 * Hook to sync delivery-tracking page state with URL and initialize from URL
 */
export function useDeliveryTrackingUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { statusFilter, searchQuery, setStatusFilter, setSearchQuery } =
    useDeliveryTrackingStore();

  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  // Initialize from URL on mount
  useEffect(() => {
    if (isInitialMount.current) {
      isUpdatingFromUrl.current = true;
      const urlStatusFilter = searchParams.get("status");
      const urlSearchQuery = searchParams.get("search");

      if (urlStatusFilter && isValidDeliveryStatus(urlStatusFilter)) {
        setStatusFilter(urlStatusFilter);
      }
      if (urlSearchQuery) {
        setSearchQuery(urlSearchQuery);
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

    if (statusFilter && statusFilter !== "all") {
      params.set("status", statusFilter);
    } else {
      params.delete("status");
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    // Only update URL if params actually changed
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [statusFilter, searchQuery, pathname, router, searchParams]);
}

