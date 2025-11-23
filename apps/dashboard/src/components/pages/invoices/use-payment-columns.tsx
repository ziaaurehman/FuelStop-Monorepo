"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye } from "lucide-react";
import {
  Checkbox,
  TableColumnHeader,
  TableRowActions,
} from "@repo/components";
import type { Payment } from "@/services/mock/invoices.service";
import { PaymentStatusBadge } from "./payment-status-badge";
import { formatDate } from "@/lib";
import type { ActionItem } from "@/types";

export function usePaymentColumns() {
  const rowActions: ActionItem<Payment>[] = useMemo(
    () => [
      {
        label: "View",
        icon: Eye,
        variant: "view",
        onClick: (row: Payment) => {
          console.log("View payment:", row);
        },
        mobileNode: <Eye className="h-4 w-4 text-green-400" />,
      },
      {
        label: "Download",
        icon: Download,
        variant: "default",
        onClick: (row: Payment) => {
          console.log("Download payment:", row);
        },
        mobileNode: <Download className="h-4 w-4 text-muted-foreground" />,
      },
    ],
    []
  );

  const columns: ColumnDef<Payment>[] = useMemo(
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
          <TableColumnHeader column={column} title="Payment ID" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("id")}</div>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "invoiceId",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Invoice ID" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("invoiceId")}</div>
        ),
        enableSorting: true,
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
          return <PaymentStatusBadge status={status as any} />;
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: "paymentDate",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Payment Date" />
        ),
        cell: ({ row }) => {
          return <div>{formatDate(row.getValue("paymentDate"))}</div>;
        },
        enableSorting: true,
      },
      {
        accessorKey: "paymentMethod",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Payment Method" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("paymentMethod")}</div>;
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-3">
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

