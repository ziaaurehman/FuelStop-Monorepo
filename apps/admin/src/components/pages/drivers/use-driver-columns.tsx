"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@repo/components";
import { TableColumnHeader, TableRowActions } from "@repo/components";
import type { Driver } from "@/data/drivers";
import type { ActionItem } from "@/types";
import { DriverNameCell } from "./driver-name-cell";
import { DriverVehicleCell } from "./driver-vehicle-cell";
import { DriverStatusBadge } from "./driver-status-badge";

interface UseDriverColumnsOptions {
  rowActions?: ActionItem<Driver>[];
  showSelect?: boolean;
  showActions?: boolean;
}

export function useDriverColumns(
  options: UseDriverColumnsOptions = {}
): ColumnDef<Driver>[] {
  const {
    rowActions = [],
    showSelect = true,
    showActions = true,
  } = options;

  const columns: ColumnDef<Driver>[] = [];

  // Select column
  if (showSelect) {
    columns.push({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  // Name column
  columns.push({
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => <DriverNameCell driver={row.original} />,
    enableSorting: true,
  });

  // Vehicle column
  columns.push({
    accessorKey: "vehicle",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => (
      <DriverVehicleCell vehicle={row.getValue("vehicle")} />
    ),
    enableSorting: true,
  });

  // Location column
  columns.push({
    accessorKey: "location",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => row.getValue("location"),
    enableSorting: true,
  });

  // Status column
  columns.push({
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <DriverStatusBadge status={row.getValue("status")} />
    ),
    enableSorting: true,
  });

  // ID column
  columns.push({
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  });

  // Number column
  columns.push({
    accessorKey: "number",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Number" />
    ),
    cell: ({ row }) => row.getValue("number"),
    enableSorting: true,
  });

  // Actions column
  if (showActions && rowActions.length > 0) {
    columns.push({
      id: "actions",
      cell: ({ row }) => (
        <TableRowActions
          row={row.original}
          actions={rowActions as ActionItem[]}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  return columns;
}

