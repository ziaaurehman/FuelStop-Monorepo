"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  colors,
} from "@repo/components";

const chartData = [
  { month: "Jan", night: 25, evening: 10, morning: 5 },
  { month: "Feb", night: 35, evening: 15, morning: 8 },
  { month: "Mar", night: 45, evening: 20, morning: 10 },
  { month: "Apr", night: 55, evening: 25, morning: 12 },
  { month: "May", night: 40, evening: 20, morning: 10 },
  { month: "Jun", night: 30, evening: 15, morning: 7 },
  { month: "Jul", night: 50, evening: 25, morning: 12 },
  { month: "Aug", night: 55, evening: 25, morning: 10 },
  { month: "Sep", night: 50, evening: 20, morning: 8 },
  { month: "Oct", night: 35, evening: 15, morning: 7 },
  { month: "Nov", night: 25, evening: 10, morning: 5 },
  { month: "Dec", night: 20, evening: 8, morning: 4 },
];

const chartConfig = {
  night: { label: "Night Shift", color: "hsl(var(--chart-1))" },
  evening: { label: "Evening Shift", color: "hsl(var(--chart-2))" },
  morning: { label: "Morning Shift", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

interface DeliveryTimesProps {
  timeRange: "3" | "6" | "12";
}

export function DeliveryTimes({ timeRange }: DeliveryTimesProps) {
  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(
    () => chartData.slice(-parseInt(timeRange)),
    [timeRange]
  );

  // Memoize total cost calculation
  const totalCost = useMemo(() => {
    const lastMonth = filteredData[filteredData.length - 1];
    return lastMonth
      ? lastMonth.evening + lastMonth.morning + lastMonth.night
      : 0;
  }, [filteredData]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle>Delivery TImes</CardTitle>
        </div>
        <p className="text-3xl font-bold mt-2">${totalCost.toLocaleString()}</p>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey="night" stackId="a" fill={colors.primary} />
            <Bar dataKey="evening" stackId="a" fill={colors.primaryLight} />
            <Bar dataKey="morning" stackId="a" fill={colors.secondaryLight} />

            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
