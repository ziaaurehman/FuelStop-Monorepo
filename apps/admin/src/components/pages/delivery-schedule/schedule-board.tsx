"use client";

import { useMemo } from "react";
import { DeliveryColumn } from "./delivery-column";
import { useSchedules } from "@/hooks/queries/use-schedules";
import { useScheduleStore } from "@/stores/schedule-store";
import { Skeleton } from "@repo/components";

/**
 * Schedule board component displaying deliveries in kanban columns.
 */
export function ScheduleBoard() {
  // Use selective subscriptions to prevent unnecessary re-renders
  const searchQuery = useScheduleStore((state) => state.searchQuery);
  const driverFilter = useScheduleStore((state) => state.driverFilter);
  const districtFilter = useScheduleStore((state) => state.districtFilter);

  // Memoize filters to prevent unnecessary query refetches
  const filters = useMemo(
    () => ({
      search: searchQuery,
      driver: driverFilter,
      district: districtFilter,
    }),
    [searchQuery, driverFilter, districtFilter]
  );

  const { data, isLoading } = useSchedules(filters);

  const columns = useMemo(
    () => [
      { id: "scheduled", title: "Scheduled", color: "gray" },
      { id: "assigned", title: "Assigned", color: "blue" },
      { id: "in-progress", title: "In Progress", color: "orange" },
      { id: "completed", title: "Completed", color: "green" },
      { id: "blocked", title: "Blocked", color: "red" },
    ],
    []
  );

  // Memoize scheduleData before conditional return to follow Rules of Hooks
  const scheduleData = useMemo(
    () =>
      data ?? {
        scheduled: [],
        assigned: [],
        "in-progress": [],
        completed: [],
        blocked: [],
      },
    [data]
  );

  if (isLoading) {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="w-80 space-y-4">
              <Skeleton className="h-8 w-full" />
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

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
