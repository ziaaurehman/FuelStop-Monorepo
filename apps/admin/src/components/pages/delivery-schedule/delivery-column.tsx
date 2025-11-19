"use client";

import { ScheduleDelivery } from "@/data";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button, cn } from "@repo/components";
import { DeliveryCard } from "./delivery-card";

interface DeliveryColumnProps {
  column: {
    id: string;
    title: string;
    color: string;
  };
  deliveries: ScheduleDelivery[];
}

// const colorClasses = {
//   gray: "border-l-gray-400",
//   blue: "border-l-blue-500",
//   orange: "border-l-orange-500",
//   green: "border-l-green-500",
//   red: "border-l-red-500",
// };

export function DeliveryColumn({ column, deliveries }: DeliveryColumnProps) {
  return (
    <div className="w-[280px] shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={cn("h-6 w-1 rounded-full", `bg-${column.color}-500`)}
            style={{
              backgroundColor:
                column.color === "gray"
                  ? "#9ca3af"
                  : column.color === "blue"
                    ? "#3b82f6"
                    : column.color === "orange"
                      ? "#f97316"
                      : column.color === "green"
                        ? "#22c55e"
                        : "#ef4444",
            }}
          />
          <h3 className="font-semibold">{column.title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {deliveries.map((delivery) => (
          <DeliveryCard key={delivery.id} delivery={delivery} />
        ))}
      </div>
    </div>
  );
}
