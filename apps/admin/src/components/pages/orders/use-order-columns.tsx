import { ColumnDef } from "@tanstack/react-table";
import { Checkbox, TableColumnHeader, TableRowActions } from "@repo/components";
import { Edit, Trash2 } from "lucide-react";
import type { Order } from "@/data/orders";
import type { ActionItem } from "@/types";
import { formatDate } from "@repo/components";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderPriorityBadge } from "./order-priority-badge";
import { OrderDriverCell } from "./order-driver-cell";
import { OrderAddressCell } from "./order-address-cell";
import { OrderGallonsCell } from "./order-gallons-cell";

interface UseOrderColumnsOptions {
  rowActions?: ActionItem<Order>[];
  showSelect?: boolean;
  showActions?: boolean;
}

export function useOrderColumns(
  options: UseOrderColumnsOptions = {}
): ColumnDef<Order>[] {
  const {
    rowActions = [
      {
        label: "Edit Order",
        icon: Edit,
        variant: "edit",
        onClick: (row: Order) => {
          console.log("Edit", row);
        },
      },
      {
        label: "Delete",
        icon: Trash2,
        variant: "delete",
        onClick: (row: Order) => {
          console.log("Delete", row);
        },
      },
    ],
    showSelect = true,
    showActions = true,
  } = options;

  const columns: ColumnDef<Order>[] = [];

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

  // ID column
  columns.push({
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  });

  // Client column
  columns.push({
    accessorKey: "client",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  });

  // Address column
  columns.push({
    accessorKey: "address",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <OrderAddressCell address={row.getValue("address")} />,
  });

  // Gallons column
  columns.push({
    accessorKey: "gallons",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Gallons" />
    ),
    cell: ({ row }) => <OrderGallonsCell gallons={row.getValue("gallons")} />,
  });

  // Status column
  columns.push({
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Order["status"];
      return <OrderStatusBadge status={status} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  });

  // Driver column
  columns.push({
    accessorKey: "driver",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => {
      const driver = row.getValue("driver") as Order["driver"];
      return <OrderDriverCell driver={driver} />;
    },
  });

  // Date column
  columns.push({
    accessorKey: "date",
    header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("date"))}</div>;
    },
  });

  // Priority column
  columns.push({
    accessorKey: "priority",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Order["priority"];
      return <OrderPriorityBadge priority={priority} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    });
  }

  return columns;
}
