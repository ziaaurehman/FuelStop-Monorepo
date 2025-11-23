import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useClientsStore } from "@/stores/clients-store";
import type { ClientStatusFilter } from "@/components/pages/clients/client-status-tabs";

/**
 * Validates if a string is a valid ClientStatusFilter
 */
function isValidStatusFilter(
  value: string | null
): value is ClientStatusFilter {
  return (
    value === "all" ||
    value === "active" ||
    value === "on break" ||
    value === "offline"
  );
}

/**
 * Validates if a string is a valid page number
 */
function isValidPage(value: string | null): number | null {
  if (!value) return null;
  const page = parseInt(value, 10);
  return isNaN(page) || page < 1 ? null : page;
}

/**
 * Validates if a string is a valid page size
 */
function isValidPageSize(value: string | null): number | null {
  if (!value) return null;
  const pageSize = parseInt(value, 10);
  const validPageSizes = [10, 20, 50, 100];
  return isNaN(pageSize) || !validPageSizes.includes(pageSize)
    ? null
    : pageSize;
}

/**
 * Hook to sync clients page state with URL and initialize from URL
 */
export function useClientsUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    statusFilter,
    searchQuery,
    page,
    pageSize,
    setStatusFilter,
    setSearchQuery,
    setPage,
    setPageSize,
  } = useClientsStore();

  // Initialize from URL on mount
  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const urlSearch = searchParams.get("search");
    const urlPage = searchParams.get("page");
    const urlPageSize = searchParams.get("limit");

    if (urlStatus && isValidStatusFilter(urlStatus)) {
      setStatusFilter(urlStatus);
    }
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
    if (urlPage) {
      const parsedPage = isValidPage(urlPage);
      if (parsedPage !== null) {
        setPage(parsedPage);
      }
    }
    if (urlPageSize) {
      const parsedPageSize = isValidPageSize(urlPageSize);
      if (parsedPageSize !== null) {
        setPageSize(parsedPageSize);
      }
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

    if (searchQuery && searchQuery.trim()) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    if (page && page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    if (pageSize && pageSize !== 10) {
      params.set("limit", pageSize.toString());
    } else {
      params.delete("limit");
    }

    // Only update URL if params actually changed
    const newUrl = params.toString();
    const currentUrl = searchParams.toString();

    if (newUrl !== currentUrl) {
      router.replace(`?${newUrl}`, { scroll: false });
    }
  }, [statusFilter, searchQuery, page, pageSize, router, searchParams]);
}
