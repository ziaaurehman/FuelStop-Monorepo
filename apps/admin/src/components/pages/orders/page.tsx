"use client";

import { useMemo } from "react";
import { Edit, Trash2 } from "lucide-react";
import { ActionItem } from "@/types";
import type { Order } from "@/data/orders";
import { useOrdersStore } from "@/stores/orders-store";
import { useOrdersUrlSync } from "@/hooks/use-orders-url-sync";
import { useOrders } from "@/hooks/queries";
import { OrderStatusTabs } from "./order-status-tabs";
import { OrderFilters } from "./order-filters";
import { useOrderColumns } from "./use-order-columns";
import { OrderTable } from "./order-table";
import { OrdersTableSkeleton } from "./orders-table-skeleton";

export default function OrdersPage() {
  useOrdersUrlSync();
  const {
    statusFilter,
    priorityFilter,
    quantityFilter,
    locationFilter,
    searchQuery,
  } = useOrdersStore();

  // Use React Query hook to fetch orders
  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useOrders({
    statusFilter,
    priorityFilter,
    quantityFilter,
    locationFilter,
    searchQuery: searchQuery || undefined,
  });

  const orders = ordersData?.orders ?? [];
  const totalCount = ordersData?.totalCount ?? 0;

  // Define row actions
  const rowActions: ActionItem<Order>[] = useMemo(
    () => [
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
    []
  );

  // Get columns using the hook
  const columns = useOrderColumns({ rowActions });

  const handleRowClick = (order: Order) => {
    console.log("Row clicked:", order);
  };

  // Show loading skeleton while fetching
  if (isLoading) {
    return (
      <div>
        <OrderStatusTabs />
        <OrderFilters />
        <OrdersTableSkeleton />
      </div>
    );
  }

  // Show error state (optional - you can customize this)
  if (isError) {
    console.error("Failed to fetch orders:", error);
    return (
      <div>
        <OrderStatusTabs />
        <OrderFilters />
        <div className="text-center text-muted-foreground py-8">
          Failed to load orders. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div>
      <OrderStatusTabs />

      <OrderFilters resultCount={orders.length} totalCount={totalCount} />

      <OrderTable
        columns={columns}
        data={orders}
        loading={false}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
