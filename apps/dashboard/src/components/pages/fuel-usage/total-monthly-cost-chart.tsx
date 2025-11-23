"use client";

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
  Badge,
  colors,
} from "@repo/components";
import { CheckCircle } from "lucide-react";
import { useMemo } from "react";
import type { TotalMonthlyCostData } from "@/services/mock/fuel-usage.service";

const chartConfig = {
  fuelCost: {
    label: "Fuel Cost",
    color: "hsl(var(--chart-1))",
  },
  labourCost: {
    label: "Labour Cost",
    color: "hsl(var(--chart-2))",
  },
  deliveryOverhead: {
    label: "Delivery Overhead",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface TotalMonthlyCostChartProps {
  data: TotalMonthlyCostData[];
}

export function TotalMonthlyCostChart({
  data,
}: TotalMonthlyCostChartProps) {
  // Calculate total for the last month
  const totalCost = useMemo(() => {
    const lastMonth = data[data.length - 1];
    return lastMonth
      ? lastMonth.fuelCost + lastMonth.labourCost + lastMonth.deliveryOverhead
      : 0;
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle>Total Monthly Cost</CardTitle>
          <Badge variant="outline" className="w-fit">
            <CheckCircle className="mr-1 h-3 w-3 text-green-600" />
            <span className="text-green-600">from Ai-Optimized Routing</span>
          </Badge>
        </div>
        <p className="text-3xl font-bold mt-2">${totalCost.toLocaleString()}</p>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={data}
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
            <Bar
              dataKey="fuelCost"
              stackId="a"
              fill={colors.primaryLight}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="labourCost"
              stackId="a"
              fill={colors.secondary}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="deliveryOverhead"
              stackId="a"
              fill={colors.secondaryLight}
              radius={[8, 8, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
