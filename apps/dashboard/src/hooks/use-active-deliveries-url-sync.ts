import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useActiveDeliveriesStore } from "@/stores/active-deliveries-store";
import type {
  RegionFilter,
  DriverFilter,
  FuelTypeFilter,
  DateFilter,
} from "@/stores/active-deliveries-store";

/**
 * Validates if a string is a valid RegionFilter
 */
function isValidRegionFilter(value: string | null): value is RegionFilter {
  return value === "all" || value === "downtown" || value === "uptown";
}

/**
 * Validates if a string is a valid FuelTypeFilter
 */
function isValidFuelTypeFilter(value: string | null): value is FuelTypeFilter {
  return value === "all" || value === "Diesel" || value === "Gasoline";
}

/**
 * Validates if a string is a valid DateFilter
 */
function isValidDateFilter(value: string | null): value is DateFilter {
  return value === "all" || value === "today" || value === "week";
}

/**
 * Hook to sync active-deliveries page state with URL and initialize from URL
 */
export function useActiveDeliveriesUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    regionFilter,
    driverFilter,
    fuelTypeFilter,
    dateFilter,
    searchQuery,
    setRegionFilter,
    setDriverFilter,
    setFuelTypeFilter,
    setDateFilter,
    setSearchQuery,
  } = useActiveDeliveriesStore();

  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  // Initialize from URL on mount
  useEffect(() => {
    if (isInitialMount.current) {
      isUpdatingFromUrl.current = true;
      const urlRegionFilter = searchParams.get("region");
      const urlDriverFilter = searchParams.get("driver");
      const urlFuelTypeFilter = searchParams.get("fuelType");
      const urlDateFilter = searchParams.get("date");
      const urlSearchQuery = searchParams.get("search");

      if (urlRegionFilter && isValidRegionFilter(urlRegionFilter)) {
        setRegionFilter(urlRegionFilter);
      }
      if (urlDriverFilter) {
        setDriverFilter(urlDriverFilter);
      }
      if (urlFuelTypeFilter && isValidFuelTypeFilter(urlFuelTypeFilter)) {
        setFuelTypeFilter(urlFuelTypeFilter);
      }
      if (urlDateFilter && isValidDateFilter(urlDateFilter)) {
        setDateFilter(urlDateFilter);
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

    if (regionFilter && regionFilter !== "all") {
      params.set("region", regionFilter);
    } else {
      params.delete("region");
    }

    if (driverFilter && driverFilter !== "all") {
      params.set("driver", driverFilter);
    } else {
      params.delete("driver");
    }

    if (fuelTypeFilter && fuelTypeFilter !== "all") {
      params.set("fuelType", fuelTypeFilter);
    } else {
      params.delete("fuelType");
    }

    if (dateFilter && dateFilter !== "all") {
      params.set("date", dateFilter);
    } else {
      params.delete("date");
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
  }, [
    regionFilter,
    driverFilter,
    fuelTypeFilter,
    dateFilter,
    searchQuery,
    pathname,
    router,
    searchParams,
  ]);
}

