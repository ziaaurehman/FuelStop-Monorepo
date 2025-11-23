"use client";

import { useMemo, useCallback } from "react";
import { DataTable } from "@repo/components";
import { Payment } from "@/data";
import { usePayments } from "@/hooks/queries/use-payments";
import { useBillingStore } from "@/stores/billing-store";
import { usePaymentColumns } from "./use-payment-columns";
import { PaymentsTableSkeleton } from "./payments-table-skeleton";

/**
 * Payments table component with filtering, search, and pagination.
 */
export function Payments() {
  // Use selective subscriptions to prevent unnecessary re-renders
  const paymentStatusFilter = useBillingStore(
    (state) => state.paymentStatusFilter
  );
  const paymentSearchQuery = useBillingStore(
    (state) => state.paymentSearchQuery
  );
  const paymentPage = useBillingStore((state) => state.paymentPage);
  const paymentPageSize = useBillingStore((state) => state.paymentPageSize);
  const setPaymentSearchQuery = useBillingStore(
    (state) => state.setPaymentSearchQuery
  );
  const setPaymentPagination = useBillingStore(
    (state) => state.setPaymentPagination
  );

  const { columns } = usePaymentColumns();

  // Memoize filters to prevent unnecessary query refetches
  const filters = useMemo(
    () => ({
      status: paymentStatusFilter,
      search: paymentSearchQuery,
      page: paymentPage,
      limit: paymentPageSize,
    }),
    [paymentStatusFilter, paymentSearchQuery, paymentPage, paymentPageSize]
  );

  const { data, isLoading, isError } = usePayments(filters);

  const payments = useMemo(() => data?.payments ?? [], [data?.payments]);

  const handleRowClick = useCallback((payment: Payment) => {
    console.log("Row clicked:", payment);
  }, []);

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setPaymentPagination(pagination.pageIndex + 1, pagination.pageSize);
    },
    [setPaymentPagination]
  );

  if (isLoading) {
    return <PaymentsTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-4 text-center text-destructive">
        Failed to load payments. Please try again.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <DataTable
        columns={columns}
        data={payments}
        searchKey="id"
        searchPlaceholder="Search payments..."
        showSearch
        showExport
        showPagination
        initialPagination={{
          pageIndex: paymentPage - 1,
          pageSize: paymentPageSize,
        }}
        onPaginationChange={handlePaginationChange}
        onSearchChange={setPaymentSearchQuery}
        onRowClick={handleRowClick}
        emptyMessage="No payments found."
      />
    </div>
  );
}
