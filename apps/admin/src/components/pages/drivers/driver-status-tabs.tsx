"use client";

import { Button } from "@repo/components";
import { cn } from "@repo/components/lib/utils";
import { useDriversStore } from "@/stores/drivers-store";

export type DriverStatusFilter = "all" | "active" | "on break" | "offline";

const statusTabs: Array<{
  value: DriverStatusFilter;
  label: string;
}> = [
  { value: "all", label: "All Drivers" },
  { value: "active", label: "Active" },
  { value: "on break", label: "On Break" },
  { value: "offline", label: "Offline" },
];

export function DriverStatusTabs() {
  const { statusFilter, setStatusFilter } = useDriversStore();

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
