"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@repo/components";
import { ColumnDef, Table } from "@tanstack/react-table";
import type { Order } from "@/data/orders";
import { useOrdersStore } from "@/stores/orders-store";
import { ExportConfirmationModal } from "./export-confirmation-modal";
import { exportToCSV } from "@/lib/table.utils";

interface OrderTableProps {
  columns: ColumnDef<Order>[];
  data: Order[];
  loading?: boolean;
  searchKey?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showExport?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  onRowClick?: (order: Order) => void;
  emptyMessage?: string;
}

export function OrderTable({
  columns,
  data,
  loading = false,
  searchKey = "client",
  searchPlaceholder = "Search orders...",
  showSearch = true,
  showExport = true,
  showPagination = true,
  pageSize = 10,
  onRowClick,
  emptyMessage = "No orders found.",
}: OrderTableProps) {
  const { searchQuery, setSearchQuery } = useOrdersStore();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [tableInstance, setTableInstance] = useState<Table<Order> | null>(null);

  // Create initial column filters from store's searchQuery
  const initialColumnFilters = useMemo(() => {
    if (searchKey && searchQuery) {
      return [{ id: searchKey, value: searchQuery }];
    }
    return [];
  }, [searchKey, searchQuery]);

  // Sync store searchQuery to table when it changes (for URL-initiated changes)
  useEffect(() => {
    // This effect will update the table's filter when searchQuery changes from URL
    // The table will re-render with new initialColumnFilters
  }, [searchQuery, searchKey]);

  const handleExportClick = (table: Table<Order>) => {
    setTableInstance(table);
    setIsExportModalOpen(true);
  };

  const handleExportConfirm = () => {
    if (tableInstance) {
      const dataToExport = tableInstance
        .getFilteredRowModel()
        .rows.map((row) => row.original);
      exportToCSV(dataToExport, "orders-export.csv");
    } else {
      // Fallback to all data if table instance is not available
      exportToCSV(data, "orders-export.csv");
    }
  };

  // Get the count of filtered rows for the modal
  const exportItemCount = tableInstance
    ? tableInstance.getFilteredRowModel().rows.length
    : data.length;

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        showSearch={showSearch}
        showExport={showExport}
        showPagination={showPagination}
        pageSize={pageSize}
        onRowClick={onRowClick}
        loading={loading}
        emptyMessage={emptyMessage}
        initialColumnFilters={initialColumnFilters}
        onSearchChange={(value: string) => {
          setSearchQuery(value);
        }}
        onExport={handleExportClick}
      />
      <ExportConfirmationModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
        onConfirm={handleExportConfirm}
        itemCount={exportItemCount}
      />
    </>
  );
}

