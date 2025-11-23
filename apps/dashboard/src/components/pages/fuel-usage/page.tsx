"use client";

import { useMemo } from "react";
import { Button } from "@repo/components";
import { Download } from "lucide-react";
import { useFuelUsageStore } from "@/stores/fuel-usage-store";
import { useFuelUsageUrlSync } from "@/hooks/use-fuel-usage-url-sync";
import { useFuelUsage } from "@/hooks/queries";
import { TimeRangeSelector } from "./time-range-selector";
import { MetricsGrid } from "./metrics-grid";
import { FuelConsumptionChart } from "./fuel-consumption-chart";
import { TotalMonthlyCostChart } from "./total-monthly-cost-chart";
import { EfficiencyInsights } from "./effeciency-insight";
import { FleetComparisonChart } from "./fleet-comaprison";
import { MetricsGridSkeleton } from "./metrics-grid-skeleton";
import { FuelConsumptionChartSkeleton } from "./fuel-consumption-chart-skeleton";
import { TotalMonthlyCostChartSkeleton } from "./total-monthly-cost-chart-skeleton";
import { EfficiencyInsightsSkeleton } from "./efficiency-insights-skeleton";
import { FleetComparisonSkeleton } from "./fleet-comparison-skeleton";

export default function FuelUsagePage() {
  useFuelUsageUrlSync();
  const { timeRange } = useFuelUsageStore();

  // Use React Query hook to fetch fuel usage data
  const { data, isLoading, isError, error } = useFuelUsage(timeRange);

  // Memoize data to prevent unnecessary re-renders
  const metrics = useMemo(() => data?.metrics, [data?.metrics]);
  const fuelConsumptionData = useMemo(
    () => data?.fuelConsumptionData ?? [],
    [data?.fuelConsumptionData]
  );
  const totalMonthlyCostData = useMemo(
    () => data?.totalMonthlyCostData ?? [],
    [data?.totalMonthlyCostData]
  );
  const efficiencyInsights = useMemo(
    () => data?.efficiencyInsights ?? [],
    [data?.efficiencyInsights]
  );
  const fleetComparisonData = useMemo(
    () => data?.fleetComparisonData ?? [],
    [data?.fleetComparisonData]
  );

  // Show loading skeletons while fetching
  if (isLoading) {
    return (
      <>
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TimeRangeSelector />

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download Analytics Report
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              View AI Forecast Accuracy
            </Button>
          </div>
        </div>

        {/* Metrics Grid Skeleton */}
        <MetricsGridSkeleton />

        {/* Main Content Grid Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          <div className="lg:col-span-2">
            <FuelConsumptionChartSkeleton />
          </div>
          <div className="lg:col-span-1">
            <EfficiencyInsightsSkeleton />
          </div>
        </div>

        {/* Bottom Grid Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          <div className="lg:col-span-2">
            <TotalMonthlyCostChartSkeleton />
          </div>
          <div className="lg:col-span-1">
            <FleetComparisonSkeleton />
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (isError) {
    console.error("Failed to fetch fuel usage data:", error);
    return (
      <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TimeRangeSelector />
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download Analytics Report
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              View AI Forecast Accuracy
            </Button>
          </div>
        </div>
        <div className="text-center text-muted-foreground py-8">
          Failed to load fuel usage data. Please try again.
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TimeRangeSelector />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" />
            Download Analytics Report
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            View AI Forecast Accuracy
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      {metrics && <MetricsGrid metrics={metrics} />}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
        {/* Fuel Consumption Chart - 2 columns */}
        <div className="lg:col-span-2">
          <FuelConsumptionChart data={fuelConsumptionData} />
        </div>

        {/* Efficiency Insights - 1 column */}
        <div className="lg:col-span-1">
          <EfficiencyInsights insights={efficiencyInsights} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
        {/* Total Monthly Cost - 2 columns */}
        <div className="lg:col-span-2">
          <TotalMonthlyCostChart data={totalMonthlyCostData} />
        </div>

        {/* Fleet Comparison - 1 column */}
        <div className="lg:col-span-1">
          <FleetComparisonChart data={fleetComparisonData} />
        </div>
      </div>
    </>
  );
}
