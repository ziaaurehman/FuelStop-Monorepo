"use client";

import { Button } from "@repo/components";
import { cn } from "@repo/components/lib/utils";
import { useOrdersStore } from "@/stores/orders-store";

export type OrderStatusFilter = "all" | "in transit" | "delivered";

const statusTabs: Array<{
  value: OrderStatusFilter;
  label: string;
}> = [
  { value: "all", label: "All Orders" },
  { value: "in transit", label: "Upcoming" },
  { value: "delivered", label: "Past Orders" },
];

export function OrderStatusTabs() {
  const { statusFilter, setStatusFilter } = useOrdersStore();

  return (
    <div className="flex items-center gap-2 border-b overflow-x-auto">
      {statusTabs.map((tab) => (
        <Button
          key={tab.value}
          variant="ghost"
          className={cn(
            "rounded-b-none",
            statusFilter === tab.value && "border-b-2 border-primary"
          )}
          onClick={() => setStatusFilter(tab.value)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
