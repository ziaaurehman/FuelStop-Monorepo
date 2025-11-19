"use client";

import { DeliveryColumn } from "./delivery-column";
import { scheduleData } from "@/data";

export function ScheduleBoard() {
  const columns = [
    { id: "scheduled", title: "Scheduled", color: "gray" },
    { id: "assigned", title: "Assigned", color: "blue" },
    { id: "in-progress", title: "In Progress", color: "orange" },
    { id: "completed", title: "Completed", color: "green" },
    { id: "blocked", title: "Blocked", color: "red" },
  ];

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {columns.map((column) => (
          <DeliveryColumn
            key={column.id}
            column={column}
            deliveries={scheduleData[column.id] || []}
          />
        ))}
      </div>
    </div>
  );
}
