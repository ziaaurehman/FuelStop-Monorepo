"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MapPin,
  Droplet,
  Calendar,
  Edit,
  Trash2,
  CircleCheck,
  Clock3,
} from "lucide-react";
import { ActionItem } from "@/types";
import { useState } from "react";

import { AppHeader, HeaderActions } from "@/components";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  DataTable,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TableColumnHeader,
  TableRowActions,
  getStatusColor,
  getPriorityColor,
  formatDate,
} from "@repo/components";
import { Order, orders } from "@/data";

// Order type

export default function OrdersPage() {
  const [loading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Filter data based on selected filters
  const filteredData = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (priorityFilter !== "all" && order.priority !== priorityFilter)
      return false;
    return true;
  });

  // Define row actions
  const rowActions: ActionItem<Order>[] = [
    // {
    //   label: "View Details",
    //   icon: Eye,
    //   onClick: (row: Order) => {
    //     console.log("View", row);
    //   },
    // },
    {
      label: "Edit Order",
      icon: Edit,
      variant: "edit",
      onClick: (row: Order) => {
        console.log("Edit", row);
      },
    },
    // {
    //   label: "Mark as Delivered",
    //   icon: CheckCircle2,
    //   onClick: (row: Order) => {
    //     console.log("Mark delivered", row);
    //   },
    // },
    // {
    //   separator: true,
    //   label: "Cancel Order",
    //   icon: XCircle,
    //   variant: "destructive",
    //   onClick: (row: Order) => {
    //     console.log("Cancel", row);
    //   },
    // },
    {
      label: "Delete",
      icon: Trash2,
      variant: "delete",
      onClick: (row: Order) => {
        console.log("Delete", row);
      },
    },
  ];

  // Define columns
  const columns: ColumnDef<Order>[] = [
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
      header: ({ column }) => <TableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "client",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Client" />
      ),
      cell: ({ row }) => <div>{row.getValue("client")}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="max-w-[200px] truncate">
            {row.getValue("address")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "gallons",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Gallons" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Droplet className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("gallons")} gal</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant="secondary" className={getStatusColor(status)}>
            {status === "in transit" ? (
              <>
                <span className="mr-1 h-2 w-2 rounded-full bg-current animate-pulse" />
                {status}
              </>
            ) : status === "scheduled" ? (
              <>
                <Calendar className="mr-1 h-3 w-3" />
                {status}
              </>
            ) : status === "delivered" ? (
              <>
                <CircleCheck className="mr-1 h-3 w-3" />
                {status}
              </>
            ) : status === "pending" ? (
              <>
                <Clock3 className="mr-1 h-3 w-3" />
                {status}
              </>
            ) : (
              status
            )}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "driver",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Driver" />
      ),
      cell: ({ row }) => {
        const driver = row.getValue("driver") as Order["driver"];
        const initials = driver.name
          .split(" ")
          .map((n) => n[0])
          .join("");
        return (
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={driver.avatar} alt={driver.name} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <span>{driver.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        return <div>{formatDate(row.getValue("date"))}</div>;
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string;
        return (
          <Badge variant="outline" className={getPriorityColor(priority)}>
            <span className="mr-1 h-2 w-2 rounded-full bg-current" />
            {priority}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <TableRowActions
          row={row.original}
          actions={rowActions as ActionItem[]}
        />
      ),
    },
  ];

  const handleRowClick = (order: Order) => {
    console.log("Row clicked:", order);
  };

  return (
    <div className="">
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:p-8 p-4 space-y-4 ">
        {/* Filter Tabs - Responsive */}
        <div className="flex items-center gap-2 border-b overflow-x-auto">
          <Button
            variant="ghost"
            className={
              statusFilter === "all"
                ? "border-b-2 border-primary rounded-b-none"
                : "rounded-b-none"
            }
            onClick={() => setStatusFilter("all")}
          >
            All Orders
          </Button>
          <Button
            variant="ghost"
            className={
              statusFilter === "in transit"
                ? "border-b-2 border-primary rounded-b-none"
                : "rounded-b-none"
            }
            onClick={() => setStatusFilter("in transit")}
          >
            Upcoming
          </Button>
          <Button
            variant="ghost"
            className={
              statusFilter === "delivered"
                ? "border-b-2 border-primary rounded-b-none"
                : "rounded-b-none"
            }
            onClick={() => setStatusFilter("delivered")}
          >
            Past Orders
          </Button>
        </div>

        {/* Filters - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" /> */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[130px] h-9">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select>
            <SelectTrigger className="w-full sm:w-[130px] h-9">
              <SelectValue placeholder="Quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quantity</SelectItem>
              <SelectItem value="0-200">0-200 gal</SelectItem>
              <SelectItem value="200-400">200-400 gal</SelectItem>
              <SelectItem value="400+">400+ gal</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[130px] h-9">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Location</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="uptown">Uptown</SelectItem>
            </SelectContent>
          </Select>

          <div className="sm:ml-auto text-sm text-muted-foreground w-full sm:w-auto text-left sm:text-right">
            Showing {filteredData.length} of {orders.length} orders
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          searchKey="client"
          searchPlaceholder="Search orders..."
          showSearch={true}
          showExport={true}
          showPagination={true}
          pageSize={10}
          onRowClick={handleRowClick}
          loading={loading}
          emptyMessage="No orders found."
        />
      </div>
    </div>
  );
}
