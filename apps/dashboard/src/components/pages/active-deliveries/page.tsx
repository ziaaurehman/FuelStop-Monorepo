"use client";

import { useMemo } from "react";
import { useActiveDeliveriesStore } from "@/stores/active-deliveries-store";
import { useActiveDeliveriesUrlSync } from "@/hooks/use-active-deliveries-url-sync";
import { useActiveDeliveries } from "@/hooks/queries";
import { DeliveryList } from "./delivery-list";
import { FuelSavingsCalculator } from "./fuel-calculator";
import { PredictiveInsights } from "./predictive-insight";
import { StatsCards } from "./stats-card";
import { DeliveryListSkeleton } from "./delivery-list-skeleton";
import { StatsCardsSkeleton } from "./stats-cards-skeleton";
import { PredictiveInsightsSkeleton } from "./predictive-insights-skeleton";
import { FuelCalculatorSkeleton } from "./fuel-calculator-skeleton";

export default function ActiveDeliveriesPage() {
  useActiveDeliveriesUrlSync();
  const {
    regionFilter,
    driverFilter,
    fuelTypeFilter,
    dateFilter,
    searchQuery,
  } = useActiveDeliveriesStore();

  // Use React Query hook to fetch active deliveries data
  const { data, isLoading, isError, error } = useActiveDeliveries(
    regionFilter,
    driverFilter,
    fuelTypeFilter,
    dateFilter,
    searchQuery
  );

  // Memoize data to prevent unnecessary re-renders
  const deliveries = useMemo(() => data?.deliveries ?? [], [data?.deliveries]);
  const stats = useMemo(() => data?.stats ?? [], [data?.stats]);
  const insights = useMemo(() => data?.insights ?? [], [data?.insights]);

  // Get unique drivers from deliveries
  const availableDrivers = useMemo(() => {
    const drivers = new Set<string>();
    deliveries.forEach((delivery) => {
      drivers.add(delivery.driver.name);
    });
    return Array.from(drivers).sort();
  }, [deliveries]);

  // Show loading skeletons while fetching
  if (isLoading) {
    return (
      <>
        {/* Stats Cards Skeleton */}
        <StatsCardsSkeleton />

        {/* Main Content Grid Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
          <DeliveryListSkeleton />
          <div className="space-y-6">
            <PredictiveInsightsSkeleton />
            <FuelCalculatorSkeleton />
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (isError) {
    console.error("Failed to fetch active deliveries data:", error);
    return (
      <div className="text-center text-muted-foreground py-8">
        Failed to load active deliveries data. Please try again.
      </div>
    );
  }

  return (
    <>
      {/* Stats Cards */}
      {stats.length > 0 && <StatsCards stats={stats} />}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        {/* Active Deliveries List */}
        <DeliveryList deliveries={deliveries} availableDrivers={availableDrivers} />

        {/* Right Column */}
        <div className="space-y-6">
          {/* Predictive Insights */}
          <PredictiveInsights insights={insights} />

          {/* Fuel Savings Calculator */}
          <FuelSavingsCalculator />
        </div>
      </div>
    </>
  );
}
