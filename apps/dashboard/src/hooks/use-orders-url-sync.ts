import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrdersStore } from "@/stores/orders-store";
import type { OrderStatusFilter } from "@/components/pages/orders/order-status-tabs";
import type {
  OrderPriorityFilter,
  OrderQuantityFilter,
  OrderLocationFilter,
} from "@/components/pages/orders/order-filters";

/**
 * Validates if a string is a valid OrderStatusFilter
 */
function isValidStatusFilter(value: string | null): value is OrderStatusFilter {
  return value === "all" || value === "in transit" || value === "delivered";
}

/**
 * Validates if a string is a valid OrderPriorityFilter
 */
function isValidPriorityFilter(
  value: string | null
): value is OrderPriorityFilter {
  return (
    value === "all" || value === "high" || value === "medium" || value === "low"
  );
}

/**
 * Validates if a string is a valid OrderQuantityFilter
 */
function isValidQuantityFilter(
  value: string | null
): value is OrderQuantityFilter {
  return (
    value === "all" ||
    value === "0-200" ||
    value === "200-400" ||
    value === "400+"
  );
}

/**
 * Validates if a string is a valid OrderLocationFilter
 */
function isValidLocationFilter(
  value: string | null
): value is OrderLocationFilter {
  return value === "all" || value === "downtown" || value === "uptown";
}

/**
 * Hook to sync orders page state with URL and initialize from URL
 */
export function useOrdersUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    statusFilter,
    priorityFilter,
    quantityFilter,
    locationFilter,
    searchQuery,
    setStatusFilter,
    setPriorityFilter,
    setQuantityFilter,
    setLocationFilter,
    setSearchQuery,
  } = useOrdersStore();

  // Initialize from URL on mount
  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const urlPriority = searchParams.get("priority");
    const urlQuantity = searchParams.get("quantity");
    const urlLocation = searchParams.get("location");
    const urlSearch = searchParams.get("search");

    if (urlStatus && isValidStatusFilter(urlStatus)) {
      setStatusFilter(urlStatus);
    }
    if (urlPriority && isValidPriorityFilter(urlPriority)) {
      setPriorityFilter(urlPriority);
    }
    if (urlQuantity && isValidQuantityFilter(urlQuantity)) {
      setQuantityFilter(urlQuantity);
    }
    if (urlLocation && isValidLocationFilter(urlLocation)) {
      setLocationFilter(urlLocation);
    }
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update URL when store changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (statusFilter && statusFilter !== "all") {
      params.set("status", statusFilter);
    } else {
      params.delete("status");
    }

    if (priorityFilter && priorityFilter !== "all") {
      params.set("priority", priorityFilter);
    } else {
      params.delete("priority");
    }

    if (quantityFilter && quantityFilter !== "all") {
      params.set("quantity", quantityFilter);
    } else {
      params.delete("quantity");
    }

    if (locationFilter && locationFilter !== "all") {
      params.set("location", locationFilter);
    } else {
      params.delete("location");
    }

    if (searchQuery && searchQuery.trim()) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    // Only update URL if params actually changed
    const newUrl = params.toString();
    const currentUrl = searchParams.toString();

    if (newUrl !== currentUrl) {
      router.replace(`?${newUrl}`, { scroll: false });
    }
  }, [
    statusFilter,
    priorityFilter,
    quantityFilter,
    locationFilter,
    searchQuery,
    router,
    searchParams,
  ]);
}

