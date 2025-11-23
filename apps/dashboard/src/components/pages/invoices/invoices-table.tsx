"use client";

import { useMemo, useCallback } from "react";
import { DataTable } from "@repo/components";
import { useInvoices } from "@/hooks/queries";
import { useInvoicesStore } from "@/stores/invoices-store";
import { useInvoiceColumns } from "./use-invoice-columns";
import { InvoicesTableSkeleton } from "./invoices-table-skeleton";
import type { Invoice } from "@/services/mock/invoices.service";

export function InvoicesTable() {
  const { columns } = useInvoiceColumns();
  const {
    statusFilter,
    searchQuery,
    page,
    pageSize,
    setSearchQuery,
    setPagination,
  } = useInvoicesStore();

  const { data, isLoading, isError } = useInvoices(
    statusFilter,
    searchQuery,
    page,
    pageSize
  );

  const invoices = useMemo(() => data?.invoices ?? [], [data?.invoices]);

  const handleRowClick = useCallback((invoice: Invoice) => {
    console.log("Row clicked:", invoice);
  }, []);

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setPagination(pagination.pageIndex + 1, pagination.pageSize);
    },
    [setPagination]
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
          pageIndex: page - 1,
          pageSize: pageSize,
        }}
        onPaginationChange={handlePaginationChange}
        onSearchChange={setSearchQuery}
        onRowClick={handleRowClick}
        emptyMessage="No invoices found."
      />
    </div>
  );
}

