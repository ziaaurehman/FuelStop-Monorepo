"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/components/ui/avatar";
import { Badge, Button, Checkbox } from "@repo/components";
import { Droplet } from "lucide-react";
import { getStatusColor } from "@/lib";
import { Order } from "@/data";
import Link from "next/link";

// Dummy active deliveries data
const activeDeliveries: Order[] = [
  {
    id: "#ORD-98745",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "in transit",
    driver: { name: "Dianne Russell", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "high",
  },
  {
    id: "#ORD-98746",
    client: "City Fuel Hub",
    address: "456 Oak Ave, Uptown",
    gallons: 400,
    status: "delivered",
    driver: { name: "Savannah Nguyen", avatar: "" },
    date: "2024-10-28T09:15:00",
    priority: "medium",
  },
  {
    id: "#ORD-98747",
    client: "Express Gas",
    address: "789 Pine Rd, Suburbs",
    gallons: 500,
    status: "delivered",
    driver: { name: "Jacob Jones", avatar: "" },
    date: "2024-10-28T08:45:00",
    priority: "low",
  },
  {
    id: "#ORD-98748",
    client: "Quick Stop Fuel",
    address: "321 Maple Dr, Downtown",
    gallons: 500,
    status: "delivered",
    driver: { name: "Albert Flores", avatar: "" },
    date: "2024-10-28T11:20:00",
    priority: "medium",
  },
  {
    id: "#ORD-98749",
    client: "Highway Gas",
    address: "654 Elm St, Highway Exit",
    gallons: 500,
    status: "delivered",
    driver: { name: "Esther Howard", avatar: "" },
    date: "2024-10-28T07:30:00",
    priority: "high",
  },
];

export function ActiveDeliveriesTable() {
  const [loading] = useState(false);

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

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle>Active Deliveries</CardTitle>
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
          loading={loading}
          emptyMessage="No active deliveries."
        />
      </CardContent>
    </Card>
  );
}
