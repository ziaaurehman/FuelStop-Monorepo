"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/components";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", fuelStop: 52000, marketRate: 35000 },
  { month: "Feb", fuelStop: 55000, marketRate: 38000 },
  { month: "Mar", fuelStop: 60000, marketRate: 42000 },
  { month: "Apr", fuelStop: 56000, marketRate: 41000 },
  { month: "May", fuelStop: 57000, marketRate: 40000 },
  { month: "Jun", fuelStop: 58000, marketRate: 41000 },
  { month: "Jul", fuelStop: 9520, marketRate: 6520 }, // tooltip value shown
  { month: "Aug", fuelStop: 60000, marketRate: 43000 },
  { month: "Sep", fuelStop: 62000, marketRate: 44000 },
  { month: "Oct", fuelStop: 61000, marketRate: 42000 },
  { month: "Nov", fuelStop: 59000, marketRate: 41000 },
  { month: "Dec", fuelStop: 63000, marketRate: 45000 },
];

const chartConfig = {
  fuelStop: { label: "Fuel Stop Rate", color: "#005F71" },
  marketRate: { label: "Market rate", color: "#fa7319" },
} satisfies ChartConfig;

interface ComparativeClientProps {
  timeRange: "3" | "6" | "12";
}

export function ComparativeClient({ timeRange }: ComparativeClientProps) {
  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(
    () => chartData.slice(-parseInt(timeRange)),
    [timeRange]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Comparative Client Savings vs Competitor</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value / 1000}gal`}
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="fuelStop"
              stroke="#005F71"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="marketRate"
              stroke="#fa7319"
              strokeWidth={2}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
