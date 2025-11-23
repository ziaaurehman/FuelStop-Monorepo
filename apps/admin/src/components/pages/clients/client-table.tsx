"use client";

import { useEffect, useMemo } from "react";
import { DataTable } from "@repo/components";
import { ColumnDef } from "@tanstack/react-table";
import type { Client } from "@/data/clients";
import { useClientsStore } from "@/stores/clients-store";

interface ClientTableProps {
  columns: ColumnDef<Client>[];
  data: Client[];
  loading?: boolean;
  searchKey?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showExport?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  onRowClick?: (client: Client) => void;
  emptyMessage?: string;
  mobileColumns?: string[];
}

export function ClientTable({
  columns,
  data,
  loading = false,
  searchKey = "name",
  searchPlaceholder = "Search clients...",
  showSearch = true,
  showExport = true,
  showPagination = true,
  pageSize: propPageSize,
  onRowClick,
  emptyMessage = "No clients found.",
  mobileColumns,
}: ClientTableProps) {
  const { searchQuery, setSearchQuery, pageSize, setPageSize, page, setPage } =
    useClientsStore();

  // Use store pageSize if provided, otherwise use prop
  const effectivePageSize = propPageSize ?? pageSize;

  // Create initial column filters from store's searchQuery
  const initialColumnFilters = useMemo(() => {
    if (searchKey && searchQuery) {
      return [{ id: searchKey, value: searchQuery }];
    }
    return [];
  }, [searchKey, searchQuery]);

  // Create initial pagination from store
  const initialPagination = useMemo(
    () => ({
      pageIndex: page - 1, // TanStack Table uses 0-based index
      pageSize: effectivePageSize,
    }),
    [page, effectivePageSize]
  );

  // Sync store searchQuery to table when it changes (for URL-initiated changes)
  useEffect(() => {
    // This effect will update the table's filter when searchQuery changes from URL
    // The table will re-render with new initialColumnFilters
  }, [searchQuery, searchKey]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey={searchKey}
      searchPlaceholder={searchPlaceholder}
      showSearch={showSearch}
      showExport={showExport}
      showPagination={showPagination}
      pageSize={effectivePageSize}
      onRowClick={onRowClick}
      loading={loading}
      emptyMessage={emptyMessage}
      mobileColumns={mobileColumns}
      initialColumnFilters={initialColumnFilters}
      initialPagination={initialPagination}
      onSearchChange={(value: string) => {
        setSearchQuery(value);
      }}
      onPaginationChange={(pagination) => {
        setPage(pagination.pageIndex + 1); // Convert 0-based to 1-based
        setPageSize(pagination.pageSize);
      }}
    />
  );
}
