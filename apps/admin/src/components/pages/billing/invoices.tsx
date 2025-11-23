"use client";

import { useMemo, useCallback } from "react";
import { DataTable } from "@repo/components";
import { Invoice } from "@/data";
import { useInvoices } from "@/hooks/queries/use-invoices";
import { useBillingStore } from "@/stores/billing-store";
import { useInvoiceColumns } from "./use-invoice-columns";
import { InvoicesTableSkeleton } from "./invoices-table-skeleton";

/**
 * Invoices table component with filtering, search, and pagination.
 */
export function Invoices() {
  // Use selective subscriptions to prevent unnecessary re-renders
  const invoiceStatusFilter = useBillingStore(
    (state) => state.invoiceStatusFilter
  );
  const invoiceSearchQuery = useBillingStore(
    (state) => state.invoiceSearchQuery
  );
  const invoicePage = useBillingStore((state) => state.invoicePage);
  const invoicePageSize = useBillingStore((state) => state.invoicePageSize);
  const setInvoiceSearchQuery = useBillingStore(
    (state) => state.setInvoiceSearchQuery
  );
  const setInvoicePagination = useBillingStore(
    (state) => state.setInvoicePagination
  );

  const { columns } = useInvoiceColumns();

  // Memoize filters to prevent unnecessary query refetches
  const filters = useMemo(
    () => ({
      status: invoiceStatusFilter,
      search: invoiceSearchQuery,
      page: invoicePage,
      limit: invoicePageSize,
    }),
    [invoiceStatusFilter, invoiceSearchQuery, invoicePage, invoicePageSize]
  );

  const { data, isLoading, isError } = useInvoices(filters);

  const invoices = useMemo(() => data?.invoices ?? [], [data?.invoices]);

  const handleRowClick = useCallback((invoice: Invoice) => {
    console.log("Row clicked:", invoice);
  }, []);

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setInvoicePagination(pagination.pageIndex + 1, pagination.pageSize);
    },
    [setInvoicePagination]
  );

  if (isLoading) {
    return <InvoicesTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-4 text-center text-destructive">
        Failed to load invoices. Please try again.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <DataTable
        columns={columns}
        data={invoices}
        searchKey="id"
        searchPlaceholder="Search invoices..."
        showSearch={true}
        showExport={true}
        showPagination={true}
        initialPagination={{
          pageIndex: invoicePage - 1,
          pageSize: invoicePageSize,
        }}
        onPaginationChange={handlePaginationChange}
        onSearchChange={setInvoiceSearchQuery}
        onRowClick={handleRowClick}
        emptyMessage="No invoices found."
      />
    </div>
  );
}
