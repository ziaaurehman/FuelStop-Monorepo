"use client";

import { AppHeader, HeaderActions } from "@/components";
import {
  MonthlyFuelChart,
  ActiveDeliveriesTable,
  SavingsComparisonChart,
} from "@/components";

export default function DashboardPage() {
  return (
    <div className="">
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:p-8 p-4 space-y-6">
        {/* Top Grid - Charts and Table */}
        <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
          {/* Monthly Fuel Consumption Chart */}
          <MonthlyFuelChart />

          {/* Active Deliveries Table */}
          <ActiveDeliveriesTable />
        </div>

        {/* Bottom Full Width - Savings Comparison Chart */}
        <SavingsComparisonChart />
      </div>
    </div>
  );
}
