"use client";

import {
  AppHeader,
  DeliveryList,
  FuelSavingsCalculator,
  HeaderActions,
  PredictiveInsights,
  StatsCards,
} from "@/components";

export default function ActiveDeliveriesPage() {
  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:p-8 p-4 space-y-6">
        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
          {/* Active Deliveries List */}
          <DeliveryList />

          {/* Right Column */}
          <div className="space-y-6">
            {/* Predictive Insights */}
            <PredictiveInsights />

            {/* Fuel Savings Calculator */}
            <FuelSavingsCalculator />
          </div>
        </div>
      </div>
    </>
  );
}
