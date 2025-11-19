"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";

import {
  Badge,
  Checkbox,
  DataTable,
  formatDate,
  TableColumnHeader,

} from "@repo/components";
import { getPaymentStatusColor, Payment, payments } from "@/data";

export function Payments() {
  const [loading] = useState(false);

  // Columns definition
  const columns: ColumnDef<Payment>[] = [
    {
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
          onClick={(e) => e.stopPropagation()}
          className="translate-y-[2px]"
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
    },
    {
      accessorKey: "invoiceId",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Invoice" />
      ),
      cell: ({ row }) => <div>{row.getValue("invoiceId")}</div>,
    },
    {
      accessorKey: "client",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Client" />
      ),
      cell: ({ row }) => <div>{row.getValue("client")}</div>,
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
    },
    {
      accessorKey: "method",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Method" />
      ),
      cell: ({ row }) => <div>{row.getValue("method")}</div>,
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Due Date" />
      ),
      cell: ({ row }) => <div>{formatDate(row.getValue("dueDate"))}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant="outline" className={getPaymentStatusColor(status)}>
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: () => (
        <div className="flex items-center justify-center">
          <Download className="h-4 w-4 text-muted-foreground" />
        </div>
      ),
    },
  ];

  const handleRowClick = (payment: Payment) => {
    console.log("Row clicked:", payment);
  };

  return (
    <div className="mt-4">
      <DataTable
        columns={columns}
        data={payments}
        searchKey="id"
        searchPlaceholder="Search payments..."
        showSearch
        showExport
        showPagination
        pageSize={10}
        onRowClick={handleRowClick}
        loading={loading}
        emptyMessage="No payments found."
      />
    </div>
  );
}
