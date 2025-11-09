"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/components/ui/table";
import { DataTableProps } from "@/types";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { TableToolbar } from "./table-toolbar";
import { TablePagination } from "./table-pagination";
import { cn } from "@/lib";

export function DataTable<TData extends Record<string, unknown>>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  showSearch = true,
  showExport = true,
  showPagination = true,
  pageSize = 10,
  onRowClick,
  loading = false,
  emptyMessage = "No results found.",
  expandableContent,
  mobileColumns = ["id", "status"], // Default columns to show in mobile collapsed view
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(
    new Set()
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {showSearch && (
        <TableToolbar
          table={table}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          showExport={showExport}
        />
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-md border">
        <Table className="whitespace-nowrap">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={onRowClick ? "cursor-pointer" : ""}
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const isExpanded = expandedRows.has(row.id);
            return (
              <div
                key={row.id}
                className={cn(
                  "border rounded-lg bg-card",
                  row.getIsSelected() && "ring-2 ring-primary"
                )}
              >
                {/* Collapsed View - Dynamic columns based on mobileColumns prop */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleRowExpansion(row.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpansion(row.id);
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>

                    {/* Render mobile columns dynamically */}
                    <div className="flex items-center gap-3 flex-1">
                      {mobileColumns.map((columnId, index) => {
                        const cell = row
                          .getVisibleCells()
                          .find((cell) => cell.column.id === columnId);

                        if (!cell) return null;

                        return (
                          <div
                            key={columnId}
                            className={
                              index === 0
                                ? "font-medium text-nowrap"
                                : "ml-auto text-nowrap"
                            }
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t">
                    {expandableContent ? (
                      expandableContent(row.original)
                    ) : (
                      <div className="space-y-3 pt-3">
                        {row.getVisibleCells().map((cell) => {
                          // Hide select, actions, and mobileColumns in expanded view
                          if (
                            cell.column.id === "select" ||
                            cell.column.id === "actions" ||
                            mobileColumns.includes(cell.column.id)
                          ) {
                            return null;
                          }
                          return (
                            <div
                              key={cell.id}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-muted-foreground">
                                {flexRender(
                                  cell.column.columnDef.header as string,
                                  cell.getContext()
                                )}
                              </span>
                              <div className="text-sm ">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {/* Actions Row */}
                        <div className="pt-2 flex justify-end">
                          {(() => {
                            const actionCell = row
                              .getVisibleCells()
                              .find((cell) => cell.column.id === "actions");
                            if (!actionCell) return null;
                            return flexRender(
                              actionCell.column.columnDef.cell,
                              actionCell.getContext()
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>

      {showPagination && <TablePagination table={table} />}
    </div>
  );
}
