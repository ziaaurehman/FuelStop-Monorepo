"use client";

import { Table } from "@tanstack/react-table";
import { X, Download } from "lucide-react";
import { Button, Input } from "@repo/components/index";
import { exportToCSV } from "../../lib";

interface DataTableToolbarProps<TData extends Record<string, unknown>> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  showExport?: boolean;
  onExport?: () => void;
}

export function TableToolbar<TData extends Record<string, unknown>>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  showExport = true,
  onExport,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      const data = table.getFilteredRowModel().rows.map((row) => row.original);
      exportToCSV(data, "table-export.csv");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {showExport && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="ml-auto h-8"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      )}
    </div>
  );
}
