"use client";

import { useMemo, useState } from "react";
import { Button } from "@repo/components";
import { Edit, Trash2, UserCog, UserPlus } from "lucide-react";
import type { Driver } from "@/data/drivers";
import { ActionItem } from "@/types";
import { DriverDetailsModal } from "@/components";
import { useDriversStore } from "@/stores/drivers-store";
import { useDriversUrlSync } from "@/hooks/use-drivers-url-sync";
import { useDrivers } from "@/hooks/queries";
import { DriverStatusTabs } from "./driver-status-tabs";
import { useDriverColumns } from "./use-driver-columns";
import { DriverTable } from "./driver-table";
import { DriversTableSkeleton } from "./drivers-table-skeleton";

export default function DriversPage() {
  useDriversUrlSync();
  const { statusFilter, searchQuery } = useDriversStore();
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use React Query hook to fetch drivers
  const {
    data: driversData,
    isLoading,
    isError,
    error,
  } = useDrivers({
    statusFilter,
    searchQuery: searchQuery || undefined,
  });

  const drivers = driversData?.drivers ?? [];

  const handleAssignDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  // Define row actions
  const rowActions: ActionItem<Driver>[] = useMemo(
    () => [
      {
        label: "Assign",
        icon: UserCog,
        variant: "assign",
        onClick: (row: Driver) => handleAssignDriver(row),
        renderAsButton: () => (
          <Button size="sm" className="w-full">
            <UserPlus className="h-4 w-4" />
            Assign
          </Button>
        ),
      },
      {
        label: "Edit",
        icon: Edit,
        variant: "edit",
        onClick: (row: Driver) => console.log("Edit driver:", row),
      },
      {
        label: "Delete",
        icon: Trash2,
        variant: "delete",
        onClick: (row: Driver) => console.log("Delete driver:", row),
      },
    ],
    []
  );

  // Get columns using the hook
  const columns = useDriverColumns({ rowActions });

  const handleRowClick = (driver: Driver) => {
    console.log("Row clicked:", driver);
  };

  // Show loading skeleton while fetching
  if (isLoading) {
    return (
      <div className="space-y-4">
        <DriverStatusTabs />
        <DriversTableSkeleton />
      </div>
    );
  }

  // Show error state (optional - you can customize this)
  if (isError) {
    console.error("Failed to fetch drivers:", error);
    return (
      <div className="space-y-4">
        <DriverStatusTabs />
        <div className="text-center text-muted-foreground py-8">
          Failed to load drivers. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DriverStatusTabs />

      <DriverTable
        columns={columns}
        data={drivers}
        loading={false}
        onRowClick={handleRowClick}
      />

      {/* Driver Details Modal */}
      {selectedDriver && (
        <DriverDetailsModal
          driver={selectedDriver}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}
