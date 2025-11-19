import {
  AppHeader,
  HeaderActions,
  TimeRangeTabs,
  FuelUsage,
  ReportsStatsGrid,
  DeliveryTimes,
  ComparativeClient,
} from "@/components";
import React from "react";

export default function ReportsPage() {
  return (
    <div>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:p-8 p-4 space-y-4 ">
        <TimeRangeTabs />
        <ReportsStatsGrid />
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          <div className="lg:col-span-1">
            <FuelUsage />
          </div>
          <div className="lg:col-span-2">
            <DeliveryTimes timeRange="12" />
          </div>
        </div>
        <ComparativeClient timeRange="12" />
      </div>
    </div>
  );
}
