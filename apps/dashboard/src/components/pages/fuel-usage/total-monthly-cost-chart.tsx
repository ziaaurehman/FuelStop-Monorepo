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
} from "@repo/components";
import { CheckCircle } from "lucide-react";
import { colors } from "@/components/ui";

const chartData = [
  { month: "Jan", fuelCost: 45000, labourCost: 25000, deliveryOverhead: 15000 },
  { month: "Feb", fuelCost: 38000, labourCost: 22000, deliveryOverhead: 14000 },
  { month: "Mar", fuelCost: 42000, labourCost: 28000, deliveryOverhead: 16000 },
  { month: "Apr", fuelCost: 48000, labourCost: 30000, deliveryOverhead: 18000 },
  { month: "May", fuelCost: 40000, labourCost: 26000, deliveryOverhead: 15000 },
  { month: "Jun", fuelCost: 52000, labourCost: 32000, deliveryOverhead: 20000 },
  { month: "Jul", fuelCost: 35000, labourCost: 24000, deliveryOverhead: 13000 },
  { month: "Aug", fuelCost: 43000, labourCost: 28000, deliveryOverhead: 16000 },
  { month: "Sep", fuelCost: 50000, labourCost: 30000, deliveryOverhead: 18000 },
  { month: "Oct", fuelCost: 47000, labourCost: 29000, deliveryOverhead: 17000 },
  { month: "Nov", fuelCost: 55000, labourCost: 33000, deliveryOverhead: 21000 },
  { month: "Dec", fuelCost: 51000, labourCost: 31000, deliveryOverhead: 19000 },
];

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
  timeRange: "3" | "6" | "12";
}

export function TotalMonthlyCostChart({
  timeRange,
}: TotalMonthlyCostChartProps) {
  // Filter data based on timeRange
  const filteredData = chartData.slice(-parseInt(timeRange));

  // Calculate total for the last month
  const lastMonth = filteredData[filteredData.length - 1];
  const totalCost = lastMonth
    ? lastMonth.fuelCost + lastMonth.labourCost + lastMonth.deliveryOverhead
    : 0;

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
