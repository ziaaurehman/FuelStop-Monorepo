"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useBillingStore } from "@/stores/billing-store";

/**
 * Synchronizes billing page state with URL query parameters.
 * Prevents circular updates by using a ref to track initialization.
 */
export function useBillingUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  const {
    activeTab,
    setActiveTab,
    timeRange,
    setTimeRange,
    invoiceStatusFilter,
    setInvoiceStatusFilter,
    invoiceSearchQuery,
    setInvoiceSearchQuery,
    invoicePage,
    invoicePageSize,
    setInvoicePagination,
    paymentStatusFilter,
    setPaymentStatusFilter,
    paymentSearchQuery,
    setPaymentSearchQuery,
    paymentPage,
    paymentPageSize,
    setPaymentPagination,
  } = useBillingStore();

  // Read from URL on mount only
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;
    isUpdatingFromUrl.current = true;

    const tab = searchParams.get("tab");
    if (tab && ["invoices", "payments", "reports"].includes(tab)) {
      setActiveTab(tab as "invoices" | "payments" | "reports");
    }

    const timeRangeParam = searchParams.get("timeRange");
    if (timeRangeParam) {
      setTimeRange(timeRangeParam);
    }

    // Invoice filters
    const invoiceStatus = searchParams.get("invoiceStatus");
    if (invoiceStatus) {
      setInvoiceStatusFilter(invoiceStatus);
    }

    const invoiceSearch = searchParams.get("invoiceSearch");
    if (invoiceSearch !== null) {
      setInvoiceSearchQuery(invoiceSearch);
    }

    const invoicePageParam = searchParams.get("invoicePage");
    const invoiceLimitParam = searchParams.get("invoiceLimit");
    if (invoicePageParam || invoiceLimitParam) {
      setInvoicePagination(
        invoicePageParam ? parseInt(invoicePageParam, 10) : 1,
        invoiceLimitParam ? parseInt(invoiceLimitParam, 10) : 10
      );
    }

    // Payment filters
    const paymentStatus = searchParams.get("paymentStatus");
    if (paymentStatus) {
      setPaymentStatusFilter(paymentStatus);
    }

    const paymentSearch = searchParams.get("paymentSearch");
    if (paymentSearch !== null) {
      setPaymentSearchQuery(paymentSearch);
    }

    const paymentPageParam = searchParams.get("paymentPage");
    const paymentLimitParam = searchParams.get("paymentLimit");
    if (paymentPageParam || paymentLimitParam) {
      setPaymentPagination(
        paymentPageParam ? parseInt(paymentPageParam, 10) : 1,
        paymentLimitParam ? parseInt(paymentLimitParam, 10) : 10
      );
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

    // Tab
    if (activeTab !== "invoices") {
      params.set("tab", activeTab);
    } else {
      params.delete("tab");
    }

    // Time range
    if (timeRange !== "12") {
      params.set("timeRange", timeRange);
    } else {
      params.delete("timeRange");
    }

    // Invoice filters
    if (invoiceStatusFilter !== "all") {
      params.set("invoiceStatus", invoiceStatusFilter);
    } else {
      params.delete("invoiceStatus");
    }

    if (invoiceSearchQuery) {
      params.set("invoiceSearch", invoiceSearchQuery);
    } else {
      params.delete("invoiceSearch");
    }

    if (invoicePage !== 1) {
      params.set("invoicePage", invoicePage.toString());
    } else {
      params.delete("invoicePage");
    }

    if (invoicePageSize !== 10) {
      params.set("invoiceLimit", invoicePageSize.toString());
    } else {
      params.delete("invoiceLimit");
    }

    // Payment filters
    if (paymentStatusFilter !== "all") {
      params.set("paymentStatus", paymentStatusFilter);
    } else {
      params.delete("paymentStatus");
    }

    if (paymentSearchQuery) {
      params.set("paymentSearch", paymentSearchQuery);
    } else {
      params.delete("paymentSearch");
    }

    if (paymentPage !== 1) {
      params.set("paymentPage", paymentPage.toString());
    } else {
      params.delete("paymentPage");
    }

    if (paymentPageSize !== 10) {
      params.set("paymentLimit", paymentPageSize.toString());
    } else {
      params.delete("paymentLimit");
    }

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    // Only update URL if it's different
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [
    activeTab,
    timeRange,
    invoiceStatusFilter,
    invoiceSearchQuery,
    invoicePage,
    invoicePageSize,
    paymentStatusFilter,
    paymentSearchQuery,
    paymentPage,
    paymentPageSize,
    pathname,
    router,
    searchParams,
  ]);
}
