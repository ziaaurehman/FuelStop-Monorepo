"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Card,
  CardContent,
} from "@repo/components";
import type { MetricsData } from "@/services/mock/fuel-usage.service";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  tooltip?: string;
}

function MetricCard({ title, value, subtitle, tooltip }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricsGridProps {
  metrics: MetricsData;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const metricItems = [
    {
      title: "Average gal per fill up",
      value: metrics.averageGallonsPerFill,
    },
    {
      title: "Annual Fuel Consumption",
      value: metrics.annualFuelConsumption,
    },
    {
      title: "Fuel time Savings Annually",
      value: metrics.fuelTimeSavingsAnnually,
      subtitle: "Based on 30 minutes per refueling trip",
      tooltip: "Based on 30 minutes per refueling trip",
    },
    {
      title: "Labour Savings Annually",
      value: metrics.labourSavingsAnnually,
      subtitle: "At $32/hour including wages and benefits",
      tooltip: "At $32/hour including wages and benefits",
    },
    {
      title: "Avg Annual Savings per vehicle",
      value: metrics.avgAnnualSavingsPerVehicle,
      subtitle:
        "Includes labour savings+18% fuel cost savings at 3.5$/gallon diesel",
      tooltip:
        "Includes labour savings+18% fuel cost savings at 3.5$/gallon diesel",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 grid-cols-1">
      {metricItems.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
