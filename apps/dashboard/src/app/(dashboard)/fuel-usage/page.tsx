"use client";

import {
  AppHeader,
  HeaderActions,
  EfficiencyInsights,
  FleetComparisonChart,
  FuelConsumptionChart,
  MetricsGrid,
  TimeRangeSelector,
  TotalMonthlyCostChart,
} from "@/components";

import { Button } from "@repo/components";
import { Download } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [timeRange, setTimeRange] = useState<"3" | "6" | "12">("6");

  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="space-y-6 md:p-8 p-4">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />

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
        <MetricsGrid timeRange={timeRange} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          {/* Fuel Consumption Chart - 2 columns */}
          <div className="lg:col-span-2">
            <FuelConsumptionChart timeRange={timeRange} />
          </div>

          {/* Efficiency Insights - 1 column */}
          <div className="lg:col-span-1">
            <EfficiencyInsights />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          {/* Total Monthly Cost - 2 columns */}
          <div className="lg:col-span-2">
            <TotalMonthlyCostChart timeRange={timeRange} />
          </div>

          {/* Fleet Comparison - 1 column */}
          <div className="lg:col-span-1">
            <FleetComparisonChart />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
