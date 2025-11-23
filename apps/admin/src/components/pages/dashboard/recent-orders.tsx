"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTable,
  getStatusColor,
} from "@repo/components";
import { Droplet } from "lucide-react";
import { Order } from "@/data";
import Link from "next/link";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useRecentOrders } from "@/hooks/queries";
import { RecentOrdersSkeleton } from "./recent-orders-skeleton";

export function RecentOrders() {
  const { timeRange, dateRange } = useDashboardStore();

  const {
    data: activeDeliveries = [],
    isLoading,
    isError,
  } = useRecentOrders({
    timeRange,
    dateRange,
    limit: 5,
  });

  // Define columns for the compact view
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
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "gallons",
      header: "Gallons",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Droplet className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("gallons")} gal</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant="secondary" className={getStatusColor(status)}>
            {status === "in transit" && (
              <span className="mr-1 h-2 w-2 rounded-full bg-current animate-pulse" />
            )}
            {status === "in transit" ? "In transit" : "Delivered"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "driver",
      header: "Driver",
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
            <span className="hidden lg:inline">{driver.name}</span>
            <span className="lg:hidden">{driver.name.split(" ")[0]}</span>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <RecentOrdersSkeleton />;
  }

  if (isError) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="text-center text-muted-foreground py-8">
            Failed to load recent orders
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent Orders</CardTitle>
        <Link href="/orders">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <DataTable
          columns={columns}
          data={activeDeliveries}
          showSearch={false}
          showExport={false}
          showPagination={false}
          loading={false}
          emptyMessage="No active deliveries."
        />
      </CardContent>
    </Card>
  );
}
