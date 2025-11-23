import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useInvoicesStore } from "@/stores/invoices-store";
import type {
  InvoiceStatusFilter,
  TabType,
} from "@/stores/invoices-store";

/**
 * Validates if a string is a valid InvoiceStatusFilter
 */
function isValidInvoiceStatusFilter(
  value: string | null
): value is InvoiceStatusFilter {
  return (
    value === "all" ||
    value === "draft" ||
    value === "paid" ||
    value === "overdue" ||
    value === "offline"
  );
}

/**
 * Validates if a string is a valid TabType
 */
function isValidTabType(value: string | null): value is TabType {
  return value === "invoices" || value === "payments";
}

/**
 * Hook to sync invoices page state with URL and initialize from URL
 */
export function useInvoicesUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    activeTab,
    statusFilter,
    searchQuery,
    page,
    pageSize,
    setActiveTab,
    setStatusFilter,
    setSearchQuery,
    setPagination,
  } = useInvoicesStore();

  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  // Initialize from URL on mount
  useEffect(() => {
    if (isInitialMount.current) {
      isUpdatingFromUrl.current = true;
      const urlTab = searchParams.get("tab");
      const urlStatusFilter = searchParams.get("status");
      const urlSearchQuery = searchParams.get("search");
      const urlPage = searchParams.get("page");
      const urlPageSize = searchParams.get("pageSize");

      if (urlTab && isValidTabType(urlTab)) {
        setActiveTab(urlTab);
      }
      if (urlStatusFilter && isValidInvoiceStatusFilter(urlStatusFilter)) {
        setStatusFilter(urlStatusFilter);
      }
      if (urlSearchQuery) {
        setSearchQuery(urlSearchQuery);
      }
      if (urlPage) {
        const pageNum = parseInt(urlPage, 10);
        if (!isNaN(pageNum) && pageNum > 0) {
          const sizeNum = urlPageSize
            ? parseInt(urlPageSize, 10)
            : pageSize;
          if (!isNaN(sizeNum) && sizeNum > 0) {
            setPagination(pageNum, sizeNum);
          }
        }
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

    if (activeTab && activeTab !== "invoices") {
      params.set("tab", activeTab);
    } else {
      params.delete("tab");
    }

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

    if (page && page !== 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    if (pageSize && pageSize !== 9) {
      params.set("pageSize", pageSize.toString());
    } else {
      params.delete("pageSize");
    }

    // Only update URL if params actually changed
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [
    activeTab,
    statusFilter,
    searchQuery,
    page,
    pageSize,
    pathname,
    router,
    searchParams,
  ]);
}

