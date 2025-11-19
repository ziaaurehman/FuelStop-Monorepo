"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye } from "lucide-react";

import { InvoicePaymentFlow } from "@/components";
import {
  Badge,
  Checkbox,
  DataTable,
  TableColumnHeader,
  TableRowActions,
} from "@repo/components";
import { Invoice, invoices, getInvoiceStatusColor } from "@/data";
import { ActionItem } from "@/types";
import { formatDate } from "@/lib";
import { useState } from "react";

const InvoicesPage = () => {
  const [loading] = useState(false);

  // Define row actions
  const rowActions: ActionItem<Invoice>[] = [
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
  ];

  // Define columns
  const columns: ColumnDef<Invoice>[] = [
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
        return (
          <Badge variant="outline" className={getInvoiceStatusColor(status)}>
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
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
            {showPayButton && (
              <InvoicePaymentFlow
              // trigger={
              //   <Button
              //     size="sm"
              //     className="bg-primary hover:bg-primary-foreground text-white"
              //     onClick={(e) => {
              //       e.stopPropagation();
              //       console.log("Pay now:", row.original);
              //     }}
              //   >
              //     Pay Now
              //   </Button>
              // }
              />
            )}
            <TableRowActions
              row={row.original}
              actions={rowActions as ActionItem[]}
            />
          </div>
        );
      },
    },
  ];

  const handleRowClick = (invoice: Invoice) => {
    console.log("Row clicked:", invoice);
  };

  return (
    <DataTable
      columns={columns}
      data={invoices}
      searchKey="id"
      searchPlaceholder="Search invoices..."
      showSearch={true}
      showExport={true}
      showPagination={true}
      pageSize={9}
      onRowClick={handleRowClick}
      loading={loading}
      emptyMessage="No invoices found."
    />
  );
};
export default InvoicesPage;
