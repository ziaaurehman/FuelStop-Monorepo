"use client";

import { Driver } from "@/data/drivers";
import { DriverHeader, DriverInfoCard, DriverTabs } from "./modal";

interface DriverDetailsContentProps {
  driver: Driver;
}

export function DriverDetailsContent({ driver }: DriverDetailsContentProps) {
  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <DriverHeader driver={driver} />

      {/* Info Card */}
      <DriverInfoCard driver={driver} />

      {/* Tabs with Content */}
      <DriverTabs />
    </div>
  );
}
