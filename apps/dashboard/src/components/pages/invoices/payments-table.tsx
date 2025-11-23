"use client";

import { useMemo, useCallback } from "react";
import { DataTable } from "@repo/components";
import { usePayments } from "@/hooks/queries";
import { useInvoicesStore } from "@/stores/invoices-store";
import { usePaymentColumns } from "./use-payment-columns";
import { PaymentsTableSkeleton } from "./payments-table-skeleton";
import type { Payment } from "@/services/mock/invoices.service";

export function PaymentsTable() {
  const { columns } = usePaymentColumns();
  const {
    statusFilter,
    searchQuery,
    page,
    pageSize,
    setSearchQuery,
    setPagination,
  } = useInvoicesStore();

  // Convert InvoiceStatusFilter to PaymentStatusFilter
  const paymentStatusFilter: "all" | "completed" | "pending" | "failed" =
    statusFilter === "all"
      ? "all"
      : statusFilter === "paid"
        ? "completed"
        : statusFilter === "draft"
          ? "pending"
          : statusFilter === "overdue"
            ? "pending"
            : "all";

  const { data, isLoading, isError } = usePayments(
    paymentStatusFilter,
    searchQuery,
    page,
    pageSize
  );

  const payments = useMemo(() => data?.payments ?? [], [data?.payments]);

  const handleRowClick = useCallback((payment: Payment) => {
    console.log("Row clicked:", payment);
  }, []);

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setPagination(pagination.pageIndex + 1, pagination.pageSize);
    },
    [setPagination]
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
        showSearch={true}
        showExport={true}
        showPagination={true}
        initialPagination={{
          pageIndex: page - 1,
          pageSize: pageSize,
        }}
        onPaginationChange={handlePaginationChange}
        onSearchChange={setSearchQuery}
        onRowClick={handleRowClick}
        emptyMessage="No payments found."
      />
    </div>
  );
}
