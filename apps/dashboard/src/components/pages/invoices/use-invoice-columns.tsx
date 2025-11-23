"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye } from "lucide-react";
import {
  Badge,
  Checkbox,
  TableColumnHeader,
  TableRowActions,
} from "@repo/components";
import type { Invoice } from "@/services/mock/invoices.service";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { InvoicePaymentFlow } from "./modal";
import { formatDate } from "@/lib";
import type { ActionItem } from "@/types";

export function useInvoiceColumns() {
  const rowActions: ActionItem<Invoice>[] = useMemo(
    () => [
      {
        label: "View",
        icon: Eye,
        variant: "view",
        onClick: (row: Invoice) => {
          console.log("View invoice:", row);
        },
        mobileNode: <Eye className="h-4 w-4 text-green-400" />,
      },
      {
        label: "Download",
        icon: Download,
        variant: "default",
        onClick: (row: Invoice) => {
          console.log("Download invoice:", row);
        },
        mobileNode: <Download className="h-4 w-4 text-muted-foreground" />,
      },
    ],
    []
  );

  const columns: ColumnDef<Invoice>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
      },
      {
        accessorKey: "id",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Invoice ID" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("id")}</div>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number;
          return <div className="font-medium">${amount.toFixed(2)}</div>;
        },
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return <InvoiceStatusBadge status={status as any} />;
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: "issueDate",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Issue Date" />
        ),
        cell: ({ row }) => {
          return <div>{formatDate(row.getValue("issueDate"))}</div>;
        },
        enableSorting: true,
      },
      {
        accessorKey: "dueDate",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Due Date" />
        ),
        cell: ({ row }) => {
          return <div>{formatDate(row.getValue("dueDate"))}</div>;
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const status = row.original.status;
          const showPayButton = status === "draft" || status === "overdue";

          return (
            <div className="flex items-center justify-end gap-3">
              {showPayButton && <InvoicePaymentFlow />}
              <TableRowActions
                row={row.original}
                actions={rowActions as ActionItem[]}
              />
            </div>
          );
        },
      },
    ],
    [rowActions]
  );

  return { columns, rowActions };
}

