"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useNotificationStore } from "@/stores/notification-store";

/**
 * Synchronizes notification center state with URL query parameters.
 */
export function useNotificationUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { searchQuery, setSearchQuery, filterType, setFilterType } =
    useNotificationStore();

  // Read from URL on mount
  useEffect(() => {
    const search = searchParams.get("search");
    if (search !== null) {
      setSearchQuery(search);
    }

    const filter = searchParams.get("filter");
    if (filter) {
      setFilterType(filter);
    }
  }, [searchParams, setSearchQuery, setFilterType]);

  // Update URL when store state changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    if (filterType !== "all") {
      params.set("filter", filterType);
    } else {
      params.delete("filter");
    }

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, filterType, pathname, router, searchParams]);
}
