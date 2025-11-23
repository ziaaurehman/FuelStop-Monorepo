"use client";

import { Button } from "@repo/components";
import { cn } from "@repo/components/lib/utils";
import { useClientsStore } from "@/stores/clients-store";

export type ClientStatusFilter = "all" | "active" | "on break" | "offline";

const statusTabs: Array<{
  value: ClientStatusFilter;
  label: string;
}> = [
  { value: "all", label: "All Clients" },
  { value: "active", label: "Active" },
  { value: "on break", label: "On Break" },
  { value: "offline", label: "Offline" },
];

export function ClientStatusTabs() {
  const { statusFilter, setStatusFilter } = useClientsStore();

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
