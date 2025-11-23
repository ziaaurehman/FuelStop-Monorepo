"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useScheduleStore } from "@/stores/schedule-store";

/**
 * Synchronizes delivery schedule page state with URL query parameters.
 * Prevents circular updates by using a ref to track initialization.
 */
export function useScheduleUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    driverFilter,
    setDriverFilter,
    districtFilter,
    setDistrictFilter,
    routeOptimization,
    setRouteOptimization,
    activeTab,
    setActiveTab,
  } = useScheduleStore();

  // Read from URL on mount only
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;
    isUpdatingFromUrl.current = true;

    const view = searchParams.get("view");
    if (view && ["board", "calendar"].includes(view)) {
      setViewMode(view as "board" | "calendar");
    }

    const search = searchParams.get("search");
    if (search !== null) {
      setSearchQuery(search);
    }

    const driver = searchParams.get("driver");
    if (driver) {
      setDriverFilter(driver);
    }

    const district = searchParams.get("district");
    if (district) {
      setDistrictFilter(district);
    }

    const route = searchParams.get("route");
    if (route) {
      setRouteOptimization(route);
    }

    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
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

    if (viewMode !== "board") {
      params.set("view", viewMode);
    } else {
      params.delete("view");
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    if (driverFilter !== "all") {
      params.set("driver", driverFilter);
    } else {
      params.delete("driver");
    }

    if (districtFilter !== "all") {
      params.set("district", districtFilter);
    } else {
      params.delete("district");
    }

    if (routeOptimization !== "default") {
      params.set("route", routeOptimization);
    } else {
      params.delete("route");
    }

    if (activeTab !== "scheduled") {
      params.set("tab", activeTab);
    } else {
      params.delete("tab");
    }

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    // Only update URL if it's different
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [
    viewMode,
    searchQuery,
    driverFilter,
    districtFilter,
    routeOptimization,
    activeTab,
    pathname,
    router,
    searchParams,
  ]);
}
