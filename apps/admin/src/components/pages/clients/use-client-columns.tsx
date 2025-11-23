"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@repo/components";
import { TableColumnHeader, TableRowActions } from "@repo/components";
import type { Client } from "@/data/clients";
import type { ActionItem } from "@/types";
import { ClientNameCell } from "./client-name-cell";
import { ClientStatusBadge } from "./client-status-badge";

interface UseClientColumnsOptions {
  rowActions?: ActionItem<Client>[];
  showSelect?: boolean;
  showActions?: boolean;
}

export function useClientColumns(
  options: UseClientColumnsOptions = {}
): ColumnDef<Client>[] {
  const { rowActions = [], showSelect = true, showActions = true } = options;

  const columns: ColumnDef<Client>[] = [];

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
      <TableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <ClientNameCell client={row.original} />,
    enableSorting: true,
  });

  // Company column
  columns.push({
    accessorKey: "company",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => row.getValue("company"),
    enableSorting: true,
  });

  // Email column
  columns.push({
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => row.getValue("email"),
    enableSorting: true,
  });

  // Phone column
  columns.push({
    accessorKey: "phone",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Work Phone" />
    ),
    cell: ({ row }) => row.getValue("phone"),
    enableSorting: true,
  });

  // Receivables column
  columns.push({
    accessorKey: "receivables",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Receivables" />
    ),
    cell: ({ row }) => row.getValue("receivables"),
    enableSorting: true,
  });

  // Unused Credits column
  columns.push({
    accessorKey: "unusedCredits",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Unused Credits" />
    ),
    cell: ({ row }) => row.getValue("unusedCredits"),
    enableSorting: true,
  });

  // Status column
  columns.push({
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <ClientStatusBadge status={row.getValue("status")} />,
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
