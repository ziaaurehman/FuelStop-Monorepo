"use client";

import { Button } from "@repo/components";
import { cn } from "@/lib";
import { useDeliveryTrackingStore } from "@/stores/delivery-tracking-store";
import type { DeliveryStatus } from "@/stores/delivery-tracking-store";

const statusOptions: Array<{ label: string; value: DeliveryStatus }> = [
  { label: "All", value: "all" },
  { label: "In Transit", value: "in-transit" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export function DeliveryStatusFilter() {
  const { statusFilter, setStatusFilter } = useDeliveryTrackingStore();

  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {statusOptions.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-md px-4",
            statusFilter === option.value &&
              "bg-background shadow-sm hover:bg-background"
          )}
          onClick={() => setStatusFilter(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

